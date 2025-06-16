import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import calendar from "../../assets/img/icon/calendar.png";
import FontAwesome from "../uiStyle/FontAwesome";
import WidgetTrendingNews from "../WidgetTrendingNews";
import WithLoadingAndError from "../LoadErrorHandle";
import blogData from "../../data/blogData.json";

const POSTS_PER_PAGE = 3;

const Blog = () => {
  const [currentPage, setCurrentPage] = useState(1);

  // 🔽 Sort blog posts by date (newest first)
  const sortedBlogData = [...blogData].sort(
    (a, b) => new Date(a.publishedDate) - new Date(b.publishedDate)
  );

  // 🔢 Calculate pagination
  const totalPages = Math.ceil(sortedBlogData.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const currentPosts = sortedBlogData.slice(
    startIndex,
    startIndex + POSTS_PER_PAGE
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [currentPage]);

  return (
    <WithLoadingAndError>
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
                  {currentPosts.map((item) => (
                    <div className="col-lg-12 p-0 mb-3" key={item.id}>
                      <div className="row g-3 align-items-start border-top border-bottom">
                        <div className="col-md-5">
                          <div className="post_img">
                            <Link to={`/${item.slug}`}>
                              <img
                                src={`/assets/img/blog/1/${item.image}`}
                                style={{
                                  width: "350px",
                                  height: "250px",
                                  objectFit: "cover",
                                }}
                                className="img-fluid rounded fixed-dimensions-blog"
                                alt="blog"
                              />
                            </Link>
                            <span className="tranding">
                              <FontAwesome name="bolt" />
                            </span>
                          </div>
                        </div>

                        <div className="col-md-7">
                          <div className="single_post_text py-3">
                            <div className="d-flex align-items-center flex-wrap gap-3">
                              <span className="d-flex align-items-center mr-3">
                                <FontAwesome
                                  name="user"
                                  style={{
                                    color: "#E9752C",
                                    marginRight: "8px",
                                  }}
                                />
                                <Link to="/" className="text-decoration-none">
                                  {item.category}
                                </Link>
                              </span>
                              <span className="d-flex align-items-center mr-3">
                                <FontAwesome
                                  name="briefcase"
                                  style={{
                                    color: "#E9752C",
                                    marginRight: "8px",
                                  }}
                                />
                                <Link to="/" className="text-decoration-none">
                                  Featured Posts
                                </Link>
                              </span>
                              <span className="d-flex align-items-center">
                                <FontAwesome
                                  name="calendar"
                                  style={{
                                    color: "#E9752C",
                                    marginRight: "8px",
                                  }}
                                />
                                <span>{item.publishedDate}</span>
                              </span>
                            </div>
                            <h3 className="py-1">
                              <Link to={`/${item.slug}`}>{item.title}</Link>
                            </h3>
                            <p className="post-p pb-3">{item.contentSnippet}</p>
                            <Link to={`/${item.slug}`} className="readmore">
                              Read More
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pagination */}
              <div className="cpagination v4 p-3">
                <nav aria-label="Page navigation example">
                  <ul className="pagination">
                    <li
                      className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                    >
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(currentPage - 1)}
                      >
                        <FontAwesome name="caret-left" />
                      </button>
                    </li>
                    {Array.from({ length: totalPages }, (_, i) => (
                      <li
                        className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
                        key={i + 1}
                      >
                        <button
                          className="page-link"
                          onClick={() => handlePageChange(i + 1)}
                        >
                          {i + 1}
                        </button>
                      </li>
                    ))}
                    <li
                      className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
                    >
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(currentPage + 1)}
                      >
                        <FontAwesome name="caret-right" />
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>

            {/* Sidebar */}
            <div className="col-md-6 col-lg-3">
              <WidgetTrendingNews />
            </div>
          </div>
        </div>
      </div>
    </WithLoadingAndError>
  );
};

export default Blog;
