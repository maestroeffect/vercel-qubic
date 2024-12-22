const express = require("express");
const cors = require("cors");
const axios = require("axios");
const { parseStringPromise } = require("xml2js");
const cheerio = require("cheerio");
const path = require("path");

const app = express();
app.use(cors());

// Serve favicon
app.use("/favicon.ico", express.static(path.join(__dirname, "favicon.ico")));

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the Qubic RSS Server!");
});

// Cache variables
let cachedFeed = null;
let lastFetchTime = null;

// Function to fetch images from webpage content
const fetchImageFromLink = async (url) => {
  try {
    const response = await axios.get(url, {
      timeout: 10000,
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
    console.error(`Error fetching image from ${url}:`, error.message);
    return null;
  }
};

// Function to fetch and process RSS feed
const fetchAndProcessRSS = async () => {
  try {
    console.log("Fetching RSS feed...");
    const response = await axios.get("https://qubicbox.com/wprss", {
      timeout: 10000,
      headers: { "Accept-Encoding": "gzip, deflate, br" },
    });

    const xmlData = response.data;
    const jsonData = await parseStringPromise(xmlData, {
      explicitArray: false,
    });
    const entries = jsonData.feed?.entry || [];

    const items = await Promise.all(
      entries.map(async (entry) => {
        let imageUrl = null;

        // Try to get the image from media:content
        if (entry["media:content"]?.$.url) {
          imageUrl = entry["media:content"].$.url;
        }

        // Fallback to fetching image from the link
        if (!imageUrl && entry.link?.$.href) {
          imageUrl = await fetchImageFromLink(entry.link.$.href);
        }

        // Extract snippet from content if no summary
        let contentSnippet = entry.summary || "No summary available.";
        if (
          !contentSnippet &&
          typeof entry.content === "object" &&
          entry.content._
        ) {
          contentSnippet = entry.content._.substring(0, 200) + "...";
        }

        return {
          title: entry.title || "Untitled Article",
          link: entry.link?.$.href || "No link available",
          contentSnippet,
          author: entry.author?.name || "No author available",
          publishedDate: entry.published || "No published date available",
          updatedDate: entry.updated || "No updated date available",
          content: entry.content?._ || "No full content available",
          image: imageUrl || "No image available",
          source: entry.source || "No Source",
        };
      })
    );

    cachedFeed = { items };
    lastFetchTime = Date.now();
    console.log("RSS feed processed and cached.");
  } catch (error) {
    console.error("Error processing RSS feed:", error.message);
  }
};

// Route to fetch and return RSS feed
app.get("/rss-feed", async (req, res) => {
  const CACHE_DURATION = 60 * 60 * 1000; // 1 hour
  const now = Date.now();

  if (cachedFeed && lastFetchTime && now - lastFetchTime < CACHE_DURATION) {
    console.log("Serving from cache.");
    return res.json(cachedFeed);
  }

  try {
    await fetchAndProcessRSS();
    if (cachedFeed) {
      res.json(cachedFeed);
    } else {
      res.status(500).json({ error: "Failed to fetch RSS feed" });
    }
  } catch (error) {
    console.error("Error serving RSS feed:", error.message);
    res.status(500).json({ error: "Failed to fetch RSS feed" });
  }
});

// Start periodic cache updates
setInterval(fetchAndProcessRSS, 60 * 60 * 1000);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
