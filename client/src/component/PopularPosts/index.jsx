import React from "react";
import { Link } from "react-router-dom";
import FontAwesome from "../uiStyle/FontAwesome";
import { mostViewSort } from "../../utils/commonFunctions";

// images
import popularsm1 from "../../assets/img/populer/populer-post-1.jpg";
import popularsm2 from "../../assets/img/populer/populer-post-2.jpg";
import popularsm3 from "../../assets/img/populer/populer-post-3.jpg";
import popularsm4 from "../../assets/img/populer/populer-post-4.jpg";
import popularsm5 from "../../assets/img/populer/populer-post-5.jpg";

import "./style.scss";
import Slider from "../Slider";
import QubicwebFeed from "../RssParser";


const populerPOsts = [
  {
    image: popularsm1,
    category: "TECHNOLOGY",
    title: "The property complete with a 30 seat screen room.",
  },
  {
    image: popularsm2,
    category: "TECHNOLOGY",
    title: "Cheap smartphone sensor could help you old.",
  },
  {
    image: popularsm3,
    category: "TECHNOLOGY",
    title: "Harbour amid a Slowen the down in singer city",
  },
  {
    image: popularsm4,
    category: "TECHNOLOGY",
    title: "The secret to moving this from sphinx screening",
  },
  {
    image: popularsm5,
    category: "TECHNOLOGY",
    title: "Harbour amid a Slowen the down in singer city",
  },
  {
    image: popularsm1,
    category: "TECHNOLOGY",
    title: "The property complete with a 30 seat screen room.",
  },
  {
    image: popularsm2,
    category: "TECHNOLOGY",
    title: "Cheap smartphone sensor could help you old.",
  },
  {
    image: popularsm3,
    category: "TECHNOLOGY",
    title: "Harbour amid a Slowen the down in singer city",
  },
  {
    image: popularsm4,
    category: "TECHNOLOGY",
    title: "The secret to moving this from sphinx screening",
  },
  {
    image: popularsm5,
    category: "TECHNOLOGY",
    title: "Harbour amid a Slowen the down in singer city",
  },
];
const PopularPosts = () => {
  const { articles, loading, error } = QubicwebFeed();

  const filteredArticles = articles.filter((item) => {
    const sourceId = item.source?.id?.trim(); // Ensure no leading/trailing spaces
    const allowedSources = [
      // video NEWS SOURCES HERE
      "https://www.youtube.com/channel/UCXuqSBlHAE6Xw-yeJA0Tunw",
      "https://www.youtube.com/channel/UCVeW9qkBjo3zosnqUbG7CFw",
      "https://www.youtube.com/channel/UCgyqtNWZmIxTx3b6OxTSALw",
      "https://www.youtube.com/channel/UCLDnEn-TxejaDB8qm2AUhHQ",
      "https://www.youtube.com/channel/UCg--XBjJ50a9tUhTKXVPiqg",

    ]; // Add more links here as needed
    return allowedSources.includes(sourceId);
  }).map((item) => ({
    ...item,
    category: item.category || "VideoNews", // Append "General" if no category exists
  }));
  return (
    <div className="popular_carousel_area mb30 md-mt-30">
      <h2 className="widget-title">Popular Videos</h2>
      <div className="popular_carousel pt-15 multipleRowCarousel nav_style1">
        {/*CAROUSEL START*/}
        <Slider
          navigation={{
            nextEl: ".swiper-button-next10",
            prevEl: ".swiper-button-prev10",
          }}
          loop={true}
          slidesPerView={1}
          grid={{
            rows: 6,
          }}
        >
          {mostViewSort(filteredArticles).slice(0, 6).map((item, i) => (
            <div key={i} className="single_post type10 widgets_small mb15">
              <div className="post_img">
                <div className="img_wrap">
                  <Link to="/">
                    <img src={item.image} style={{
                      width: "100px",
                      height: "57px",
                      objectFit: "cover",
                    }} alt="thubm" />
                  </Link>
                </div>
                <span className="tranding tranding_border">{item.id}</span>
              </div>
              <div className="single_post_text">
                <h4>
                  <Link to="/post1">{item.title}</Link>
                </h4>
                <div className="meta4">
                  <Link to="/">{item.category}</Link>
                </div>
              </div>
            </div>
          ))}
        </Slider>
        <div className="navBtns">
          <div className="navBtn prevtBtn swiper-button-prev10">
            <FontAwesome name="angle-left" />
          </div>
          <div className="navBtn nextBtn swiper-button-next10">
            <FontAwesome name="angle-right" />
          </div>
        </div>
        {/*CAROUSEL END*/}
      </div>
    </div>
  );
};

export default PopularPosts;
