import React from "react";
import ProtoTypes from "prop-types";
import FontAwesome from "../uiStyle/FontAwesome";
import { Link } from "react-router-dom";
import QubicwebFeed from "../RssParser";

const WidgetTrendingNews = ({ dark }) => {
  const { articles, loading, error } = QubicwebFeed();
  const generateSlug = (title) =>
    title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!articles || articles.length === 0) {
    return <div>No articles available.</div>;
  }

  // Get the first article for the main display
  const mainArticle = articles[0];
  // console.log(mainArticle);

  return (
    <div className="trending_widget mb30">
      <h2 className="widget-title">Trending News</h2>

      {/* Main Article */}
      <div className="single_post post_type3">
        <div className="post_img">
          <div className="img_wrap">
            <img
              src={mainArticle?.image || ""}
              alt="Main Article"
              style={{ objectFit: "cover", width: "350px", height: "250px" }}

            />
          </div>
          <span className="tranding">
            <FontAwesome name="bolt" />
          </span>
        </div>
        <div className="single_post_text">
          <div className="meta3">
            <Link to="/">{mainArticle.category || "Uncategorized"}</Link>
            <Link to="/">{mainArticle.publishedDate || "Unknown Date"}</Link>
          </div>
          <h4>
            <Link to={`/${generateSlug(mainArticle.title)}`}>{mainArticle.title || "No Title Available"}</Link>
          </h4>
          <div className="space-10" />
          <p className="post-p">
            {mainArticle.contentSnippet.slice(0, 100) || "No description available."}...
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="space-15" />
      {dark ? <div className="border_white" /> : <div className="border_black" />}
      <div className="space-30" />

      {/* Other Articles */}
      {articles.slice(1, 4).map((item, i) => (
        <div key={i} className="single_post widgets_small">
          <div className="post_img">
            <div className="img_wrap">
              <img
                src={item.image || ""}
                alt={`Article ${i + 1}`}
                style={{ objectFit: "cover", width: "80px", height: "64px" }}
              />
            </div>
            <span className="tranding">
              <FontAwesome name="bolt" />
            </span>
          </div>
          <div className="single_post_text">
            <div className="meta2">
              <Link to="/">{item.category || "Uncategorized"}</Link>
              <Link to="/">{item.publishedDate || "Unknown Date"}</Link>
            </div>
            <h4>
              <Link to="/post1">{item.title.slice(0, 50)}...</Link>
            </h4>
          </div>
        </div>
      ))}
    </div>
  );
};

WidgetTrendingNews.propTypes = {
  dark: ProtoTypes.bool,
};

export default WidgetTrendingNews;
