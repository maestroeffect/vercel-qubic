import React from "react";
import MainMenuThree from "../../../component/MainMenuThree";
import BannerSectionThree from "../../../component/BannerSectionThree";
import FollowUs from "../../../component/FollowUs";
import WidgetFinanceTwo from "../../../component/WidgetFinanceTwo";
import NewsLetter from "../../../component/NewsLetter";
import { Link } from "react-router-dom";
import FontAwesome from "../../../component/uiStyle/FontAwesome";
import BreadCrumb from "../../../component/BreadCrumb";
import CategoryFour from "../../../component/CategoryFour";

import banner4 from "../../../assets/img/banner/banner-3.png";
import calendarImg from "../../../assets/img/icon/calendar.png";
import { financePosts, news } from "../../../data/news";

function HomeThreeArchive() {
  return (
    <>
      <MainMenuThree />
      <BreadCrumb className="shadow5 layout3" title="about">
        <>
          <div className="space-50" />
          <div className="row">
            <div className="col-lg-4">
              <div className="table_content">
                <h2 className="widget-title">Archive:2020</h2>
                <ul>
                  <li>
                    <Link to="/">January</Link>
                  </li>
                  <li>
                    <Link to="/">February</Link>
                  </li>
                  <li>
                    <Link to="/">March</Link>
                  </li>
                  <li>
                    <Link className="active" to="/">
                      April
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="table_content border_black_left pl-md-5">
                <h2 className="widget-title">Years list</h2>
                <div className="row">
                  <div className="col-lg-3">
                    <div className="yearList">
                      <ul>
                        <li>
                          <Link to="/">2000</Link>
                        </li>
                        <li>
                          <Link to="/">2001</Link>
                        </li>
                        <li>
                          <Link to="/">2002</Link>
                        </li>
                        <li>
                          <Link to="/">2003</Link>
                        </li>
                        <li>
                          <Link className="active" to="/">
                            2004
                          </Link>
                        </li>
                        <li>
                          <Link to="/">2005</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="yearList">
                      <ul>
                        <li>
                          <Link to="/">2006</Link>
                        </li>
                        <li>
                          <Link to="/">2007</Link>
                        </li>
                        <li>
                          <Link to="/">2008</Link>
                        </li>
                        <li>
                          <Link to="/">2009</Link>
                        </li>
                        <li>
                          <Link to="/">2010</Link>
                        </li>
                        <li>
                          <Link to="/">2011</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="yearList">
                      <ul>
                        <li>
                          <Link to="/">2012</Link>
                        </li>
                        <li>
                          <Link to="/">2013</Link>
                        </li>
                        <li>
                          <Link to="/">2014</Link>
                        </li>
                        <li>
                          <Link to="/">2015</Link>
                        </li>
                        <li>
                          <Link to="/">2016</Link>
                        </li>
                        <li>
                          <Link to="/">2017</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="yearList">
                      <ul>
                        <li>
                          <Link to="/">2018</Link>
                        </li>
                        <li>
                          <Link to="/">2019</Link>
                        </li>
                        <li>
                          <Link to="/">2014</Link>
                        </li>
                        <li>
                          <Link to="/">2015</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="space-50" />
        </>
      </BreadCrumb>
      <div className="archives padding-top-30 layout3">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-lg-8">
              <div className="row">
                <div className="col-6 align-self-center">
                  <div className="heading">
                    <h2 className="widget-title">Archive</h2>
                  </div>
                </div>
                <div className="col-6 text-right">
                  <div className="calender">
                    <img src={calendarImg} alt="icon" />
                  </div>
                </div>
              </div>
              <div className="row justify-content-center">
                {news.map((item, i) => (
                  <div key={i} className="col-lg-6">
                    <div className="single_post post_type3 shadow7 mb30 post_type15 border-radious5">
                      <div className="post_img border-radious5">
                        <div className="img_wrap">
                          <img src={item.photo} alt="thumb" />
                        </div>
                        <span className="tranding border_tranding">
                          <FontAwesome name="bolt" />
                        </span>
                      </div>
                      <div className="single_post_text padding20 white_bg">
                        <Link to="/post1">{item.title}</Link>
                        <div className="space-10" />
                        <p className="post-p">{item.body}</p>
                        <div className="space-20" />
                        <div className="meta3">
                          <Link to="/">{item.category}</Link>
                          <Link to="/">{item.date}</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="cpagination v4 padding5050">
                <nav aria-label="Page navigation example">
                  <ul className="pagination">
                    <li className="page-item">
                      <Link className="page-link" to="/" aria-label="Previous">
                        <span aria-hidden="true">
                          <FontAwesome name="caret-left" />
                        </span>
                      </Link>
                    </li>
                    <li className="page-item">
                      <Link className="page-link" to="/">
                        1
                      </Link>
                    </li>
                    <li className="page-item">
                      <Link className="page-link" to="/">
                        ..
                      </Link>
                    </li>
                    <li className="page-item">
                      <Link className="page-link" to="/">
                        5
                      </Link>
                    </li>
                    <li className="page-item">
                      <Link className="page-link" to="/" aria-label="Next">
                        <span aria-hidden="true">
                          <FontAwesome name="caret-right" />
                        </span>
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <FollowUs title="Follow Us" />
              <div className="banner2 mb30 border-radious5">
                <Link to="">
                  <img src={banner4} alt="banner4" />
                </Link>
              </div>
              <WidgetFinanceTwo data={financePosts} title="Finance" />
              <NewsLetter
                titleClass="white"
                className="news_letter4 border-radious5"
              />
              <CategoryFour />
            </div>
          </div>
        </div>
      </div>
      <BannerSectionThree />
    </>
  );
}

export default HomeThreeArchive;
