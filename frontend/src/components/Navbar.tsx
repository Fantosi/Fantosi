import classNames from "classnames";
import { Link, useLocation } from "react-router-dom";
import "../css/Navbar.css";
import { UserInfo, Web3Type } from "../types";

interface NavbarProps {
  web3: Web3Type;
  user: UserInfo | undefined;
  signIn: () => Promise<void>;
  onClickSignOut: () => Promise<void>;
}

const Navbar = ({ user, signIn, onClickSignOut }: NavbarProps) => {
  const location = useLocation();
  const transparent =
    location.pathname.includes("/artist-page") ||
    location.pathname.includes("/treasury-page");

  return (
    <div className={classNames("navbar", { transparent })}>
      <div className="navbar_left_items">
        <Link to={"/"} className="link">
          <div className="main_title">Fantosi</div>
        </Link>
        <input
          className={classNames({ transparent })}
          placeholder="Tell me your Fantosi ;"
        />
        <div id="search_icon" />
      </div>
      <div className="navbar_right_items">
        <Link
          key={"artist"}
          to={"/artist-page/newjeans-0"}
          className={`nav_btn link ${
            location.pathname.includes("/artist") ? "navbar_active" : ""
          }`}
        >
          ARTIST
        </Link>

        <Link
          key={"my"}
          to={"/"}
          className={`nav_btn link ${
            location.pathname.includes("/about-us") ? "navbar_active" : ""
          }`}
        >
          MY
        </Link>

        {user ? (
          <div className="nav_btn link" onClick={onClickSignOut}>
            SIGN OUT
          </div>
        ) : (
          <div className="nav_btn link" onClick={signIn}>
            SIGN UP
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
