import React from "react";
import FontAwesome from "../uiStyle/FontAwesome";
import { Link } from "react-router-dom";
import trendbig1 from "../../assets/img/trending-news-1.jpg";
import trendbig2 from "../../assets/img/trending-news-2.jpg";
import Slider from "../Slider";
import QubicwebFeed from "../RssParser"; // Import your QubicwebFeed component

const TrendingNewsSlider = () => {
  const { articles, error } = QubicwebFeed();

  const generalArticles = articles.filter((article) => article.category === "Engadget");




  return (
    <div className="carousel_post2_type3 nav_style1">
      <Slider
        className="trancarousel"
        slidesPerView={2}
        spaceBetween={20}
        loop={true}
        navigation={{
          nextEl: ".swiper-button-next17",
          prevEl: ".swiper-button-prev17",
        }}
        breakpoints={{
          1024: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          300: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
        }}
      >
        {articles.slice(0, 10).map((item, i) => (
          <div key={i} className="single_post post_type3">
            <div className="post_img">
              <div className="img_wrap">
                <img src={item.image || trendingNews.image} style={{
                  width: "350px",
                  height: "250px",
                  objectFit: "cover",
                }} className="fixed-dimensions" alt="thumb" />
              </div>
              <span className="tranding">
                <FontAwesome name="bolt" />
              </span>
            </div>
            <div className="single_post_text">
              <div className="meta3">
                <Link to="/">{item.category.slice(0, 20)}</Link>
                <Link to="/">{item.publishedDate}</Link>
              </div>
              <h4>
                <Link to={item.link} onClick={(e) => {
                  e.preventDefault();
                  window.open(item.link, "_blank", "noopener,noreferrer");
                }}>{item.title}</Link>
              </h4>
              <div className="space-10" />
              <p className="post-p">{item?.contentSnippet.slice(0, 125) || "Lorem ipsum"}...</p>
            </div>
          </div>
        ))}
      </Slider>
      <div className="navBtns">
        <div className="navBtn prevtBtn swiper-button-prev17">
          <FontAwesome name="angle-left" />
        </div>
        <div className="navBtn nextBtn swiper-button-next17">
          <FontAwesome name="angle-right" />
        </div>
      </div>
    </div>
  );
};

export default TrendingNewsSlider;
