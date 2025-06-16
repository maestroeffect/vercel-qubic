// import React from "react";
import PropTypes from "prop-types";
import TopBar from "../../component/TopBar";
import LogoArea from "../../component/LogoArea";
import MainMenu from "../../component/MainMenu";
import FooterArea from "../../component/FooterArea";
import { Outlet } from "react-router-dom";
import ScrollTopButton from "../ScrollTopButton";
import { useTheme } from "../../context/ThemeContext"; // Import the context
import ScrollToTop from "../ScrollTop/ScrollTop";

const LayoutTheme1 = ({ children }) => {
  const { darkMode, toggleDarkMode } = useTheme(); // Get dark mode and toggle function from context

  return (
    <>
      <ScrollToTop />
      <div className={`theme-1 ${darkMode ? "dark-theme" : ""}`}>
        <ScrollTopButton />
        <TopBar className={darkMode ? "dark-theme" : "white_bg"} />
        <div className={`border_${darkMode ? "white" : "black"}`} />
        {/* Logo and Main Menu in a single row */}

        <div className={`sticky-header ${darkMode ? "dark-theme" : ""}`}>
          <div className="row">
            <div className="container">
              <div className="d-flex align-items-center justify-content-between">
                <div className="col-lg-3 p-0 m-0">
                  <LogoArea className={darkMode ? "dark_bg" : "white_bg"} />
                </div>
                <div className="col-lg-9 p-0 flex-grow-1 justify-content-end">
                  <MainMenu dark={darkMode} toggleDarkMode={toggleDarkMode} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <Outlet />
        {children}
        <FooterArea className={darkMode ? "dark-theme" : "primay_bg"} />
      </div>
    </>
  );
};

LayoutTheme1.propTypes = {
  children: PropTypes.node,
  dark: PropTypes.bool.isRequired,
  toggleDarkMode: PropTypes.func.isRequired,
};

export default LayoutTheme1;
