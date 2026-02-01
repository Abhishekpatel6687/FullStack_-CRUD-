import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./App.css"
import Header from './components/Header'
import AddEmp from './components/AddEmp'
import UpdateEmp from './components/UpdateEmp';

const App = () => {
    // const singleEmp ={  name: "singleEmp.name",
    // email: "singleEmp.emai",
    // designation: "ingleEmp.designation",
    // empid:" singleEmp.empid"}
    const [singleEmp, setSingleEmp] = useState({})
  return (
    <div>
        <Router>
         <Routes>
           <Route path="/" element={<Header setSingleEmp={setSingleEmp} />} />
           <Route path="/AddEmp" element={<AddEmp />} />
           <Route path="/update" element={<UpdateEmp  singleEmp={singleEmp}/>} />

           
         </Routes>
       </Router>
    </div>
  )
}

export default App
