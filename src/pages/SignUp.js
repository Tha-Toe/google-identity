import React, { useState } from "react";
import "./login.css";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  auth,
  db,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
} from "../firebase";
import { Link, useNavigate } from "react-router-dom";
export default function SignUp() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [name, setName] = useState(null);
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const register = () => {
    if (!name) {
      alert("Please enter name");
    } else if (!email) {
      alert("Please enter email");
    } else if (!password) {
      alert("Please enter password");
    } else {
      registerWithEmailAndPassword(name, email, password);
      navigate("/", { replace: true });
    }
  };
  return (
    <div className="login-container">
      <div className="login-card-container">
        <h1>SignUp with email</h1>
        <input
          type="text"
          className="login-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your Name"
        />
        <input
          type="text"
          className="login-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button className="login-button" onClick={() => register()}>
          Sign Up
        </button>
        <div className="sign-up-text">
          Already have an account? <Link to="/login">Log In</Link> now
        </div>
      </div>
    </div>
  );
}
