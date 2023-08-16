import React, { useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { SCREEN } from "../constant/screen";

interface SignupFormProps {
  onSignup: (email: string, password: string) => void;
}

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  // to handle sign up in firebase with email and password
  const handleSignup = async () => {
    const { email, password } = formData;
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      navigate(SCREEN.LOGIN, { replace: true });
    } catch (error) {
      console.error("Signup error:", error);
    }
  };
  // to check auth of current user
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      console.log("user", user);
    });
  }, []);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // pass email id and password to handleSubmit function
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password === formData.confirmPassword) {
      handleSignup();
    } else {
      alert("Passwords don't match");
    }
  };
  // navigate to login screen
  const handleLogin = () => {
    navigate(SCREEN.LOGIN, { replace: true });
  };
  return (
    <>
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2> SIGN UP</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Sign Up</button>

        <button onClick={handleLogin}>Login</button>
      </form>
    </>
  );
};

export default Signup;
