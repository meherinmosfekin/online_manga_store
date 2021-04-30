import React from "react";
import "../View/Manga.css";
import { useStateValue } from "../Model/StateProvider";

function Manga({ key, id, title, author, image, price, rating, description }) {
  const [{ user, userName, rentbox }, dispatch] = useStateValue();
  const addToRentBox = () => {
    console.log(rentbox); // For Cheking if the function is working properly or not!
    dispatch({
      type: "ADD_TO_RENTBOX",
      item: {
        id: id,
        author: author,
        title: title,
        image: image,
        price: price,
        rating: rating,
        description: description,
      },
    });
  };
  return (
    <div className="manga">
      <div className="col s12 m7">
        <div className="card blue-grey horizontal">
          <div className="center card-image">
            <img src={image} />
          </div>
          <div className="card-stacked">
            <div className="card-content">
              <h2 className="header">{title}</h2>
              <p>
                <i>
                  {author} : {description}
                </i>
              </p>
            </div>
            <div className="manga__rating">
              {Array(rating)
                .fill()
                .map((_, i) => (
                  <span key={id + i}>
                    <strong>⭐</strong>
                  </span>
                ))}
            </div>
            <div className="card-action">
              <a href="#">{price}$</a>
              <button
                onClick={addToRentBox}
                className="btn light-blue waves-effect waves-light darken-3 manga__button"
              >
                Add To Rent-Box
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Manga;
