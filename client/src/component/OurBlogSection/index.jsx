import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import blogData from "../../data/blogData.json";

// Import Swiper styles & core
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const OurBlogSection = ({ dark }) => {
  return (
    <div className={`${dark ? "primay_bg" : "fourth_bg"} padding6030`}>
      <div className="container">
        <div className="row mb-4">
          <div className="col-12">
            <div className="heading d-flex justify-content-between align-items-center">
              <h2 className="widget-title">Our Latest Blog</h2>
            </div>
          </div>
        </div>

        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          {/* <div className="swiper-button-prev"></div>
          <div className="swiper-button-next"></div> */}
          {blogData.map((item, i) => (
            <SwiperSlide key={i}>
              <div className="single_post post_type3 mb30">
                <div className="post_img">
                  <Link to={`/${item.slug}`}>
                    <img
                      src={`/assets/img/blog/1/${item.image}`}
                      alt="thumb"
                      className="img-fluid"
                    />
                  </Link>
                </div>
                <div className="single_post_text">
                  <div className="meta3">
                    <Link to="/">{item.category}</Link>
                    <Link to="/">{item.publishedDate}</Link>
                  </div>
                  <h4>
                    <Link to={`/${item.slug}`}>{item.title}</Link>
                  </h4>
                  <div className="space-10" />
                  <p className="post-p">{item.contentSnippet}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

OurBlogSection.propTypes = {
  dark: PropTypes.bool,
};

export default OurBlogSection;
