import React, { useState } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const initalValue = {
  name: "",
  email: "",
  designation: "",
  empid: "",
};
const AddEmp = () => {
  const navigate = useNavigate();

  const [input, setInput] = useState(initalValue);

  const handleSbumit = (e) => {
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
    <div className="container">
      <div className="form-container">
        <form className="form">
          <input
            type="text"
            value={input.name}
            name="name"
            placeholder="Enter your name"
            onChange={handleSbumit}
          />

          <input
            type="email"
            value={input.email}
            name="email"
            placeholder="Enter your email"
            onChange={handleSbumit}
          />
          <input
            type="text"
            value={input.designation}
            name="designation"
            placeholder="Enter your designation"
            onChange={handleSbumit}
          />
          <input
            type="text"
            value={input.empid}
            name="empid"
            placeholder="Enter your empid"
            onChange={handleSbumit}
          />
          <div className="option">
            <button onClick={submit} className="button">
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmp;
