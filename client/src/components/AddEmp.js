import React, { useState } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const initialValue = {
  name: "",
  email: "",
  designation: "",
  empid: "",
};

const AddEmp = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState(initialValue);
  const [image, setImage] = useState(null);
  console.log(image, "image");

  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    console.log(input, "inputdata");
    e.preventDefault();
    console.log(input, "inputdata", image, "jj");
    try {
      const formData = new FormData();
      formData.append("name", input.name);
      formData.append("email", input.email);
      formData.append("designation", input.designation);
      formData.append("empid", input.empid);

      formData.append("image", image);

      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      console.log(formData, "formdata");

      await axios.post(`http://localhost:8080/api/saveData`, formData);
      navigate("/");
    } catch (err) {
      console.log("Error adding employee", err);
    }
  };

  return (
    <div className="container-add">
      <div className="form-card">
        <h2 className="form-title">Add New Employee</h2>
        <form onSubmit={submit} className="form">
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            onChange={handleInput}
            className="input-field"
          />

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            onChange={handleInput}
            className="input-field"
          />

          <input
            type="text"
            name="designation"
            placeholder="Enter your designation"
            onChange={handleInput}
            className="input-field"
          />

          <input
            type="text"
            name="empid"
            placeholder="Enter your employee ID"
            onChange={handleInput}
            className="input-field"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="input-field"
          />

          <button type="submit" className="btn-submit">
            Add Employee
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEmp;
