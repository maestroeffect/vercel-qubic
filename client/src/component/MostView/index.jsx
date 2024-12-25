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
import QubicwebFeed from "../RssParser";


const MostView = ({ no_margin, title, dark }) => {
  const { articles, loading, error } = QubicwebFeed();
  const filteredArticles = articles.filter((item) => {
    const sourceId = item.source?.id?.trim(); // Ensure no leading/trailing spaces
    return sourceId === "https://www.techspot.com/";
  });
  const generateSlug = (title) => title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");

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
          {mostViewSort(filteredArticles).map((item, i) => (
            <div key={i} className="single_post2_carousel">
              <div className="single_post widgets_small type8">
                <div className="post_img">
                  <div className="img_wrap">
                    <img src={item?.image} style={{
                      width: "80px",
                      height: "64px",
                      objectFit: "cover",
                    }} alt="thumb" />
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
                    <Link to={`/${generateSlug(item.title)}`}>{item.title.slice(0, 50)}...</Link>
                  </h4>
                </div>
                <div className="type8_count">
                  <h2>{item.id}</h2>
                </div>
              </div>
              {i + 2 < filteredArticles.length ? (
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
