import React, { useState } from "react";
import BreadCrumb from "../../../component/BreadCrumb";
import FontAwesome from "../../../component/uiStyle/FontAwesome";
import { Link } from "react-router-dom";
import WidgetTab from "../../../component/WidgetTab";
import WidgetTrendingNews from "../../../component/WidgetTrendingNews";
import NewsLetter from "../../../component/NewsLetter";
import EntertainmentNews from "../../../component/EntertainmentNews";
import SportsCarousel from "../../../component/SportsCarousel";
import { Fade, Nav, NavItem, TabContent, TabPane } from "reactstrap";
import MostShareWidget from "../../../component/MostShareWidget";
import BannerSection from "../../../component/BannerSection";

// images
import banner2 from "../../../assets/img/banner/banner-2.jpg";
import author1 from "../../../assets/img/favicon.png";
import calendar from "../../../assets/img/icon/calendar.png";
import { entertainments2 } from "../../../data/entertainments";

function About() {
  const [activeTab, setActiveTab] = useState("1");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  return (
    <>
      <BreadCrumb className="shadow5" title="About">
        <>
          <div className="space-10" />
          {/* <div className="row"> */}
          {/* <div className="col-lg-12"> */}
          <div className="author_about p-0">
            {/* <div className="author_img">
                  <div className="author_wrap">
                    <img src={author1} alt="author1" />
                  </div>
                </div> */}
            <div className="author_content">
              <Link to="/" className="d-flex align-items-baseline text-decoration-none">
                <span className="display-1 fw-bold">Q</span>
                <span className="ms-2 fs-5">ubicweb</span>
              </Link>
            </div>
            <p>
              In today’s fast-paced digital landscape, staying informed about cybersecurity, technology trends and innovations is essential. Technology continues to transform how businesses operate, governments govern and individuals connect. From groundbreaking advancements to emerging threats, understanding these shifts is crucial for thriving in an increasingly interconnected world.
              <br />
              <br />
              Qubicweb is your gateway to real-time updates, insights and analysis of the latest developments in the technology and cybersecurity space. By curating the most important stories from trusted sources across the web, Qubicweb provides a comprehensive and concise summary of the day’s essential news, making it an indispensable resource for tech enthusiasts, industry professionals and decision-makers alike.

            </p>

            <br />
            <h2>What Makes Qubicweb Unique?</h2>
            <br />
            <ul>
              <li>
                <span>Language Versatility: At Qubicweb, we understand the importance of accessibility and inclusivity. That’s why our platform lets you seamlessly translate articles into other languages while reading, breaking down language barriers and making technology news accessible to a global audience.
                </span>
              </li>
              <li>
                <span>Content Transparency: Qubicweb is not a content creator. Instead, we pull feeds directly from reputable and trusted sources across the web. By linking you to the original articles, we ensure you get accurate information from the experts themselves.</span>
              </li>
            </ul>
            <br />
            {/* <h2>Origin</h2>
            <br />
            <p>
              Founded in 2025, Qubicweb was created to bridge the gap between technology professionals and timely, relevant news. By combining algorithmic precision with human editorial oversight, Qubicweb offers a curated experience that is both efficient and insightful. This unique blend ensures readers can quickly access trustworthy information without wading through an overwhelming amount of content online.
            </p>
            <br /> */}
            <h2>Why Qubicweb?</h2>
            <br />
            <p className="">
              In an era where information is abundant but time is scarce, Qubicweb stands out by curating technology news from diverse sources and presenting it in a streamlined, user-friendly format.
              <ul>
                <li>
                  Real-time updates: Stay ahead with the latest insights in tech and cybersecurity.
                </li>
                <li>
                  Credible sources: Access news from verified and authoritative websites.
                </li>
                <li>
                  Ease of use: Simplify your browsing experience with our intuitive interface.
                </li>
              </ul>
              {/* <br /> */}
            </p>

            <h2>Advertising</h2>
            <br />
            <p>
              Qubicweb offers tasteful and effective advertising opportunities for companies looking to promote their products, services, or events to a highly engaged audience. Contact us at <a href="https://advertising@qubicweb.com">advertising@qubicweb.com</a> for more details.
            </p>

            <br />

            <h2>A Qubicbox Product</h2>
            <p>
              Qubicweb is a proud product of Qubicbox, a brand dedicated to building innovative web solutions tailored to solve real-world problems for small businesses and individuals. Qubicbox empowers users with tools that simplify life and foster informed decision-making. Learn more about Qubicbox and its groundbreaking products at <Link to="https://Qubicweb.com">Qubicweb.com</Link>.
            </p>
            <br />
            <h2>Sister Sites</h2>
            <p>
              Qubicweb is part of the Qubicbox ecosystem, which includes:
              <ol>
                <li>
                  <Link>Qubicbox</Link>: A versatile platform offering cybersecurity services, web development advisory, and tools designed to empower small businesses in the digital space.
                </li>
                <li>
                  <Link>Qlutterbox</Link>: A web application designed to facilitate the sale of items, offering individuals a secure and user-friendly platform to declutter and earn from unwanted goods. The platform is managed by registered agents who assist in advertising and verifying transactions, leveraging social media APIs for seamless postings.
                </li>
                <li>
                  <Link>Qubictry</Link>: An online directory for artisans, connecting skilled professionals with customers in need of their services, thereby fostering growth and visibility for local artisans.
                </li>
              </ol>
            </p>
            <p>
              {/* Interaction Within the Ecosystem */}

              The platforms in the Qubicbox ecosystem complement each other to deliver value across diverse domains:
              <ol>

                <li>
                  Qubicweb enhances awareness by aggregating real-time technology news, including cybersecurity trends and digital innovations. This keeps users of Qlutterbox and Qubictry informed about threats and opportunities in the digital space, ensuring their interactions remain secure and efficient.
                </li>

                <li>
                  ⁠Qlutterbox empowers small businesses and individuals, including artisans listed on Qubictry, by providing an additional revenue stream through the sale of fairly used items. This creates an avenue for artisans to declutter their spaces while generating income.
                </li>
                <li>
                  ⁠Qubictry connects artisans who may benefit from the web development advisory and cybersecurity services provided by Qubicbox, enabling them to create secure online profiles or platforms to showcase their skills and attract more clients.
                </li>

                <li>
                  Qubicbox acts as the backbone, ensuring robust digital security for all platforms, while also supporting businesses listed on Qlutterbox and Qubictry with tools to strengthen their digital presence and protect their data.
                </li>
              </ol>

              Together, these platforms form a cohesive ecosystem that fosters innovation, growth, and security, enabling users to navigate and excel in today’s digital and physical marketplaces.
            </p>
            <br />
            <h2>Join the Qubicweb Community</h2>
            <p>
              Stay informed and empowered with Qubicweb. Whether it’s cybersecurity, AI, software development, or emerging tech trends, Qubicweb equips you with the knowledge to thrive in the digital age. Sign up for the Qubicweb newsletter at <a href="https://newsletter.qubicweb.com">newsletter.qubicweb.com</a> or contact us at <a href="mailto:info@qubicweb.com">info@qubicweb.com</a>.
            </p>

          </div>
          {/* </div> */}
          {/* </div> */}
          <div className="space-50" />
        </>
      </BreadCrumb>
      <div className="archives padding-top-30">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-lg-8">
              <div className="row">
                <div className="col-10 align-self-center">
                  <div className="about_post_list">
                    <Nav tabs>
                      <NavItem>
                        <div
                          className={activeTab === "1" ? "active" : ""}
                          onClick={() => {
                            toggle("1");
                          }}
                        >
                          Latest news
                        </div>
                      </NavItem>
                      <NavItem>
                        <div
                          className={activeTab === "2" ? "active" : ""}
                          onClick={() => {
                            toggle("2");
                          }}
                        >
                          Popular news
                        </div>
                      </NavItem>
                    </Nav>
                  </div>
                </div>
                <div className="col-2 text-right align-self-center">
                  <div className="calender mb20">
                    <img src={calendar} alt="calendar" />
                  </div>
                </div>
              </div>
              <div className="about_posts_tab">
                <TabContent activeTab={activeTab}>
                  <TabPane tabId="1">
                    <Fade in={activeTab === "1"}>
                      <div className="row justify-content-center">
                        <EntertainmentNews
                          headerHide={true}
                          entertainments={entertainments2}
                        />
                      </div>
                    </Fade>
                  </TabPane>
                  <TabPane tabId="2">
                    <Fade in={activeTab === "2"}>
                      <div className="row justify-content-center">
                        <EntertainmentNews
                          headerHide={true}
                          entertainments={entertainments2}
                        />
                      </div>
                    </Fade>
                  </TabPane>
                </TabContent>
              </div>
              {/* <div className="row">
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
              </div> */}
            </div>
            <div className="col-md-6 col-lg-4">
              <WidgetTab />
            </div>
          </div>
        </div>
      </div>
      <div className="space-70" />
    </>
  );
}

export default About;
