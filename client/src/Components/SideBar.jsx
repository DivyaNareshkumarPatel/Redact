import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../style/SideBar.css";

export default function SideBar() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleToggle = () => {
    setCollapsed(!collapsed);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="arrow" onClick={handleToggle}>
        <i className={`fa-solid fa-chevron-${collapsed ? 'right' : 'left'}`}></i>
      </div>
      <div className="header">
        {!collapsed && <h2>RE-DACT</h2>}
      </div>
      <div className="menu">
        <NavLink to="/documents" className="menu-item" activeClassName="active">
          <i className="fa-regular fa-folder-open"></i>
          <p>Documents</p>
        </NavLink>
        <NavLink to="/upload" className="menu-item" activeClassName="active">
          <i className="fa-solid fa-plus"></i>
          <p>Upload file</p>
        </NavLink>
        <NavLink to="/account" className="menu-item" activeClassName="active">
          <i className="fa-solid fa-user"></i>
          <p>Account</p>
        </NavLink>
      </div>
      <div className="bottom-section">
        <div className="menu-item" onClick={handleLogout}>
          <i className="fa-solid fa-arrow-right-from-bracket"></i>
          <p>Log out</p>
        </div>
      </div>
    </div>
  );
}
