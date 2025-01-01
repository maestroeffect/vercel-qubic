import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import video1 from "../../assets/img/video-post-thumb.jpg";
import FontAwesome from "../uiStyle/FontAwesome";
import ModalVideo from "react-modal-video";
import PopularPosts from "../PopularPosts";
import CategoriesWidget from "../CategoriesWidget";
import QubicwebFeed from "../RssParser";

const VideoPost = ({ className, dark }) => {
  const { articles, videoArticles, loading, error } = QubicwebFeed();


  console.log("Videos:", videoArticles);

  const updatedVideoArticles = videoArticles.map((item) => {
    let updatedLink = item.link;
    let videoId = null;

    // Check if the link contains a YouTube video ID
    if (updatedLink.includes("v=")) {
      const videoIdMatch = updatedLink.match(/[?&]v=([^&]+)/);
      if (videoIdMatch && videoIdMatch[1]) {
        videoId = videoIdMatch[1];
      }
    }

    return {
      ...item,
      link: updatedLink,
      image: item.image || video1, // Fallback to default thumbnail
      videoId,
    };
  });
  const [vModal, setvModal] = useState(false);
  const [currentVideoId, setCurrentVideoId] = useState(null);

  const openModal = (videoId) => {
    setCurrentVideoId(videoId);
    setvModal(true);
  };

  if (loading) {
    return <p>Loading video news...</p>;
  }

  if (error) {
    return <p>Error loading video news: {error}</p>;
  }

  return (
    <div className={`video_posts ${className || ""}`}>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="heading white">
              <h2 className="widget-title">Video News</h2>
            </div>
          </div>
        </div>
        <div className="space-50" />
        <div className={`viceo_posts_wrap ${dark ? "primay_bg" : ""}`}>
          <div className="row">
            {videoArticles.length > 0 ? (
              updatedVideoArticles.slice(0, 1).map((article, index) => (
                <div className="col-lg-8" key={index}>
                  <div className="single_post post_type3 post_type11 margintop-60- xs-mb30">
                    <div className="post_img">
                      <div className="img_wrap">
                        <Link to={article.link} className="play_btn">
                          <img
                            src={article.image}
                            style={{
                              width: "100%",
                              height: "auto",
                              objectFit: "cover",
                            }}
                            alt={article.title}
                          />
                        </Link>
                      </div>
                      <p onClick={() => openModal(article.videoId)} className="youtube_middle">
                        <FontAwesome name="youtube-play" />
                      </p>
                    </div>
                    <div
                      className={`single_post_text padding30 ${dark ? "dark-2" : "fourth_bg"
                        }`}
                    >
                      <div className="meta3">
                        <Link to="/">TECHNOLOGY</Link>
                        <Link to="/">{article.publishedDate}</Link>
                      </div>
                      <h4>
                        <Link to="/post1">{article.title}</Link>
                      </h4>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No video news available.</p>
            )}
            <div className="col-lg-4">
              <PopularPosts />
            </div>
          </div>
        </div>
      </div>
      <ModalVideo
        channel="youtube"
        isOpen={vModal}
        videoId={currentVideoId}
        onClose={() => setvModal(false)}
      />
    </div>
  );
};

VideoPost.propTypes = {
  className: PropTypes.string,
  dark: PropTypes.bool,
};

VideoPost.defaultProps = {
  className: "",
  dark: false,
};

export default VideoPost;
