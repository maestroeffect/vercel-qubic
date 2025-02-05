import React from "react";
import ProtoTypes from "prop-types";
import { Link } from "react-router-dom";

const BreadCrumb = (props) => {
  const { className = "", title } = props;
  return (
    <div className={`inner_table ${className}`}>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="bridcrumb">
              <Link to="/">The Aggregator</Link> / {title}
            </div>
          </div>
        </div>
        {props.children}
      </div>
    </div>
  );
};

export default BreadCrumb;
BreadCrumb.propTypes = {
  className: ProtoTypes.string,
  title: ProtoTypes.string,
  children: ProtoTypes.node,
};
