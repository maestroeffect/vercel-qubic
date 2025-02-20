import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to fetch feed data
export const fetchFeed = createAsyncThunk("feed/fetchFeed", async () => {
  const response = await fetch("https://server.qubicweb.com/rss-feed");
  // const response = await fetch("http://localhost:5000/rss-feed");

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const feedData = await response.json();
  console.log("API Response:", feedData);
  console.log("Number of Items in API Response:", feedData.items?.length);

  return feedData.items || [];
});

// Initial state
const initialState = {
  articles: [],
  videoArticles: [],
  blogArticles: [],
  loading: false,
  error: null,
};

const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    setArticlesFromStorage: (state, action) => {
      state.articles = action.payload;
    },
    setVideoArticlesFromStorage: (state, action) => {
      state.videoArticles = action.payload;
    },
    setBlogArticlesFromStorage: (state, action) => {
      state.blogArticles = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeed.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeed.fulfilled, (state, action) => {
        const parsedArticles = action.payload;

        console.log("Fetched Articles Count:", parsedArticles.length);

        // Separate articles
        state.articles = parsedArticles.filter(
          (item) => item.image !== "No image available" && !item.isVideo
        );
        state.videoArticles = parsedArticles.filter((item) => item.isVideo);
        state.blogArticles = parsedArticles.filter((item) => item.isBlog);

        console.log("Total Articles:", state.articles.length);
        console.log("Total Video Articles:", state.videoArticles.length);
        console.log("Total Blog Articles:", state.blogArticles.length);

        state.loading = false;
      })
      .addCase(fetchFeed.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  setArticlesFromStorage,
  setVideoArticlesFromStorage,
  setBlogArticlesFromStorage,
} = feedSlice.actions;

export default feedSlice.reducer;
