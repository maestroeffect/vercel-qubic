import React from "react";
import { Link } from "react-router-dom";
import FontAwesome from "../uiStyle/FontAwesome";
import { mostViewSort } from "../../utils/commonFunctions";
import "./style.scss";
import Slider from "../Slider";
import QubicwebFeed from "../RssParser";
import ModalVideo from "react-modal-video";
import { useState } from "react";


const PopularPosts = () => {
  const { articles, loading, videoArticles, error } = QubicwebFeed();

  const updatedVideoArticles = videoArticles.map((item) => {
    let updatedLink = item.link;
    let videoId = null;

    // Check if the link contains a YouTube video ID
    if (updatedLink.includes("v=")) {
      const videoIdMatch = updatedLink.match(/[?&]v=([^&]+)/);
      if (videoIdMatch && videoIdMatch[1]) {
        videoId = videoIdMatch[1];
      }
    }

    return {
      ...item,
      link: updatedLink,
      image: item.image || video1, // Fallback to default thumbnail
      videoId,
    };
  });
  const [vModal, setvModal] = useState(false);
  const [currentVideoId, setCurrentVideoId] = useState(null);

  const openModal = (videoId) => {
    setCurrentVideoId(videoId);
    setvModal(true);
  };


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
          {mostViewSort(videoArticles).slice(0, 5).map((item, i) => (
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
                <span className="tranding tranding_border" onClick={() => openModal(item.videoId)}>
                  <FontAwesome name="play" />
                </span>
              </div>
              <div className="single_post_text">
                <h4>
                  <Link to="/">{item.title}</Link>
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
      <ModalVideo
        channel="youtube"
        isOpen={vModal}
        videoId={currentVideoId}
        onClose={() => setvModal(false)}
      />
    </div>
  );
};

export default PopularPosts;
