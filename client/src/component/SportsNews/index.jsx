import React from "react";
import ProtoTypes from "prop-types";
import { Link } from "react-router-dom";
import sportsbig1 from "../../assets/img/sports-news.jpg";
import SportsCarousel from "../SportsCarousel";
import FontAwesome from "../uiStyle/FontAwesome";
import QubicwebFeed from "../RssParser";

const SportsNews = ({ dark }) => {
  const { articles, loading, error } = QubicwebFeed();
  const filteredArticles = articles.filter((item) => {
    const sourceId = item.source?.id?.trim(); // Ensure no leading/trailing spaces
    const allowedSources = [
      // CYBERSECURITY NEWS SOURCES HERE
      "https://apisecurity.io/",
      "https://decoded.avast.io/",
      "https://aws.amazon.com/blogs/security/",
      "https://www.biometricupdate.com/",
      "https://bishopfox.com/",
      "https://newsletter.blockthreat.io/",
      "https://research.checkpoint.com/",
      "https://www.csoonline.com/",
      "https://blog.fox-it.com/",
    ]; // Add more links here as needed
    return allowedSources.includes(sourceId);
  }).map((item) => ({
    ...item,
    category: item.category || "Technology", // Append "General" if no category exists
  }));
  return (
    <div className="row">
      <div className="col-12">
        <div className="sports">
          <div className="row">
            <div className="col-12">
              <div className="heading">
                <h2 className="widget-title">Technology News</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="single_post post_type3 mb30">
                <div className="post_img">
                  <Link to="/">
                    <img src={sportsbig1} alt="sportsbig1" />
                  </Link>{" "}
                  <span className="tranding">
                    <FontAwesome name="bolt" />
                  </span>
                </div>
                <div className="single_post_text">
                  <div className="meta3">
                    <Link to="/">TECHNOLOGY</Link>
                    <Link to="/">March 26, 2020</Link>
                  </div>
                  <h4>
                    <Link to="/post1">
                      Copa America: Luis Suarez from devastated US
                    </Link>
                  </h4>
                  <div className="space-10" />
                  <p className="post-p">
                    The property, complete with 30-seat screening from room, a
                    100-seat amphitheater and a swimming pond with sandy shower…
                  </p>
                  <div className="space-20" />
                  <Link to="/" className="readmore">
                    Read More
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="sports_carousel nav_style1">
                <SportsCarousel dark={dark ? dark : false} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SportsNews;

SportsNews.propTypes = {
  dark: ProtoTypes.bool,
};
