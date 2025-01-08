import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import FontAwesome from "../uiStyle/FontAwesome";
import Slider from "../Slider";
import hside4 from "../../assets/img/post-1.jpg";
import hside5 from "../../assets/img/post-2.jpg";
import hside6 from "../../assets/img/post-3.jpg";
import hside1 from "../../assets/img/post-2.jpg";
import hside2 from "../../assets/img/post-1.jpg";
import hside3 from "../../assets/img/post-3.jpg";
import QubicwebFeed from "../RssParser";
import { useEffect } from "react";

const PostCarousel = ({ className }) => {
  const { articles, error } = useSelector((state) => state.feed);
  const generateSlug = (title) => title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");


  return (
    <div className={className ? className : ""}>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="carousel_posts1 owl-carousel nav_style2 mb40 mt30">
              <div className="px-4 position-relative">
                <Slider
                  navigation={{
                    nextEl: ".swiper-button-next11",
                    prevEl: ".swiper-button-prev11",
                  }}
                  className="trancarousel"
                  slidesPerView={3}
                  spaceBetween={20}
                  loop={true}
                  autoplay={{ delay: 3000, disableOnInteraction: false }}
                  breakpoints={{
                    1024: { slidesPerView: 3, spaceBetween: 20 },
                    768: { slidesPerView: 2, spaceBetween: 20 },
                    640: { slidesPerView: 2, spaceBetween: 20 },
                    320: { slidesPerView: 1, spaceBetween: 20 },
                  }}
                >
                  {articles.map((item, i) => (
                    <div key={i} className="single_post widgets_small post_type5">
                      <div className="post_img">
                        <div className="img_wrap">
                          <Link to="/">
                            <img src={item.image} alt="slider5" />
                          </Link>
                        </div>
                      </div>
                      <div className="single_post_text">
                        <h4>
                          <Link to={`/${generateSlug(item.title)}`}>{item.title.slice(0, 50)}...</Link>
                        </h4>
                        <p>{item.title.slice(0, 30)}...</p>
                      </div>
                    </div>
                  ))}
                </Slider>
                <div className="owl-nav">
                  <div className="owl-prev swiper-button-prev11">
                    <FontAwesome name="angle-left" />
                  </div>
                  <div className="owl-next swiper-button-next11">
                    <FontAwesome name="angle-right" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

PostCarousel.propTypes = {
  className: PropTypes.string,
};

export default PostCarousel;
