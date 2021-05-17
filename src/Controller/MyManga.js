import React, { useEffect, useState } from "react";
import { db } from "../Model/firebase";
import { useStateValue } from "../Model/StateProvider";
import Manga from "./Manga";

function MyManga() {
  const [myMangas, setMyMangas] = useState([]);
  const [{ user, userName, rentbox }, dispatch] = useStateValue();
  useEffect(() => {
    db.collection("users")
      .doc(user.uid)
      .get()
      .then((doc) => {
        setMyMangas(doc.data().myMangas);
      });
  });
  return (
    <div>
      {myMangas?.map((document) => {
        const mangas = document.rentbox;
        mangas.map((manga, i) => {
          <Manga
            key={manga.id + i}
            id={manga.id}
            title={manga.title}
            author={manga.author}
            description={manga.description}
            rating={manga.rating}
            price={manga.price}
          />;
        });
      })}
    </div>
  );
}

export default MyManga;
