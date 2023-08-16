import React from "react";
import firebase from "firebase/app"; // Import firebase/app
import "firebase/auth"; // Import the authentication module
import firebaseConfig from "./firebaseConfig"; // Correct the path to match your file structure
import Login from "./component/Login";
import Home from "./component/Home";
import Signup from "./component/Signup";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
firebase.initializeApp(firebaseConfig);

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/Home"} element={<Home />} />
        <Route path={"/"} element={<Login />} />
        <Route path={"/Login"} element={<Login />} />
        <Route path={"/Signup"} element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
