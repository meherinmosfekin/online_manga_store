import React from "react";
import "../View/BoxedManga.css";
import { useStateValue } from "../Model/StateProvider";

function BoxedManga({
  id,
  title,
  author,
  image,
  price,
  rating,
  description,
  hideButton,
}) {
  const [{ user, userName, rentbox }, dispatch] = useStateValue();

  const removeFromRentBox = () => {
    dispatch({
      type: "REMOVE_FROM_RENTBOX",
      id: id,
    });
  };
  return (
    <div className="boxedmanga">
      <div className="col s12 m7">
        <div className="card blue-grey horizontal">
          <div className="card-image">
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
            <div className="boxedmanga__rating">
              {Array(rating)
                .fill()
                .map((_, i) => (
                  <p key={id + i}>
                    <strong>⭐</strong>
                  </p>
                ))}
            </div>
            <div className="card-action">
              <a href="#">{price}$</a>
              <button
                onClick={removeFromRentBox}
                className="btn light-blue waves-effect waves-light darken-3 manga__button"
              >
                Drop From Rent-Box
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    // <div className="col s12 m7 boxedmanga">
    //   <div className="card blue-grey horizontal">
    //     <img
    //       className="card-image boxedmanga__image"
    //       src={image}
    //       alt="Product Image"
    //     />
    //     <div className="boxedmanga__info">
    //       <p className="boxedmanga__title">
    //         {" "}
    //         <strong>{title}</strong> : <i>{author}</i> {description}{" "}
    //       </p>

    //       <div className="boxedmanga__rating">
    //         {Array(rating)
    //           .fill()
    //           .map((_, i) => (
    //             <p key={id + "" + i}>⭐</p>
    //           ))}
    //       </div>
    //     </div>
    //     <div className="card-action">
    //       <a className="boxedmanga__price">
    //         <small>$</small>
    //         <strong> {price} </strong>
    //       </a>
    //       {!hideButton && (
    //         <button
    //           className="btn light-blue waves-effect waves-light darken-3"
    //           onClick={removeFromRentBox}
    //         >
    //           Drop From Rent Box
    //         </button>
    //       )}
    //     </div>
    //   </div>
    // </div>
  );
}

export default BoxedManga;
