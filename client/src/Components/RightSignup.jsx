import React from "react";
import { Link } from "react-router-dom";
import "../style/login.css";
export default function RightSignup() {
  return (
    <div className="rightLogin">
      <h1 className="loginTitle">RE-DACT</h1>
      <h3 className="loginWelcome">Welcome</h3>
      <form action="" className="loginForm">
        <div className="inputWrapper">
          <input
            type="text"
            placeholder="Email address"
            className="loginInput"
          />
        </div>
        <div className="inputWrapper">
          <input
            type="password"
            placeholder="Password"
            className="loginInput"
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Forgot Password"
            className="loginInput"
          />
        </div>
        <div className="submitButtonWrapper">
          <button className="loginButton" style={{marginTop:"40px"}}>Sign Up</button>
        </div>
      </form>
      <div className="signupPrompt">
        Already have an account?{" "}
        <Link to="/login" className="signupLink">
          Login up here
        </Link>
      </div>
    </div>
  );
}
