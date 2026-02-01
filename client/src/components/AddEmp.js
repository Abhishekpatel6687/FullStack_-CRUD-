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

  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:8080/api/saveData`, input);
      navigate("/");
    } catch (err) {
      console.log("Error adding employee", err);
    }
  };

  return (
    <div className="container-add">
      <div className="form-card">
        <h2 className="form-title">Add New Employee</h2>
        <form className="form">
          <input
            type="text"
            value={input.name}
            name="name"
            placeholder="Enter your name"
            onChange={handleInput}
            className="input-field"
          />

          <input
            type="email"
            value={input.email}
            name="email"
            placeholder="Enter your email"
            onChange={handleInput}
            className="input-field"
          />

          <input
            type="text"
            value={input.designation}
            name="designation"
            placeholder="Enter your designation"
            onChange={handleInput}
            className="input-field"
          />

          <input
            type="text"
            value={input.empid}
            name="empid"
            placeholder="Enter your employee ID"
            onChange={handleInput}
            className="input-field"
          />

          <button type="submit" onClick={submit} className="btn-submit">
            Add Employee
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEmp;
