import { useState } from "react";

import FontAwesome from "../uiStyle/FontAwesome";
import { Link, NavLink } from "react-router-dom";
import SearchModal from "../SearchModal";
import SidebarMenu from "../SidebarMenu";
import ProtoTypes from "prop-types";
import { useTheme } from "../../context/ThemeContext";

// Import Remix Icon CSS
import "remixicon/fonts/remixicon.css";

const menus = [
  {
    id: 1,
    linkText: "Digital Brief",
    child: false,
    // icon: "angle-down",
  },
  {
    id: 2,
    linkText: "Cybershield",
    child: false,
    link: "/cybershield",
    // icon: "angle-down",
  },
  {
    id: 3,
    linkText: "About",
    child: false,
    link: "/about",
    // icon: "angle-down",
  },
  {
    id: 4,
    linkText: "Blog",
    child: false,
    link: "/blog",
    // icon: "angle-down",
  },
  {
    id: 5,
    linkText: "Digital Directory",
    child: false,
    link: "https://app.qubicweb.com",
    // icon: "angle-down",
    target: "_blank", // Add this
  },
];

const MainMenu = ({ className }) => {
  const [searchShow, setSearchShow] = useState(false);
  const [sideShow, setSideShow] = useState(false);
  const { darkMode, toggleDarkMode } = useTheme(); // Access context values

  const arr = darkMode ? menus : menus;

  return (
    <>
      <div className={`main-menu ${className ? className : ""}`} id="header">
        <Link to="#top" className="up_btn up_btn1">
          <FontAwesome name="chevron-double-up" />
        </Link>
        <div className="main-nav clearfix is-ts-sticky">
          <div className="container p-0">
            <div className="row justify-content-between">
              <nav className="navbar navbar-expand-lg col-lg-8 p-0 align-self-center">
                <div className="site-nav-inner">
                  <button
                    className="navbar-toggler"
                    onClick={() => setSideShow(true)}
                  >
                    <FontAwesome name="bars" />
                  </button>
                  <div
                    id="navbarSupportedContent"
                    className="collapse navbar-collapse navbar-responsive-collapse"
                  >
                    <ul className="nav navbar-nav" id="scroll">
                      {arr.length > 0
                        ? arr.map((item, i) => (
                            <li
                              key={i}
                              className={`${item.child ? "dropdown" : ""} nav-item`}
                            >
                              {item.child ? (
                                <NavLink
                                  onClick={(e) => e.preventDefault()}
                                  to="/"
                                  className="menu-dropdown fw-bold"
                                  data-toggle="dropdown"
                                >
                                  {item.linkText}
                                  <FontAwesome name={item.icon} />
                                </NavLink>
                              ) : (
                                <NavLink
                                  to={item.link}
                                  className="menu-dropdown fw-bold"
                                  data-toggle="dropdown"
                                >
                                  {item.linkText}{" "}
                                  <FontAwesome name={item.icon} />
                                </NavLink>
                              )}
                              {item.child ? (
                                <ul className="dropdown-menu" role="menu">
                                  {item.submenu.map((sub_item, i) => (
                                    <li key={i}>
                                      <NavLink to={sub_item.link}>
                                        {sub_item.linkText}
                                      </NavLink>
                                    </li>
                                  ))}
                                </ul>
                              ) : null}
                            </li>
                          ))
                        : null}
                    </ul>
                  </div>
                  <SidebarMenu
                    sideShow={sideShow}
                    setSideShow={setSideShow}
                    menus={arr}
                  />
                </div>
              </nav>
              <div className="col-lg-4 align-self-center">
                <div className="menu_right d-flex align-items-center justify-content-end">
                  <div className="users_area d-flex align-items-center">
                    {/* <SearchBar /> */}
                    <ul className="inline d-flex align-items-center mb-0">
                      <li
                        className="search_btn me-3"
                        onClick={() => setSearchShow(!searchShow)}
                      >
                        <FontAwesome name="search" />
                      </li>
                    </ul>
                  </div>
                  <div className="dark-mode-switch ms-4 mt-2 pl-4">
                    <i
                      onClick={toggleDarkMode}
                      className={`ri-${darkMode ? "moon-clear-line" : "sun-line"}`}
                      style={{
                        fontSize: "2rem",
                        cursor: "pointer",
                        color: darkMode ? "#ffd700" : "#ffa500",
                      }}
                    ></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {searchShow ? (
        <SearchModal setSearchShow={setSearchShow} searchShow={searchShow} />
      ) : null}
    </>
  );
};

MainMenu.propTypes = {
  className: ProtoTypes.string,
  dark: ProtoTypes.bool,
  toggleDarkMode: ProtoTypes.func.isRequired,
};

export default MainMenu;
