import ProtoTypes from "prop-types";
import { Link } from "react-router-dom";
import FontAwesome from "../uiStyle/FontAwesome";

import { mostViewSort } from "../../utils/commonFunctions";
import Slider from "../Slider";
import { useSelector } from "react-redux";

const MostView = ({ no_margin, title, dark }) => {
  const { articles } = useSelector((state) => state.feed);

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
            rows: 4,
          }}
        >
          {mostViewSort(articles).map((item, i) => (
            <div key={i} className="single_post2_carousel">
              <div className="single_post widgets_small type8">
                <div className="post_img">
                  <div className="img_wrap">
                    <img
                      src={item?.image}
                      className="fixed-dimensions-trending2"
                      alt="thumb"
                    />
                  </div>
                  <span className="tranding">
                    <FontAwesome name="bolt" />
                  </span>
                </div>
                <div className="single_post_text">
                  <div className="meta2">
                    <Link to="/">{item.category.slice(0, 20)}</Link>
                    <Link to="/">{item.publishedDate}</Link>
                  </div>
                  <h4>
                    <Link
                      to={item.link}
                      onClick={(e) => {
                        e.preventDefault();
                        window.open(item.link, "_blank", "noopener,noreferrer");
                      }}
                    >
                      {item.title}
                    </Link>
                  </h4>
                </div>
                {/* <div className="type8_count">
                  <h2>{item.id}</h2>
                </div> */}
              </div>
              {i + 2 < articles.length ? (
                <>
                  <div className="space-10" />
                  {dark ? (
                    <div className="border_white" />
                  ) : (
                    <div className="border_black" />
                  )}
                  <div className="space-10" />
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
