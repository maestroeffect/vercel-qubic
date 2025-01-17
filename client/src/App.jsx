// Polyfill global for the browser environment
if (typeof global === "undefined") {
  var global = window;
}

import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  const { articles, videoArticles, blogArticles } = useSelector(
    (state) => state.feed
  );

  const DATA_EXPIRY_TIME = 3 * 60 * 60 * 1000; // 24 hours in milliseconds
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

  // Store data in localStorage when articles are updated
  useEffect(() => {
    if (!isFromLocalStorageRef.current && articles.length > 0) {
      console.log("Storing articles in localStorage...");
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
      <Router />
    </ThemeProviderWrapper>
  );
}

export default App;
