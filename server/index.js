const express = require("express");
const cors = require("cors");
const axios = require("axios");
const { parseStringPromise } = require("xml2js");
const cheerio = require("cheerio"); // Library to parse and scrape HTML
const axiosRetry = require("axios-retry").default;

const app = express();
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

// Cache variables
let cachedFeed = null;
let lastFetchTime = null;

// Function to scrape the main image from a webpage
// const fetchImageFromLink = async (url) => {
//   try {
//     const response = await axios.get(url);
//     const html = response.data;
//     const $ = cheerio.load(html);

//     const possibleImageSelectors = [
//       'meta[property="og:image"]',
//       'meta[name="twitter:image"]',
//       "article img",
//       "img",
//     ];

//     for (const selector of possibleImageSelectors) {
//       const imageUrl = $(selector).attr("content") || $(selector).attr("src");
//       if (imageUrl) {
//         return imageUrl; // Return the first valid image URL found
//       }
//     }
//     return null; // No image found
//   } catch (error) {
//     console.error(`Error fetching image from ${url}:`, error.message);
//     return null; // Return null if any error occurs
//   }
// };

// Fetch image with headers
const fetchImageFromLink = async (url) => {
  try {
    const response = await axios.get(url, {
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

// Route to fetch and parse the RSS feed
app.get("/rss-feed", async (req, res) => {
  const { refresh } = req.query; // Check for 'refresh' query parameter
  const CACHE_DURATION = 60 * 60 * 1000; // 1 hour
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
    console.time("RSS Fetch");
    console.log("Attempting to fetch RSS feed...");
    const response = await axios.get("https://qubicbox.com/wprss", {
      timeout: 30000, // Increased timeout to 30 seconds
      headers: {
        "Accept-Encoding": "gzip, deflate, br",
      },
    });
    console.timeEnd("RSS Fetch");

    console.time("RSS Parse");
    const xmlData = response.data;
    const jsonData = await parseStringPromise(xmlData, {
      explicitArray: false,
    });
    console.timeEnd("RSS Parse");

    console.time("Process Entries");
    const entries = jsonData.feed?.entry || [];

    const items = await Promise.allSettled(
      entries.map(async (entry) => {
        let imageUrl = null;

        if (entry["media:content"]) {
          const mediaContent = entry["media:content"];
          if (Array.isArray(mediaContent) && mediaContent.length > 0) {
            imageUrl = mediaContent[0].$.url || null;
          }
        }

        if (!imageUrl && typeof entry.content === "object" && entry.content._) {
          const contentMatch = entry.content._.match(
            /<img[^>]+src=["']([^"']+)["']/
          );
          imageUrl = contentMatch ? contentMatch[1] : null;
        }

        if (!imageUrl && entry.link?.$.href) {
          imageUrl = await fetchImageFromLink(entry.link.$.href);
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
        };
      })
    );

    const validItems = items
      .filter((result) => result.status === "fulfilled")
      .map((result) => result.value);

    console.timeEnd("Process Entries");

    // Cache the results
    cachedFeed = { items: validItems };
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
