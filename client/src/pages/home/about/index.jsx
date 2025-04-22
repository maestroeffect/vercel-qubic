import { Link } from "react-router-dom";
import WidgetTab from "../../../component/WidgetTab";
import EntertainmentNews from "../../../component/EntertainmentNews";
import { Fade, Nav, NavItem, TabContent, TabPane } from "reactstrap";

import calendar from "../../../assets/img/icon/calendar.png";
import { entertainments2 } from "../../../data/entertainments";
import { useState } from "react";

function About() {
  const [activeTab, setActiveTab] = useState("1");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  return (
    <>
      <>
        <div className="space-10" />
        {/* <div className="row"> */}
        {/* <div className="col-lg-12"> */}
        <div className="container p-6 mx-auto">
          {/* <div className="author_img">
                  <div className="author_wrap">
                    <img src={author1} alt="author1" />
                  </div>
                </div> */}
          <div className="author_content">
            <Link
              to="/"
              className="d-flex align-items-baseline text-decoration-none"
            >
              <span className="display-1 fw-bold">Q</span>
              <span className="ms-2 fs-5">ubicweb</span>
            </Link>
          </div>
          <p>
            In today’s fast-paced digital landscape, staying informed about
            cybersecurity, technology trends and innovations is essential.
            Technology continues to transform how businesses operate,
            governments govern and individuals connect. From groundbreaking
            advancements to emerging threats, understanding these shifts is
            crucial for thriving in an increasingly interconnected world.
            <br />
            <br />
            Qubicweb is an online technology aggregator for cybersecurity,
            innovation, and IT-related news, providing real-time, curated
            content for tech professionals, business leaders and policy makers.
            It serves as an intelligence dashboard for staying informed on the
            latest cyber threats, regulatory updates, emerging technologies and
            industry trends. The platform uses intelligent filtering tools to
            deliver personalized news feeds, issue alerts, and expert insights,
            helping users stay ahead of digital risks and market shifts.
          </p>

          <br />
          <h2>What Makes Qubicweb Unique?</h2>
          <br />
          <p>
            Comprehensive Coverage Across Services: Qubicweb is designed to
            offer a dynamic and user-friendly platform that caters to various
            technology and security information needs through its specialized
            services:
          </p>
          <ul>
            <li>
              <span>
                <Link>
                  <b>Digital Brief:</b>{" "}
                </Link>
                Stay informed with the latest technology and security news
                curated from reputable websites. Digital Brief serves as our
                homepage, providing a seamless way to access timely, reliable
                updates at a glance. Here, our commitment to Content
                Transparency shines—Qubicweb doesn’t create or alter these
                stories. Instead, we link you directly to the original articles,
                ensuring you receive accurate information from trusted sources.
              </span>
            </li>
            <li>
              <span>
                <Link>
                  <b>Qybershield:</b>
                </Link>{" "}
                Empower yourself with security awareness materials crafted by
                Qubicweb. These resources, available for free download, are
                designed to help individuals and organizations stay vigilant in
                today’s digital landscape. While these materials are free to
                use, they must remain unchanged to preserve the integrity and
                effectiveness of the content.
              </span>
            </li>
            <li>
              <span>
                <Link>
                  <b>Blog:</b>{" "}
                </Link>
                Dive deeper into technology and security topics through our
                carefully written blog posts. Each post reflects Qubicweb’s
                expertise and insights, offering fresh perspectives and
                practical advice on a wide range of subjects that matter to tech
                enthusiasts and professionals alike.
              </span>
            </li>
            <li>
              <span>
                <Link>
                  <b>Digital Directory:</b>
                </Link>{" "}
                Discover a comprehensive listing of all the websites feeding
                news into Digital Brief. The Digital Directory transforms your
                experience by giving you access to the entire collection of
                stories published by each source. This feature allows you to
                explore beyond the latest headlines, turning Qubicweb into your
                go-to hub for in-depth exploration. Here too, our commitment to
                Content Transparency is evident—Qubicweb acts as a conduit, not
                a creator, ensuring you always know where the stories originate.
              </span>
            </li>
          </ul>
          <br />

          <h2>Why Qubicweb?</h2>
          <br />
          <p>
            In an era where information is abundant but time is scarce, Qubicweb
            stands out by curating technology news from diverse sources and
            presenting it in a streamlined, user-friendly format.
          </p>
          <ul>
            <li>
              Real-time updates: Stay ahead with the latest insights in tech and
              cybersecurity.
            </li>
            <li>
              Credible sources: Access news from verified and authoritative
              websites.
            </li>
            <li>
              Ease of use: Simplify your browsing experience with our intuitive
              interface.
            </li>
          </ul>

          <h2>Advertising</h2>
          <br />
          <p>
            Qubicweb offers tasteful and effective advertising opportunities for
            companies looking to promote their products, services, or events to
            a highly engaged audience. Contact us at{" "}
            <a href="https://advertising@qubicweb.com">
              advertising@qubicweb.com
            </a>{" "}
            for more details.
          </p>

          <br />

          <h2>A Qubicbox Product</h2>
          <p>
            Qubicweb is a proud product of Qubicbox, a brand dedicated to
            building innovative web solutions tailored to solve real-world
            problems for small businesses and individuals. Qubicbox empowers
            users with tools that simplify life and foster informed
            decision-making. Learn more about Qubicbox and its groundbreaking
            products at <Link to="https://qubicbox.com">Qubicbox.com</Link>.
          </p>
          <br />
          <h2>Sister Sites</h2>
          <p>Qubicweb is part of the Qubicbox ecosystem, which includes:</p>
          <ul>
            <li>
              <b>
                {" "}
                <Link>Qubicbox:</Link>
              </b>{" "}
              Qubicbox is a business technology solution brand offering secure
              software services, digital advisory, IT consulting, and web
              application platforms tailored to small and growing businesses. It
              is designed to help organizations secure their digital
              infrastructure, manage technological risks, and drive innovation.
              Qubicbox serves as an innovation hub for business digitization,
              offering tools and expertise that support secure software
              development, digital product delivery, and technology enablement
              for emerging enterprises.
            </li>
            <li>
              <b>
                {" "}
                <Link>Qlutterbox:</Link>
              </b>{" "}
              Qlutterbox is a marketplace platform that allows users to sell and
              buy items securely through agent-assisted listings and integrated
              social commerce tools. It empowers individuals to declutter
              responsibly while offering others access to affordable pre-owned
              goods. The platform leverages a network of verified agents who
              help manage listings, ensuring trust and transparency. Qlutterbox
              also facilitates secure payments, buyer verification and logistics
              coordination to ensure seamless transactions between users.
            </li>
            <li>
              <b>
                {" "}
                <Link>Qubictry:</Link>
              </b>{" "}
              Qubictry is a digital directory platform for artisans and service
              providers, connecting them with customers through a mobile and
              web-based ecosystem. It serves as a trust-based network that
              enhances visibility for skilled individuals and micro-enterprises,
              allowing them to showcase services, build credibility, and attract
              new customers. The platform provides geo-tagged listings, customer
              reviews, direct contact options, and booking tools, simplifying
              how customers discover, engage, and contract local services.
              Qubictry promotes economic inclusion by helping artisans access
              broader markets and scale their businesses digitally.
            </li>
          </ul>

          <br />
          <h2>Join the Qubicweb Community</h2>
          <p>
            Stay informed and empowered with Qubicweb. Whether it’s
            cybersecurity, AI, software development, or emerging tech trends,
            Qubicweb equips you with the knowledge to thrive in the digital age.
            Sign up for the Qubicweb newsletter at{" "}
            <a href="https://newsletter.qubicweb.com">
              newsletter.qubicweb.com
            </a>{" "}
            or contact us at{" "}
            <a href="mailto:info@qubicweb.com">info@qubicweb.com</a>.
          </p>
        </div>
        {/* </div> */}
        {/* </div> */}
        <div className="space-50" />
      </>
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
