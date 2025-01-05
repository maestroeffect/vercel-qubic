const express = require("express");
const cors = require("cors");
const axios = require("axios");
const { parseStringPromise } = require("xml2js");
const cheerio = require("cheerio");
const axiosRetry = require("axios-retry").default;
const path = require("path");
const pLimit = require("p-limit").default;
const NodeCache = require("node-cache");

const app = express();
const limit = pLimit(30);
const imageCache = new NodeCache({ stdTTL: 3600 }); // Cache images for 1 hour

app.use(cors());
app.use("/favicon.ico", express.static(path.join(__dirname, "favicon.ico")));
// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the Qubic RSS Server!");
});
// Configure retry mechanism for Axios with increased retries and delay
axiosRetry(axios, {
  retries: 5, // Increased retries
  retryDelay: (retryCount) => retryCount * 2000, // Increased delay between retries
  shouldResetTimeout: true, // Reset timeout after each retry
});

// Fetch image with caching and concurrency control
const fetchImageFromLinkWithCache = async (url) => {
  if (imageCache.has(url)) {
    return imageCache.get(url);
  }

  const imageUrl = await fetchImageFromLink(url);
  if (imageUrl) {
    imageCache.set(url, imageUrl);
  }
  return imageUrl;
};

let cachedFeed = null;
let lastFetchTime = null;

// Fetch image with headers
const fetchImageFromLink = async (url) => {
  try {
    const response = await axios.get(url, {
      timeout: 5000, // Increased timeout
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    });
    const $ = cheerio.load(response.data);
    const selectors = [
      'meta[property="og:image"]',
      'meta[name="twitter:image"]',
      "article img",
      "img",
    ];
    for (const selector of selectors) {
      const imageUrl = $(selector).attr("content") || $(selector).attr("src");
      if (imageUrl) return imageUrl;
    }
    return null;
  } catch (error) {
    return null; // Fallback if image fetch fails
  }
};
// Function to fetch and cache the RSS feed
const fetchAndCacheFeed = async () => {
  try {
    console.log("Fetching RSS feed in background...");
    const response = await axios.get("https://qubicbox.com/feed/wprss", {
      timeout: 5000,
      headers: {
        "Accept-Encoding": "gzip, deflate, br",
      },
    });

    const xmlData = response.data;
    const jsonData = await parseStringPromise(xmlData, {
      explicitArray: false,
    });
    const entries = jsonData.feed?.entry || [];
    console.log(`Total entries fetched from RSS feed: ${entries.length}`);

    const BATCH_SIZE = 50;
    const processedItems = [];
    for (let i = 0; i < entries.length; i += BATCH_SIZE) {
      const batch = entries.slice(i, i + BATCH_SIZE);
      // console.log(
      //   `Processing batch ${i / BATCH_SIZE + 1}: ${batch.length} entries`
      // );
      const results = await Promise.allSettled(
        batch.map((entry) =>
          limit(async () => {
            let imageUrl = null;

            // Process image URLs
            if (entry["media:group"]?.["media:thumbnail"]?.$.url) {
              imageUrl = entry["media:group"]["media:thumbnail"].$.url;
            } else if (entry["media:content"]) {
              const mediaContent = entry["media:content"];
              if (Array.isArray(mediaContent) && mediaContent.length > 0) {
                imageUrl = mediaContent[0].$.url || null;
              }
            } else if (
              typeof entry.content === "object" &&
              entry.content._ &&
              entry.content._.match(/<img[^>]+src=["']([^"']+)["']/)
            ) {
              const contentMatch = entry.content._.match(
                /<img[^>]+src=["']([^"']+)["']/
              );
              imageUrl = contentMatch ? contentMatch[1] : null;
            } else if (entry.link?.$.href) {
              imageUrl = await fetchImageFromLinkWithCache(entry.link.$.href);
            }

            return {
              title: entry.title || "Untitled Article",
              link: entry.link?.$.href || "No link available",
              contentSnippet: entry.summary || "No summary available.",
              publishedDate: entry.published || "No published date available",
              content: entry.content || "No full content available",
              image: imageUrl || "No image available",
              source: entry.source || "No Source",
              category: entry.category || "No Category",
            };
          })
        )
      );

      const fulfilledItems = results.filter(
        (result) => result.status === "fulfilled"
      );
      const rejectedItems = results.filter(
        (result) => result.status === "rejected"
      );

      // console.log(
      //   `Batch ${i / BATCH_SIZE + 1} - Fulfilled: ${fulfilledItems.length}, Rejected: ${rejectedItems.length}`
      // );
      // if (rejectedItems.length > 0) {
      //   console.error(
      //     `Rejected items in batch ${i / BATCH_SIZE + 1}:`,
      //     rejectedItems.map((result) => result.reason)
      //   );
      // }

      processedItems.push(...fulfilledItems.map((result) => result.value));
    }
    console.log(`Total processed items: ${processedItems.length}`);

    // Cache the results
    cachedFeed = { items: processedItems };
    lastFetchTime = Date.now();
    console.log("RSS feed successfully cached.");
  } catch (error) {
    console.error("Error fetching RSS feed:", error.message);
  }
};

// Schedule feed fetching every hour
setInterval(fetchAndCacheFeed, 60 * 60 * 1000); // 1 hour
fetchAndCacheFeed(); // Initial fetch

// Route to serve the cached RSS feed
app.get("/rss-feed", (req, res) => {
  const { refresh } = req.query;

  if (refresh) {
    console.log("Manual refresh triggered.");
    fetchAndCacheFeed(); // Trigger a manual fetch in the background
    return res.json({
      message: "Manual refresh triggered. Serving cached feed.",
      lastFetchTime: lastFetchTime
        ? new Date(lastFetchTime).toISOString()
        : "No fetch has occurred yet.",
      cachedFeed,
    });
  }
  if (cachedFeed) {
    console.log("Serving cached feed.");
    res.json(cachedFeed);
  } else {
    res.status(503).json({ error: "Feed is not yet cached. Try again later." });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
