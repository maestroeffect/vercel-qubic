import React from "react";
import PostCarousel from "../../component/PostCarousel";
import PostGallery from "../../component/PostGallery";
import FeatureNews from "../../component/FeatureNews";
import TrendingNews from "../../component/TrendingNews";
import FollowUs from "../../component/FollowUs";
import MostView from "../../component/MostView";
import MixCarousel from "../../component/MixCarousel";
import VideoPost from "../../component/VideoPost";
import EntertainmentNews from "../../component/EntertainmentNews";
import SportsNews from "../../component/SportsNews";
import BusinessNews from "../../component/BusinessNews";
import MostShareWidget from "../../component/MostShareWidget";
import UpcomingMatches from "../../component/UpcomingMatches";
import NewsLetter from "../../component/NewsLetter";
import CategoriesWidget from "../../component/CategoriesWidget";
import RssFeed from "../../component/RssParser";

// images

function Home() {
  return (
    <>
      <PostCarousel className="fifth_bg" />
      <PostGallery className="fifth_bg" />
      <FeatureNews />
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <TrendingNews />
          </div>
          <div className="col-md-12 col-lg-4">
            <FollowUs title="Follow Us" />
            <MostView />
          </div>
        </div>
      </div>
      <MixCarousel className="half_bg1" />
      <VideoPost className="pt30 half_bg60" />
      {/* <RssFeed /> */}
      <div className="entertrainments">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="row">
                <div className="col-12">
                  <NewsLetter />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="space-70" />
    </>
  );
}

export default Home;
