// import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import FontAwesome from "../uiStyle/FontAwesome";
import Slider from "../Slider";
import { useSelector } from "react-redux";
import WithLoadingAndError from "../LoadErrorHandle";


const PostCarousel = ({ className }) => {
  const { articles } = useSelector((state) => state.feed);

  return (
    <WithLoadingAndError>
      <div className={` pst_carousel ${className ? className : ""}`}>
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
                          <div className="meta2">
                            <Link to="/">{item.category.slice(0, 20)}</Link>
                            <Link to="/">{item.publishedDate}</Link>
                          </div>
                        </div>

                        <div className="single_post_text">
                          <h4>
                            <Link to={item.link} onClick={(e) => {
                              e.preventDefault();
                              window.open(item.link, "_blank", "noopener,noreferrer");
                            }}>{item.title.slice(0, 25)}...</Link>
                          </h4>
                          <p>{item.contentSnippet.slice(0, 25)}...</p>
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
    </WithLoadingAndError>
  );
};

PostCarousel.propTypes = {
  className: PropTypes.string,
};

export default PostCarousel;
