import React from "react";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../Model/firebase";
import "../View/Navbar.css";
import { useStateValue } from "../Model/StateProvider";

function Navbar() {
  const history = useHistory();
  const [{ user, userName, rentbox }, dispatch] = useStateValue();
  const handleAuthentication = (e) => {
    e.preventDefault();
    if (user) {
      auth.signOut();
      history.push("/login");
    } else {
      alert("no user");
    }
  };
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
            <Link to="/">My-Manga</Link>
          </li>
          <li>
            <Link to="/account">
              {user ? user?.displayName : history.push("/login")}
            </Link>
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
