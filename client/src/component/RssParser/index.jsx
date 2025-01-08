import { useEffect, useState } from "react";

// Function to shuffle the articles array
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
};

const generateSlug = (title) =>
  title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");

// Function to format the date in "Month Day, Year" format
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Intl.DateTimeFormat("en-US", options).format(date);
};


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
  "https://www.sheriffdeputiesltd.com/"
];
const QubicwebFeed = () => {
  const [articles, setArticles] = useState([]); // Articles without video sources
  const [videoArticles, setVideoArticles] = useState([]); // Articles with video sources
  const [blogArticles, setBlogArticles] = useState([]); // Articles with blog
  const [loading, setLoading] = useState(true); // Track loading state

  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeed = async () => {
      setLoading(true); // Start loading
      try {
        // Fetch data from the server
        const response = await fetch("http://localhost:5000/rss-feed");

        // const response = await fetch("https://server.qubicweb.com/rss-feed");
        // const response = await fetch("https://nodejs.reasonwithangel.com/rss-feed");

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const feedData = await response.json();
        // console.log("Feed data: ", feedData);


        if (feedData.items && Array.isArray(feedData.items)) {
          const parsedArticles = feedData.items
            .map((item) => {
              const sourceObject = item.source || { id: "Unknown Source", title: "Unknown Title" };
              const sourceUrl = sourceObject.title; // Extract the `id` property
              const sourceUrl2 = sourceObject.id; // Extract the `id` property
              const isVideo = videoSources.includes(sourceUrl2); // Check if the source is a video source
              const isBlog = blogSources.includes(sourceUrl2); // Check if the source is a blog source
              // console.log("Source URL:", sourceUrl2, "isVideo:", isVideo, "isBlog:", isBlog);
              return {
                title: item.title && typeof item.title === "object" ? item.title._ : item.title,
                link: item.link || "No link available",
                contentSnippet: item.contentSnippet || "No summary available.",
                publishedDate: item.publishedDate ? formatDate(item.publishedDate) : "No published date available",
                image: item.image || "No image available",
                source: sourceObject,
                category: sourceUrl || "Uncategorized", // Append category based on source
                isVideo, // Mark if it's a video article
                isBlog, // Mark if it's a blog article
              };
            });

          // Separate articles with video sources and articles without video sources
          const filteredArticles = parsedArticles.filter((item) => item.image !== "No image available" && !item.isVideo);
          const videoArticlesList = parsedArticles.filter((item) => item.isVideo);
          const blogArticlesList = parsedArticles.filter((item) => item.isBlog);

          // Add slug to each article and shuffle (optional)
          const articlesWithSlugs = filteredArticles.map((article) => ({
            ...article,
            slug: generateSlug(article.title),
          }));

          const videoArticlesWithSlugs = videoArticlesList.map((article) => ({
            ...article,
            slug: generateSlug(article.title),
          }));

          const blogArticlesWithSlugs = blogArticlesList.map((article) => ({
            ...article,
            slug: generateSlug(article.title),
          }));

          setArticles(shuffleArray(articlesWithSlugs));
          setVideoArticles(videoArticlesWithSlugs);
          setBlogArticles(blogArticlesWithSlugs);
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

  return { articles, videoArticles, blogArticles, loading, error }; // Return both articles and videoArticles
};

export default QubicwebFeed;
