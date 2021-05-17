import React, { useState } from "react";
import { useHistory } from "react-router";
import { db } from "../Model/firebase";
import { auth } from "../Model/firebase";
import "../View/SignUp.css";

function SignUp() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");

  const signUp = (e) => {
    e.preventDefault();

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        return db
          .collection("users")
          .doc(auth.user.uid)
          .set({
            userName: userName,
            rentbox: [],
            myMangas: [],
            premium: false,
          })
          .then(() => {
            if (auth) {
              auth.user.updateProfile({
                displayName: userName,
              });
              console.log(auth.user);
              history.push("/");
            }
          });
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="row signup">
      <div className="col s6">
        <h1>Sign-Up</h1>
        <form>
          <h5>User Name</h5>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
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
          <button onClick={signUp} className="btn signup__signInButton">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
