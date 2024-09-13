import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import '../style/documents.css';

const getUserIdFromToken = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded.id;
  } catch (error) {
    console.error('Failed to decode token:', error);
    return null;
  }
};

export default function DocumentTable() {
  const [documents, setDocuments] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = getUserIdFromToken();
    if (userId) {
      fetch(`http://localhost:5000/api/files/${userId}`)
        .then((response) => response.json())
        .then((data) => {
          setDocuments(data);
        })
        .catch((error) => console.error('Error fetching files:', error));
    } else {
      console.error('User ID not found in token');
    }
  }, []);

  const handleOptionsClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleEdit = (fileId) => {
    navigate(`/editfile/${fileId}`);
  };

  const handleDelete = (fileId) => {
    fetch(`http://localhost:5000/api/files/${fileId}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          setDocuments(documents.filter((doc) => doc._id !== fileId));
        } else {
          alert('Error deleting file');
        }
      })
      .catch((error) => {
        console.error('Error deleting file:', error);
      });
  };

  return (
    <div className="doc-content">
      <h2>Documents</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Content Type</th>
            <th>Name</th>
            <th>Modified</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((doc, index) => (
            <tr key={index}>
              <td>{doc.fileType}</td>
              <td>{doc.fileName}</td>
              <td>{new Date(doc.modifiedDate).toLocaleDateString()}</td>
              <td className="options-btn">
                <div className="options-menu">
                  <button
                    className="options-button"
                    onClick={() => handleOptionsClick(index)}
                  >
                    <i className="dot fa-solid fa-ellipsis"></i>
                  </button>
                  {activeIndex === index && (
                    <div className="dropdown-menu">
                      <button
                        onClick={() => handleEdit(doc._id)}
                        className="dropdown-item"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(doc._id)}
                        className="dropdown-item"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
