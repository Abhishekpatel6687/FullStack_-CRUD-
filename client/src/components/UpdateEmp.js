import React, { createContext, useEffect, useState } from "react";
import "../App.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UpdateEmp = ({ singleEmp }) => {
  const navigate = useNavigate();
  const [input, setInput] = useState(singleEmp);

  const handleSbumit = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(
        `http://localhost:8080/api/updateData/${input.empid}`,
        input,
      );
      navigate("/");
    } catch (err) {
      console.log("Error updating employee", err);
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
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateEmp;
