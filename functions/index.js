const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51IexcjSDSYMCl1M2JTIXnS8p8dqjPJxNxLwZb0yXeYzV8vpbSGUlG4EolYBFv3zdPvwTzwl60m8fgzHa2icj58Xd00zNymo2tw"
);

//API

//App Config
const app = express();
//Middlewares
app.use(cors({ origin: true }));
app.use(express.json());
//API routes
app.get("/", (request, response) => response.status(200).send("hello world"));
app.post("/payments/create", async (request, response) => {
  const total = request.query.total;

  console.log("Payment Request recieved BooM! for this amount >>>", total);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
  });
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});
//Listen Command
exports.api = functions.https.onRequest(app);

//End point: http://localhost:5001/challenge-dff11/us-ce
