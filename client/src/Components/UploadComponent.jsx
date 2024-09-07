import React, { useState, useEffect } from "react";
import { FaCloudUploadAlt, FaDesktop, FaGoogleDrive, FaCloudDownloadAlt } from "react-icons/fa";
import "../style/upload.css";

export default function UploadComponent() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragging, setDragging] = useState(false);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    URL.revokeObjectURL(preview);
    setFile(selectedFile);
    const filePreview = URL.createObjectURL(selectedFile);
    setPreview(filePreview);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragging(false);
    const selectedFile = event.dataTransfer.files[0];
    URL.revokeObjectURL(preview);
    setFile(selectedFile);
    const filePreview = URL.createObjectURL(selectedFile);
    setPreview(filePreview);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setDragging(false);
  };

  const handleGoogleDriveUpload = () => {
    alert("Google Drive upload functionality coming soon!");
  };

  const handleUpload = () => {
    if (!file) {
      alert("Please select a file!");
      return;
    }

    if (file.type === 'application/pdf') {
      alert(`File "${file.name}" (PDF) uploaded successfully!`);
    } else {
      let progress = 0;
      const interval = setInterval(() => {
        if (progress < 100) {
          progress += 10;
          setUploadProgress(progress);
        } else {
          clearInterval(interval);
          alert(`File "${file.name}" uploaded successfully!`);
          setUploadProgress(0);
        }
      }, 500);
    }
  };

  useEffect(() => {
    return () => URL.revokeObjectURL(preview);
  }, [preview]);

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

      <button
        className="btn-upload drive-upload"
        onClick={handleGoogleDriveUpload}
      >
        <FaGoogleDrive className="icon" /> Upload from Google Drive
      </button>

      {preview && (
        <div className="file-preview">
          <h3>File Preview:</h3>
          <img src={preview} alt="File Preview" className="preview-image" />
        </div>
      )}

      {uploadProgress > 0 && (
        <div className="progress-container">
          <div
            className="progress-bar"
            style={{ width: `${uploadProgress}%` }}
          ></div>
        </div>
      )}

      <button onClick={handleUpload} className="btn-submit">
        <FaCloudUploadAlt className="icon" /> Upload File
      </button>
    </div>
  );
}