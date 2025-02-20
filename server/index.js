// const express = require("express");
// const cors = require("cors");
// const axios = require("axios");
// const xml2js = require("xml2js");
// const cheerio = require("cheerio");
// const axiosRetry = require("axios-retry").default;
// const path = require("path");
// const pLimit = require("p-limit").default;
// const NodeCache = require("node-cache");
// const fs = require("fs");

// const app = express();
// const limit = pLimit(30);
// const imageCache = new NodeCache({ stdTTL: 3600 }); // Cache images for 1 hour
// const cacheFilePath = path.join(__dirname, "feedCache.json");

// let cachedFeed = null;
// let lastFetchTime = null;

// // Load cache from disk
// const loadCacheFromFile = () => {
//   if (fs.existsSync(cacheFilePath)) {
//     try {
//       const data = fs.readFileSync(cacheFilePath, "utf8");
//       cachedFeed = JSON.parse(data);
//       console.log("Cache successfully loaded from disk.");
//     } catch (error) {
//       console.error("Error loading cache from disk:", error.message);
//     }
//   }
// };

// // Save cache to disk
// const saveCacheToFile = () => {
//   if (cachedFeed) {
//     try {
//       fs.writeFileSync(cacheFilePath, JSON.stringify(cachedFeed, null, 2));
//       console.log("Cache successfully saved to disk.");
//     } catch (error) {
//       console.error("Error saving cache to disk:", error.message);
//     }
//   }
// };

// const formatDate = (dateString) => {
//   const date = new Date(dateString);
//   const options = { year: "numeric", month: "short", day: "numeric" };
//   return new Intl.DateTimeFormat("en-US", options).format(date);
// };

// app.use(cors());
// app.use("/favicon.ico", express.static(path.join(__dirname, "favicon.ico")));

// // Root route
// app.get("/", (req, res) => {
//   res.send("Welcome to the Qubic RSS Server!");
// });

// // Configure retry mechanism for Axios with increased retries and delay
// axiosRetry(axios, {
//   retries: 5,
//   retryDelay: (retryCount) => retryCount * 2000,
//   shouldResetTimeout: true,
// });

// // Fetch image with caching and concurrency control
// const fetchImageFromLinkWithCache = async (url) => {
//   if (imageCache.has(url)) {
//     return imageCache.get(url);
//   }

//   const imageUrl = await fetchImageFromLink(url);
//   if (imageUrl) {
//     imageCache.set(url, imageUrl);
//   }
//   return imageUrl;
// };

// // Fetch image with headers
// const fetchImageFromLink = async (url) => {
//   try {
//     const response = await axios.get(url, {
//       timeout: 5000,
//       headers: {
//         "User-Agent":
//           "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
//       },
//     });
//     const $ = cheerio.load(response.data);
//     const selectors = [
//       'meta[property="og:image"]',
//       'meta[name="twitter:image"]',
//       "article img",
//       "img",
//     ];
//     for (const selector of selectors) {
//       const imageUrl = $(selector).attr("content") || $(selector).attr("src");
//       if (imageUrl) return imageUrl;
//     }
//     return null;
//   } catch (error) {
//     return null;
//   }
// };

// // Fetch full content (including images) from the link
// const fetchFullContentFromLink = async (url) => {
//   try {
//     const response = await axios.get(url, {
//       timeout: 5000,
//       headers: {
//         "User-Agent":
//           "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
//       },
//     });
//     const $ = cheerio.load(response.data);

//     // Extract all content (you can modify this to suit the exact structure of your pages)
//     const fullContent = $("article").html() || $("body").html();

//     // Modify image URLs if needed
//     $("img").each((index, img) => {
//       const imgUrl = $(img).attr("src");
//       if (imgUrl && imgUrl.startsWith("/")) {
//         $(img).attr("src", new URL(imgUrl, url).href);
//       }
//     });

//     return $.html();
//   } catch (error) {
//     return "Error fetching full content";
//   }
// };

