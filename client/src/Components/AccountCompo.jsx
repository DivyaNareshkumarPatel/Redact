import React from "react";
import { FaUserCircle } from "react-icons/fa"; // Importing an account icon
import "../style/account.css";

export default function AccountCompo() {
  const user = {
    name: "Divya Patel",
    email: "divya@gmail.com",
    phone: "123-456-7890",
  };

  return (
    <div className="accountTop">
      <div className="account-container">
        <div className="profile-header">
          <div className="account-icon-wrapper"> {/* Icon wrapper for background */}
            <FaUserCircle className="account-icon" />
          </div>
          <div className="profile-info">
            <h1 className="user-name">{user.name}</h1>
          </div>
        </div>
        <div className="account-details">
          <div className="detail-item">
            <strong>Email:</strong> {user.email}
          </div>
          <div className="detail-item">
            <strong>Phone:</strong> {user.phone}
          </div>
        </div>
      </div>
    </div>
  );
}
