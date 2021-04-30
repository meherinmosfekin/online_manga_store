import React from "react";
import "../View/Authentication.css";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

function Authentication() {
  return (
    <div className="container authentication">
      <h1 className="center brand-logo">Omanga</h1>
      <div className="z-depth-3 authentication__left">
        <SignIn />
      </div>
      <div className="z-depth-3 authentication__right">
        <SignUp />
      </div>
    </div>
  );
}

export default Authentication;
