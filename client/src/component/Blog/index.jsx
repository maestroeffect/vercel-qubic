import React from 'react'
import { Link } from 'react-router-dom';
import calendar from "../../assets/img/icon/calendar.png";
import EntertainmentNews from '../EntertainmentNews';
import { entertainments2 } from "../../data/entertainments";
import FontAwesome from '../uiStyle/FontAwesome';
import WidgetTab from '../WidgetTab';
import FollowUs from '../FollowUs';
import WidgetTrendingNews from '../WidgetTrendingNews';
import MostShareWidget from '../MostShareWidget';
import NewsLetter from '../NewsLetter';
import QubicwebFeed from '../RssParser';

const Blog = () => {
    const { blogArticles } = QubicwebFeed();
    // console.log(blogArticles);

    return (
        <div className="archives padding-top-30">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 col-lg-9">
                        <div className="row">
                            <div className="col-6 align-self-center">
                                <div className="heading">
                                    <h2 className="widget-title">Our Blogs</h2>
                                </div>
                            </div>
                            <div className="col-6 text-right">
                                <div className="calender">
                                    <img src={calendar} alt="calendar" />
                                </div>
                            </div>
                        </div>
                        <div className="about_posts_tab">
                            <div className="row">
                                {blogArticles.slice(0, 8).map((item) => (
                                    <div className="col-lg-12 mb-3" key={item.slug}>
                                        <div className="row g-3 align-items-start  border-top border-bottom">
                                            {/* Image Section */}
                                            <div className="col-md-5">
                                                <div className="post_img">
                                                    <Link to="/">
                                                        <img
                                                            src={item.image}
                                                            className="img-fluid rounded fixed-dimensions"
                                                            alt="sportsbig1"
                                                        />
                                                    </Link>
                                                    <span className="tranding">
                                                        <FontAwesome name="bolt" />
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Content Section */}
                                            <div className="col-md-7">
                                                <div className="single_post_text py-3">
                                                    {/* Meta Section */}
                                                    <div className="d-flex align-items-center flex-wrap gap-3">
                                                        <span className="d-flex align-items-center mr-3">
                                                            <FontAwesome name="user" style={{ color: "#F15A25", marginRight: "8px" }} />
                                                            <Link to="/" className="text-decoration-none">
                                                                {item.category}
                                                            </Link>
                                                        </span>
                                                        <span className="d-flex align-items-center mr-3">
                                                            <FontAwesome name="briefcase" style={{ color: "#F15A25", marginRight: "8px" }} />
                                                            <Link to="/" className="text-decoration-none">
                                                                Featured Posts
                                                            </Link>
                                                        </span>
                                                        <span className="d-flex align-items-center">
                                                            <FontAwesome name="calendar" style={{ color: "#F15A25", marginRight: "8px" }} />
                                                            <span>{item.publishedDate}</span>
                                                        </span>
                                                    </div>
                                                    <h3 className='py-1'>
                                                        <Link to={item.link}
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                window.open(item.link, "_blank", "noopener,noreferrer");
                                                            }}
                                                        >{item.title.slice(0, 60)}...</Link>
                                                    </h3>
                                                    <p className="post-p">{item.contentSnippet.slice(0, 130)}...</p>
                                                    <Link to={item.link} onClick={(e) => {
                                                        e.preventDefault();
                                                        window.open(item.link, "_blank", "noopener,noreferrer");
                                                    }} className="readmore">
                                                        Read More
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12">
                                <div className="cpagination">
                                    <nav aria-label="Page navigation example">
                                        <ul className="pagination">
                                            <li className="page-item">
                                                <Link
                                                    className="page-link"
                                                    to="/"
                                                    aria-label="Previous"
                                                >
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
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-3">
                        <WidgetTrendingNews />
                        {/* <MostShareWidget title="Most Share" /> */}
                        {/* <NewsLetter /> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Blog;