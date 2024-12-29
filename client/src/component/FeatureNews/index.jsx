import React from "react";
import ProtoTypes from "prop-types";
import Heading from "../uiStyle/Heading";
import { Link } from "react-router-dom";
import Slider from "../Slider";
import FontAwesome from "../uiStyle/FontAwesome";
import QubicwebFeed from "../RssParser";


const FeatureNews = ({ className }) => {
  const { articles, loading, error } = QubicwebFeed();


  // if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  articles.forEach((item, index) => {

  });


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
                autoplay={{ delay: 3000, disableOnInteraction: false }}
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
                {articles.map((item, i) => (
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
                        <Link to={`/${item.slug}`}>{item.title.slice(0, 70)}...</Link>
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
