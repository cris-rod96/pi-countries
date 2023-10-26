import styledNav from "./Navbar.module.css";
import { NavLink, useLocation } from "react-router-dom";
import { SearchBar } from "../searchbar/SearchBar";
export const Navbar = (props) => {
  const { pathname } = useLocation();
  return (
    <div className={styledNav.nav}>
      <div className={styledNav.content}>
        <h3 className={styledNav.name}>Countries App</h3>
        <div className={styledNav.search}>
          {pathname === "/home" && <SearchBar />}
        </div>

        <div className={styledNav.menu}>
          <NavLink
            to={"/home"}
            className={({ isActive }) =>
              isActive
                ? `${styledNav.navLink} ${styledNav.active}`
                : `${styledNav.navLink}`
            }
          >
            <span>Home</span>
          </NavLink>
          <NavLink
            to={"/activities"}
            className={({ isActive }) =>
              isActive
                ? `${styledNav.navLink} ${styledNav.active}`
                : `${styledNav.navLink}`
            }
          >
            <span>Activities</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};
