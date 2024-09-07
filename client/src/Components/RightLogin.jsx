import React from "react";
import "../style/login.css";
import { Link } from "react-router-dom";

export default function RightLogin() {
  return (
    <div className="rightLogin">
      <h1 className="loginTitle">RE-DACT</h1>
      <h3 className="loginWelcome">Welcome Back</h3>
      <form action="" className="loginForm">
        <div className="inputWrapper">
          <input type="text" placeholder="Email address" className="loginInput" />
        </div>
        <div className="inputWrapper">
          <input type="password" placeholder="Password" className="loginInput" />
        </div>
        <div className="formActions">
          <div className="rememberMe">
            <input type="checkbox" name="checkbox" id="rememberMeCheckbox" />
            <label htmlFor="rememberMeCheckbox">Remember me?</label>
          </div>
          <Link to="/forgot-password" className="forgotPasswordLink">
            Forgot Password?
          </Link>
        </div>
        <div className="submitButtonWrapper">
          <button className="loginButton">Log In</button>
        </div>
      </form>
      <div className="signupPrompt">
        Don't have an account? <Link to="/signup" className="signupLink">Sign up here</Link>
      </div>
    </div>
  );
}
