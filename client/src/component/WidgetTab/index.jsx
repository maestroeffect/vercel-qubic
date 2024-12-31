import React, { useEffect, useState } from "react";
import ProtoTypes from "prop-types";
import { TabContent, TabPane, Nav, NavItem, Fade } from "reactstrap";
import classnames from "classnames";
import { Link } from "react-router-dom";

import thumb1 from "../../assets/img/gallery-1.jpg";
import thumb2 from "../../assets/img/gallery-2.jpg";
import thumb3 from "../../assets/img/gallery-3.jpg";
import thumb4 from "../../assets/img/gallery-4.jpg";
import thumb5 from "../../assets/img/gallery-5.jpg";
// import QubicwebFeed from "../RssParser";

const data = [
  {
    image: thumb1,
    title: "Copa America: Luis Suarez from devastated US",
    category: "TECHNOLOGY",
    date: "March 26, 2020",
  },
  {
    image: thumb2,
    title: "Nancy Zhang a Chinese busy woman and Dhaka",
    category: "TECHNOLOGY",
    date: "March 26, 2020",
  },
  {
    image: thumb3,
    title: "U.S. Response subash says he will label regions by risk of…",
    category: "TECHNOLOGY",
    date: "March 26, 2020",
  },
  {
    image: thumb4,
    title: "Venezuela elan govt and opposit the property collect",
    category: "TECHNOLOGY",
    date: "March 26, 2020",
  },
  {
    image: thumb5,
    title: "Cheap smartphone sensor could help you old food safe",
    category: "TECHNOLOGY",
    date: "March 26, 2020",
  },
];

const WidgetTabPane = ({ arr, a_id, id, dark }) => {
  // const { articles, error } = QubicwebFeed();
  const generateSlug = (title) => title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");

  return (
    <Fade in={id === a_id}>
      <div className="widget tab_widgets">
        {data.slice(0, 3).map((item, i) => (
          <div key={i}>
            <div className="single_post widgets_small">
              <div className="post_img">
                <div className="img_wrap">
                  <Link to="/">
                    <img src={item.image} alt="thumb" />
                  </Link>
                </div>
              </div>
              <div className="single_post_text">
                <div className="meta2 meta_separator1">
                  <Link to="#">{item.category}</Link>
                  <Link to="#">{item.date}</Link>
                </div>
                <h4>
                  <Link to={`/${generateSlug(item.title)}`}>{item.title}</Link>
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
  arr: ProtoTypes.array,
  a_id: ProtoTypes.string,
  id: ProtoTypes.string,
  dark: ProtoTypes.bool,
};

const WidgetTab = ({ className, dark }) => {
  const [activeTab, setActiveTab] = useState("1");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
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
          <WidgetTabPane dark={dark} a_id={activeTab} id="1" arr={data} />
        </TabPane>
        <TabPane tabId="2">
          <WidgetTabPane dark={dark} a_id={activeTab} id="2" arr={data} />
        </TabPane>
        <TabPane tabId="3">
          <WidgetTabPane dark={dark} a_id={activeTab} id="3" arr={data} />
        </TabPane>
      </TabContent>
    </div>
  );
};

export default WidgetTab;

WidgetTab.propTypes = {
  className: ProtoTypes.string,
  dark: ProtoTypes.bool,
};
