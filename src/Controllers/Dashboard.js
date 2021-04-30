import React, { useEffect, useState } from "react";
import "../View/Dashboard.css";
import { db } from "../Model/firebase";
import Manga from "./Manga";

function Dashboard() {
  const [mangas, setMangas] = useState([]);
  useEffect(() => {
    db.collection("mangas").onSnapshot((snapshot) => {
      setMangas(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);
  console.log(mangas);
  return (
    <div className="dashboard">
      <div className="dashboard__left">
        {mangas?.map((item, i) => (
          <div key={i}>
            <Manga
              key={item.id}
              id={item.id}
              title={item.title}
              author={item.author}
              image={item.image}
              price={item.price}
              rating={item.rating}
              description={item.description}
            />
          </div>
        ))}
      </div>
      <div className="container dashboard__right">
        <div className="conainer center dashboard__video">
          <iframe
            width="620"
            height="500"
            src="https://www.youtube.com/embed/lAXQAltnx7Y"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
        <div className="conainer center dashboard__video">
          <iframe
            width="620"
            height="500"
            src="https://www.youtube.com/embed/YGZLvKAFeYI"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
