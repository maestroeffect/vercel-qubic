import { useEffect, useState } from "react";

// Function to shuffle the articles array
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
};

// Function to format the date in "Month Day, Year" format
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Intl.DateTimeFormat("en-US", options).format(date);
};

const QubicwebFeed = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeed = async () => {
      setLoading(true); // Start loading
      try {
        // Fetch data from the server
        // const response = await fetch("http://localhost:5000/rss-feed");

        const response = await fetch("https://vercel-qubic-server.vercel.app/");

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const feedData = await response.json();
        console.log("feedData:", feedData);

        if (feedData.items && Array.isArray(feedData.items)) {
          // Map and process the articles, excluding those with "No image available"
          const parsedArticles = feedData.items
            .map((item) => ({
              title: item.title && typeof item.title === "object" ? item.title._ : item.title,
              link: item.link || "No link available",
              contentSnippet: item.contentSnippet || "No summary available.",
              author: item.author || "No author available",
              publishedDate: item.publishedDate ? formatDate(item.publishedDate) : "No published date available",
              updatedDate: item.updatedDate ? formatDate(item.updatedDate) : "No updated date available",
              content: item.content || "No full content available",
              image: item.image || "No image available", // Use the image from the server
              source: item.source || "No Source",
            }))
            .filter((item) => item.image !== "No image available"); // Exclude articles with "No image available"

          console.log("ParsedArticles:", parsedArticles);

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
