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
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Intl.DateTimeFormat("en-US", options).format(date);
};

// Mapping of feed sources to their categories
const sourceCategories = {
  "https://decoded.avast.io": "Cybersecurity",
  "https://apisecurity.io/": "Cybersecurity",
  "https://aws.amazon.com/blogs/security/": "Cybersecurity",
  "https://www.biometricupdate.com/": "Cybersecurity",
  "https://newsletter.blockthreat.io/": "Cybersecurity",
  "https://research.checkpoint.com/": "Cybersecurity",
  "https://www.cisecurity.org/feed/advisories": "Cybersecurity",
  "https://www.csoonline.com/": "Cybersecurity",
  "https://blog.cryptographyengineering.com/": "Cybersecurity",
  "https://dev.to/": "Development",
  "https://www.engadget.com/": "Technology",
  "https://blog.fox-it.com/": "Cybersecurity",
  "https://gizmodo.com/": "Technology",
  "https://grahamcluley.com/": "Cybersecurity",
  "https://krebsonsecurity.com/": "Cybersecurity",
  "https://feeds.bloomberg.com/": "Technology",
  "https://mashable.com/": "Technology",
  "https://www.naijatechguide.com/": "General",
  "https://nairametrics.com/category/industries/tech-news/": "General",
  "https://www.pcmag.com/feeds/rss/latest": "Technology",
  "https://www.schneier.com/": "Cybersecurity",
  "https://thehackernews.com/": "Cybersecurity",
  "https://www.sheriffdeputiesltd.com/": "General",
  "https://techcabal.com/": "Technology",
  "https://techcrunch.com/": "Technology",
  "https://technext24.com/": "Technology",
  "https://techpoint.africa/": "Technology",
  "https://www.techradar.com/": "Technology",
  "https://www.techspot.com/": "Technology",
  "https://www.techwrix.com/": "Technology",
  "https://www.theverge.com/": "Technology",
  "https://www.troyhunt.com/": "Technology",
  "https://www.veracode.com/": "Cybersecurity",
  "https://venturebeat.com/games/game-industry-predictions-for-2025-the-deanbeat/": "Technology",
  // Add more mappings as needed

  // VIDEO NOTES
  "https://www.youtube.com/channel/UCa6eh7gCkpPo5XXUDfygQQA": "VideoNews",
  "https://www.youtube.com/channel/UCVeW9qkBjo3zosnqUbG7CFw": "VideoNews",
  "https://www.youtube.com/channel/UClcE-kVhqyiHCcjYwcpfj9w": "VideoNews",
  "https://www.youtube.com/channel/UCLDnEn-TxejaDB8qm2AUhHQ": "VideoNews",
  "https://www.youtube.com/channel/UC9x0AN7BWHpCDHSm9NiJFJQ": "VideoNews",
  "https://www.youtube.com/channel/UCg--XBjJ50a9tUhTKXVPiqg": "VideoNews",
  "https://www.youtube.com/channel/UC0vBXGSyV14uvJ4hECDOl0Q": "VideoNews",
  "https://www.youtube.com/channel/UChIZGfcnjHI0DG4nweWEduw": "VideoNews",
  "https://www.youtube.com/channel/UC0ArlFuFYMpEewyRBzdLHiw": "VideoNews",
  "https://www.youtube.com/channel/UCddiUEpeqJcYeBxX1IVBKvQ": "VideoNews",
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
        const response = await fetch("http://nodejs.reasonwithangel.com/rss-feed");

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const feedData = await response.json();

        if (feedData.items && Array.isArray(feedData.items)) {
          // Map and process the articles, excluding those with "No image available"
          const parsedArticles = feedData.items
            .map((item) => {
              const sourceObject = item.source || { id: "Unknown Source", title: "Unknown Title" };
              const sourceUrl = sourceObject.id; // Extract the `id` property
              const sourceTitle = sourceObject.title; // Extract the `title` property

              return {
                title: item.title && typeof item.title === "object" ? item.title._ : item.title,
                link: item.link || "No link available",
                contentSnippet: item.contentSnippet || "No summary available.",
                author: item.author || "No author available",
                publishedDate: item.publishedDate ? formatDate(item.publishedDate) : "No published date available",
                updatedDate: item.updatedDate ? formatDate(item.updatedDate) : "No updated date available",
                content: item.content || "No full content available",
                image: item.image || "No image available", // Use the image from the server
                source: sourceUrl,
                category: sourceCategories[sourceUrl] || "Uncategorized", // Append category based on source
              };
            })
            .filter((item) => item.image !== "No image available"); // Exclude articles with "No image available"

          // Add slug to each article and shuffle (optional)
          const articlesWithSlugs = parsedArticles.map((article) => ({
            ...article,
            slug: generateSlug(article.title),
          }));

          // Shuffle the articles array randomly (optional for faster load)
          setArticles(shuffleArray(articlesWithSlugs));
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
