import React, { useEffect, useState } from "react";
import Modal from "@material-ui/core/Modal";
import { makeStyles, Button, Input } from "@material-ui/core";
import "../View/Account.css";
import { useStateValue } from "../Model/StateProvider";
import MangaUpload from "./MangaUpload";
import Manga from "./Manga.js";
import { db } from "../Model/firebase";
import firebase from "firebase";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%) `,
  };
}
const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
function Account() {
  const classes = useStyles();
  const [{ user, userName, rentbox }, dispatch] = useStateValue();
  const [modalStyle] = useState(getModalStyle);
  const [title, setTitle] = useState("");
  const [open, setOpen] = useState(false);
  const [premium, setPremium] = useState(false);
  const [hideButton, setHideButton] = useState(true);
  const [mangas, setMangas] = useState([]);
  const [searchedManga, setSearchedManga] = useState(null);

  const handleUpgrade = (e) => {
    e.preventDefault();
    setHideButton(false);
    setPremium(true);
  };

  const search = (e) => {
    e.preventDefault();
    db.collection("mangas").onSnapshot((snapshot) => {
      setMangas(snapshot.docs.map((doc) => doc.data()));
    });
    const index = mangas.findIndex((item) => item.title === title);
    console.log(index);
    if (index >= 0) {
      setSearchedManga(mangas[index]);
    }
  };

  const requestProcess = (e) => {
    e.preventDefault();
    db.collection("requests").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      id: new Date().getTime().toString(),
      title: title,
    });
    setOpen(false);
  };
  return (
    <div className="container account">
      <div className="container account__left">
        <div className="account__details">
          <p>User Name: {user?.displayName}</p>
          <p>Email: {user?.email}</p>
        </div>
        {premium && (
          <div>
            <Modal open={open} onClose={() => setOpen(false)}>
              <div style={modalStyle} className={classes.paper}>
                <MangaUpload />
              </div>
            </Modal>
            <button
              onClick={() => setOpen(true)}
              className="btn light-blue waves-effect waves-light darken-3 account__uploadButton"
            >
              Upload
            </button>
          </div>
        )}

        {hideButton && (
          <button
            onClick={handleUpgrade}
            className="btn light-blue waves-effect waves-light darken-3 account__upgradeButton"
          >
            Upgrade
          </button>
        )}
      </div>
      <div className="container account__right">
        <form onSubmit={search}>
          <h5>Search</h5>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="enter title"
          />
        </form>
        <hr />
        {searchedManga ? (
          <Manga
            id={searchedManga?.id}
            title={searchedManga?.title}
            author={searchedManga?.author}
            image={searchedManga?.image}
            description={searchedManga?.description}
            price={searchedManga?.price}
            rating={searchedManga?.rating}
          />
        ) : (
          <Modal open={open} onClose={() => setOpen(false)}>
            <div style={modalStyle} className={classes.paper}>
              Would You like to Request for this manga?
              <button onClick={requestProcess} class="btn green lighten-2">
                Yes!
              </button>
              <button class="btn green darken-2">No!</button>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
}

export default Account;
