import { useState } from "react";
import ProtoTypes from "prop-types";
import { TabContent, TabPane, Nav, NavItem, Fade } from "reactstrap";
import classnames from "classnames";
import { Link } from "react-router-dom";
// import QubicwebFeed from "../RssParser";
import { useSelector } from "react-redux";
import WithLoadingAndError from "../LoadErrorHandle";

const WidgetTabPane = ({ articles, a_id, id, dark }) => {
  return (
    <Fade in={id === a_id}>
      <div className="widget tab_widgets">
        {articles.slice(0, 5).map((item, i) => (
          <div key={i}>
            <div className="single_post widgets_small">
              <div className="post_img">
                <div className="img_wrap">
                  <Link to="/">
                    <img
                      src={item?.image}
                      style={{
                        width: "80px",
                        height: "64px",
                        objectFit: "cover",
                      }}
                      alt="thumb"
                    />
                  </Link>
                </div>
              </div>
              <div className="single_post_text">
                <div className="meta2 meta_separator1">
                  <Link to="#">{item.category.slice(0, 15)}</Link>
                  <Link to="#">{item.publishedDate}</Link>
                </div>
                <h4>
                  <Link to={item.link} onClick={(e) => {
                    e.preventDefault();
                    window.open(item.link, "_blank", "noopener,noreferrer");
                  }}>
                    {item.title.slice(0, 50)}...
                  </Link>
                </h4>
              </div>
            </div>
            <div className="space-15" />
            {dark ? (
              <div className="border_white" />
            ) : (
              <div className="border_black" />
            )}
            <div className="space-15" />
          </div>
        ))}
      </div>
    </Fade>
  );
};

WidgetTabPane.propTypes = {
  articles: ProtoTypes.array,
  a_id: ProtoTypes.string,
  id: ProtoTypes.string,
  dark: ProtoTypes.bool,
};

const WidgetTab = ({ className }) => {
  const [activeTab, setActiveTab] = useState("1");
  const { articles } = useSelector((state) => state.feed)
  // const { articles, error } = useSelector((state) => state.feed);

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const classifyArticles = () => {
    const now = new Date();
    const trending = [];
    const related = [];
    const popular = [];

    articles.forEach((article) => {
      const publishedDate = new Date(article.publishedDate);
      const diffInDays = (now - publishedDate) / (1000 * 60 * 60 * 24);

      if (diffInDays <= 7) {
        trending.push(article);
      } else if (diffInDays <= 10) {
        related.push(article);
      } else {
        popular.push(article);
      }
    });

    return { trending, related, popular };
  };

  const { trending, related, popular } = classifyArticles();

  return (
    <WithLoadingAndError>
      <div className={`widget_tab md-mt-30 ${className}`}>
        <Nav tabs>
          <NavItem>
            <Link
              to="/"
              className={classnames({ active: activeTab === "1" })}
              onClick={() => {
                toggle("1");
              }}
            >
              TRENDING
            </Link>
          </NavItem>
          <NavItem>
            <Link
              to="/"
              className={classnames({ active: activeTab === "2" })}
              onClick={() => {
                toggle("2");
              }}
            >
              RELATED
            </Link>
          </NavItem>
          <NavItem>
            <Link
              to="/"
              className={classnames({ active: activeTab === "3" })}
              onClick={() => {
                toggle("3");
              }}
            >
              POPULAR
            </Link>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <WidgetTabPane a_id={activeTab} id="1" articles={trending} />
          </TabPane>
          <TabPane tabId="2">
            <WidgetTabPane a_id={activeTab} id="2" articles={related} />
          </TabPane>
          <TabPane tabId="3">
            <WidgetTabPane a_id={activeTab} id="3" articles={popular} />
          </TabPane>
        </TabContent>
      </div>
    </WithLoadingAndError>
  );
};

WidgetTab.propTypes = {
  className: ProtoTypes.string,
  // dark: ProtoTypes.bool,
};

export default WidgetTab;
