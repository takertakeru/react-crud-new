import React, { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import "../../index";
import Header from "../../components/molecules/Header";
import Modal from "../../components/molecules/Modal";
import {
  collection,
  addDoc,
  doc,
  deleteDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../http/firebase";
import { toast, ToastContainer } from "react-toastify";
import { map } from "@firebase/util";
import InitialFocus from "../../components/molecules/Modal";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    contact_num: "",
    email_add: "",
    web_site: "",
  });

  const getData = async () => {
    const querySnapshot = await getDocs(collection(db, "test"));
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
    try {
      const docRef = await addDoc(collection(db, col), doc);
      toast("Success");
    } catch (error) {
      toast.error(error);
    }
  };

  const handleDelete = (id) => {
    deleteData("test", id);
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
    if (!form.full_name && !form.email_add && !form.web_site) {
      return;
    }
    e.preventDefault();
    addDocument("test", form);
    getData();
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Header />
      <h2 className="string">{JSON.stringify(form)}</h2>
      <ToastContainer />
      <div className="form-container">
        <div className="box-1">
          <form onSubmit={handleSubmit}>
            <h2 className="heading-secondary">Form</h2>
            <br></br>
            <label>First Name</label>
            <input
              type="text"
              name="first_name"
              placeholder="First Name"
              onChange={handleInput}
            ></input>
            <br></br>
            <label>Last Name</label>
            <input
              type="text"
              name="last_name"
              placeholder="Last Name"
              onChange={handleInput}
            ></input>
            <br></br>
            <label>Contact Number</label>
            <input
              type="number"
              name="contact_num"
              placeholder="Number"
              onChange={handleInput}
            ></input>
            <br></br>
            <label>Email Address</label>
            <input
              type="email"
              name="email_add"
              placeholder="Email Address"
              onChange={handleInput}
            ></input>
            <br></br>
            <label>Website</label>
            <input
              type="url"
              name="web_site"
              placeholder="Website"
              onChange={handleInput}
            ></input>
            <br></br>
            <button className="form-submit" type="submit">
              Submit
            </button>
          </form>
        </div>

        <div className="cards">
          {users?.map((user) => (
            <div className="boxs" key={user.id}>
              <div className="picture-here">
                <h1 className="heading-secondary">Picture Here</h1>
              </div>
              <h3 className="heading-name">
                {user.first_name}&nbsp;{user.last_name}
              </h3>
              <br></br>
              <h3 className="heading-email">
                {user.email_add}
                <br></br>
                {user.contact_num}cru
              </h3>
              <br></br>
              <h3 className="heading-website">{user.web_site}</h3>
              <br></br>
              <div className="button-div">
                <Modal />
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
