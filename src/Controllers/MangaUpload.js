import React, { useState } from "react";
import { storage, db } from "../Model/firebase";
import firebase from "firebase";
import "../View/MangaUpload.css";
import { makeStyles, Button, Input } from "@material-ui/core";

function MangaUpload({ username }) {
  const [manga, setManga] = useState(null);
  const [progress, setProgress] = useState(0);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setManga(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`mangadocs`).put(manga);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        // complete function
        db.collection("mangas").add({
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          id: new Date().getTime().toString(),
          title: title,
          author: author,
          image: image,
          price: 2.1,
          rating: 2,
          description: description,
        });
        setProgress(0);
        setManga(null);
      }
    );
  };

  return (
    <div className="imageupload">
      <form className="account__mangaUpload">
        <center>
          <h2>Omanga</h2>
        </center>
        <progress
          className="mangaupload__progress"
          value={progress}
          max="100"
        />
        <Input
          placeholder="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          placeholder="author"
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <Input
          placeholder="description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Input
          placeholder="image url"
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <input type="file" onChange={handleChange} />
        {manga ? (
          <Button className="btn-small blue" onClick={handleUpload}>
            Upload
          </Button>
        ) : (
          <p>Please select an image</p>
        )}
      </form>
    </div>
  );
}

export default MangaUpload;