// // Fetch and process RSS feed data
// const processFeedData = async (feedEntries) => {
//   const videoSources = [
//     "https://www.youtube.com/channel/UCa6eh7gCkpPo5XXUDfygQQA",
//     "https://www.youtube.com/channel/UCVeW9qkBjo3zosnqUbG7CFw",
//     "https://www.youtube.com/channel/UClcE-kVhqyiHCcjYwcpfj9w",
//     "https://www.youtube.com/channel/UCLDnEn-TxejaDB8qm2AUhHQ",
//     "https://www.youtube.com/channel/UC9x0AN7BWHpCDHSm9NiJFJQ",
//     "https://www.youtube.com/channel/UCg--XBjJ50a9tUhTKXVPiqg",
//     "https://www.youtube.com/channel/UC0vBXGSyV14uvJ4hECDOl0Q",
//     "https://www.youtube.com/channel/UChIZGfcnjHI0DG4nweWEduw",
//     "https://www.youtube.com/channel/UC0ArlFuFYMpEewyRBzdLHiw",
//     "https://www.youtube.com/channel/UCddiUEpeqJcYeBxX1IVBKvQ",
//   ];
//   const blogSources = ["https://www.sheriffdeputiesltd.com/"];

//   const results = await Promise.allSettled(
//     feedEntries.map((entry) =>
//       limit(async () => {
//         let imageUrl = null;

//         // Process image URLs
//         if (entry["media:group"]?.["media:thumbnail"]?.$.url) {
//           imageUrl = entry["media:group"]["media:thumbnail"].$.url;
//         } else if (entry["media:content"]) {
//           const mediaContent = entry["media:content"];
//           if (Array.isArray(mediaContent) && mediaContent.length > 0) {
//             imageUrl = mediaContent[0].$.url || null;
//           }
//         } else if (
//           typeof entry.content === "object" &&
//           entry.content._ &&
//           entry.content._.match(/<img[^>]+src=["']([^"']+)["']/)
//         ) {
//           const contentMatch = entry.content._.match(
//             /<img[^>]+src=["']([^"']+)["']/
//           );
//           imageUrl = contentMatch ? contentMatch[1] : null;
//         } else if (entry.link?.$.href) {
//           imageUrl = await fetchImageFromLinkWithCache(entry.link.$.href);
//         }

//         // Extract full content from the link
//         let fullContent =
//           entry.content && typeof entry.content === "object"
//             ? entry.content._
//             : "No full content available.";

//         if (entry.link?.$.href) {
//           fullContent = await fetchFullContentFromLink(entry.link.$.href);
//         }

//         const sourceObject = entry.source || {
//           id: "Unknown Source",
//           title: "Unknown Title",
//         };

//         const title =
//           entry.title && typeof entry.title === "object"
//             ? entry.title._
//             : entry.title;
//         const validTitle = typeof title === "string" ? title : "Untitled";

//         return {
//           title: validTitle,
//           link: entry.link?.$.href || "No link available",
//           contentSnippet: entry.summary || "No summary available.",
//           fullContent: fullContent, // Full content extracted from the link
//           publishedDate: entry.updated
//             ? formatDate(entry.updated)
//             : "No published date available",
//           image: imageUrl || "No image available",
//           source: sourceObject,
//           author: entry.author,
//           category: sourceObject.title || "Uncategorized",
//           isVideo: videoSources.includes(sourceObject.id),
//           isBlog: blogSources.includes(sourceObject.id),
//         };
//       })
//     )
//   );

//   return results
//     .filter((result) => result.status === "fulfilled")
//     .map((result) => result.value);
// };

// // Fetch and cache the RSS feed
// const fetchAndCacheFeed = async () => {
//   try {
//     console.log("Fetching RSS feed in background...");
//     const response = await axios.get("https://qubicbox.com/feed/wprss");

//     // Parse XML to JSON
//     const parser = new xml2js.Parser({ explicitArray: false });
//     const parsedData = await parser.parseStringPromise(response.data);

//     // Validate and extract entries
//     if (!parsedData || !parsedData.feed || !parsedData.feed.entry) {
//       throw new Error("Invalid feed data structure");
//     }

//     const feedEntries = Array.isArray(parsedData.feed.entry)
//       ? parsedData.feed.entry
//       : [parsedData.feed.entry]; // Ensure entries are in an array

//     console.log("Number of Feed Entries:", feedEntries.length);

