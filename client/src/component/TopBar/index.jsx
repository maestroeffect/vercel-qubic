// import React, { useEffect, useState } from "react";
import ProtoTypes from "prop-types";
import { Link } from "react-router-dom";
import FontAwesome from "../uiStyle/FontAwesome";
import Slider from "../Slider";
import QubicwebFeed from "../RssParser";
import useWeatherAndDate from "../WeatherDate";
import loadingGif from "../../assets/img/loading.gif";
import * as React from 'react';
import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// import FontAwesome from "../uiStyle/FontAwesome";
const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 58,
  height: 30,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: '#aab4be',
        ...theme.applyStyles('dark', {
          backgroundColor: '#8796A5',
        }),
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: '#001e3c',
    width: 28,
    height: 28,
    '&::before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        '#fff',
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
    ...theme.applyStyles('dark', {
      backgroundColor: '#003892',
    }),
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: '#aab4be',
    borderRadius: 20 / 2,
    ...theme.applyStyles('dark', {
      backgroundColor: '#8796A5',
    }),
  },
}));

const TopBar = ({ className, dark, toggleDarkMode }) => {
  const generateSlug = (title) => title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");

  const { weather, dateTime } = useWeatherAndDate();
  const { articles, loading, error } = QubicwebFeed();


  if (loading) {
    return (
      <div className="loading-overlay">
        <img src={loadingGif} alt="Loading..." />
      </div>
    );
  }


  if (error) {
    return <div>Error: {error}</div>;
  }

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
                  {articles.map((article, index) => (
                    <div key={index} className="trancarousel_item">
                      <p>
                        <Link to={`/${generateSlug(article.title)}`}>{article.title}</Link>
                      </p>
                    </div>
                  ))}
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


const styles = {
  loaderContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    fontSize: "1.5rem",
    backgroundColor: "#f0f0f0", // Optional: Set background to prevent flashing
  },
};

TopBar.propTypes = {
  className: ProtoTypes.string,
  dark: ProtoTypes.bool,
};

export default TopBar;
