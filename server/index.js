const express = require("express");
const cors = require("cors");
const axios = require("axios");
const { parseStringPromise } = require("xml2js");
const cheerio = require("cheerio"); // Library to parse and scrape HTML
const axiosRetry = require("axios-retry").default;
const path = require("path");

const app = express();

const pLimit = require("p-limit").default;
const NodeCache = require("node-cache");

const imageCache = new NodeCache({ stdTTL: 3600 }); // Cache images for 1 hour
const feedCache = new NodeCache({ stdTTL: 3600 }); // Cache feed for 1 hour

// Concurrency limiter
const limit = pLimit(30); // Set concurrency limit to 10

app.use(cors()); // Enable CORS for all routes

// Serve favicon
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

// Cache variables
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

// Route to fetch and parse the RSS feed
app.get("/rss-feed", async (req, res) => {
  const { refresh } = req.query;
  const CACHE_DURATION = 60 * 60 * 1000; // 60 minutes
  const now = Date.now();

  // If 'refresh' is present in the query, clear the cache
  if (refresh) {
    cachedFeed = null;
    lastFetchTime = null;
    console.log("Cache cleared due to 'refresh' query parameter.");
  }

  // Serve from cache if available and not expired
  if (cachedFeed && lastFetchTime && now - lastFetchTime < CACHE_DURATION) {
    console.log("Serving from cache.");
    return res.json(cachedFeed);
  }

  try {
    console.log("Fetching RSS feed...");
    const response = await axios.get("https://qubicbox.com/wprss", {
      timeout: 5000, // 10 seconds timeout
      headers: {
        "Accept-Encoding": "gzip, deflate, br",
      },
    });

    const xmlData = response.data;
    const jsonData = await parseStringPromise(xmlData, {
      explicitArray: false,
    });

    const entries = jsonData.feed?.entry || [];

    // Process entries in batches
    const BATCH_SIZE = 50;
    const processedItems = [];
    for (let i = 0; i < entries.length; i += BATCH_SIZE) {
      const batch = entries.slice(i, i + BATCH_SIZE);
      const results = await Promise.allSettled(
        batch.map((entry) =>
          limit(async () => {
            let imageUrl = null;

            // Check for YouTube-specific thumbnail
            if (entry["media:group"]?.["media:thumbnail"]?.$.url) {
              imageUrl = entry["media:group"]["media:thumbnail"].$.url;
            }

            if (entry["media:content"]) {
              const mediaContent = entry["media:content"];
              if (Array.isArray(mediaContent) && mediaContent.length > 0) {
                imageUrl = mediaContent[0].$.url || null;
              }
            }

            if (
              !imageUrl &&
              typeof entry.content === "object" &&
              entry.content._
            ) {
              const contentMatch = entry.content._.match(
                /<img[^>]+src=["']([^"']+)["']/
              );
              imageUrl = contentMatch ? contentMatch[1] : null;
            }

            if (!imageUrl && entry.link) {
              const linkHref =
                typeof entry.link === "string"
                  ? entry.link
                  : entry.link.$?.href;
              if (linkHref) {
                const videoIdMatch = linkHref.match(/v=([a-zA-Z0-9_-]+)/);
                if (videoIdMatch) {
                  imageUrl = `https://i.ytimg.com/vi/${videoIdMatch[1]}/maxresdefault.jpg`;
                }
              }
            }

            if (!imageUrl && entry.link?.$.href) {
              imageUrl = await fetchImageFromLinkWithCache(entry.link.$.href);
            }

            return {
              title: entry.title || "Untitled Article",
              link: entry.link?.$.href || "No link available",
              contentSnippet: entry.summary || "No summary available.",
              author: entry.author?.name || "No author available",
              publishedDate: entry.published || "No published date available",
              updatedDate: entry.updated || "No updated date available",
              content: entry.content || "No full content available",
              image: imageUrl || "No image available",
              source: entry.source || "No Source",
              category: entry.category || "No Category",
            };
          })
        )
      );

      processedItems.push(
        ...results
          .filter((result) => result.status === "fulfilled")
          .map((result) => result.value)
      );
    }

    // Cache the results
    cachedFeed = { items: processedItems };
    lastFetchTime = now;

    res.json(cachedFeed);
  } catch (error) {
    console.error("Error fetching and parsing RSS feed:", error.message);
    res.status(500).json({ error: "Failed to fetch or parse RSS feed" });
  }
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
