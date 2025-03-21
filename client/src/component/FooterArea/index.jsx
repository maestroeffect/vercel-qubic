import { useState } from "react";
import ProtoTypes from "prop-types";
import { Link } from "react-router-dom";
import FooterCopyright from "../FooterCopyright";

import FontAwesome from "../uiStyle/FontAwesome";

import flogo from "../../assets/img/footer_logo.png";

const FooterArea = ({ className }) => {
  const [email, setEmail] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    setEmail("");
  };
  return (
    <div className={`footer footer_area1 ${className ? className : ""}`}>
      <div className="container">
        <div className="cta">
          <div className="row">
            <div className="col-md-6 align-self-center">
              <div className="footer_logo logo">
                <Link to="/">
                  <img src={flogo} alt="logo" />
                </Link>
              </div>
              <div className="Qubicweb">
                <ul className="inline">
                  <li>
                    <Link to="#">
                      <FontAwesome name="twitter" />
                    </Link>
                  </li>
                  <li>
                    <Link to="#">
                      <FontAwesome name="facebook-f" />
                    </Link>
                  </li>
                  <li>
                    <Link to="#">
                      <FontAwesome name="youtube-play" />
                    </Link>
                  </li>
                  <li>
                    <Link to="#">
                      <FontAwesome name="instagram" />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-6 col-lg-4 offset-lg-2 align-self-top">
              <div className="signup_form">
                <h4 className="text-white py-2">
                  Subscribe to Our Newsletter!
                </h4>
                <form onSubmit={submitHandler}>
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    className="signup"
                    type="email"
                    placeholder="Your email address"
                  />
                  <button type="submit" className="cbtn">
                    sign up
                  </button>
                </form>
                <p className="text-white">We hate spam as much as you do</p>
              </div>
            </div>
          </div>
        </div>
        <div className="border_white" />
        <div className="space-40" />
      </div>
      <FooterCopyright />
    </div>
  );
};

export default FooterArea;

FooterArea.propTypes = {
  className: ProtoTypes.string,
};
