// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// // Async thunk to fetch feed data
// export const fetchFeed = createAsyncThunk("feed/fetchFeed", async () => {
//     const response = await fetch("http://localhost:5000/rss-feed", {
//         headers: {
//             Authorization: `Basic ${btoa("qubicwebserver:Tintinnabulation123@")}`,
//         },
//     });
//     if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//     }
//     const feedData = await response.json();
//     console.log("API Response:", feedData);
//     console.log("Number of Items in API Response:", feedData.items?.length);

//     if (feedData.items && Array.isArray(feedData.items)) {
//         return feedData.items.map((item) => {
//             console.log("Processing Item:", item);
//             const sourceObject = item.source || { id: "Unknown Source", title: "Unknown Title" };
//             const sourceUrl2 = sourceObject.id;
//             const isVideo = videoSources.includes(sourceUrl2);
//             const isBlog = blogSources.includes(sourceUrl2);
//             console.log("Source URL:", sourceUrl2);
//             console.log("Is Video:", isVideo);
//             console.log("Is Blog:", isBlog);

//             const title = item.title && typeof item.title === "object" ? item.title._ : item.title;
//             const validTitle = typeof title === "string" ? title : "Untitled"; // Ensure title is a string
//             return {
//                 title: validTitle,
//                 link: item.link || "No link available",
//                 contentSnippet: item.contentSnippet || "No summary available.",
//                 publishedDate: item.publishedDate ? formatDate(item.publishedDate) : "No published date available",
//                 image: item.image || "No image available",
//                 source: sourceObject,
//                 category: sourceObject.title || "Uncategorized",
//                 isVideo,
//                 isBlog,
//             };
//         });
//     } else {
//         throw new Error("Unexpected feed structure: items not found or not an array.");
//     }
// });

// // Initial state
// const initialState = {
//     articles: [],
//     videoArticles: [],
//     blogArticles: [],
//     loading: false,
//     error: null,
// };

// const feedSlice = createSlice({
//     name: "feed",
//     initialState,
//     reducers: {
//         setArticlesFromStorage: (state, action) => {
//             state.articles = action.payload;
//         },
//         setVideoArticlesFromStorage: (state, action) => {
//             state.videoArticles = action.payload;
//         },
//         setBlogArticlesFromStorage: (state, action) => {
//             state.blogArticles = action.payload;
//         },
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(fetchFeed.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(fetchFeed.fulfilled, (state, action) => {
//                 const parsedArticles = action.payload;

//                 console.log("Fetched Articles Count:", parsedArticles.length);

//                 // Separate articles
//                 state.articles = parsedArticles.filter((item) => item.image !== "No image available" && !item.isVideo);
//                 state.videoArticles = parsedArticles.filter((item) => item.isVideo);
//                 state.blogArticles = parsedArticles.filter((item) => item.isBlog);

//                 console.log("Total Articles:", state.articles.length);
//                 console.log("Total Video Articles:", state.videoArticles.length);
//                 console.log("Total Blog Articles:", state.blogArticles.length);

//                 state.loading = false;
//             })
//             .addCase(fetchFeed.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.error.message;
//             });
//     },
// });

// export const { setArticlesFromStorage, setVideoArticlesFromStorage, setBlogArticlesFromStorage } = feedSlice.actions;
// export default feedSlice.reducer;

// // Helper functions

// const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     const options = { year: "numeric", month: "short", day: "numeric" };
//     return new Intl.DateTimeFormat("en-US", options).format(date);
// };

// const videoSources = [
//     "https://www.youtube.com/channel/UCa6eh7gCkpPo5XXUDfygQQA",
//     "https://www.youtube.com/channel/UCVeW9qkBjo3zosnqUbG7CFw",
//     "https://www.youtube.com/channel/UClcE-kVhqyiHCcjYwcpfj9w",
//     "https://www.youtube.com/channel/UCLDnEn-TxejaDB8qm2AUhHQ",
//     "https://www.youtube.com/channel/UC9x0AN7BWHpCDHSm9NiJFJQ",
//     "https://www.youtube.com/channel/UCg--XBjJ50a9tUhTKXVPiqg",
//     "https://www.youtube.com/channel/UC0vBXGSyV14uvJ4hECDOl0Q",
//     "https://www.youtube.com/channel/UChIZGfcnjHI0DG4nweWEduw",
//     "https://www.youtube.com/channel/UC0ArlFuFYMpEewyRBzdLHiw",
//     "https://www.youtube.com/channel/UCddiUEpeqJcYeBxX1IVBKvQ",
// ];

// const blogSources = [
//     "https://www.sheriffdeputiesltd.com/",
// ];



import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to fetch feed data
export const fetchFeed = createAsyncThunk("feed/fetchFeed", async () => {
    const response = await fetch("http://localhost:5000/rss-feed", {
        headers: {
            Authorization: `Basic ${btoa("qubicwebserver:Tintinnabulation123@")}`,
        },
    });

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
