import { useState, useEffect } from "react";
import axios from "axios";

const useNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      const options = {
        method: "GET",
        url: "https://real-time-news-data.p.rapidapi.com/topic-news-by-section",
        params: {
          topic: "TECHNOLOGY",
          section:
            "CAQiW0NCQVNQZ29JTDIwdk1EZGpNWFlTQW1WdUdnSlZVeUlQQ0FRYUN3b0pMMjB2TURKdFpqRnVLaGtLRndvVFIwRkVSMFZVWDFORlExUkpUMDVmVGtGTlJTQUJLQUEqKggAKiYICiIgQ0JBU0Vnb0lMMjB2TURkak1YWVNBbVZ1R2dKVlV5Z0FQAVAB",
          limit: 500,
          country: "US",
          lang: "en",
        },
        headers: {
          "x-rapidapi-host": "real-time-news-data.p.rapidapi.com",
          "x-rapidapi-key":
            "51a3874efemsh2e139e1d7fa826ap13f479jsna6aa09818376", // Replace this with your actual key
        },
      };

      try {
        const isValidImageUrl = (url) => {
          return /\.(jpeg|jpg|gif|png)$/i.test(url);
        };

        const response = await axios.request(options);
        const formattedNews = response.data.data
          .filter((item) => {
            // Only include items with a valid photo_url
            const isValidUrl =
              item.photo_url && isValidImageUrl(item.photo_url);
            return isValidUrl && hasMinimumDimensions(item.photo_url);
          })
          .map((item) => {
            const date = new Date(item.published_datetime_utc);
            const options = { year: "numeric", month: "long", day: "numeric" };
            item.formattedDate = date.toLocaleDateString("en-US", options);

            item.title =
              item.title.length > 50
                ? item.title.slice(0, 50) + "..."
                : item.title; // Slice title if longer than 50 characters

            // Set default category or infer it from the title or other fields
            item.category = item.topic_name || "General"; // Default category if no topic_name

            return item;
          });

        setNews(formattedNews);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []); // Dependency array ensures the effect runs only once

  return { news, loading, error };
};

const hasMinimumDimensions = (url) => {
  const img = new Image();
  img.src = url;
  return new Promise((resolve, reject) => {
    img.onload = () => {
      // Check image width and height
      const isValidSize = img.width >= 100 && img.height >= 77;
      resolve(isValidSize);
    };
    img.onerror = () => {
      resolve(false); // If image fails to load, treat as invalid
    };
  });
};

// Utility function to check if a URL is a valid image URL

export default useNews;
