import React, { useEffect, useState } from "react";
import { db } from "../Model/firebase";
import { useStateValue } from "../Model/StateProvider";
import Manga from "./Manga";

function MyManga() {
  const [myMangasId, setMyMangasId] = useState([]);
  const [myMangas, setMyMangas] = useState([]);

  const [{ user, userName, rentbox }, dispatch] = useStateValue();
  useEffect(() => {
    db.collection("users")
      .doc(user?.uid)
      .get()
      .then((doc) => {
        console.log(doc.data()?.myMangas);
        setMyMangasId(doc.data()?.myMangas);
        myMangasId?.map((manga) => {
          db.collection("mangas")
            .doc(manga)
            .get()
            .then((snapshot) => {
              setMyMangas(
                snapshot.docs.map((doc) => {
                  console.log(doc.data());
                })
              );
            })
            .catch((error) => {
              console.log(error.message);
            });
        });
        console.log("This is 2");
        console.log(myMangas);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [user?.uid]);

  return (
    <div>
      {myMangas?.map((manga, i) => {
        <Manga
          key={manga.id + i}
          id={manga.id}
          title={manga.title}
          author={manga.author}
          description={manga.description}
          rating={manga.rating}
          price={manga.price}
        />;
      })}{" "}
      ;
    </div>
  );
}

export default MyManga;
