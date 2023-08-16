import React, { useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./index.css";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

// to handle login func in firebase
  const handleLogin = async () => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);

      navigate("/Home", { replace: true });
    } catch (error) {}
  };
// to navigate to sign up sceen
  const handleSignUp = () => {
    navigate("/Signup", { replace: true });
  };
  return (
    <div className="loginContainer">
      <div>
        <h2>Login</h2>
      </div>
      <div>
        <input
          className="loginInput"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <input
          className="loginInput"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="loginBtn">
        <button onClick={handleLogin}>Login</button>

        <button onClick={handleSignUp}>Sign Up</button>
      </div>
    </div>
  );
};

export default Login;
