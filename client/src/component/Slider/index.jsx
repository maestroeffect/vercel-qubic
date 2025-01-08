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
// import QubicwebFeed from "../RssParser";
// import loadingGif from "../../assets/img/loading.gif"; // Path to your loading GIF

function Slider({ children = [], ...props }) {
  // const { loading } = useSelector((state) => state.feed); // Use loading state from QubicwebFeed

  // if (loading) {
  //   return (
  //     <div className="loading-overlay">
  //       <img src={loadingGif} alt="Loading..." />
  //     </div>
  //   );
  // }

  if (!children || children.length === 0) {
    return null; // Avoid rendering Swiper if there are no slides
  }

  return (
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
  );
}


Slider.propTypes = {
  children: PropTypes.node,
};

export default Slider;
