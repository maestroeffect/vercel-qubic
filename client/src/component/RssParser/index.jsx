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
    // Add "no-scroll" to prevent body scrolling when loading
    if (loading) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    // Cleanup "no-scroll" class on unmount
    return () => document.body.classList.remove("no-scroll");
  }, [loading]);

  useEffect(() => {
    const fetchFeed = async () => {
      setLoading(true); // Start loading
      try {
        const response = await fetch("https://vercel-qubic-server.vercel.app/rss-feed");

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const feedData = await response.json();

        if (feedData.items && Array.isArray(feedData.items)) {
          const parsedArticles = feedData.items.map((item) => ({
            title: item.title && typeof item.title === "object" ? item.title._ : item.title,
            link: item.link || "No link available",
            contentSnippet: item.contentSnippet || "No summary available.",
            author: item.author || "No author available",
            publishedDate: item.publishedDate || "No published date available",
            updatedDate: item.updatedDate || "No updated date available",
            content: item.content || "No full content available",
            image: item.image || "No image available",
          }));

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
