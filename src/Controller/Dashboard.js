import React, { useEffect, useState } from "react";
import "../View/Dashboard.css";
import { db } from "../Model/firebase";
import Manga from "./Manga";
import firebase from "firebase";

function Dashboard() {
  const [mangas, setMangas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [open, setOpen] = useState("Requested");
  const [requestStatus, setRequestStatus] = useState("");

  useEffect(() => {
    //Fetches 3 Mangas From Firestore with each re-render
    db.collection("mangas")
      .limit(3)
      .get()
      .then((snapshot) => {
        setMangas(snapshot.docs.map((doc) => doc.data()));
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  //This Method Handles Search for Mangas By the User
  const handleSearch = (event) => {
    event.preventDefault();
    setMangas([]);
    setIsLoading(true);
    //Fetching Searched mangas from firestore
    db.collection("mangas")
      .where("title", "==", title)
      .get()
      .then((snapshot) => {
        setMangas(snapshot.docs.map((doc) => doc.data()));
        setIsLoading(false);
        setOpen("Requested");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleRequest = (event) => {
    event.preventDefault();
    if (requestStatus === "yes") {
      //Uploading request to the firestore
      db.collection("requests")
        .add({
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          id: new Date().getTime().toString(),
          title: title,
        })
        .then(() => {
          setOpen("Request Successful");
          setTitle("");
          setTimeout(() => {
            setOpen("Requested");
            window.location.reload();
          }, 1000);
        })
        .catch((error) => {
          console.log(error.message);
        });
    } else if (requestStatus === "may be later") {
      setTitle("");
      window.location.reload();
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard__left">
        {isLoading && <h2>Loading...</h2>}
        {mangas.length === 1 || mangas.length === 3
          ? mangas?.map((item, i) => (
              <Manga
                key={item.id + i}
                id={item.id}
                title={item.title}
                author={item.author}
                image={item.image}
                price={item.price}
                rating={item.rating}
                description={item.description}
              />
            ))
          : !isLoading &&
            open === "Requested" && (
              <form onSubmit={handleRequest}>
                <label>Would You like to Request for this Item?</label>
                <select
                  value={requestStatus}
                  onChange={(e) => setRequestStatus(e.target.value)}
                >
                  <option value="yes">yes</option>
                  <option value="may be later">may be later</option>
                </select>
                <button>Submit</button>
              </form>
            )}
        {open === "Request Successful" && <div>Request Successful!...</div>}
      </div>
      <div className="container dashboard__right">
        <div className="container ">
          <form onSubmit={handleSearch}>
            <h5>Search</h5>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="enter title"
            />
          </form>
        </div>
        <div className="conainer center dashboard__video">
          <iframe
            width="620"
            height="500"
            src="https://www.youtube.com/embed/lAXQAltnx7Y"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
