import React from "react";
import ProtoTypes from "prop-types";
import { Link } from "react-router-dom";
import sportsbig1 from "../../assets/img/sports-news.jpg";
import SportsCarousel from "../SportsCarousel";
import FontAwesome from "../uiStyle/FontAwesome";
import QubicwebFeed from "../RssParser";

const SportsNews = ({ dark }) => {
  const { articles, loading, error } = QubicwebFeed();
  const techArticles = articles.filter((article) => article.category === "Technology");

  return (
    <div className="row">
      <div className="col-12">
        <div className="sports">
          <div className="row">
            <div className="col-12">
              <div className="heading">
                <h2 className="widget-title">Technology News</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              {
                techArticles.slice(0, 1).map((item) => {
                  return (
                    <div className="single_post post_type3 mb30">
                      <div className="post_img">
                        <Link to="/">
                          <img src={item.image} alt="sportsbig1" />
                        </Link>{" "}
                        <span className="tranding">
                          <FontAwesome name="bolt" />
                        </span>
                      </div>
                      <div className="single_post_text">
                        <div className="meta3">
                          <Link to="/">{item.category}</Link>
                          <Link to="/">{item.publishedDate}</Link>
                        </div>
                        <h4>
                          <Link to={`/${item.slug}`}>
                            {item.title.slice(0, 100)}...
                          </Link>
                        </h4>
                        <div className="space-10" />
                        <p className="post-p">
                          {item.contentSnippet.slice(0, 100)}...
                        </p>
                        <div className="space-20" />
                        <Link to={item.link} className="readmore">
                          Read More
                        </Link>
                      </div>
                    </div>
                  )

                })
              }

            </div>
            <div className="col-md-6">
              <div className="sports_carousel nav_style1">
                <SportsCarousel dark={dark ? dark : false} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SportsNews;

SportsNews.propTypes = {
  dark: ProtoTypes.bool,
};
