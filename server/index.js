const express = require("express");
const cors = require("cors");
const axios = require("axios");
const { parseStringPromise } = require("xml2js");

const app = express();
app.use(cors()); // Enable CORS for all routes

// Route to fetch and parse the RSS feed
app.get("/rss-feed", async (req, res) => {
  try {
    console.log("Attempting to fetch RSS feed...");
    const response = await axios.get("https://qubicbox.com/feed/wprss/");
    console.log("Fetched RSS feed successfully.");

    const xmlData = response.data; // The raw XML data

    // Parse the XML to JSON
    const jsonData = await parseStringPromise(xmlData, {
      explicitArray: false,
    });

    console.log("Parsed RSS feed to JSON successfully.");
    const entries = jsonData.feed.entry || [];

    const items = Array.isArray(entries)
      ? entries.map((entry) => ({
          title: entry.title || "Untitled Article",
          link:
            entry.link?.$.href ||
            entry.link?.[0]?.$.href ||
            "No link available", // Correct link extraction
          contentSnippet: entry.summary || "No summary available.",
          author: entry.author?.name || "No author available",
          publishedDate: entry.published || "No published date available",
          updatedDate: entry.updated || "No updated date available",
          content: entry.content || "No full content available", // Full content if available
          source: entry.source || "No full content available",
        }))
      : [
          {
            title: entries.title || "Untitled Article",
            link:
              entries.link?.$.href ||
              entries.link?.[0]?.$.href ||
              "No link available", // Correct link extraction
            contentSnippet: entries.summary || "No summary available.",
            author: entries.author?.name || "No author available",
            publishedDate: entries.published || "No published date available",
            updatedDate: entries.updated || "No updated date available",
            content: entries.content || "No full content available", // Full content if available
            source: entries.source || "No full content available",
          },
        ];

    // Respond with parsed items
    res.json({ items });
  } catch (error) {
    console.error("Error fetching and parsing RSS feed:", error);
    res.status(500).json({ error: "Failed to fetch or parse RSS feed" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
