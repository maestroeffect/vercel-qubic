import React from "react";
import ProtoTypes from "prop-types";
import { Link } from "react-router-dom";
import logo from "../../assets/img/logo.png";
import logo2 from "../../assets/img/qubicweblogo.jpeg";
import logoDark from "../../assets/img/footer_logo.png";
import tpBanner from "../../assets/img/banner/banner-1.png";
import banner from "../../assets/img/banner/banner-9.jpg";
import { useTheme } from "../../context/ThemeContext";  // Import the context;

const LogoArea = ({ className }) => {
  const { darkMode, toggleDarkMode } = useTheme();
  return (
    <>
      <div className={`logo_area ${className ? className : ""}`}>
        <div className="container">
          <div className="row">
            <div className=" align-self-center">
              <div className="logo">
                <Link to="/">
                  <img src={darkMode ? logoDark : logo2} alt="logo" />
                </Link>
              </div>
            </div>
            {/* <div className="col-lg-6 align-self-center">
              <div className="banner1">
                <Link to="#">
                  <img src={tpBanner} alt="banner" />
                </Link>
              </div>
            </div> */}
          </div>
        </div>

      </div>
    </>
    // <div className={`logo_area ${className ? className : ""}`}>
    //   <div className="container">
    //     <div className="row">
    //       <div className="col-lg-4 align-self-center">
    //         <div className="logo">

    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default LogoArea;

LogoArea.propTypes = {
  className: ProtoTypes.string,
  dark: ProtoTypes.bool,
};
