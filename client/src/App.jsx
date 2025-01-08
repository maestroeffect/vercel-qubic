// import { useEffect, useRef } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchFeed, setArticlesFromStorage, setBlogArticlesFromStorage, setVideoArticlesFromStorage } from "./store/feedSlice";
// import Router from "./Router";
// import './utils/i18n';
// import { ThemeProviderWrapper } from "./context/ThemeContext";

// function shuffleArray(array) {
//   const shuffled = [...array];
//   const randomFactor = Math.floor(Math.random() * 10) + 1; // Randomize shuffle iterations
//   for (let k = 0; k < randomFactor; k++) {
//     for (let i = shuffled.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
//     }
//   }
//   return shuffled;
// }

// function App() {
//   const dispatch = useDispatch();
//   const { articles, videoArticles, blogArticles } = useSelector((state) => state.feed);

//   const DATA_EXPIRY_TIME = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
//   const isFromLocalStorageRef = useRef(false); // Use ref to track localStorage usage

//   useEffect(() => {
//     const storedTimestamp = localStorage.getItem("timestamp");
//     const now = new Date().getTime();

//     if (storedTimestamp && now - parseInt(storedTimestamp, 10) < DATA_EXPIRY_TIME) {
//       console.log("Using stored data...");
//       isFromLocalStorageRef.current = true; // Mark that data is from localStorage

//       const storedArticles = JSON.parse(localStorage.getItem("articles"));
//       const storedVideoArticles = JSON.parse(localStorage.getItem("videoArticles"));
//       const storedBlogArticles = JSON.parse(localStorage.getItem("blogArticles"));

//       if (storedArticles) {
//         dispatch(setArticlesFromStorage(shuffleArray(storedArticles)));
//       }
//       if (storedVideoArticles) {
//         dispatch(setVideoArticlesFromStorage(shuffleArray(storedVideoArticles)));
//       }
//       if (storedBlogArticles) {
//         dispatch(setBlogArticlesFromStorage(shuffleArray(storedBlogArticles)));
//       }
//     } else {
//       console.log("Fetching new feed and clearing outdated data...");
//       localStorage.clear();
//       dispatch(fetchFeed());
//       isFromLocalStorageRef.current = false; // Data will be fetched fresh
//     }
//   }, [dispatch]);

//   useEffect(() => {
//     if (!isFromLocalStorageRef.current && articles.length > 0) {
//       console.log("Storing Articles in LocalStorage...");
//       localStorage.setItem("articles", JSON.stringify(shuffleArray(articles)));
//       localStorage.setItem("videoArticles", JSON.stringify(shuffleArray(videoArticles)));
//       localStorage.setItem("blogArticles", JSON.stringify(shuffleArray(blogArticles)));
//       localStorage.setItem("timestamp", new Date().getTime());
//     }
//   }, [articles, videoArticles, blogArticles]);

//   return (
//     <ThemeProviderWrapper>
//       <Router />
//     </ThemeProviderWrapper>
//   );
// }

// export default App;



import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeed, setArticlesFromStorage, setBlogArticlesFromStorage, setVideoArticlesFromStorage } from "./store/feedSlice";
import Router from "./Router";
import './utils/i18n';
import { ThemeProviderWrapper } from "./context/ThemeContext";

// Helper function to shuffle an array
function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function App() {
  const dispatch = useDispatch();
  const { articles, videoArticles, blogArticles } = useSelector((state) => state.feed);

  const DATA_EXPIRY_TIME = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
  const isFromLocalStorageRef = useRef(false); // Track if data is loaded from localStorage

  // Check for stored data or fetch fresh data
  useEffect(() => {
    const storedTimestamp = localStorage.getItem("timestamp");
    const now = Date.now();

    if (storedTimestamp && now - parseInt(storedTimestamp, 10) < DATA_EXPIRY_TIME) {
      console.log("Using stored data...");
      isFromLocalStorageRef.current = true;

      const storedArticles = JSON.parse(localStorage.getItem("articles")) || [];
      const storedVideoArticles = JSON.parse(localStorage.getItem("videoArticles")) || [];
      const storedBlogArticles = JSON.parse(localStorage.getItem("blogArticles")) || [];

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
      localStorage.setItem("videoArticles", JSON.stringify(shuffleArray(videoArticles)));
      localStorage.setItem("blogArticles", JSON.stringify(shuffleArray(blogArticles)));
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
