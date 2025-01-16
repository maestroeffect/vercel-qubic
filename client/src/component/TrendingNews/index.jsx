// import React from "react";
import ProtoTypes from "prop-types";
import Heading from "../uiStyle/Heading";
import TrendingNewsSlider from "../TrendingNewsSlider";
import { Link } from "react-router-dom";
import FontAwesome from "../uiStyle/FontAwesome";
import { useSelector } from "react-redux";
import transm1 from "../../assets/img/gallery-1.jpg";
import transm2 from "../../assets/img/gallery-2.jpg";

const TrendingNews = ({ dark }) => {
  const { articles } = useSelector((state) => state.feed);
  const generalArticles = articles.filter(
    (article) => article.category === "Engadget"
  );

  // https://technext24.com/

  return (
    <>
      <Heading title="Trending News" />
      <TrendingNewsSlider />
      {dark ? (
        <div className="border_white" />
      ) : (
        <div className="border_black" />
      )}
      <div className="space-30" />
      <div className="row">
        <div className="col-lg-6">
          {generalArticles.slice(0, 3).map((item, i) => (
            <div key={i + "key"}>
              <div key={i} className="single_post widgets_small">
                <div className="post_img">
                  <div className="img_wrap">
                    <img
                      src={item.image || transm1} // Fallback image URL if photo_url is not present
                      className="fixed-dimensions-trending"
                      alt="thumb"
                    />
                  </div>
                  <span className="tranding">
                    <FontAwesome name="bolt" />
                  </span>
                </div>
                <div className="single_post_text">
                  <div className="meta2">
                    <Link to="/">
                      {item.category.slice(0, 20) || "UNKNOWN"}
                    </Link>
                    <Link to="/">{item.publishedDate || "KAI"}</Link>
                  </div>
                  <h4 title={item.title} className="title-truncate">
                    <Link
                      to={item.link}
                      onClick={(e) => {
                        e.preventDefault();
                        window.open(item.link, "_blank", "noopener,noreferrer");
                      }}
                    >
                      {item.title}
                    </Link>

                    {/* {item.title.length > 50 ? `${item.title.substring(0, 50)}...` : item.title} */}
                  </h4>
                </div>
              </div>
              <div className="space-15" />
              {dark ? (
                <div className="border_white" />
              ) : (
                <div className="border_black" />
              )}
              <div className="space-15" />
            </div>
          ))}
        </div>
        <div className="col-lg-6">
          {articles.slice(3, 6).map((item, i) => (
            <div key={i + "key"}>
              <div key={i} className="single_post widgets_small">
                <div className="post_img">
                  <div className="img_wrap">
                    <img
                      src={item?.image || transm2}
                      className="fixed-dimensions-trending"
                      alt="thumb"
                    />
                  </div>
                  <span className="tranding">
                    <FontAwesome name="bolt" />
                  </span>
                </div>
                <div className="single_post_text">
                  <div className="meta2">
                    <Link to="/">
                      {item.category.slice(0, 10) || "UNKNOWN"}
                    </Link>
                    <Link to="/">{item.publishedDate || "kAI"}</Link>
                  </div>
                  <h4 title={item.title} className="title-truncate">
                    <Link
                      to={item.link}
                      onClick={(e) => {
                        e.preventDefault();
                        window.open(item.link, "_blank", "noopener,noreferrer");
                      }}
                    >
                      {item.title}
                    </Link>
                  </h4>
                </div>
              </div>
              <div className="space-15" />
              {dark ? (
                <div className="border_white" />
              ) : (
                <div className="border_black" />
              )}
              <div className="space-15" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TrendingNews;

TrendingNews.propTypes = {
  dark: ProtoTypes.bool,
};
