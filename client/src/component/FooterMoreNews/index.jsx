import React from "react";
import { Link } from "react-router-dom";

import mobile from "../../assets/img/icon/mobile.png";
import speaker from "../../assets/img/icon/speacker.png";
import envelope from "../../assets/img/icon/evelope.png";
import QubicwebFeed from "../RssParser";

const news = [
  {
    category: "TECHNOLOGY",
    date: "March 26, 2020",
    title: "Nancy zhang a chinese busy woman and dhaka",
  },
  {
    category: "TECHNOLOGY",
    date: "March 26, 2020",
    title: "Nancy zhang a chinese busy woman and dhaka",
  },
  {
    category: "TECHNOLOGY",
    date: "March 26, 2020",
    title: "Nancy zhang a chinese busy woman and dhaka",
  },
  {
    category: "TECHNOLOGY",
    date: "March 26, 2020",
    title: "Nancy zhang a chinese busy woman and dhaka",
  },
  {
    category: "TECHNOLOGY",
    date: "March 26, 2020",
    title: "Nancy zhang a chinese busy woman and dhaka",
  },
];

const FooterMoreNews = () => {
  const { articles, loading, error } = QubicwebFeed();
  return (
    <div className="extra_newss">
      <h3 className="widget-title2">More news</h3>
      {articles.slice(0, 3).map((item, i) => (
        <div key={i} className="single_extra_news border_white_bottom">
          <p>
            {item.category} <span> / {item.publishedDate}</span>
          </p>
          <Link to="/">{item.title.slice(0, 150)}...</Link>
          <span className="news_counter">{i + 1}</span>
        </div>
      ))}
      {/* <div className="space-40" /> */}
      {/* <div className="border_white_bottom" /> */}
      {/* <div className="space-40" />
      <div className="footer_contact">
        <h3 className="widget-title2">Qubicweb news services</h3>
        <div className="single_fcontact">
          <div className="fcicon">
            <img src={mobile} alt="mobile" />
          </div>
          <Link to="/">On your mobile</Link>
        </div>
        <div className="single_fcontact">
          <div className="fcicon">
            <img src={speaker} alt="speaker" />
          </div>
          <Link to="/">On smart speakers</Link>
        </div>
        <div className="single_fcontact">
          <div className="fcicon">
            <img src={envelope} alt="evelope" />
          </div>
          <Link to="/">Contact Qubicweb news</Link>
        </div>
      </div> */}
    </div>
  );
};

export default FooterMoreNews;
