import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UploadResume.css'; 

const UploadResume = () => {
  const { regNo } = useParams(); 
  const navigate = useNavigate();
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a PDF file first!");
      return;
    }

    const formData = new FormData();
    formData.append('resume', file);

    try {
      const response = await axios.post(`http://localhost:8080/addResume/${regNo}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert(response.data); 
      navigate('/'); 
    } catch (error) {
      console.error(error);
      alert("Error uploading file.");
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload Resume</h2>
      <div className="reg-badge">Register Number: {regNo}</div>
      
      <form onSubmit={handleUpload}>
        <div className="file-upload-box">
          <input 
            type="file" 
            accept=".pdf" 
            className="file-input"
            onChange={handleFileChange} 
            required 
          />
        </div>
        
        <button type="submit" className="upload-btn">
          Upload & Complete
        </button>
      </form>
    </div>
  );
};

export default UploadResume;