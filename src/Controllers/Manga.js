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
      <div className="col s12 m7 manga">
        <div className="card blue-grey horizontal">
          <div className="center card-image">
            <img src={image} />
          </div>
          <div className="card-content">
            <span className="header card-title black-text">{title}</span>
            <p>
              <i>
                {author} : {description}
              </i>
            </p>
            <div className="manga__rating">
              {Array(rating)
                .fill()
                .map((_, i) => (
                  <span key={id + i}>
                    <strong>⭐</strong>
                  </span>
                ))}
            </div>
          </div>
          <div className="card-action">
            <a href="#">{price}$</a>
            <button
              onClick={addToRentBox}
              className="btn light-blue waves-effect waves-light darken-3 manga__button"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Manga;
