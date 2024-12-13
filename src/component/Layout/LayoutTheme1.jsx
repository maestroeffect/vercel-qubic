import React from "react";
import ProtoTypes from "prop-types";
import TopBar from "../../component/TopBar";
import LogoArea from "../../component/LogoArea";
import MainMenu from "../../component/MainMenu";
import FooterArea from "../../component/FooterArea";
import { Outlet } from "react-router-dom";
import ScrollTopButton from "../ScrollTopButton";

const LayoutTheme1 = ({ children }) => {
  return (
    <div className="theme-1">
      <ScrollTopButton />
      <TopBar className="white_bg" />
      <div className="border_black" />
      {/* Logo and Main Menu in a single row */}
      <div className="sticky-header">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-3 flex-grow-0">
              <LogoArea className="white_bg" />
            </div>
            <div className="col-md-9">
              <div className="d-flex justify-content-end">
                <MainMenu />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Outlet />
      {children}
      <FooterArea className="primay_bg" />
    </div>
  );
};
export default LayoutTheme1;

LayoutTheme1.propTypes = {
  children: ProtoTypes.node,
};
