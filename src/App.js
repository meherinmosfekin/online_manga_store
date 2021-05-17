import "./View/App.css";
import Navbar from "./Controller/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./Controller/Dashboard";
import Account from "./Controller/Account";
import RentBox from "./Controller/Rentbox";
import Authentication from "./Controller/Authentication";
import { useStateValue } from "./Model/StateProvider";
import { useEffect, useState } from "react";
import { auth, db } from "./Model/firebase";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import MangaUpload from "./Controller/MangaUpload";
import MyManga from "./Controller/MyManga";

function App() {
  const promise = loadStripe(
    "pk_test_51IexcjSDSYMCl1M2e0em3uyRRPLnl58ZVSJa49HbMY75L0kFVDTnZAcxypjR0l6KGspQzNeHgkvATzrSrDCaNP1r008nFxufqA"
  );

  const [{}, dispatch] = useStateValue();
  const [rentbox, setRentBox] = useState([]);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        db.collection("users")
          .doc(authUser.uid)
          .get()
          .then((doc) => {
            setRentBox(doc.data().rentbox);
            dispatch({
              type: "SET_USER",
              user: authUser,
              rentbox: doc.data().rentbox,
            });
          })
          .catch((error) =>
            console.log("Error Mesage in getting rentbox" + error.message)
          );
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
          rentbox: [],
        });
      }
    });
  }, []);

  return (
    //BEM convention for naming style elements
    <Router>
      <Switch>
        <Route exact path="/login">
          <Authentication />
        </Route>
        <Route exact path="/rentbox">
          <Elements stripe={promise}>
            <Navbar />
            <RentBox />
          </Elements>
        </Route>
        <Route exact path="/account">
          <Elements stripe={promise}>
            <Navbar />
            <Account />
          </Elements>
        </Route>
        <Route exact path="/myManga">
          <Navbar />
          <MyManga />
        </Route>
        <Route exact path="/">
          <Navbar />
          <Dashboard />
        </Route>
        <Route exact path="/upload">
          <Navbar />
          <MangaUpload />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
