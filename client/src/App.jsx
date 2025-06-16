import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  fetchFeed,
  setArticlesFromStorage,
  setBlogArticlesFromStorage,
  setVideoArticlesFromStorage,
} from "./store/feedSlice";
import Router from "./Router";
import "./utils/i18n";
import { ThemeProviderWrapper } from "./context/ThemeContext";

// Helper function to shuffle an array
function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function App() {
  const dispatch = useDispatch();

  // Shuffle articles when accessing Redux state
  const { articles, videoArticles, blogArticles } = useSelector((state) => ({
    articles: shuffleArray(state.feed.articles),
    videoArticles: shuffleArray(state.feed.videoArticles),
    blogArticles: shuffleArray(state.feed.blogArticles),
  }));

  const DATA_EXPIRY_TIME = 3 * 60 * 60 * 1000; // 3 hours in milliseconds
  const isFromLocalStorageRef = useRef(false); // Track if data is loaded from localStorage

  // Check for stored data or fetch fresh data
  useEffect(() => {
    const storedTimestamp = localStorage.getItem("timestamp");
    const now = Date.now();

    if (
      storedTimestamp &&
      now - parseInt(storedTimestamp, 10) < DATA_EXPIRY_TIME
    ) {
      console.log("Using stored data...");
      isFromLocalStorageRef.current = true;

      const storedArticles = JSON.parse(localStorage.getItem("articles")) || [];
      const storedVideoArticles =
        JSON.parse(localStorage.getItem("videoArticles")) || [];
      const storedBlogArticles =
        JSON.parse(localStorage.getItem("blogArticles")) || [];

      dispatch(setArticlesFromStorage(shuffleArray(storedArticles)));
      dispatch(setVideoArticlesFromStorage(shuffleArray(storedVideoArticles)));
      dispatch(setBlogArticlesFromStorage(shuffleArray(storedBlogArticles)));
    } else {
      console.log("Fetching new feed and clearing outdated data...");
      localStorage.clear();
      dispatch(fetchFeed());
      isFromLocalStorageRef.current = false;
    }
  }, [dispatch]);

  // Store shuffled data in localStorage when articles are updated
  useEffect(() => {
    if (!isFromLocalStorageRef.current && articles.length > 0) {
      console.log("Storing shuffled articles in localStorage...");
      localStorage.setItem("articles", JSON.stringify(shuffleArray(articles)));
      localStorage.setItem(
        "videoArticles",
        JSON.stringify(shuffleArray(videoArticles))
      );
      localStorage.setItem(
        "blogArticles",
        JSON.stringify(shuffleArray(blogArticles))
      );
      localStorage.setItem("timestamp", Date.now());
    }
  }, [articles, videoArticles, blogArticles]);

  return (
    <ThemeProviderWrapper>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Router />
    </ThemeProviderWrapper>
  );
}

export default App;
