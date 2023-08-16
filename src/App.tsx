import React, { lazy, Suspense } from "react";
import firebase from "firebase/app"; // Import firebase/app
import "firebase/auth"; // Import the authentication module
import firebaseConfig from "./firebaseConfig"; // Correct the path to match your file structure

import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { SCREEN } from "./constant/screen";
firebase.initializeApp(firebaseConfig);

const App= () => {
  const Home = lazy(() => import("./component/Home"));
const Login = lazy(() => import("./component/Login"));
const Signup = lazy(() => import("./component/Signup"));
  return (
    <BrowserRouter>
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path={SCREEN.HOME} element={<Home />} />
        <Route path={SCREEN.MAIN} element={<Login />} />
        <Route path={SCREEN.LOGIN} element={<Login />} />
        <Route path={SCREEN.SIGNUP} element={<Signup />} />
      </Routes>
    </Suspense>
  </BrowserRouter>
  );
};

export default App;
