import React from "react";
import ProtoTypes from "prop-types";
import Heading from "../uiStyle/Heading";

import fnewsImg2 from "../../assets/img/feature-2.jpg";
import fnewsImg3 from "../../assets/img/feature-3.jpg";
import fnewsImg4 from "../../assets/img/feature-4.jpg";
import { Link } from "react-router-dom";
import Slider from "../Slider";
import FontAwesome from "../uiStyle/FontAwesome";
import QubicwebFeed from "../RssParser";


const FeatureNews = ({ className }) => {
  const { articles, loading, error } = QubicwebFeed();
  const generateSlug = (title) => title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");

  // if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  articles.forEach((item, index) => {
    // console.log(`Article ${index + 1} Source ID:`, item.source?.id);
  });
  const filteredArticles = articles.filter((item) => {
    const sourceId = item.source?.id?.trim(); // Ensure no leading/trailing spaces
    return sourceId === "https://www.techspot.com/";
  });

  console.log("Filtered Articles (Featured News / Techspot):", filteredArticles);

  return (
    <div className={`feature_carousel_area mb40 ${className ? className : ""}`}>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <Heading title="Feature News" />
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            {/*CAROUSEL START*/}
            <div className="feature_carousel nav_style1">
              <Slider
                navigation={{
                  nextEl: ".swiper-button-next3",
                  prevEl: ".swiper-button-prev3",
                }}
                slidesPerView={4}
                spaceBetween={30}
                loop={true}
                breakpoints={{
                  1024: {
                    slidesPerView: 4,
                    spaceBetween: 30,
                  },
                  768: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                  },
                  640: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                  },
                  320: {
                    slidesPerView: 1,
                    spaceBetween: 0,
                  },
                }}
              >
                {filteredArticles.map((item, i) => (
                  <div key={i} className="single_post post_type6 post_type7">
                    <div className="post_img gradient1">
                      <Link to="/">
                        <img src={item?.image} style={{
                          width: "255px",
                          height: "320px",
                          objectFit: "cover",
                        }} alt="thumb" />
                      </Link>
                    </div>
                    <div className="single_post_text">
                      <div className="meta5">
                        <Link to="/">{item.category}</Link>
                        <Link to="/">{item.publishedDate}</Link>
                      </div>
                      <h4>
                        <Link to={`/${generateSlug(item.title)}`}>{item.title}</Link>
                      </h4>
                    </div>
                  </div>
                ))}
              </Slider>
              <div className="navBtns">
                <div className="navBtn prevtBtn swiper-button-prev3">
                  <FontAwesome name="angle-left" />
                </div>
                <div className="navBtn nextBtn swiper-button-next3">
                  <FontAwesome name="angle-right" />
                </div>
              </div>
            </div>
            {/*CAROUSEL END*/}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureNews;

FeatureNews.propTypes = {
  className: ProtoTypes.string,
};
