import React, { useState } from "react";
import { useHistory } from "react-router";
import { auth } from "../Model/firebase";
import "../View/SignIn.css";

function SignIn() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = (e) => {
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        if (auth) {
          history.push("/");
        }
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="row">
      <div className="col s6">
        <h1>Log-In</h1>
        <form>
          <h5>Email</h5>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={signIn} className="btn large signin__signInButton">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
