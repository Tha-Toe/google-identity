import React, { useState, useEffect } from "react";
import "./login.css";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  auth,
  db,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
} from "../firebase";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);

  const login = () => {
    logInWithEmailAndPassword(email, password);
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user]);
  return (
    <div className="login-container">
      <div className="login-card-container">
        <h1>Login with email</h1>
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
        <button className="login-button" onClick={() => login()}>
          Login
        </button>
        <div className="sign-up-text">
          Dont have an account? <Link to="/signup">Sign Up</Link> now
        </div>
      </div>
    </div>
  );
}
