import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "../View/Rent.css";
import { useStateValue } from "../Model/StateProvider";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { getTotal } from "../Model/rootReducer";
import CurrencyFormat from "react-currency-format";
import axios from "../Model/axios";
import { db } from "../Model/firebase";

function Rent() {
  const [{ user, userName, rentbox }, dispatch] = useStateValue();
  const history = useHistory();

  const stripe = useStripe();
  const elements = useElements();

  const [processing, setProcessing] = useState("");
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [clientSecret, setClientSecret] = useState(true);

  useEffect(() => {
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        url: `/payments/create?total=${getTotal(rentbox) * 100}`,
      });
      setClientSecret(response.data.clientSecret);
    };
    getClientSecret();
  }, [rentbox]);

  console.log("The Client Secret is >>>", clientSecret);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        db.collection("users")
          .doc(user?.uid)
          .collection("orders")
          .doc(paymentIntent.id)
          .set({
            rentbox: rentbox,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
          });

        setSucceeded(true);
        setError(null);
        setProcessing(false);

        dispatch({
          type: "EMPTY_RENTBOX",
        });

        history.replace("/");
      });
  };
  const handleChange = (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };
  return (
    <div className="rent">
      <div className="rent__container">
        <h1>Rent of {rentbox?.length} mangas</h1>
        <div className="rent__section"></div>
        <div className="rent__section"></div>
        <div className="rent__section">
          <div className="rent__title">
            <h5>Payment method</h5>
          </div>
          <div className="rent__details">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />

              <div className="rent__priceContainer">
                <CurrencyFormat
                  renderText={(value) => (
                    <>
                      <h3>Total Price: {value}</h3>
                    </>
                  )}
                  decimalScale={2}
                  value={getTotal(rentbox)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                <button
                  disabled={processing || disabled || succeeded}
                  className="btn-large light-blue waves-effect waves-light darken-3"
                >
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>

              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Rent;
