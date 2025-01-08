// import React from "react";
import ProtoTypes from "prop-types";
import { Link } from "react-router-dom";
import FontAwesome from "../uiStyle/FontAwesome";

import { mostViewSort } from "../../utils/commonFunctions";
import Slider from "../Slider";
import { useSelector } from "react-redux";
import WithLoadingAndError from "../LoadErrorHandle";


const SportsCarousel = ({ dark }) => {
  const { articles } = useSelector((state) => state.feed);
  const includedCategories = [
    "TechCabal",
    "Project Zero",
    "Techradar",
    "Troy Hunt",
    "Technext",
    "TechCrunch",
  ];
  const techArticles = articles.filter((article) =>
    includedCategories.includes(article.category)
  );
  return (
    <WithLoadingAndError>
      <div className="widget tab_widgets">
        <div className="post_type2_carousel multipleRowCarousel nav_style1">
          {/*CAROUSEL START*/}
          <Slider
            navigation={{
              nextEl: ".swiper-button-next13",
              prevEl: ".swiper-button-prev13",
            }}
            slidesPerView={1}
            grid={{
              rows: 6,
            }}
          >
            {mostViewSort(techArticles).slice(0, 5).map((item, i) => (
              <div key={i} className="single_post2_carousel">
                <div className="single_post widgets_small">
                  <div className="post_img">
                    <div className="img_wrap">
                      <Link to="/">
                        <img src={item.image}

                          alt="thumb"
                          style={{
                            width: "100px",
                            height: "65px",
                            objectFit: "cover"


                          }} />
                      </Link>
                    </div>
                    <span className="tranding">
                      <FontAwesome name="bolt" />
                    </span>
                  </div>
                  <div className="single_post_text">
                    <div className="meta2">
                      <Link to="/">{item.category}</Link>
                      <Link to="/">{item.publishedDate}</Link>
                    </div>
                    <h4>
                      <Link to={item.link} onClick={(e) => {
                        e.preventDefault();
                        window.open(item.link, "_blank", "noopener,noreferrer");
                      }}>{item.title.slice(0, 50)}...</Link>
                    </h4>
                  </div>
                </div>
                <div className="space-15" />
                {dark ? (
                  <div className="border_white" />
                ) : (
                  <div className="border_black" />
                )}
                <div className="space-15" />
              </div>
            ))}
          </Slider>
          <div className="navBtns">
            <div className="navBtn prevtBtn swiper-button-prev13">
              <FontAwesome name="angle-left" />
            </div>
            <div className="navBtn nextBtn swiper-button-next13">
              <FontAwesome name="angle-right" />
            </div>
          </div>
        </div>
      </div>
    </WithLoadingAndError>
  );
};

export default SportsCarousel;

SportsCarousel.propTypes = {
  dark: ProtoTypes.bool,
};
