import React from "react";
import PropTypes from "prop-types";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/grid";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Pagination,
  Navigation,
  EffectFade,
  Grid,
  Thumbs,
  FreeMode,
} from "swiper/modules";

function Slider({ children = [], ...props }) {
  return (
    <>
      {children && children.length > 0 ? (
        <Swiper
          {...props}
          modules={[
            Autoplay,
            Pagination,
            Navigation,
            EffectFade,
            Grid,
            Thumbs,
            FreeMode,
          ]}
        >
          {children.map((child, index) => (
            <SwiperSlide key={index + "swiper"}>{child}</SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p>No slides available</p>
      )}
    </>
  );
}

Slider.propTypes = {
  children: PropTypes.node,
};

export default Slider;
