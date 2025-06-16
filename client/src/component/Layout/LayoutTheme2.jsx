import React from "react";
import ProtoTypes from "prop-types";
import { Outlet } from "react-router-dom";
import TopBarTwo from "../../component/TopBarTwo";
import LogoAreaTwo from "../../component/LogoAreaTwo";
import MainMenuTwo from "../../component/MainMenuTwo";
import FooterAreaTwo from "../../component/FooterAreaTwo";
import ScrollTopButton from "../ScrollTopButton";

const LayoutTheme2 = ({ children }) => {
  return (
    <div className="theme-3 theme3_bg">
      <ScrollTopButton />
      <TopBarTwo />
      <div className="border_black" />
      <LogoAreaTwo />
      <MainMenuTwo />
      <Outlet />
      {children}
      <FooterAreaTwo />
    </div>
  );
};
export default LayoutTheme2;

LayoutTheme2.propTypes = {
  children: ProtoTypes.node,
};
