import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/atoms/Header";
import CardOne from "../../components/atoms/CardOne";
import CardTwo from "../../components/atoms/CardTwo";
import CardThree from "../../components/atoms/CardThree";
import CardFour from "../../components/atoms/CardFour.js";
import { db } from "../../http/firebase";
import {
  collection,
  addDoc,
  doc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../index";

export default function Home() {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
  });

  const getData = async () => {
    const querySnapshot = await getDocs(collection(db, "diomari"));
    const users = [];
    querySnapshot.forEach((doc) => {
      users.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    setUsers(users);
    console.log(users);
  };

  const deleteData = async (col, id) => {
    try {
      const deletedDoc = await deleteDoc(doc(db, col, id));
      toast("Deleted Data!");
    } catch (error) {
      console.log(error);
    }
  };

  const addDocument = async (col, doc) => {
    // Add a new document with a generated id.
    try {
      const docRef = await addDoc(collection(db, col), doc);
      toast("Succesfully added a record");
    } catch (error) {
      toast.error(error);
    }
  };

  const handleDelete = (id) => {
    deleteData("diomari", id);
    getData();
  };

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    if (!form.first_name && !form.last_name) {
      return;
    }
    e.preventDefault();
    addDocument("diomari", form);
    getData();
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container">
      <Header />
      <h1 className="heading-primary">
        Find your suitable <span>watch now.</span>
      </h1>
      <div className="box__container-one">
        <Link to="/AppleWatch">
          <CardOne />
        </Link>
        <Link to="/GalaxyWatch">
          <CardTwo />
        </Link>
      </div>
      <div className="box__container-two">
        <Link to="/MiWatch">
          <CardThree />
        </Link>
        <Link to="/AmazfitWatch">
          <CardFour />
        </Link>
      </div>
      <div>
        <h2>Covid Tracker</h2>
        <form onSubmit={handleSubmit}>
          <br></br>
          <label>First Name </label>
          <input type="text" name="first_name" onChange={handleInput}></input>
          <br></br>
          <label>Last Name </label>
          <input type="text" name="last_name" onChange={handleInput}></input>
          <button type="submit">Submit</button>
        </form>
        <h2>{JSON.stringify(form)}</h2>
      </div>
      <div>
        <h2>List of Users</h2>
        <ul>
          {users?.map((user) => (
            <li key={user.first_name}>
              {user.first_name} {user.last_name}
              <button onClick={() => handleDelete(user.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
