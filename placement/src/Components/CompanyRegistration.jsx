import React, { useState } from 'react';
import axios from 'axios';
import '../StyleSheets/CompanyRegistration.css';

const CompanyRegister = () => {

  const [form, setForm] = useState({
    companyName: '',
    branch: '',
    email: '',
    mobileNo: '',
    hasArrears: false,
    highestPackage: '',
    profilePic: null
  });

  const [errors, setErrors] = useState({});

  
  const handleChange = (e) => {
    const { name, value, type, files, checked } = e.target;

    if (type === "file") {
      setForm({ ...form, [name]: files[0] });
    } else if (type === "checkbox") {
      setForm({ ...form, [name]: checked });
    } else {
      setForm({ ...form, [name]: value });
    }
  };


  const validate = () => {
    const newErrors = {};

    if (!form.companyName.trim()) newErrors.companyName = "Company name required";
    if (!form.branch.trim()) newErrors.branch = "Branch required";
    if (!form.email.includes("@")) newErrors.email = "Valid email required";
    if (!form.mobileNo || form.mobileNo.length !== 10) newErrors.mobileNo = "Valid mobile number required";
    if (!form.highestPackage) newErrors.highestPackage = "Package required";
    if (!form.profilePic) newErrors.profilePic = "Profile picture required";

    return newErrors;
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length !== 0) return;

    const companyObject = {
      companyName: form.companyName,
      branch: form.branch,
      email: form.email,
      mobileNo: form.mobileNo,
      hasArrears: form.hasArrears,
      highestPackage: parseFloat(form.highestPackage)
    };

    const formData = new FormData();

    
    formData.append("company", JSON.stringify(companyObject));
    formData.append("profilePic", form.profilePic);

    try {
      await axios.post("http://localhost:8080/register", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      alert("Company Registered Successfully!");
      
    } catch (error) {
      console.error("Error:", error);
      alert("Registration failed");
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
        <div className="register-header">
          <p className="register-eyebrow">Placement Portal</p>
          <h2>Company Registration</h2>
         
        </div>

        <div className="field-group">
          <label htmlFor="companyName">Company Name</label>
          <input
            id="companyName"
            type="text"
            name="companyName"
            value={form.companyName}
            onChange={handleChange}
            aria-invalid={Boolean(errors.companyName)}
            required
          />
          {errors.companyName && <p className="error">{errors.companyName}</p>}
        </div>

        <div className="field-group">
          <label htmlFor="branch">Branch</label>
          <input
            id="branch"
            type="text"
            name="branch"
            value={form.branch}
            onChange={handleChange}
            aria-invalid={Boolean(errors.branch)}
            required
          />
          {errors.branch && <p className="error">{errors.branch}</p>}
        </div>

        <div className="field-group">
          <label htmlFor="email">Official Email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            aria-invalid={Boolean(errors.email)}
            required
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        <div className="field-group">
          <label htmlFor="mobileNo">Contact Number</label>
          <input
            id="mobileNo"
            type="tel"
            name="mobileNo"
            value={form.mobileNo}
            onChange={handleChange}
            inputMode="numeric"
            aria-invalid={Boolean(errors.mobileNo)}
            required
          />
          {errors.mobileNo && <p className="error">{errors.mobileNo}</p>}
        </div>

        <div className="field-group">
          <label htmlFor="highestPackage">Highest Package Offered (LPA)</label>
          <input
            id="highestPackage"
            type="number"
            name="highestPackage"
            min="0"
            step="0.1"
            value={form.highestPackage}
            onChange={handleChange}
            aria-invalid={Boolean(errors.highestPackage)}
            required
          />
          {errors.highestPackage && <p className="error">{errors.highestPackage}</p>}
        </div>

        <div className="field-group checkbox-group">
          <label htmlFor="hasArrears" className="checkbox-label">
            <input
              id="hasArrears"
              type="checkbox"
              name="hasArrears"
              checked={form.hasArrears}
              onChange={handleChange}
            />
            Accept students with arrears
          </label>
        </div>

        <div className="field-group">
          <label htmlFor="profilePic">Company Logo</label>
          <input
            id="profilePic"
            type="file"
            name="profilePic"
            accept="image/jpeg,image/png"
            onChange={handleChange}
            aria-invalid={Boolean(errors.profilePic)}
            required
          />
          {errors.profilePic && <p className="error">{errors.profilePic}</p>}
        </div>

        <button type="submit">Submit Registration</button>

      </form>
    </div>
  );
};

export default CompanyRegister;