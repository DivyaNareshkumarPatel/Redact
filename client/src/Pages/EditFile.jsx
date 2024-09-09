import React, { useEffect, useState } from "react";
import txt from "../assets/sih2024.txt";
import "../style/editFile.css";

export default function EditFile() {
  const [fileContent, setFileContent] = useState("");

  useEffect(() => {
    fetch(txt)
      .then((response) => response.text())
      .then((data) => setFileContent(data))
      .catch((error) => console.error("Error fetching the text file:", error));
  }, []);

  const handleRedact = () => {
    alert("Redact functionality not implemented yet.");
  };

  const handleDownload = () => {
    const blob = new Blob([fileContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sih2024.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSave = () => {
    alert("Save functionality not implemented yet.");
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="edit-file-container">
      <div className="sidebar-container">
        <button onClick={handleGoBack} className="go-back-btn">
          <i class="fa-solid fa-arrow-left btn-icon"></i> Back
        </button>

        <div className="action-buttons-group">
          <button onClick={handleRedact} className="action-btn redact-btn">
            <i class="fa-solid fa-file btn-icon"></i> Redact
          </button>
          <button onClick={handleDownload} className="action-btn download-btn">
            <i class="fa-solid fa-download btn-icon"></i> Download
          </button>
          <button onClick={handleSave} className="action-btn save-btn">
            <i class="fa-solid fa-floppy-disk btn-icon"></i> Save
          </button>
        </div>
      </div>

      <div className="edit-file-area">
        <textarea
          className="file-text-area"
          value={fileContent}
          readOnly
        ></textarea>
      </div>
    </div>
  );
}
