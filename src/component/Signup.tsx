import React, { useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

interface SignupFormProps {
  onSignup: (email: string, password: string) => void;
}

const Signup: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const handleSignup = async () => {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Signup error:", error);
    }
  };
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      console.log("user", user);
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === confirmPassword) {
      handleSignup();
    } else {
      alert("Passwords don't match");
    }
  };
  const handleLogin = () => {
    navigate("/Login", { replace: true });
  };
  return (
    <>
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2> SIGN UP</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>

        <button onClick={handleLogin}>Login</button>
      </form>
    </>
  );
};

export default Signup;
