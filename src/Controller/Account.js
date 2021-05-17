import React, { useEffect, useState } from "react";
import "../View/Account.css";
import { useStateValue } from "../Model/StateProvider";
import MangaUpload from "./MangaUpload";
import { db } from "../Model/firebase";
import CurrencyFormat from "react-currency-format";
import { CardElement } from "@stripe/react-stripe-js";
import { useHistory } from "react-router";

function Account() {
  useEffect(() => {
    db.collection("users")
      .doc(user?.uid)
      .get()
      .then((doc) => {
        setPremium(doc.data().premium);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
      });
  });

  const [{ user, rentbox }] = useStateValue();

  const history = useHistory();
  const [processing, setProcessing] = useState("");
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const [premium, setPremium] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleUpgrade = async (event) => {
    event.preventDefault();
    setProcessing(true);

    db.collection("users").doc(user?.uid).set({
      userName: user?.displayName,
      premium: true,
      rentbox: rentbox,
      myManga: [],
    });

    setSucceeded(true);
    setError(null);
    setProcessing(false);
    history.replace("/");
  };

  const handleChange = (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  return (
    <div className="container account" data-test="account">
      {isLoading && <div>Loading...</div>}
      {!isLoading && (
        <div className="container account__left">
          <div className="account__details" data-test="account__details">
            <p>
              User Name: {user?.displayName} {premium && <span>🌟</span>}
            </p>
            <p>Email: {user?.email}</p>
          </div>
          {premium && <MangaUpload />}

          {!premium && (
            <form onSubmit={handleUpgrade}>
              <CardElement onChange={handleChange} />

              <div className="rent__priceContainer">
                <CurrencyFormat
                  renderText={(value) => (
                    <>
                      <h3>Total Price: {value}</h3>
                    </>
                  )}
                  decimalScale={2}
                  value={6.5}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                <button
                  disabled={processing || disabled || succeeded}
                  className="btn-large light-blue waves-effect waves-light darken-3"
                  data-test="account__upgradeButton"
                >
                  <span>{processing ? <p>Processing</p> : "Upgrade"}</span>
                </button>
              </div>
              {error && <div>{error}</div>}
            </form>
          )}
        </div>
      )}
    </div>
  );
}

export default Account;
