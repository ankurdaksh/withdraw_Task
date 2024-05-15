
import React from "react";
import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import './App.css'
import WithdrawForm from "./component/WithdrawForm";



function App() {
  

  return (
    <Router>
      <div style={{marginTop:'20px'}}>  
        <Routes>
          <Route exact path="/" element={ <Suspense fallback={<div>...Loading</div>}><WithdrawForm /></Suspense>} />
        </Routes>
      </div>
    </Router>
  );
}


export default App;
