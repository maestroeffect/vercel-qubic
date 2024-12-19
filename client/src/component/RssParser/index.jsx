import { useEffect, useState } from "react";

// Function to shuffle the articles array
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
};

const QubicwebFeed = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeed = async () => {
      setLoading(true); // Start loading
      try {
        const response = await fetch("https://vercel-qubic-server.vercel.app/rss-feed");

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const feedData = await response.json();
        console.log(feedData);

        if (feedData.items && Array.isArray(feedData.items)) {
          const parsedArticles = feedData.items.map((item) => {
            let imageUrl = null;

            // Check if 'content' is an object containing a '_'
            if (item.content && typeof item.content._ === "string") {
              const contentString = item.content._;

              // Extract image URLs from the content
              const contentMatch = contentString.match(/<img[^>]+src=["']([^"']+)["']/);

              imageUrl = contentMatch ? contentMatch[1] : null;
            }

            return {
              title: item.title && typeof item.title === "object" ? item.title._ : item.title,
              link: item.link || "No link available",
              contentSnippet: item.contentSnippet || "No summary available.",
              author: item.author || "No author available",
              publishedDate: item.publishedDate || "No published date available",
              updatedDate: item.updatedDate || "No updated date available",
              content: item.content || "No full content available",
              image: imageUrl, // Added image URL to each article
              source: item.source
                ? {
                  id: item.source.id || "No source ID available",
                  title: item.source.title || "No source title available",
                }
                : { id: "No source ID available", title: "No source title available" }, // Extract source
            };
          });

          // Shuffle the articles array randomly
          setArticles(shuffleArray(parsedArticles));
        } else {
          throw new Error("Unexpected feed structure: items not found or not an array.");
        }
      } catch (error) {
        console.error("Error fetching RSS feed:", error);
        setError(error.message);
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchFeed();
  }, []);

  return { articles, loading, error }; // Include the loading state in the return value
};

export default QubicwebFeed;
