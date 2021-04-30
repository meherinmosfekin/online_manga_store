import React, { useState } from "react";
import { useHistory } from "react-router";
import { auth, db } from "../Model/firebase";
import "../View/SignUp.css";
import { useStateValue } from "../Model/StateProvider";

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
        //Account Creation Successful!
        console.log(auth);

        if (auth) {
          return auth.user.updateProfile({
            displayName: userName,
          });
        }
      })
      .catch(
        //For any error, catch the error and display a message
        (error) => alert(error.message)
      );
  };
  console.log(auth);
  return (
    <div className="row signup">
      <div className="col s6">
        <h1>Sign-Up</h1>
        <form>
          <h5>Email</h5>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <h5>User Name</h5>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
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
