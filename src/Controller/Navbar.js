import React from "react";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../Model/firebase";
import "../View/Navbar.css";
import { useStateValue } from "../Model/StateProvider";

function Navbar() {
  const history = useHistory();
  const handleAuthentication = (e) => {
    e.preventDefault();
    auth.signOut().then(() => {
      console.log("User Signed Out");
      history.push("/login");
    });
  };

  const [{ user, userName, rentbox }, dispatch] = useStateValue();

  return (
    <nav className="navbar">
      <div className="nav-wrapper grey darken-4 navbar__conainer">
        <Link className="brand-logo center navbar__logo" to="/">
          OMANGA
        </Link>
        <ul id="nav-mobile" className="left">
          <li>
            <Link to="/rentbox">Rent-Box: {rentbox?.length} </Link>
          </li>
          <li>
            <Link to="/myManga">My-Manga</Link>
          </li>
          <li>
            <Link to="/account">{user ? user.displayName : "Guest"} </Link>
          </li>
          <li>
            <button
              onClick={handleAuthentication}
              className="btn light-blue waves-effect waves-light darken-3 header__logoutButton"
            >
              Log Out
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
