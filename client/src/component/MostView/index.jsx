import React from "react";
import ProtoTypes from "prop-types";
import { Link } from "react-router-dom";
import FontAwesome from "../uiStyle/FontAwesome";

// images
import mostsm1 from "../../assets/img/most-post/most-1.jpg";
import mostsm2 from "../../assets/img/most-post/most-2.jpg";
import mostsm3 from "../../assets/img/most-post/most-3.jpg";
import mostsm4 from "../../assets/img/most-post/most-4.jpg";
import mostsm5 from "../../assets/img/most-post/most-5.jpg";
import { mostViewSort } from "../../utils/commonFunctions";
import Slider from "../Slider";

const mostView = [
  {
    image: mostsm1,
    category: "TECHNOLOGY",
    date: "March 26, 2020",
    title: "Nancy zhang a chinese busy woman and dhaka",
  },
  {
    image: mostsm2,
    category: "TECHNOLOGY",
    date: "March 26, 2020",
    title: "The billionaire Philan thropist read to learn",
  },
  {
    image: mostsm3,
    category: "TECHNOLOGY",
    date: "March 26, 2020",
    title: "Cheap smartphone sensor could help you",
  },
  {
    image: mostsm4,
    category: "TECHNOLOGY",
    date: "March 26, 2020",
    title: "Ratiffe to be Director of nation talent Trump",
  },
  {
    image: mostsm5,
    category: "TECHNOLOGY",
    date: "March 26, 2020",
    title: "Nancy zhang a chinese busy woman and dhaka",
  },
  {
    image: mostsm1,
    category: "TECHNOLOGY",
    date: "March 26, 2020",
    title: "The billionaire Philan thropist read to learn",
  },
  {
    image: mostsm1,
    category: "TECHNOLOGY",
    date: "March 26, 2020",
    title: "Nancy zhang a chinese busy woman and dhaka",
  },
  {
    image: mostsm2,
    category: "TECHNOLOGY",
    date: "March 26, 2020",
    title: "The billionaire Philan thropist read to learn",
  },
  {
    image: mostsm3,
    category: "TECHNOLOGY",
    date: "March 26, 2020",
    title: "Cheap smartphone sensor could help you",
  },
  {
    image: mostsm4,
    category: "TECHNOLOGY",
    date: "March 26, 2020",
    title: "Ratiffe to be Director of nation talent Trump",
  },
  {
    image: mostsm5,
    category: "TECHNOLOGY",
    date: "March 26, 2020",
    title: "Nancy zhang a chinese busy woman and dhaka",
  },
  {
    image: mostsm1,
    category: "TECHNOLOGY",
    date: "March 26, 2020",
    title: "The billionaire Philan thropist read to learn",
  },
];

const MostView = ({ no_margin, title, dark }) => {
  return (
    <div className={`widget tab_widgets ${no_margin ? "" : "mb30"}`}>
      <h2 className="widget-title">{title ? title : "Most View"}</h2>
      <div className="post_type2_carousel multipleRowCarousel nav_style1">
        {/*CAROUSEL START*/}
        <Slider
          navigation={{
            nextEl: ".swiper-button-next8",
            prevEl: ".swiper-button-prev8",
          }}
          slidesPerView={1}
          grid={{
            rows: 6,
          }}
        >
          {mostViewSort(mostView).map((item, i) => (
            <div key={i} className="single_post2_carousel">
              <div className="single_post widgets_small type8">
                <div className="post_img">
                  <div className="img_wrap">
                    <img src={item.image} alt="thumb" />
                  </div>
                  <span className="tranding">
                    <FontAwesome name="bolt" />
                  </span>
                </div>
                <div className="single_post_text">
                  <div className="meta2">
                    <Link to="/">{item.category}</Link>
                    <Link to="/">{item.date}</Link>
                  </div>
                  <h4>
                    <Link to="/post1">{item.title}</Link>
                  </h4>
                </div>
                <div className="type8_count">
                  <h2>{item.id}</h2>
                </div>
              </div>
              {i + 2 < mostView.length ? (
                <>
                  <div className="space-15" />
                  {dark ? (
                    <div className="border_white" />
                  ) : (
                    <div className="border_black" />
                  )}
                  <div className="space-15" />
                </>
              ) : null}
            </div>
          ))}
        </Slider>
        <div className="navBtns">
          <div className="navBtn prevtBtn swiper-button-prev8">
            <FontAwesome name="angle-left" />
          </div>
          <div className="navBtn nextBtn swiper-button-next8">
            <FontAwesome name="angle-right" />
          </div>
        </div>
        {/*CAROUSEL END*/}
      </div>
    </div>
  );
};

export default MostView;

MostView.propTypes = {
  no_margin: ProtoTypes.bool,
  title: ProtoTypes.string,
  dark: ProtoTypes.bool,
};
