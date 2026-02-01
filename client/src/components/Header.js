import React, { useEffect, useState } from "react";
import axios from "axios";

import { Link } from "react-router-dom";
const Header = ({ setSingleEmp }) => {
  const [employees, setEmployees] = useState([]);
  useEffect(() => {
    const featchData = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/getAllData");
        if (res.data && res.data.length > 0) {
          setEmployees(res.data);
        } else {
          setEmployees([]);
        }
      } catch (err) {
        console.log("Error fetching data", err);
      }
    };
    featchData();
  }, []);

  const editHandler = (empid) => {
    setSingleEmp(empid);
  };
  const DeleteHandler = async (empid) => {
    await axios.delete(`http://localhost:8080/api/deleteData/${empid}`);
    const aa = await axios.get("http://localhost:8080/api/getAllData");
    setEmployees(aa.data);
  };
  const deleteAllHandler = async () => {
    await axios.delete(`http://localhost:8080/api/deleteAll`);
    const aa = await axios.get("http://localhost:8080/api/getAllData");
    setEmployees(aa.data);
  };
  return (
    <div>
      <Link to="/AddEmp">Add Emp</Link>

      {employees > 0 ? (
        employees.map((item, index) => {
          return (
            <div key={index}>
              <div className="list-item">
                <p>{item.name}</p>
                <p>{item.email}</p>
                <p>{item.designation}</p>
                <p>{item.empid}</p>

                <div className="btn-list">
                  <Link
                    to="/update"
                    onClick={() => editHandler(item)}
                    className="btn"
                  >
                    Edit
                  </Link>
                  {/* <button className="btn-del">Delete</button> */}
                  <button
                    onClick={() => DeleteHandler(item.empid)}
                    className="btn-del"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <h2>No Employees Found</h2>
      )}
      
      {employees.length >= 1 ? (
        <button onClick={() => deleteAllHandler()} className="btn-btn">
          All Delete
        </button>
      ) : null}
      
    </div>
  );
};

export default Header;
