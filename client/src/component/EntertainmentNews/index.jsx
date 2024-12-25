import React from "react";
import ProtoTypes from "prop-types";
import { Link } from "react-router-dom";
import QubicwebFeed from "../RssParser";

const EntertainmentNews = ({ entertainments }) => {
  const { articles, loading, error } = QubicwebFeed();

  const filteredArticles = articles.filter((item) => {
    const sourceId = item.source?.id?.trim(); // Ensure no leading/trailing spaces
    const allowedSources = [
      // CYBERSECURITY NEWS SOURCES HERE
      "https://apisecurity.io/",
      "https://decoded.avast.io/",
      "https://aws.amazon.com/blogs/security/",
      "https://www.biometricupdate.com/",
      "https://bishopfox.com/",
      "https://newsletter.blockthreat.io/",
      "https://research.checkpoint.com/",
      "https://www.csoonline.com/",
      "https://blog.fox-it.com/",
    ]; // Add more links here as needed
    return allowedSources.includes(sourceId);
  }).map((item) => ({
    ...item,
    category: item.category || "Cybersecurity", // Append "General" if no category exists
  }));
  return (
    <>
      {filteredArticles.slice(0, 4).map((item, i) => (
        <div key={i} className="col-lg-6">
          <div className="single_post post_type3 mb30">
            <div className="post_img">
              <div className="img_wrap">
                <Link to="/">
                  <img src={item.image} alt="thumb" />
                </Link>
              </div>
            </div>
            <div className="single_post_text">
              <div className="meta3">
                <Link to="/">{item.category}</Link>
                <Link to="/">{item.publishedDate}</Link>
              </div>
              <h4>
                <Link to={`/${item.slug}`}>{item.title}</Link>
              </h4>
              <div className="space-10" />
              <p className="post-p">{item.contentSnippet.slice(0, 150)}...</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default EntertainmentNews;

EntertainmentNews.propTypes = {
  entertainments: ProtoTypes.array,
};
