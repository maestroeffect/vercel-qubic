import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import SearchModal from "../SearchModal";

const SearchResults = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q"); // Get search query from URL
  const navigate = useNavigate();
  const [searchShow, setSearchShow] = useState(false);

  // ✅ Get articles from Redux store
  const articles = useSelector((state) => state.feed.articles);
  const videoArticles = useSelector((state) => state.feed.videoArticles);
  const blogArticles = useSelector((state) => state.feed.blogArticles);
  const loading = useSelector((state) => state.feed.loading);

  const [results, setResults] = useState([]);

  useEffect(() => {
    if (query && articles.length > 0) {
      const filtered = [...articles, ...videoArticles, ...blogArticles].filter(
        (item) => item?.title?.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
    }
  }, [query, articles, videoArticles, blogArticles]);

  useEffect(() => {
    // ✅ Hide sticker_header when search modal is opened
    const stickerHeader = document.querySelector(".sticky-header");
    if (stickerHeader) {
      stickerHeader.style.display = searchShow ? "none" : "block";
    }
  }, [searchShow]);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="search-results-page my-4">
              <h2 className="mb-4 text-center">Search Results for `{query}`</h2>
              {loading ? (
                <p>Loading...</p>
              ) : results.length > 0 ? (
                results.map((result, index) => (
                  <div
                    key={result.id}
                    className={`border_black py-2 ${index !== results.length - 1 ? "" : ""}`}
                  >
                    <span className="text-lg font-bold">{index + 1}. </span>
                    <a className="text-[#000]" href={result.link}>
                      {result.title}
                    </a>
                  </div>
                ))
              ) : (
                <div className="text-center my-4">
                  <p className="text-lg font-semibold">No results found!</p>

                  {/* Buttons Section */}
                  <div className="flex justify-center gap-4 mt-4">
                    <button
                      onClick={() => navigate("/")}
                      className="srchbtn text-white px-3 mr-4 py-1 rounded-lg text-lg font-semibold transition"
                    >
                      ⬅ Go Back
                    </button>
                    <button
                      onClick={() => setSearchShow(!searchShow)}
                      className="srchbtn2 text-white px-3 py-1 rounded-lg text-lg font-semibold transition"
                    >
                      🔍 Search Again
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {searchShow ? (
        <SearchModal setSearchShow={setSearchShow} searchShow={searchShow} />
      ) : null}
    </>
  );
};

export default SearchResults;
