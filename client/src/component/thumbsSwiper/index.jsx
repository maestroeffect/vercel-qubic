import { useState } from "react";
import Slider from "../Slider";
import FontAwesome from "../uiStyle/FontAwesome";
import { Link } from "react-router-dom";
// import QubicwebFeed from "../RssParser";
import { useSelector } from "react-redux";
import WithLoadingAndError from "../LoadErrorHandle";

function ThumbsSwiper() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const { articles } = useSelector((state) => state.feed);

  const includedCategories = [
    "Tech News Archives - Nairametrics",
    "NaijaTechGuide",
    "Sheriff Deputies Ltd",
    "Latest from TechRadar",
    "The Last Watchdog",
  ];
  const generalArticles = articles.filter((article) =>
    includedCategories.includes(article.category)
  );

  // console.log(articles.data);

  // console.log(generalArticles);

  return (
    <WithLoadingAndError>
      <>
        <div className="slider_demo2">
          <Slider
            loop={true}
            spaceBetween={10}
            thumbs={{
              swiper:
                thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
            }}
            slidesPerView={1}
            navigation={{
              nextEl: ".swiper-button-next-thumbs",
              prevEl: ".swiper-button-prev-thumbs",
            }}
          >
            {generalArticles.slice(0, 9).map((item, i) => (
              <div key={i} className="single_post post_type6 xs-mb30">
                <div className="post_img gradient1">
                  <img
                    src={item?.image}
                    style={{
                      width: "1460px",
                      height: "500px",
                      objectFit: "cover",
                    }}
                    alt="thumb"
                  />
                  <span
                    // onClick={() => this.modalHandler(true)}
                    className="tranding"
                  >
                    <FontAwesome name="globe" />
                  </span>
                </div>
                <div className="single_post_text">
                  <div className="meta meta_separator1">
                    <Link to="#">{item.category}</Link>
                    <Link to="#">{item.publishedDate}</Link>
                  </div>
                  <h4>
                    <Link
                      className="play_btn"
                      to={item.link}
                      onClick={(e) => {
                        e.preventDefault();
                        window.open(item.link, "_blank", "noopener,noreferrer");
                      }}
                    >
                      {item.title}
                    </Link>
                  </h4>
                  <div className="space-10" />
                  <p className="post-p">
                    {item?.contentSnippet.slice(0, 100)}...
                  </p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
        <div className="slider_demo1">
          <div
            //   onClick={onClick}
            className={` slider_arrow arrow_left slick-arrow swiper-button-prev-thumbs`}
          >
            <FontAwesome name="angle-left" />
          </div>
          <Slider
            onSwiper={setThumbsSwiper}
            loop={true}
            spaceBetween={10}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            breakpoints={{
              1024: {
                slidesPerView: 8,
              },
              768: {
                slidesPerView: 5,
              },
              320: {
                slidesPerView: 3,
              },
            }}
          >
            {generalArticles.slice(0, 9).map((item, i) => (
              <div key={i} className="single_gallary_item">
                <img
                  src={item.image}
                  style={{
                    width: "95px",
                    height: "70px",
                    objectFit: "cover",
                  }}
                  alt="thumb"
                />
              </div>
            ))}
          </Slider>

          <div
            //   onClick={onClick}
            className={`slider_arrow arrow_right slick-arrow swiper-button-next-thumbs`}
          >
            <FontAwesome name="angle-right" />
          </div>
        </div>
      </>
    </WithLoadingAndError>
  );
}

export default ThumbsSwiper;
