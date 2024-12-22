const express = require("express");
const cors = require("cors");
const axios = require("axios");
const { parseStringPromise } = require("xml2js");
const path = require("path");

const app = express();
app.use(cors()); // Enable CORS for all routes

// Serve favicon
app.use("/favicon.ico", express.static(path.join(__dirname, "favicon.ico")));

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the Qubic RSS Server!");
});

// Cache variables
let cachedFeed = null;
let lastFetchTime = null;

// Function to fetch and parse RSS feed
const fetchAndUpdateCache = async () => {
  try {
    console.log("Fetching RSS feed...");
    const response = await axios.get("https://qubicbox.com/wprss", {
      timeout: 9000, // Reduced timeout
      headers: { "Accept-Encoding": "gzip, deflate, br" },
    });

    const xmlData = response.data;
    const jsonData = await parseStringPromise(xmlData, {
      explicitArray: false,
    });
    const entries = jsonData.feed?.entry || [];

    // Process RSS entries
    const items = entries.map((entry) => ({
      title: entry.title || "Untitled Article",
      link: entry.link?.$.href || "No link available",
      summary: entry.summary || "No summary available.",
      publishedDate: entry.published || "No published date available",
      // Lazy fetch for images
      image: entry["media:content"]?.$.url || "Image will be fetched later",
    }));

    // Update cache
    cachedFeed = { items };
    lastFetchTime = Date.now();
    console.log("Cache updated.");
  } catch (error) {
    console.error("Error fetching RSS feed:", error.message);
  }
};

// Route to fetch and return RSS feed
app.get("/rss-feed", async (req, res) => {
  const CACHE_DURATION = 60 * 60 * 1000; // 1 hour
  const now = Date.now();

  // Serve cached data if available and not expired
  if (cachedFeed && lastFetchTime && now - lastFetchTime < CACHE_DURATION) {
    console.log("Serving from cache.");
    return res.json(cachedFeed);
  }

  // If no cached data, fetch and respond
  try {
    await fetchAndUpdateCache();
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
setInterval(fetchAndUpdateCache, 60 * 60 * 1000); // Update cache every 1 hour

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
