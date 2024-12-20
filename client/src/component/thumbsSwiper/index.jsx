import React, { useEffect, useState } from "react";
import gsil1 from "../../assets/img/gallery-post/item-1.jpg";
import gsil2 from "../../assets/img/gallery-post/item-2.jpg";
import gsil3 from "../../assets/img/gallery-post/item-3.jpg";
import gsil4 from "../../assets/img/gallery-post/item-4.jpg";
import gsil5 from "../../assets/img/gallery-post/item-5.jpg";
import gsil6 from "../../assets/img/gallery-post/item-6.jpg";
import gsil7 from "../../assets/img/gallery-post/item-7.jpg";
import sliderImg1 from "../../assets/img/gallery-post.jpg";
import sliderImg2 from "../../assets/img/gallery-post.jpg";
import Slider from "../Slider";
import FontAwesome from "../uiStyle/FontAwesome";
import { Link } from "react-router-dom";
import QubicwebFeed from "../RssParser";

const thumbs = [gsil1, gsil2, gsil3, gsil4, gsil5, gsil6, gsil7, gsil4, gsil3];
const postSlider = [
  {
    image: sliderImg1,
    title:
      "Japan’s virus success has puzzled the world. Is its luck running out?",
    body: "The property, complete with 30-seat screening from room, a 100-seat amphitheater and a swimming pond with sandy shower…",
    category: "TECHNOLOGY",
    date: "March 26, 2020",
  },
  {
    image: sliderImg2,
    title:
      "Japan’s virus success has puzzled the world. Is its luck running out?",
    body: "The property, complete with 30-seat screening from room, a 100-seat amphitheater and a swimming pond with sandy shower…",
    category: "TECHNOLOGY",
    date: "March 26, 2020",
  },
  {
    image: sliderImg2,
    title: "Copa America: Luis Suarez from devastated US America",
    body: "The property, complete with 30-seat screening from room, a 100-seat amphitheater and a swimming pond with sandy shower…",
    category: "TECHNOLOGY",
    date: "March 26, 2020",
  },
  {
    image: sliderImg1,
    title:
      "Japan’s virus success has puzzled the world. Is its luck running out?",
    body: "The property, complete with 30-seat screening from room, a 100-seat amphitheater and a swimming pond with sandy shower…",
    category: "TECHNOLOGY",
    date: "March 26, 2020",
  },
  {
    image: sliderImg2,
    title: "Copa America: Luis Suarez from devastated US America",
    body: "The property, complete with 30-seat screening from room, a 100-seat amphitheater and a swimming pond with sandy shower…",
    category: "TECHNOLOGY",
    date: "March 26, 2020",
  },
  {
    image: sliderImg1,
    title:
      "Japan’s virus success has puzzled the world. Is its luck running out?",
    body: "The property, complete with 30-seat screening from room, a 100-seat amphitheater and a swimming pond with sandy shower…",
    category: "TECHNOLOGY",
    date: "March 26, 2020",
  },
  {
    image: sliderImg2,
    title: "Copa America: Luis Suarez from devastated US America",
    body: "The property, complete with 30-seat screening from room, a 100-seat amphitheater and a swimming pond with sandy shower…",
    category: "TECHNOLOGY",
    date: "March 26, 2020",
  },
  {
    image: sliderImg1,
    title:
      "Japan’s virus success has puzzled the world. Is its luck running out?",
    body: "The property, complete with 30-seat screening from room, a 100-seat amphitheater and a swimming pond with sandy shower…",
    category: "TECHNOLOGY",
    date: "March 26, 2020",
  },
  {
    image: sliderImg2,
    title: "Copa America: Luis Suarez from devastated US America",
    body: "The property, complete with 30-seat screening from room, a 100-seat amphitheater and a swimming pond with sandy shower…",
    category: "TECHNOLOGY",
    date: "March 26, 2020",
  },
];

function ThumbsSwiper() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const { articles, loading, error } = QubicwebFeed();
  // Log the full response to see the structure of articles


  if (!loading) {
    console.log("Articles Response:", articles);

  }

  const filteredArticles = articles.filter((item) => {
    const sourceId = item.source?.id?.trim(); // Ensure no leading/trailing spaces
    return sourceId === "https://techbuild.africa/";
  });
  console.log(filteredArticles);

  return (
    <>
      <div className="slider_demo2">
        <Slider
          loop={true}
          spaceBetween={10}
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          slidesPerView={1}
          navigation={{
            nextEl: ".swiper-button-next-thumbs",
            prevEl: ".swiper-button-prev-thumbs",
          }}
        >
          {articles.slice(0, 9).map((item, i) => (
            <div key={i} className="single_post post_type6 xs-mb30">
              <div className="post_img gradient1">
                <img src={item?.image} style={{
                  width: "1460px",
                  height: "500px",
                  objectFit: "cover",
                }} alt="thumb" />
                <span
                  onClick={() => this.modalHandler(true)}
                  className="tranding"
                >
                  <FontAwesome name="play" />
                </span>
              </div>
              <div className="single_post_text">
                <div className="meta meta_separator1">
                  <Link to="#">{item.category}</Link>
                  <Link to="#">{item.date}</Link>
                </div>
                <h4>
                  <Link className="play_btn" to="/video_post1">
                    {item.title.slice(0, 50)}...
                  </Link>
                </h4>
                <div className="space-10" />
                <p className="post-p">{item.title.slice(0, 100)}...</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      <div className="slider_demo1">
        <div
          //   onClick={onClick}
          className={` slider_arrow arrow_left slick-arrow swiper-button-prev-thumbs`}
        >
          <FontAwesome name="angle-left" />
        </div>
        <Slider
          onSwiper={setThumbsSwiper}
          loop={true}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          breakpoints={{
            1024: {
              slidesPerView: 8,
            },
            768: {
              slidesPerView: 5,
            },
            320: {
              slidesPerView: 3,
            },
          }}
        >
          {filteredArticles.slice(0, 9).map((item, i) => (
            <div key={i} className="single_gallary_item">
              <img src={item?.image} style={{
                width: "97px",
                height: "70px",
                objectFit: "cover",
              }} alt="thumb" />
            </div>
          ))}
        </Slider>

        <div
          //   onClick={onClick}
          className={`slider_arrow arrow_right slick-arrow swiper-button-next-thumbs`}
        >
          <FontAwesome name="angle-right" />
        </div>
      </div>
    </>
  );
}

export default ThumbsSwiper;
