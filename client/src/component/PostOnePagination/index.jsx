import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import QubicwebFeed from "../RssParser";

const PostOnePagination = ({ className }) => {
  const { articles, loading, error } = QubicwebFeed();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message || "An error occurred while fetching articles."}</div>;
  }

  if (!articles || articles.length === 0) {
    return <div>No articles available.</div>;
  }

  // Determine "Previous" and "Next" articles
  const previousNews = articles[0]; // First article
  const nextNews = articles[1] || null; // Second article (if available)

  return (
    <div className="next_prev">
      <div className="row">
        {/* Previous News */}
        <div className="col-lg-6 align-self-center">
          <div className={`${className || "next_prv_single border_left3"}`}>
            <p>PREVIOUS NEWS</p>
            {previousNews ? (
              <h3>
                <Link to={`/${previousNews.slug}`}>
                  {previousNews.title || "No Title Available"}
                </Link>
              </h3>
            ) : (
              <p>No previous news available.</p>
            )}
          </div>
        </div>

        {/* Next News */}
        <div className="col-lg-6 align-self-center">
          <div className={`${className || "next_prv_single border_left3"}`}>
            <p>NEXT NEWS</p>
            {nextNews ? (
              <h3>
                <Link to={`/${nextNews.slug}`}>
                  {nextNews.title || "No Title Available"}
                </Link>
              </h3>
            ) : (
              <p>No next news available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

PostOnePagination.propTypes = {
  className: PropTypes.string,
};

export default PostOnePagination;
