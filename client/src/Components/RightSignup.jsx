import React, { useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import "../style/login.css";

export default function RightSignup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');
    setMessage('');
    setMessageType('');

    let hasError = false;

    if (!email || !password || !confirmPassword) {
      setMessage('All fields are required');
      setMessageType('error');
      hasError = true;
    }

    if (!validateEmail(email)) {
      setEmailError('Invalid email address');
      hasError = true;
    }

    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
      hasError = true;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      hasError = true;
    }

    if (hasError) return;

    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', { email, password });
      
      // Store the JWT token in localStorage
      const token = response.data.token;
      localStorage.setItem('token', token);

      setMessage('Signup successful!');
      setMessageType('success');

      setTimeout(() => {
        navigate('/');
      }, 1000);

    } catch (err) {
      setMessage(err.response ? err.response.data.msg : 'Server error');
      setMessageType('error');
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (validateEmail(value)) {
      setEmailError('');
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (value.length >= 6) {
      setPasswordError('');
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    if (value === password) {
      setConfirmPasswordError('');
    }
  };

  return (
    <div className="rightLogin">
      <h1 className="loginTitle">RE-DACT</h1>
      <h3 className="loginWelcome">Welcome</h3>
      <form onSubmit={handleSubmit} className="loginForm">
        <div className={`inputWrapper ${emailError ? 'error' : ''}`}>
          <input
            type="text"
            placeholder="Email address"
            className="loginInput"
            value={email}
            onChange={handleEmailChange}
          />
          {emailError && <div className="errorText">{emailError}</div>}
        </div>
        <div className={`inputWrapper ${passwordError ? 'error' : ''}`}>
          <input
            type="password"
            placeholder="Password"
            className="loginInput"
            value={password}
            onChange={handlePasswordChange}
          />
          {passwordError && <div className="errorText">{passwordError}</div>}
        </div>
        <div className={`inputWrapper ${confirmPasswordError ? 'error' : ''}`}>
          <input
            type="password"
            placeholder="Confirm Password"
            className="loginInput"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
          {confirmPasswordError && <div className="errorText">{confirmPasswordError}</div>}
        </div>
        <div className="submitButtonWrapper">
          <button className="loginButton" style={{ marginTop: "40px" }}>Sign Up</button>
        </div>
        {message && (
          <div className={`messageWrapper ${messageType} visible`}>
            {message}
          </div>
        )}
      </form>
      <div className="signupPrompt">
        Already have an account?{" "}
        <Link to="/login" className="signupLink">
          Login here
        </Link>
      </div>
    </div>
  );
}
