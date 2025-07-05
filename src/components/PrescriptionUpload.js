import React, { useRef, useState } from "react";
import "./PrescriptionUpload.css";

export default function PrescriptionUpload() {
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="prescription-container">
      <h3>Upload Your Prescription 📄</h3>

      <div className="upload-box" onClick={() => fileInputRef.current.click()}>
        {preview ? (
          <img src={preview} alt="Prescription" className="preview-image" />
        ) : (
          <p>Click here to upload or capture a prescription photo</p>
        )}
      </div>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleImageUpload}
        style={{ display: "none" }}
      />

      {preview && <button className="upload-btn">Submit Prescription</button>}
    </div>
  );
}
