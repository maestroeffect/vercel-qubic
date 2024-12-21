import React, { useState } from "react";
import ProtoTypes from "prop-types";
import { Link } from "react-router-dom";
import video1 from "../../assets/img/video-post-thumb.jpg";
import FontAwesome from "../uiStyle/FontAwesome";
import ModalVideo from "react-modal-video";
import PopularPosts from "../PopularPosts";
import CategoriesWidget from "../CategoriesWidget";
import QubicwebFeed from "../RssParser";

const VideoPost = ({ className, dark }) => {
  const { articles, loading, error } = QubicwebFeed();

  // Filter articles based on source title
  const filteredArticles = articles.filter((item) => {
    const sourceTitle = item.source.title?.trim(); // Ensure no leading/trailing spaces
    return sourceTitle === "HackerSploit";
  });

  // Remove the videoId from the link and add the image to each article
  const updatedArticles = filteredArticles.map((item) => {
    let updatedLink = item.link;
    let videoId = null;

    // Extract the videoId from the YouTube link if available
    if (updatedLink.includes("v=")) {
      const videoIdMatch = updatedLink.match(/[?&]v=([^&]+)/);
      if (videoIdMatch && videoIdMatch[1]) {
        videoId = videoIdMatch[1];
      }
    }

    return {
      ...item,
      link: updatedLink,
      image: item.image || video1, // Use the image from the article or fallback to `video1`
      videoId: videoId, // Add the dynamic videoId
    };
  });

  const [vModal, setvModal] = useState(false);
  const [currentVideoId, setCurrentVideoId] = useState(null);

  // Function to open the modal with the dynamic videoId
  const openModal = (videoId) => {
    setCurrentVideoId(videoId);
    setvModal(true);
  };

  return (
    <div className={`video_posts ${className ? className : ""}`}>
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
            {updatedArticles.slice(0, 1).map((article, index) => (
              <div className="col-lg-8" key={index}>
                <div className="single_post post_type3 post_type11 margintop-60- xs-mb30">
                  <div className="post_img">
                    <div className="img_wrap">
                      <Link to={article.link} className="play_btn">
                        <img src={article.image} alt={article.title} />
                      </Link>
                    </div>
                    <p onClick={() => openModal(article.videoId)} className="youtube_middle">
                      <FontAwesome name="youtube-play" />
                    </p>
                  </div>
                  <div
                    className={`single_post_text padding30 ${dark ? "dark-2" : "fourth_bg"}`}
                  >
                    <div className="meta3">
                      <Link to="/">TECHNOLOGY</Link>
                      <Link to="/">{article.publishedDate}</Link>
                    </div>
                    <h4>
                      <Link to="/post1">
                        {article.title}
                      </Link>
                    </h4>
                  </div>
                </div>
              </div>
            ))}
            <div className="col-lg-4">
              <CategoriesWidget />
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

export default VideoPost;

VideoPost.propTypes = {
  className: ProtoTypes.string,
  dark: ProtoTypes.bool,
};
