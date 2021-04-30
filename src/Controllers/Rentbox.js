import React from "react";
import "../View/RentBox.css";
import { useStateValue } from "../Model/StateProvider";
import BoxedManga from "./BoxedManga";
import Total from "./Total";
import Rent from "./Rent";

function RentBox() {
  const [{ user, userName, rentbox }, dispatch] = useStateValue();

  return (
    <div className="rentbox">
      <div className="rentbox__left">
        <h3 className="rentbox__title">Your Rent-Box</h3>
        {rentbox?.map((item) => (
          <BoxedManga
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
