import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Registration.css';

const Registration = () => {
  const navigate = useNavigate();
  const [student, setStudent] = useState({
    registerNumber: '',
    firstName: '',
    lastName: '',
    departments: 'CSE', 
    passedOutYear: '',
    CGPA: '',           
    fatherName: '',
    motherName: '',
    fatherOccupation: '',
    motherOccupation: '',
    parentNumber: '',
    studentNumber: '',
    emailId: '',
    nativePlace: '',
    historyOfArrears: ''
  });
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/addStudent', student);
      setStatusMessage('Student registered successfully. Please proceed to upload your resume.');
      navigate(`/upload-resume/${student.registerNumber}`);
    } catch (error) {
      console.error(error);
      setStatusMessage('Unable to complete registration. Please try again or contact support.');
    }
  };

  return (
    <div className="registration-container">
      <h2>Student Registration Form</h2>
      {statusMessage && <div className="status-message">{statusMessage}</div>}
      <form onSubmit={handleSubmit}>
        
        <div className="form-group">
          <label>Register Number</label>
          <input type="number" name="registerNumber" className="form-input" placeholder="e.g., 917621104001" onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>First Name</label>
          <input type="text" name="firstName" className="form-input" placeholder="Enter first name" onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Last Name</label>
          <input type="text" name="lastName" className="form-input" placeholder="Enter last name" onChange={handleChange} required />
        </div>
        
        <div className="form-group">
          <label>Department</label>
          <select name="departments" className="form-input" onChange={handleChange}>
            <option value="CSE">CSE</option>
            <option value="ECE">ECE</option>
            <option value="EEE">EEE</option>
            <option value="IT">IT</option>
            <option value="CIVIL">CIVIL</option>
            <option value="MECH">MECH</option>
          </select>
        </div>

        <div className="form-group">
          <label>Passed Out Year</label>
          <input type="number" name="passedOutYear" className="form-input" placeholder="e.g., 2026" onChange={handleChange} required />
        </div>
        
        <div className="form-group">
          <label>CGPA</label>
          <input type="number" step="0.01" name="CGPA" className="form-input" placeholder="e.g., 8.75" onChange={handleChange} required />
        </div>
        
        <div className="form-group">
          <label>Father's Name</label>
          <input type="text" name="fatherName" className="form-input" placeholder="Enter father's name" onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Mother's Name</label>
          <input type="text" name="motherName" className="form-input" placeholder="Enter mother's name" onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Father's Occupation</label>
          <input type="text" name="fatherOccupation" className="form-input" placeholder="Occupation" onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Mother's Occupation</label>
          <input type="text" name="motherOccupation" className="form-input" placeholder="Occupation" onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Parent Contact Number</label>
          <input type="number" name="parentNumber" className="form-input" placeholder="10 digit number" onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Student Contact Number</label>
          <input type="number" name="studentNumber" className="form-input" placeholder="10 digit number" onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Email ID</label>
          <input type="email" name="emailId" className="form-input" placeholder="name@example.com" onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Native Place</label>
          <input type="text" name="nativePlace" className="form-input" placeholder="Enter city/town" onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>History of Arrears Count</label>
          <input type="number" name="historyOfArrears" className="form-input" placeholder="Enter 0 if none" onChange={handleChange} required />
        </div>
        
        <button type="submit" className="submit-btn">Register & Next</button>
      </form>
    </div>
  );
};

export default Registration;