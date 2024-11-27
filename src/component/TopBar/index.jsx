import React, { useEffect, useState } from "react";
import ProtoTypes from "prop-types";
import { Link } from "react-router-dom";
import FontAwesome from "../uiStyle/FontAwesome";
import Slider from "../Slider";
import axios from "axios";
import useWeatherAndDate from "../WeatherDate";

const TopBar = ({ className, dark }) => {
  // Use the custom hook to get weather and date/time
  const { weather, dateTime } = useWeatherAndDate();
  return (
    <div className={`topbar ${className ? className : ""}`} id="top">
      <div className="container">
        <div className="row">
          <div className="col-md-8 align-self-center">
            <div
              className={`trancarousel_area ${dark ? "white" : ""}`}
              style={{ display: "flex" }}
            >
              <p className="trand">Trending</p>
              <div className="nav_style1" style={{ width: "80%" }}>
                <Slider
                  navigation={{
                    nextEl: ".swiper-button-next14",
                    prevEl: ".swiper-button-prev14",
                  }}
                  className="trancarousel"
                  slidesPerView={1}
                  loop={true}
                  autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                  }}
                >
                  <div className="trancarousel_item">
                    <p>
                      <Link to="/">
                        Top 10 Best Movies of 2018 So Far: Great Movies To Watch
                        Now
                      </Link>
                    </p>
                  </div>
                  <div className="trancarousel_item">
                    <p>
                      <Link to="/">
                        Top 10 Best Movies of 2018 So Far: Great Movies To Watch
                        Now
                      </Link>
                    </p>
                  </div>
                  <div className="trancarousel_item">
                    <p>
                      <Link to="/">
                        Top 10 Best Movies of 2018 So Far: Great Movies To Watch
                        Now
                      </Link>
                    </p>
                  </div>
                </Slider>
                <div className="navBtns">
                  <button className="navBtn prevBtn swiper-button-prev14">
                    <FontAwesome name="angle-left" />
                  </button>
                  <button className="navBtn nextBtn swiper-button-next14">
                    <FontAwesome name="angle-right" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 align-self-center">
            <div className="top_date_social text-right">
              <div className={`paper_date ${dark ? "white" : ""}`}>
                <p>{dateTime}</p>
              </div>
              <div className={`social1 ${dark ? "white" : ""}`}>
                <ul className="inline">
                  <li>
                    <Link to="#">
                      <FontAwesome name="twitter" />
                    </Link>
                  </li>
                  <li>
                    <Link to="#">
                      <FontAwesome name="facebook-f" />
                    </Link>
                  </li>
                  <li>
                    <Link to="#">
                      <FontAwesome name="youtube-play" />
                    </Link>
                  </li>
                  <li>
                    <Link to="#">
                      <FontAwesome name="instagram" />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;

TopBar.propTypes = {
  className: ProtoTypes.string,
  dark: ProtoTypes.bool,
};
