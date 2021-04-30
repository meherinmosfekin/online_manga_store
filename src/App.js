import "./View/App.css";
import Navbar from "./Controllers/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./Controllers/Dashboard";
import Account from "./Controllers/Account";
import RentBox from "./Controllers/Rentbox";
import Authentication from "./Controllers/Authentication";
import { useStateValue } from "./Model/StateProvider";
import { useEffect } from "react";
import { auth } from "./Model/firebase";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

function App() {
  const promise = loadStripe(
    "pk_test_51IexcjSDSYMCl1M2e0em3uyRRPLnl58ZVSJa49HbMY75L0kFVDTnZAcxypjR0l6KGspQzNeHgkvATzrSrDCaNP1r008nFxufqA"
  );
  const [{ user, userName, rentbox }, dispatch] = useStateValue();
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      console.log("The User is ", authUser);

      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);
  return (
    //BEM convention for naming style elements
    // Header
    <Router>
      <Switch>
        <Route path="/login">
          <Authentication />
        </Route>
        <Route path="/rentbox">
          <Elements stripe={promise}>
            <Navbar />
            <RentBox />
          </Elements>
        </Route>
        <Route path="/account">
          <Navbar />
          <Account />
        </Route>
        <Route path="/manga">
          <Navbar />
          {/* <Manga /> */}
        </Route>
        <Route path="/">
          <Navbar />
          <Dashboard />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
