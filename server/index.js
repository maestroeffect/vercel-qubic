import express from "express";
import axios from "axios";
import cors from "cors";
import { parseStringPromise } from "xml2js"; // Import xml2js for XML-to-JSON parsing

const app = express();
app.use(cors()); // Enable CORS for all routes

// Route to fetch and parse the RSS feed
app.get("/rss-feed", async (req, res) => {
  try {
    const response = await axios.get("https://qubicbox.com/feed/wprss/"); // Correct RSS feed URL
    const xmlData = response.data; // The raw XML data

    // Parse the XML to JSON
    const jsonData = await parseStringPromise(xmlData, {
      explicitArray: false,
    });

    // Extract entries and transform into desired JSON format
    const entries = jsonData.feed.entry || [];
    const items = Array.isArray(entries)
      ? entries.map((entry) => ({
          title: entry.title || "Untitled Article",
          link: entry.link?.href || "#",
          contentSnippet: entry.summary || "No summary available.",
        }))
      : [
          {
            title: entries.title || "Untitled Article",
            link: entries.link?.href || "#",
            contentSnippet: entries.summary || "No summary available.",
          },
        ];

    // Respond with parsed items
    res.json({ items });
  } catch (error) {
    console.error("Error fetching and parsing RSS feed:", error);
    res.status(500).json({ error: "Failed to fetch or parse RSS feed" });
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
