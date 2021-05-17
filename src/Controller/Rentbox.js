import React, { useEffect } from "react";
import "../View/RentBox.css";
import { useStateValue } from "../Model/StateProvider";
import BoxedManga from "./BoxedManga";
import Total from "./Total";
import Rent from "./Rent";
import { auth, db } from "../Model/firebase";

function RentBox() {
  const [{ user, rentbox }] = useStateValue();

  useEffect(() => {
    db.collection("users")
      .doc(user?.uid)
      .update({ rentbox: rentbox })
      .then(() => {
        console.log("updated successfull!");
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [rentbox]);

  return (
    <div className="rentbox">
      <div className="rentbox__left">
        <h3 className="rentbox__title">Your Rent-Box</h3>
        {rentbox?.map((item, i) => (
          <BoxedManga
            key={item.id + i}
            id={item.id}
            author={item.author}
            title={item.title}
            image={item.image}
            price={item.price}
            rating={item.rating}
            description={item.description}
          />
        ))}
      </div>
      <div className="container rentbox__right">
        <div className="center">
          <Total />
        </div>
        <hr></hr>
        <Rent />
      </div>
    </div>
  );
}

export default RentBox;
