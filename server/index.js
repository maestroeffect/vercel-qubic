import axios from "axios";
import { parseStringPromise } from "xml2js"; // For XML-to-JSON parsing

export default async function handler(req, res) {
  if (req.method === "GET") {
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
      res.status(200).json({ items });
    } catch (error) {
      console.error("Error fetching and parsing RSS feed:", error);
      res.status(500).json({ error: "Failed to fetch or parse RSS feed" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
