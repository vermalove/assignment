import React from "react";
import firebase from "firebase/app"; // Import firebase/app
import "firebase/auth"; // Import the authentication module
import firebaseConfig from "./firebaseConfig"; // Correct the path to match your file structure
import Login from "./component/Login";
import Home from "./component/Home";
import Signup from "./component/Signup";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { SCREEN } from "./constant/screen";
firebase.initializeApp(firebaseConfig);

const App= () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={SCREEN.HOME} element={<Home />} />
        <Route path={SCREEN.MAIN} element={<Login />} />
        <Route path={SCREEN.LOGIN} element={<Login />} />
        <Route path={SCREEN.SIGNUP} element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