//     // Process entries
//     const processedItems = await processFeedData(feedEntries);

//     // Log the entire processed items
//     console.log(
//       "Processed Feed Items:",
//       JSON.stringify(processedItems, null, 2)
//     );

//     cachedFeed = { items: processedItems };
//     lastFetchTime = Date.now();
//     console.log("RSS feed successfully cached.");
//     saveCacheToFile();
//   } catch (error) {
//     console.error("Error fetching RSS feed:", error.message);
//   }
// };

// // Schedule feed fetching every hour
// setInterval(fetchAndCacheFeed, 60 * 60 * 1000);
// fetchAndCacheFeed();

// // Route to serve the cached RSS feed
// app.get("/rss-feed", (req, res) => {
//   const { refresh } = req.query;

//   if (refresh) {
//     console.log("Manual refresh triggered.");
//     fetchAndCacheFeed();
//     return res.json({
//       message: "Manual refresh triggered. Serving cached feed.",
//       lastFetchTime: lastFetchTime
//         ? new Date(lastFetchTime).toISOString()
//         : "No fetch has occurred yet.",
//       cachedFeed,
//     });
//   }

//   if (cachedFeed) {
//     console.log("Serving cached feed.");
//     res.json(cachedFeed);
//   } else {
//     res.status(503).json({ error: "Feed is not yet cached. Try again later." });
//   }
// });

// // Load cache when the server starts
// loadCacheFromFile();

// // Save cache when the server shuts down
// process.on("exit", saveCacheToFile);
// process.on("SIGINT", () => {
//   saveCacheToFile();
//   process.exit();
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

const express = require("express");
const cors = require("cors");
const axios = require("axios");
const xml2js = require("xml2js");
const cheerio = require("cheerio");
const axiosRetry = require("axios-retry").default;
const path = require("path");
const pLimit = require("p-limit").default;
const NodeCache = require("node-cache");
const fs = require("fs");

const app = express();
const limit = pLimit(30);
const imageCache = new NodeCache({ stdTTL: 3600 }); // Cache images for 1 hour
const cacheFilePath = path.join(__dirname, "feedCache.json");

let cachedFeed = null;
let lastFetchTime = null;

// Load cache from disk
const loadCacheFromFile = () => {
  if (fs.existsSync(cacheFilePath)) {
    try {
      const data = fs.readFileSync(cacheFilePath, "utf8");
      cachedFeed = JSON.parse(data);
      console.log("Cache successfully loaded from disk.");
    } catch (error) {
      console.error("Error loading cache from disk:", error.message);
    }
  }
};

// Save cache to disk
const saveCacheToFile = () => {
  if (cachedFeed) {
    try {
      fs.writeFileSync(cacheFilePath, JSON.stringify(cachedFeed, null, 2));
      console.log("Cache successfully saved to disk.");
    } catch (error) {
      console.error("Error saving cache to disk:", error.message);
    }
  }
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Intl.DateTimeFormat("en-US", options).format(date);
};

app.use(cors());
app.use("/favicon.ico", express.static(path.join(__dirname, "favicon.ico")));

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the Qubic RSS Server!");
});

