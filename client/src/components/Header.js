import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Header.css"; // Import our custom CSS

const Header = ({ setSingleEmp }) => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/getAllData");
        setEmployees(res.data || []);
      } catch (err) {
        console.log("Error fetching data", err);
      }
    };
    fetchData();
  }, []);

  const editHandler = (emp) => {
    setSingleEmp(emp);
  };

  const DeleteHandler = async (empid) => {
    await axios.delete(`http://localhost:8080/api/deleteData/${empid}`);
    const aa = await axios.get("http://localhost:8080/api/getAllData");
    setEmployees(aa.data);
  };

  const deleteAllHandler = async () => {
    await axios.delete(`http://localhost:8080/api/deleteAll`);
    setEmployees([]);
  };

  return (
    <div className="container">
      <div className="header-top">
        <h1>Employee Dashboard</h1>
        <Link to="/AddEmp" className="btn-add">
          + Add Employee
        </Link>
      </div>

      {employees.length > 0 ? (
        <div className="employee-list">
          {employees.map((item, index) => (
            <div className="list-item" key={index}>
              <div className="info">
                <p><strong>Name:</strong> {item.name}</p>
                <p><strong>Email:</strong> {item.email}</p>
                <p><strong>Designation:</strong> {item.designation}</p>
                <p><strong>ID:</strong> {item.empid}</p>
                    {item.image && (
            <img
              src={`http://localhost:8080${item.image}`}
              alt={item.name}
              width="150"
            />
          )}
              </div>
              <div className="btn-list">
                <Link
                  to="/update"
                  onClick={() => editHandler(item)}
                  className="btn edit-btn"
                >
                  Edit
                </Link>
                <button
                  onClick={() => DeleteHandler(item.empid)}
                  className="btn delete-btn"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h2 className="no-emp">No Employees Found</h2>
      )}

      {employees.length >= 1 && (
        <button onClick={deleteAllHandler} className="btn delete-all">
          Delete All
        </button>
      )}
    </div>
  );
};

export default Header;
