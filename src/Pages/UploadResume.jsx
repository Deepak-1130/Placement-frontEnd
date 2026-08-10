import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UploadResume.css'; 

const UploadResume = () => {
  const { regNo } = useParams(); 
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setStatusMessage('');

    if (!file) {
      setStatusMessage('Please select a PDF file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('resume', file);

    try {
      await axios.post(`http://localhost:8080/addResume/${regNo}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setStatusMessage('Resume uploaded successfully.');
      navigate('/');
    } catch (error) {
      console.error(error);
      setStatusMessage('Resume upload failed. Please try again.');
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
          Upload Resume
        </button>
      </form>
      {statusMessage && <div className="status-message">{statusMessage}</div>}
    </div>
  );
};

export default UploadResume;