// Configure retry mechanism for Axios with increased retries and delay
axiosRetry(axios, {
  retries: 5,
  retryDelay: (retryCount) => retryCount * 2000,
  shouldResetTimeout: true,
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

// Fetch image with headers
const fetchImageFromLink = async (url) => {
  try {
    const response = await axios.get(url, {
      timeout: 5000,
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
    return null;
  }
};

// Fetch and process RSS feed data
const processFeedData = async (feedEntries) => {
  const videoSources = [
    "https://www.youtube.com/channel/UCa6eh7gCkpPo5XXUDfygQQA",
    "https://www.youtube.com/channel/UCVeW9qkBjo3zosnqUbG7CFw",
    "https://www.youtube.com/channel/UClcE-kVhqyiHCcjYwcpfj9w",
    "https://www.youtube.com/channel/UCLDnEn-TxejaDB8qm2AUhHQ",
    "https://www.youtube.com/channel/UC9x0AN7BWHpCDHSm9NiJFJQ",
    "https://www.youtube.com/channel/UCg--XBjJ50a9tUhTKXVPiqg",
    "https://www.youtube.com/channel/UC0vBXGSyV14uvJ4hECDOl0Q",
    "https://www.youtube.com/channel/UChIZGfcnjHI0DG4nweWEduw",
    "https://www.youtube.com/channel/UC0ArlFuFYMpEewyRBzdLHiw",
    "https://www.youtube.com/channel/UCddiUEpeqJcYeBxX1IVBKvQ",
  ];
  const blogSources = [
    "https://www.sheriffdeputiesltd.com/",
    "https://blog.compass-security.com/feed/",
  ];

  const results = await Promise.allSettled(
    feedEntries.map((entry) =>
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

        if (!imageUrl && entry.link) {
          const linkHref =
            typeof entry.link === "string" ? entry.link : entry.link.$?.href;
          if (linkHref) {
            const videoIdMatch = linkHref.match(/v=([a-zA-Z0-9_-]+)/);
            if (videoIdMatch) {
              imageUrl = `https://i.ytimg.com/vi/${videoIdMatch[1]}/maxresdefault.jpg`;
            }
          }
        }

        const sourceObject = entry.source || {
          id: "Unknown Source",
          title: "Unknown Title",
        };
        const sourceUrl2 = sourceObject.id;
        const isVideo = videoSources.includes(sourceUrl2);
        const isBlog = blogSources.includes(sourceUrl2);

        const title =
          entry.title && typeof entry.title === "object"
            ? entry.title._
            : entry.title;
        const validTitle = typeof title === "string" ? title : "Untitled";
        // console.log(entry.link?.$.href);

        // Extract full content
        const fullContent =
          entry.content && typeof entry.content === "object"
            ? entry.content._
            : "No full content available.";

        return {
          title: validTitle,
          link: entry.link?.$.href || "No link available",
          contentSnippet: entry.summary || "No summary available.",
          fullContent: fullContent, // New property for full content
          publishedDate: entry.updated
            ? formatDate(entry.updated)
            : "No published date available",
          image: imageUrl || "No image available",
          source: sourceObject,
          author: entry.author,
          category: sourceObject.title || "Uncategorized",
          isVideo,
          isBlog,
        };
      })
    )
  );

  return results
    .filter((result) => result.status === "fulfilled")
    .map((result) => result.value);
};

// Fetch and cache the RSS feed
const fetchAndCacheFeed = async () => {
  try {
    console.log("Fetching RSS feed in background...");
    const response = await axios.get("https://qubicbox.com/feed/wprss");

    // console.log("Raw Response Data:", response.data);

    // Parse XML to JSON
    const parser = new xml2js.Parser({ explicitArray: false });
    const parsedData = await parser.parseStringPromise(response.data);

    // console.log("Parsed Feed Data:", parsedData);

    // Validate and extract entries
    if (!parsedData || !parsedData.feed || !parsedData.feed.entry) {
      throw new Error("Invalid feed data structure");
    }

    const feedEntries = Array.isArray(parsedData.feed.entry)
      ? parsedData.feed.entry
      : [parsedData.feed.entry]; // Ensure entries are in an array

    console.log("Number of Feed Entries:", feedEntries.length);

    // Process entries
    const processedItems = await processFeedData(feedEntries);

    // Log the entire processed items
    // console.log(
    //   "Processed Feed Items:",
    //   JSON.stringify(processedItems, null, 2)
    // );

    cachedFeed = { items: processedItems };
    lastFetchTime = Date.now();
    console.log("RSS feed successfully cached.");
    saveCacheToFile();
  } catch (error) {
    console.error("Error fetching RSS feed:", error.message);
  }
};

// Schedule feed fetching every hour
setInterval(fetchAndCacheFeed, 60 * 60 * 1000);
fetchAndCacheFeed();

// Route to serve the cached RSS feed
app.get("/rss-feed", (req, res) => {
  const { refresh } = req.query;

  if (refresh) {
    console.log("Manual refresh triggered.");
    fetchAndCacheFeed();
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

// Load cache when the server starts
loadCacheFromFile();

// Save cache when the server shuts down
process.on("exit", saveCacheToFile);
process.on("SIGINT", () => {
  saveCacheToFile();
  process.exit();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
