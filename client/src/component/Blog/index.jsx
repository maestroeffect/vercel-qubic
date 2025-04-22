import { Link } from "react-router-dom";
import calendar from "../../assets/img/icon/calendar.png";
import FontAwesome from "../uiStyle/FontAwesome";
import WidgetTrendingNews from "../WidgetTrendingNews";
import WithLoadingAndError from "../LoadErrorHandle";
import blog_1_main from "../../assets/img/blog/blog_1.jpg";

const manualBlogPosts = [
  {
    id: 1,
    slug: "ai-vs-threat-actors",
    image: blog_1_main,
    category: "Cybersecurity",
    title: "AI vs. Threat Actors: Who’s Winning the Cybersecurity Showdown?",
    publishedDate: "April 10, 2025",
    contentSnippet:
      "What was once a domain defined by firewalls and antivirus software is now a high-stakes arena where intelligent algorithms battle one another in real time. In this digital arms race, AI is the weapon of choice for defenders and attackers alike.",
  },
];

const Blog = () => {
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
                  {manualBlogPosts.map((item) => (
                    <div className="col-lg-12 mb-3" key={item.id}>
                      <div className="row g-3 align-items-start border-top border-bottom">
                        {/* Image Section */}
                        <div className="col-md-5">
                          <div className="post_img">
                            <Link to={`/${item.slug}`}>
                              <img
                                src={item.image}
                                style={{
                                  width: "350px",
                                  height: "250px",
                                  objectFit: "contain",
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

                        {/* Content Section */}
                        <div className="col-md-7">
                          <div className="single_post_text py-3">
                            {/* Meta Section */}
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
