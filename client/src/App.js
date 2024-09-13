import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Documents from './Pages/Documents';
import Uploads from './Pages/Uploads';
import Account from './Pages/Account';
import EditFile from './Pages/EditFile';
import ProtectedRoutes from './Components/ProtectedRoutes';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/documents" element={<ProtectedRoutes element={<Documents />} />} />
        <Route path="/upload" element={<ProtectedRoutes element={<Uploads />} />} />
        <Route path="/account" element={<ProtectedRoutes element={<Account />} />} />
        <Route path="/editfile/:fileId" element={<ProtectedRoutes element={<EditFile />} />} />
      </Routes>
    </Router>
  );
}

export default App;
