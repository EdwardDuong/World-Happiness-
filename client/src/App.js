import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Home from "./Pages/Home/Home";
import { BrowserRouter as Router } from "react-router-dom";

//Render the app
function App() {
  return (
    <Router>
      <div className="App">
        <Home />
      </div>
    </Router>
  );
}

export default App;
