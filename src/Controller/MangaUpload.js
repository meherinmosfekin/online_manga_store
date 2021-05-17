import React, { useState } from "react";
import { db } from "../Model/firebase";
import firebase from "firebase";
import "../View/MangaUpload.css";

function MangaUpload() {
  const [manga, setManga] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [uploadStatus, setUploadStatus] = useState(false);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setManga(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    //Uploading mangas
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
    console.log("upload Success!");
    setUploadStatus(true);
  };

  return (
    <div className="imageupload">
      {!uploadStatus && (
        <form className="account__mangaUpload">
          <center>
            <h2>Omanga</h2>
          </center>
          <input
            placeholder="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            placeholder="author"
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <input
            placeholder="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            placeholder="image url"
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <input type="file" onChange={handleChange} />
          {manga ? (
            <button className="btn-small blue" onClick={handleUpload}>
              Upload
            </button>
          ) : (
            <p>Please select an Magna</p>
          )}
        </form>
      )}
      {uploadStatus && <div>Upload Successfull...</div>}
    </div>
  );
}

export default MangaUpload;
