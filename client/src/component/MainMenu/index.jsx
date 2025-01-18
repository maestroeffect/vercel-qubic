import { useState } from "react";
import { styled } from "@mui/material/styles";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import FontAwesome from "../uiStyle/FontAwesome";
import { Link, NavLink } from "react-router-dom";
import SearchModal from "../SearchModal";
import SidebarMenu from "../SidebarMenu";
import ProtoTypes from "prop-types";
import { useTheme } from "../../context/ThemeContext";

const menus = [
  {
    id: 1,
    linkText: "Qubicbrief",
    child: false,
    // icon: "angle-down",
  },
  {
    id: 2,
    linkText: "Qubicshield",
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
    linkText: "Qubicdirectory",
    child: false,
    link: "https://app.qubicweb.com",
    // icon: "angle-down",
    target: "_blank", // Add this
  },
];

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 58,
  height: 30,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.primary.main,
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
    width: 28,
    height: 28,
    "&::before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        "#fff"
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
    // ...theme.applyStyles('dark', {
    //   backgroundColor: '#003892',
    // }),
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
    borderRadius: 20 / 2,
    // ...theme.applyStyles('dark', {
    //   backgroundColor: '#8796A5',
    // }),
  },
}));

const MainMenu = ({ className }) => {
  const [searchShow, setSearchShow] = useState(false);
  const [sideShow, setSideShow] = useState(false);
  const { darkMode, toggleDarkMode } = useTheme(); // Access context values
  // Access the MUI theme object

  // Check if muiTheme is correctly being accessed
  // console.log("muiTheme is:", muiTheme);
  const arr = darkMode ? menus : menus;
  // console.log(darkMode)
  return (
    <>
      <div className={`main-menu ${className ? className : ""}`} id="header">
        <Link to="#top" className="up_btn up_btn1">
          <FontAwesome name="chevron-double-up" />
        </Link>
        <div className="main-nav clearfix is-ts-sticky">
          <div className="container p-0">
            <div className="row justify-content-between">
              <nav className="navbar navbar-expand-lg col-lg-8  p-0 align-self-center">
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
                              className={`
                                                  ${item.child ? "dropdown" : ""} 
                                                  nav-item`}
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
                  {/* <div className="lang d-none d-xl-block ms-4">
                    <ul className="d-flex align-items-center">
                      <li>
                        <Link to="/" className="d-flex align-items-center">
                          <span className="">English</span>
                        </Link>
                        <ul>
                          <li>
                            <Link to="/">Yoruba</Link>
                          </li>
                          <li>
                            <Link to="/">Hausa</Link>
                          </li>
                          <li>
                            <Link to="/">Igbo</Link>
                          </li>
                          <li>
                            <Link to="/">French</Link>
                          </li>
                          <li>
                            <Link to="/">Spanish</Link>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div> */}
                  <div className="dark-mode-switch ms-4 mt-2 pl-4">
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <MaterialUISwitch
                            checked={darkMode}
                            onChange={toggleDarkMode}
                          />
                        }
                        label={darkMode ? "Dark Mode" : "Light Mode"}
                        sx={{
                          "& .MuiFormControlLabel-label": {
                            fontSize: "0.85rem", // Adjust the font size here
                            fontWeight: "bold",
                            marginLeft: "8px", // Optional spacing adjustment
                            fontFamily: "Garamond, serif", // Ensure Garamond font is applied
                          },
                        }}
                      />
                    </FormGroup>
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
