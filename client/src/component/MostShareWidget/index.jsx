import React from "react";
import ProtoTypes from "prop-types";
import { Link } from "react-router-dom";
import FontAwesome from "../uiStyle/FontAwesome";
import QubicwebFeed from "../RssParser";
// images
import { mostViewSort } from "../../utils/commonFunctions";
import Slider from "../Slider";

const mostView = [
  {
    category: "TECHNOLOGY",
    date: "March 26, 2020",
    title: "Nancy zhang a chinese busy woman and dhaka",
  },
  {
    category: "TECHNOLOGY",
    date: "March 26, 2020",
    title: "Harbour amid a Slowen down in singer city",
  },
  {
    category: "TECHNOLOGY",
    date: "March 26, 2020",
    title: "Cheap smartphone sensor could help you old food safe",
  },
  {
    category: "TECHNOLOGY",
    date: "March 26, 2020",
    title: "The secret to moving this ancient sphinx screening",
  },
  {
    category: "TECHNOLOGY",
    date: "March 26, 2020",
    title: "Nancy zhang a chinese busy woman and dhaka",
  },
  {
    category: "TECHNOLOGY",
    date: "March 26, 2020",
    title: "The billionaire Philan thropist read to learn",
  },
  {
    category: "TECHNOLOGY",
    date: "March 26, 2020",
    title: "Nancy zhang a chinese busy woman and dhaka",
  },
  {
    category: "TECHNOLOGY",
    date: "March 26, 2020",
    title: "The billionaire Philan thropist read to learn",
  },
  {
    category: "TECHNOLOGY",
    date: "March 26, 2020",
    title: "Cheap smartphone sensor could help you",
  },
  {
    category: "TECHNOLOGY",
    date: "March 26, 2020",
    title: "Ratiffe to be Director of nation talent Trump",
  },
];

const MostShareWidget = ({ title, dark }) => {
  const { articles, loading, error } = QubicwebFeed();

  return (
    <div className="widget tab_widgets mb30">
      <h2 className="widget-title">{title ? title : "Most View"}</h2>
      <div className="post_type2_carousel multipleRowCarousel nav_style1">
        {/*CAROUSEL START*/}
        <Slider
          navigation={{
            nextEl: ".swiper-button-next7",
            prevEl: ".swiper-button-prev7",
          }}
          slidesPerView={1}
          grid={{
            rows: 6,
          }}
        >
          {mostViewSort(articles).map((item, i) => (
            <div key={i} className="carousel_items">
              <div className="single_post widgets_small widgets_type4">
                <div className="post_img number">
                  <h2>{item.id}</h2>
                </div>
                <div className="single_post_text">
                  <div className="meta2">
                    <Link to="#">{item.category.slice(0, 20)}</Link>
                    <Link to="#">{item.publishedDate}</Link>
                  </div>
                  <h4>
                    <Link to={item.link} onClick={(e) => {
                      e.preventDefault();
                      window.open(item.link, "_blank", "noopener,noreferrer");
                    }}>
                      {item.title.slice(0, 50)}...
                    </Link>
                  </h4>
                  <ul className="inline socail_share">
                    <li>
                      <Link to="#">
                        <FontAwesome name="twitter" />
                        2.2K
                      </Link>
                    </li>
                    <li>
                      <Link to="#">
                        <FontAwesome name="facebook-f" />
                        2.2K
                      </Link>
                    </li>
                  </ul>
                  {/* <div className="space-15" /> */}
                  {dark ? (
                    <div className="border_white" />
                  ) : (
                    <div className="border_black" />
                  )}
                </div>
              </div>
              {/* <div className="space-15" /> */}
            </div>
          ))}
        </Slider>
        <div className="navBtns">
          <div className="navBtn prevtBtn swiper-button-prev7">
            <FontAwesome name="angle-left" />
          </div>
          <div className="navBtn nextBtn swiper-button-next7">
            <FontAwesome name="angle-right" />
          </div>
        </div>
        {/*CAROUSEL END*/}
      </div>
    </div>
  );
};

export default MostShareWidget;

MostShareWidget.propTypes = {
  title: ProtoTypes.string,
  dark: ProtoTypes.bool,
};
