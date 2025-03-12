import { useState } from "react";
import ProtoTypes from "prop-types";
import { NavLink } from "react-router-dom";
import FontAwesome from "../uiStyle/FontAwesome";
import { Collapse } from "reactstrap";

import "./style.scss";

const SidebarMenu = ({ menus, sideShow, setSideShow, className }) => {
  const [sMenu, setSMenu] = useState(null);
  const [stMenu, setSTMenu] = useState(null);
  // const location = useLocation(); // Get current URL

  // Remove the last item (Digital Directory)
  const filteredMenus = menus.slice(0, -1);

  return (
    <div
      className={`sidebarMenu ${sideShow ? "" : "hideSideMenu"} ${
        className ? className : ""
      }`}
    >
      {/* Close icon (bigger size) */}
      <span className="clox" onClick={() => setSideShow(false)}>
        <FontAwesome name="times" style={{ fontSize: "25px" }} />
      </span>

      <ul className="navBar">
        {filteredMenus.length > 0
          ? filteredMenus.map((item, i) => (
              <li key={i} className={`${item.child ? "has_sub" : ""}`}>
                {item.child ? (
                  <p
                    onClick={() => setSMenu(item.id === sMenu ? null : item.id)}
                    className={sMenu === item.id ? "active" : ""}
                  >
                    {item.linkText}
                    <FontAwesome
                      name={
                        sMenu === item.id ? "angle-down active" : "angle-down"
                      }
                      style={{ fontSize: "16px" }}
                    />
                  </p>
                ) : (
                  <NavLink
                    to={item.link}
                    className={({ isActive }) => (isActive ? "active" : "")} // Correct active behavior
                    onClick={() => setSideShow(false)} // Close sidebar on click
                  >
                    {item.linkText}
                  </NavLink>
                )}
                {item.child ? (
                  <Collapse isOpen={sMenu === item.id}>
                    <ul className="subMenu">
                      {item.submenu.map((sub_item, i) => (
                        <li
                          key={i}
                          className={`${sub_item.child ? "has_sub" : ""}`}
                        >
                          {sub_item.child ? (
                            <p
                              onClick={() =>
                                setSTMenu(
                                  sub_item.id === stMenu ? null : sub_item.id
                                )
                              }
                              className={stMenu === sub_item.id ? "active" : ""}
                            >
                              {sub_item.linkText}
                              <FontAwesome
                                name={
                                  stMenu === sub_item.id
                                    ? "angle-down active"
                                    : "angle-down"
                                }
                                style={{ fontSize: "16px" }}
                              />
                            </p>
                          ) : (
                            <NavLink
                              to={sub_item.link}
                              className={({ isActive }) =>
                                isActive ? "active" : ""
                              }
                              onClick={() => setSideShow(false)} // Close sidebar on click
                            >
                              {sub_item.linkText}
                            </NavLink>
                          )}
                        </li>
                      ))}
                    </ul>
                  </Collapse>
                ) : null}
              </li>
            ))
          : null}
      </ul>
    </div>
  );
};

export default SidebarMenu;

SidebarMenu.propTypes = {
  className: ProtoTypes.string,
  menus: ProtoTypes.array,
  sideShow: ProtoTypes.bool,
  setSideShow: ProtoTypes.func,
};
