import React from "react";
import FontAwesome from "../uiStyle/FontAwesome";
import { Link } from "react-router-dom";
import trendbig1 from "../../assets/img/trending-news-1.jpg";
import trendbig2 from "../../assets/img/trending-news-2.jpg";
import Slider from "../Slider";
import QubicwebFeed from "../RssParser"; // Import your QubicwebFeed component

const TrendingNewsSlider = () => {
  const { articles, error } = QubicwebFeed();
  articles.forEach((item, index) => {
    // console.log(`Article ${index + 1} Source ID:`, item.source?.id);
  });
  const filteredArticles = articles.filter((item) => {
    const sourceId = item.source?.id?.trim(); // Ensure no leading/trailing spaces
    return sourceId === "https://news.naijatechguide.com/";
  });
  const generateSlug = (title) => title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");


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
        {filteredArticles.map((item, i) => (
          <div key={i} className="single_post post_type3">
            <div className="post_img">
              <div className="img_wrap">
                <img src={item.image || trendingNews.image} style={{
                  width: "700px!important",
                  height: "500px!important",
                  objectFit: "cover",
                }} alt="thumb" />
              </div>
              <span className="tranding">
                <FontAwesome name="fa-bolt" />
              </span>
            </div>
            <div className="single_post_text">
              <div className="meta3">
                <Link to="/">{item.category}</Link>
                <Link to="/">{item.publishedDate}</Link>
              </div>
              <h4>
                <Link to={`/${generateSlug(item.title)}`}>{item.title}</Link>
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
