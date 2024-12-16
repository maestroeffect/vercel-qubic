import React from "react";
import FontAwesome from "../uiStyle/FontAwesome";
import { Link } from "react-router-dom";
import trendbig1 from "../../assets/img/trending-news-1.jpg";
import trendbig2 from "../../assets/img/trending-news-2.jpg";
import Slider from "../Slider";
import QubicwebFeed from "../RssParser"; // Import your QubicwebFeed component

const trendingNews = [
  {
    category: "TECHNOLOGY",
    date: "March 26, 2020",
    title: "There may be no consoles in the future ea exec says",
    body: "The property, complete with 30-seat screening from room, a 100-seat amphitheater and a swimming pond with sandy shower…",
    image: trendbig1,
  },
  {
    category: "TECHNOLOGY",
    date: "March 26, 2020",
    title:
      "Japan’s virus success has puzzled the world. Is its luck running out?",
    body: "The property, complete with 30-seat screening from room, a 100-seat amphitheater and a swimming pond with sandy shower…",
    image: trendbig2,
  },
  {
    category: "TECHNOLOGY",
    date: "March 26, 2020",
    title: "There may be no consoles in the future ea exec says",
    body: "The property, complete with 30-seat screening from room, a 100-seat amphitheater and a swimming pond with sandy shower…",
    image: trendbig1,
  },
];
const TrendingNewsSlider = () => {
  const { articles, error } = QubicwebFeed();
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
        {articles.map((item, i) => (
          <div key={i} className="single_post post_type3">
            <div className="post_img">
              <div className="img_wrap">
                <img src={item.image || trendingNews.image} alt="thumb" />
              </div>
              <span className="tranding">
                <FontAwesome name="fa-bolt" />
              </span>
            </div>
            <div className="single_post_text">
              <div className="meta3">
                <Link to="/">{item.category}</Link>
                <Link to="/">{item.date}</Link>
              </div>
              <h4>
                <Link to="/post1">{item.title}</Link>
              </h4>
              <div className="space-10" />
              <p className="post-p">{item.body || "Lorem ipsum jwefwjkfwefnwekjfnejkfnwejkfnkj"}</p>
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
