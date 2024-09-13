import React, { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import axios from "axios";
import "../style/account.css";

export default function AccountCompo() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/auth/account', {
          headers: {
            Authorization: token,
          },
        });
        setUser(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response ? err.response.data.msg : "Error fetching account details");
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="accountTop">
      <div className="account-container">
        <div className="profile-header">
          <div className="account-icon-wrapper">
            <FaUserCircle className="account-icon" />
          </div>
          {user && (
            <div className="profile-info">
              <h1 className="user-name">{user.name}</h1>
            </div>
          )}
        </div>
        <div className="account-details">
          <div className="detail-item">
            <strong>Email:</strong> {user ? user.email : 'N/A'}
          </div>
          {/* <div className="detail-item">
            <strong>Phone:</strong> {user ? user.phone : 'N/A'}
          </div> */}
        </div>
      </div>
    </div>
  );
}
