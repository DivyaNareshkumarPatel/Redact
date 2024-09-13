import React, { useState } from "react";
import { FaCloudUploadAlt, FaDesktop, FaCloudDownloadAlt } from "react-icons/fa";
import {jwtDecode} from "jwt-decode";
import "../style/upload.css";

const getUserIdFromToken = () => {
  const token = localStorage.getItem('token');
  console.log(token, "Retrieved token");
  if (!token) return null;
  
  try {
    const decoded = jwtDecode(token);
    console.log(decoded, "Decoded JWT");
    return decoded.id;
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
};

export default function UploadComponent() {
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragging(false);
    const selectedFile = event.dataTransfer.files[0];
    setFile(selectedFile);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setDragging(false);
  };

  const handleUpload = async () => {
    const userId = getUserIdFromToken();
    if (!file || !userId) {
      alert("Please select a file and ensure you are logged in!");
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('userId', userId);

    const xhr = new XMLHttpRequest();
    
    xhr.upload.addEventListener('progress', (event) => {
      if (event.lengthComputable) {
        const percentComplete = (event.loaded / event.total) * 100;
        setUploadProgress(percentComplete);
      }
    });

    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        setFile(null);
        setUploadProgress(0);
      } else {
        console.error('Upload error:', xhr.statusText);
        alert('Upload failed. Please try again.');
      }
    });

    xhr.addEventListener('error', () => {
      console.error('Upload failed:', xhr.statusText);
      alert('Upload failed. Please try again.');
    });

    xhr.open('POST', 'http://localhost:3000/api/upload');
    xhr.send(formData);
  };

  return (
    <div className="upload-card">
      <h2 className="upload-title">Upload Your File</h2>

      <div className="upload-container">
        <div
          className={`drop-zone ${dragging ? 'dragging' : ''}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <FaCloudDownloadAlt className="icon" />
          <p>{dragging ? 'Drop your file here' : 'Drag & drop your file here'}</p>
        </div>
        <input
          id="file-upload"
          type="file"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        <label htmlFor="file-upload" className="btn-upload pc-upload">
          <FaDesktop className="icon" /> Upload from PC
        </label>
      </div>

      <button onClick={handleUpload} className="btn-submit">
        <FaCloudUploadAlt className="icon" /> Upload File
      </button>

      {file && (
        <div className="file-info">
          <span>Selected File:</span><span>{file.name}</span>
        </div>
      )}

      {uploadProgress > 0 && (
        <div className="progress-container">
          <div
            className="progress-bar"
            style={{ width: `${uploadProgress}%` }}
          >
            {Math.round(uploadProgress)}%
          </div>
        </div>
      )}
    </div>
  );
}
