import * as React from 'react';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import FontAwesome from "../uiStyle/FontAwesome";
import { Link, NavLink } from "react-router-dom";
import SearchModal from "../SearchModal";
import SidebarMenu from "../SidebarMenu";
import useWeatherAndDate from "../WeatherDate";
import ProtoTypes from "prop-types";
import { useTheme } from '../../context/ThemeContext';
import { useTheme as useMuiTheme } from "@mui/material/styles"; // Import MUI's useTheme hook
import SearchBar from '../SearchBar';


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
    link: "/feedDirectory",
    // icon: "angle-down",
  },

];
const menusDark = [
  {
    id: 1,
    linkText: "Home",
    child: true,
    icon: "angle-down",
    submenu: [
      {
        id: 11,
        link: "/",
        linkText: "Home 1",
      },
      {
        id: 12,
        link: "/dark",
        linkText: "Home Dark",
      },
      {
        id: 13,
        new: true,
        link: "/home-two",
        linkText: "Home 2",
      },
      {
        id: 14,
        link: "/home-three",
        linkText: "Home 3",
      },
    ],
  },
  {
    id: 2,
    linkText: "Pages",
    child: true,
    icon: "angle-down",
    submenu: [
      {
        id: 21,
        link: "/dark/about",
        linkText: "About",
      },
      {
        id: 22,
        link: "/dark/archive",
        linkText: "Archive",
      },
      {
        id: 23,
        link: "/dark/contact",
        linkText: "Contact Us",
      },
      {
        id: 24,
        link: "/dark/404",
        linkText: "404",
      },
    ],
  },
  {
    id: 3,
    linkText: "Posts",
    child: true,
    icon: "angle-down",
    submenu: [
      {
        id: 31,
        child: true,
        linkText: "General Posts",
        third_menu: [
          {
            id: 311,
            link: "/dark/post1",
            linkText: "Post 1",
          },
          {
            id: 312,
            link: "/dark/post2",
            linkText: "Post 2",
          },
          {
            id: 313,
            link: "/dark/post3",
            linkText: "Post 3",
          },
        ],
      },
      {
        id: 32,
        child: true,
        linkText: "Video Posts",
        third_menu: [
          {
            id: 321,
            link: "/dark/video_post1",
            linkText: "Video Style 1",
          },
          {
            id: 322,
            link: "/dark/video_post2",
            linkText: "Video Style 2",
          },
          {
            id: 323,
            link: "/dark/video_post3",
            linkText: "Video Style 3",
          },
        ],
      },
      {
        id: 33,
        child: true,
        linkText: "Audio Posts",
        third_menu: [
          {
            id: 331,
            link: "/dark/audio_post1",
            linkText: "Audio Style 1",
          },
          {
            id: 332,
            link: "/dark/audio_post2",
            linkText: "Audio Style 2",
          },
          {
            id: 333,
            link: "/dark/audio_post3",
            linkText: "Audio Style 3",
          },
        ],
      },
      {
        id: 34,
        child: true,
        linkText: "Sidebars",
        third_menu: [
          {
            id: 341,
            link: "/dark/post1",
            linkText: "Right Sidebar",
          },
          {
            id: 342,
            link: "/dark/left_post2",
            linkText: "Left Sidebar",
          },
          {
            id: 343,
            link: "/dark/post2",
            linkText: "No Sidebar",
          },
        ],
      },
    ],
  },
  {
    id: 4,
    linkText: "Categories",
    child: true,
    icon: "angle-down",
    submenu: [
      {
        id: 41,
        link: "/dark/business",
        linkText: "Business",
      },
      {
        id: 42,
        link: "/dark/entertainment",
        linkText: "Entertainment",
      },
      {
        id: 43,
        link: "/dark/features",
        linkText: "Features",
      },
      {
        id: 44,
        link: "/dark/sports",
        linkText: "Sports",
      },
      {
        id: 45,
        link: "/dark/trending",
        linkText: "Trending",
      },
    ],
  },
  {
    id: 5,
    linkText: "World",
    link: "/dark/world",
  },
  {
    id: 6,
    linkText: "Sports",
    link: "/dark/sports",
  },
  {
    id: 7,
    linkText: "Contact",
    link: "/dark/contact",
  },
];

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 58,
  height: 30,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.primary.main,
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
    width: 28,
    height: 28,
    '&::before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        '#fff',
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
    // ...theme.applyStyles('dark', {
    //   backgroundColor: '#003892',
    // }),
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2,
    // ...theme.applyStyles('dark', {
    //   backgroundColor: '#8796A5',
    // }),
  },
}));

const MainMenu = ({ className }) => {
  const [searchShow, setSearchShow] = useState(false);
  const [sideShow, setSideShow] = useState(false);
  const { weather, dateTime, location } = useWeatherAndDate();
  const { darkMode, toggleDarkMode } = useTheme(); // Access context values
  // Access the MUI theme object
  const muiTheme = useMuiTheme();

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
                        label={darkMode ? 'Dark Mode' : 'Light Mode'}
                        sx={{
                          '& .MuiFormControlLabel-label': {
                            fontSize: '0.85rem', // Adjust the font size here
                            fontWeight: 'bold',
                            marginLeft: '8px',  // Optional spacing adjustment
                            fontFamily: 'Garamond, serif', // Ensure Garamond font is applied
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
