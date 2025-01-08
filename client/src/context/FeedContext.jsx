import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

const FeedContext = createContext();

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

export const FeedProvider = ({ children }) => {
    const [articles, setArticles] = useState([]);
    const [videoArticles, setVideoArticles] = useState([]);
    const [blogArticles, setBlogArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFeed = async () => {
            setLoading(true);
            try {
                const response = await fetch("http://localhost:5000/rss-feed");
                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

                const feedData = await response.json();
                if (feedData.items && Array.isArray(feedData.items)) {
                    const parsedArticles = feedData.items.map((item) => {
                        const sourceObject = item.source || { id: "Unknown Source", title: "Unknown Title" };
                        const sourceUrl2 = sourceObject.id;
                        const isVideo = videoSources.includes(sourceUrl2);
                        const isBlog = blogSources.includes(sourceUrl2);
                        return {
                            title: item.title && typeof item.title === "object" ? item.title._ : item.title,
                            link: item.link || "No link available",
                            contentSnippet: item.contentSnippet || "No summary available.",
                            publishedDate: item.publishedDate ? formatDate(item.publishedDate) : "No published date available",
                            image: item.image || "No image available",
                            source: sourceObject,
                            category: sourceObject.title || "Uncategorized",
                            isVideo,
                            isBlog,
                        };
                    });

                    const filteredArticles = parsedArticles.filter((item) => item.image !== "No image available" && !item.isVideo);
                    const videoArticlesList = parsedArticles.filter((item) => item.isVideo);
                    const blogArticlesList = parsedArticles.filter((item) => item.isBlog);

                    setArticles(shuffleArray(filteredArticles.map((article) => ({
                        ...article,
                        slug: generateSlug(article.title),
                    }))));
                    setVideoArticles(videoArticlesList.map((article) => ({
                        ...article,
                        slug: generateSlug(article.title),
                    })));
                    setBlogArticles(blogArticlesList.map((article) => ({
                        ...article,
                        slug: generateSlug(article.title),
                    })));
                } else {
                    throw new Error("Unexpected feed structure: items not found or not an array.");
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchFeed();
    }, []);

    return (
        <FeedContext.Provider value={{ articles, videoArticles, blogArticles, loading, error }}>
            {children}
        </FeedContext.Provider>
    );
};

FeedProvider.propTypes = {
    children: PropTypes.node.isRequired, // Validate that children is passed and is a React node
};


export const useFeed = () => useContext(FeedContext);
