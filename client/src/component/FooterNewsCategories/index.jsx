import React from "react";
import { Link } from "react-router-dom";

const FooterNewsCategories = () => {
  return (
    <>
      <h3 className="widget-title">News categories</h3>
      <div className="row">
        <div className="col-lg-6">
          <ul>
            <li>
              <Link to="/">Cybersecurity</Link>
            </li>
            <li>
              <Link to="/">Devops</Link>
            </li>
            <li>
              <Link to="/">Software</Link>
            </li>

          </ul>
        </div>
        <div className="col-lg-6">
          <ul>
            <li>
              <Link to="/">Machine Learning</Link>
            </li>
            <li>
              <Link to="/">Development</Link>
            </li>
            <li>
              <Link to="/">Artificial Intelligence</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default FooterNewsCategories;
