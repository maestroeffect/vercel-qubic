import { useEffect, useState } from "react";

const QubicwebFeed = () => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const response = await fetch("/api/rss-feed");

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const feedData = await response.json();

        if (feedData.items && Array.isArray(feedData.items)) {
          const parsedArticles = feedData.items.map((item) => ({
            title: item.title && typeof item.title === "object" ? item.title._ : item.title,
            link: item.link || "#",
            contentSnippet: item.contentSnippet || "No summary available.",
          }));

          setArticles(parsedArticles);
        } else {
          throw new Error("Unexpected feed structure: items not found or not an array.");
        }
      } catch (error) {
        console.error("Error fetching RSS feed:", error);
        setError(error.message);
      }
    };

    fetchFeed();
  }, []);

  return { articles, error };
};

export default QubicwebFeed;
