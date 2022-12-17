import classNames from "classnames";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../css/Navbar.css";
import { UserInfo } from "../types";
import { removeUserItem, setUserItem } from "../utils/localstorage";
// import {
//   signInWithWeb3Onboard,
//   signOutWithWeb3Onboard,
// } from "../utils/web3-onboard";

const Navbar = (props: any) => {
  const [user, setUser] = useState<UserInfo | undefined>(undefined);
  const location = useLocation();
  const isArtistPage = location.pathname.includes("/artist-page");

  const web3 = props.web3;



  const onClickSignOut = async () => {
    await web3.signOutWithWeb3Onboard();
    removeUserItem();
    setUser(undefined);
  };

  const onClickSignIn = async () => {
    const address = await web3.signInWithWeb3Onboard();
    if (address) {
      const userInfo = { role: "USER", address } as UserInfo;
      setUserItem(userInfo);
      setUser(userInfo);
    }
  };

  return (
    <div className={classNames("navbar", { isArtistPage })}>
      <div className="navbar_left_items">
        <Link to={"/"} className="link">
          <div className="main_title">Fantosi</div>
        </Link>
        <input
          className={classNames({ isArtistPage })}
          placeholder="Tell me your Fantosi ;"
        />
        <div id="search_icon" />
      </div>
      <div className="navbar_right_items">
        <Link
          key={"artist"}
          to={"/artist-page/newjeans-0"}
          className={`nav_btn link ${location.pathname.includes("/artist") ? "navbar_active" : ""
            }`}
        >
          ARTIST
        </Link>

        <Link
          key={"my"}
          to={"/"}
          className={`nav_btn link ${location.pathname.includes("/about-us") ? "navbar_active" : ""
            }`}
        >
          MY
        </Link>

        {user ? (
          <div className="nav_btn link" onClick={onClickSignOut}>
            SIGN OUT
          </div>
        ) : (
          <div className="nav_btn link" onClick={onClickSignIn}>
            SIGN UP
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
