import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./UpdateEmp.module.css";

const UpdateEmp = ({ singleEmp }) => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    name: "",
    email: "",
    designation: "",
    empid: "",
  });

  useEffect(() => {
    if (singleEmp) {
      setInput(singleEmp);
    }
  }, [singleEmp]);

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(
        `http://localhost:8080/api/updateData/${input.empid}`,
        input
      );
      navigate("/");
    } catch (err) {
      console.log("Error updating employee", err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Update Employee</h2>

        <form className={styles.form} onSubmit={submit}>
          <input
            type="text"
            name="name"
            value={input.name}
            placeholder="Employee Name"
            onChange={handleChange}
            className={styles.input}
          />

          <input
            type="email"
            name="email"
            value={input.email}
            placeholder="Employee Email"
            onChange={handleChange}
            className={styles.input}
          />

          <input
            type="text"
            name="designation"
            value={input.designation}
            placeholder="Designation"
            onChange={handleChange}
            className={styles.input}
          />

          <input
            type="text"
            name="empid"
            value={input.empid}
            disabled
            className={`${styles.input} ${styles.disabled}`}
          />

          <button type="submit" className={styles.btn}>
            Update Employee
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateEmp;
