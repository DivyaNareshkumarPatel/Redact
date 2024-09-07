import React from "react";
import "../style/account.css";

export default function AccountCompo() {
  const user = {
    profilePicture: "https://via.placeholder.com/150",
    name: "Divya Patel",
    email: "divya@gmail.com",
    phone: "123-456-7890",
    address: "123 house, Ahmedabad, India",
  };

  return (
    <div className="accountTop">
      <div className="account-container">
        <div className="profile-header">
          <img
            src={user.profilePicture}
            alt="Profile"
            className="profile-picture"
          />
          <div className="profile-info">
            <h1 className="user-name">{user.name}</h1>
            <p className="user-email">{user.email}</p>
          </div>
        </div>
        <div className="account-details">
          <div className="detail-item">
            <strong>Phone:</strong> {user.phone}
          </div>
          <div className="detail-item">
            <strong>Address:</strong> {user.address}
          </div>
        </div>
      </div>
    </div>
  );
}
