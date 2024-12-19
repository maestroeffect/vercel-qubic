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
    const response = await axios.get("https://qubicbox.com/wprss");
    console.log("Fetched RSS feed successfully.");

    const xmlData = response.data; // The raw XML data

    // Parse the XML to JSON
    const jsonData = await parseStringPromise(xmlData, {
      explicitArray: false,
    });

    console.log("Parsed RSS feed to JSON successfully.");

    const entries = jsonData.feed.entry || [];

    const items = Array.isArray(entries)
      ? entries.map((entry) => {
          let imageUrl = null;

          // Check for image in <media:content> tag
          if (entry["media:content"]) {
            const mediaContent = entry["media:content"];
            // If there are multiple media:content elements, we can pick the first one
            if (Array.isArray(mediaContent) && mediaContent.length > 0) {
              imageUrl = mediaContent[0].$.url || null;
            }
          }

          // If no image URL found in <media:content>, check the 'content' for an image
          if (
            !imageUrl &&
            typeof entry.content === "object" &&
            entry.content._
          ) {
            const contentString = entry.content._;

            // Regular expression to extract image URLs from the content
            const contentMatch = contentString.match(
              /<img[^>]+src=["']([^"']+)["']/
            );

            imageUrl = contentMatch ? contentMatch[1] : null;
          }

          // If no image URL found in content, use a placeholder
          if (!imageUrl) {
            imageUrl = "No image available"; // Placeholder if no image is found
          }

          // Log the image URL
          // console.log(`Image URL for entry "${entry.title}": ${imageUrl}`);

          // Add the image URL to the content if not present
          if (
            entry.content &&
            typeof entry.content === "object" &&
            entry.content._
          ) {
            const contentString = entry.content._;
            if (!contentString.includes(imageUrl)) {
              entry.content._ = `${contentString} <img src="${imageUrl}" alt="image" />`;
            }
          }

          return {
            title: entry.title || "Untitled Article",
            link:
              entry.link?.$.href ||
              entry.link?.[0]?.$.href ||
              "No link available",
            contentSnippet: entry.summary || "No summary available.",
            author: entry.author?.name || "No author available",
            publishedDate: entry.published || "No published date available",
            updatedDate: entry.updated || "No updated date available",
            content: entry.content || "No full content available",
            image: imageUrl || "No image available", // Set image URL correctly
            source: entry.source || "No Source",
          };
        })
      : [
          {
            title: entries.title || "Untitled Article",
            link:
              entries.link?.$.href ||
              entries.link?.[0]?.$.href ||
              "No link available",
            contentSnippet: entries.summary || "No summary available.",
            author: entries.author?.name || "No author available",
            publishedDate: entries.published || "No published date available",
            updatedDate: entries.updated || "No updated date available",
            content: entries.content || "No full content available",
            image: entries.image?.[0]?.$.src || "No image available", // Extract image URL correctly
            source: entries.source || "No Source", // Extract source name correctly
          },
        ];

    // Filter out items where the image is either null or "No image available"
    const filteredItems = items.filter(
      (item) => item.image !== "No image available" && item.image !== null
    );

    // Respond with filtered items
    res.json({ items: filteredItems });
  } catch (error) {
    console.error("Error fetching and parsing RSS feed:", error);
    res.status(500).json({ error: "Failed to fetch or parse RSS feed" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
