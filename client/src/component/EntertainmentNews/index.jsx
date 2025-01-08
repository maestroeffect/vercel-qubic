// import React from "react";
import ProtoTypes from "prop-types";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import WithLoadingAndError from "../LoadErrorHandle";

const EntertainmentNews = () => {
  const { articles } = useSelector((state) => state.feed);
  const includedCategories = [
    "API Security News",
    "Avast Threat Labs",
    "Phylum Research",
    // "Cofense Website",
    "Compass Security Blog",
    "CyberInsider",
    "DataDrivenInvestor",
    "HackerOne",
    "Krebs on Security",
    "MacRumors: Mac News and Rumors - All Stories",
    "Industrial Cyber",
  ];
  const cyberArticles = articles.filter((article) =>
    includedCategories.includes(article.category)
  );
  return (
    <WithLoadingAndError>
      <>
        {cyberArticles.slice(0, 4).map((item, i) => (
          <div key={i} className="col-lg-6">
            <div className="single_post post_type3 mb30">
              <div className="post_img">
                <div className="img_wrap">
                  <Link to={item.link} onClick={(e) => {
                    e.preventDefault();
                    window.open(item.link, "_blank", "noopener,noreferrer");
                  }}>
                    <img src={item.image} className="fixed-dimensions" alt="thumb" />
                  </Link>
                </div>
              </div>
              <div className="single_post_text">
                <div className="meta3">
                  <Link to="/">{item.category}</Link>
                  <Link to="/">{item.publishedDate}</Link>
                </div>
                <h4>
                  <Link to={item.link} onClick={(e) => {
                    e.preventDefault();
                    window.open(item.link, "_blank", "noopener,noreferrer");
                  }}>{item.title}</Link>
                </h4>
                <div className="space-10" />
                <p className="post-p">{item.contentSnippet.slice(0, 150)}...</p>
              </div>
            </div>
          </div>
        ))}
      </>
    </WithLoadingAndError>
  );
};

export default EntertainmentNews;

EntertainmentNews.propTypes = {
  entertainments: ProtoTypes.array,
};
