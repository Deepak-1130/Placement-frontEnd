import { useState, useRef, useEffect, useCallback } from "react";
import "./PlacementRegistration.css";

// ─── Constants ───────────────────────────────────────────────────────────────

const steps = [
  { id: 1, label: "Academic Info", icon: "🎓" },
  { id: 2, label: "Personal Info", icon: "👤" },
  { id: 3, label: "Family Info", icon: "🏠" },
  { id: 4, label: "Documents", icon: "📄" },
];

const departments = ["CSE", "IT", "ECE", "EEE", "MECH", "Civil"];

const currentYear = new Date().getFullYear();
const passedOutYears = Array.from({ length: 6 }, (_, i) => currentYear + i);

const genders = ["MALE", "FEMALE", "OTHER", "PREFER_NOT_TO_SAY"];
const genderDisplayLabels = {
  MALE: "Male",
  FEMALE: "Female",
  OTHER: "Other",
  PREFER_NOT_TO_SAY: "Prefer not to say",
};

const API_BASE_URL = "http://localhost:8080";
const STORAGE_KEY = "placementForm";
const SUBMITTED_KEY = "placementFormSubmitted";

// ─── Toast Component ──────────────────────────────────────────────────────────

function Toast({ toasts, removeToast }) {
  return (
    <div className="pr-toast-container">
      {toasts.map((t) => (
        <div key={t.id} className={`pr-toast pr-toast--${t.type}`}>
          <span className="pr-toast-icon">
            {t.type === "success" ? "✅" : t.type === "error" ? "❌" : t.type === "warning" ? "⚠️" : "ℹ️"}
          </span>
          <span className="pr-toast-msg">{t.message}</span>
          <button className="pr-toast-close" onClick={() => removeToast(t.id)}>×</button>
        </div>
      ))}
    </div>
  );
}

// ─── useToast Hook ────────────────────────────────────────────────────────────

function useToast() {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = "info", duration = 4000) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    if (duration > 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, duration);
    }
    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return { toasts, addToast, removeToast };
}

// ─── Validation ───────────────────────────────────────────────────────────────

const REGISTER_NUMBER_REGEX = /^\d{4,20}$/;
const NAME_REGEX = /^[A-Za-z\s'-]{1,50}$/;
const PHONE_REGEX = /^\d{10}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const INCOME_REGEX = /^\d+(\.\d{1,2})?$/;
const GOOGLE_DRIVE_URL_REGEX = /^(https?:\/\/)?(drive\.google\.com\/file\/d\/|docs\.google\.com\/document\/d\/)[\w-]+\/.*$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

function validateStep(step, form) {
  const errors = {};

  if (step === 1) {
    if (!form.registerNumber.trim())
      errors.registerNumber = "Register number is required";
    else if (!REGISTER_NUMBER_REGEX.test(form.registerNumber.trim()))
      errors.registerNumber = "Only numbers allowed, 4–20 digits";

    if (!form.firstName.trim()) errors.firstName = "First name is required";
    else if (!NAME_REGEX.test(form.firstName.trim()))
      errors.firstName = "Enter a valid first name (letters only, 1–50 chars)";

    if (!form.lastName.trim()) errors.lastName = "Last name is required";
    else if (!NAME_REGEX.test(form.lastName.trim()))
      errors.lastName = "Enter a valid last name (letters only, 1–50 chars)";

    if (!form.studentNumber.trim()) errors.studentNumber = "Phone number is required";
    else if (!PHONE_REGEX.test(form.studentNumber.trim()))
      errors.studentNumber = "Enter a valid 10-digit mobile number";

    if (!form.emailId.trim()) errors.emailId = "Email is required";
    else if (!EMAIL_REGEX.test(form.emailId.trim()))
      errors.emailId = "Enter a valid email address";

    if (!form.password) errors.password = "Password is required";
    else if (!PASSWORD_REGEX.test(form.password))
      errors.password = "Password must be at least 8 characters with uppercase, lowercase, number & special character";

    if (!form.confirmPassword) errors.confirmPassword = "Please confirm your password";
    else if (form.password !== form.confirmPassword)
      errors.confirmPassword = "Passwords do not match";

    if (!form.departments) errors.departments = "Please select a department";
    if (!form.passedOutYear) errors.passedOutYear = "Please select passed out year";
  }

  if (step === 2) {
    if (!form.gender) errors.gender = "Please select your gender";

    if (!form.nativePlace.trim()) errors.nativePlace = "Native place is required";
    else if (form.nativePlace.trim().length < 2)
      errors.nativePlace = "Enter at least 2 characters";

    if (form.cgpa === "") errors.cgpa = "CGPA is required";
    else if (isNaN(form.cgpa) || Number(form.cgpa) < 0 || Number(form.cgpa) > 10)
      errors.cgpa = "CGPA must be between 0.00 and 10.00";

    if (form.historyOfArrears === "")
      errors.historyOfArrears = "History of arrears is required (enter 0 if none)";
    else if (
      isNaN(form.historyOfArrears) ||
      parseInt(form.historyOfArrears) < 0
    )
      errors.historyOfArrears = "Must be 0 or a positive number";
  }

  if (step === 3) {
    if (!form.fatherName.trim()) errors.fatherName = "Father's name is required";
    else if (!NAME_REGEX.test(form.fatherName.trim()))
      errors.fatherName = "Enter a valid name";

    if (!form.motherName.trim()) errors.motherName = "Mother's name is required";
    else if (!NAME_REGEX.test(form.motherName.trim()))
      errors.motherName = "Enter a valid name";

    if (!form.fatherOccupation.trim())
      errors.fatherOccupation = "Father's occupation is required";
    if (!form.motherOccupation.trim())
      errors.motherOccupation = "Mother's occupation is required";

    if (!form.familyIncome.toString().trim())
      errors.familyIncome = "Family income is required";
    else if (!INCOME_REGEX.test(form.familyIncome.toString().trim()) || Number(form.familyIncome) < 0)
      errors.familyIncome = "Enter a valid positive income amount";

    if (!form.parentNumber.trim())
      errors.parentNumber = "Parent's phone number is required";
    else if (!PHONE_REGEX.test(form.parentNumber.trim()))
      errors.parentNumber = "Enter a valid 10-digit phone number";
  }

  if (step === 4) {
    if (!form.resumeUrl.trim()) {
      errors.resumeUrl = "Google Drive resume URL is required";
    } else if (!GOOGLE_DRIVE_URL_REGEX.test(form.resumeUrl.trim())) {
      errors.resumeUrl = "Please enter a valid Google Drive shareable link";
    }
  }

  return errors;
}

// ─── Main Component ───────────────────────────────────────────────────────────

const INITIAL_FORM = {
  registerNumber: "",
  firstName: "",
  lastName: "",
  studentNumber: "",
  emailId: "",
  password: "",
  confirmPassword: "",
  departments: "",
  passedOutYear: "",
  gender: "",
  nativePlace: "",
  cgpa: "",
  historyOfArrears: "",
  fatherName: "",
  motherName: "",
  fatherOccupation: "",
  motherOccupation: "",
  familyIncome: "",
  parentNumber: "",
  resumeUrl: "",
};

export default function PlacementRegistration() {
  const [step, setStep] = useState(1);
  const [profilePreview, setProfilePreview] = useState(null);
  const [profileFile, setProfileFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const profileRef = useRef();
  const submitLockRef = useRef(false);

  const { toasts, addToast, removeToast } = useToast();

  // ── Restore saved progress ────────────────────────────────────────────────
  useEffect(() => {
    const savedForm = sessionStorage.getItem(STORAGE_KEY);
    if (savedForm) {
      try {
        const parsedForm = JSON.parse(savedForm);
        // Don't restore password fields for security
        setForm({ ...parsedForm, password: "", confirmPassword: "" });
      } catch (e) {
        console.error("Error loading saved form:", e);
      }
    }
    
    if (sessionStorage.getItem(SUBMITTED_KEY) === "true") {
      setSubmitted(true);
    }
  }, []);

  // ── Auto-save on change (excluding password) ───────────────────────────────────
  useEffect(() => {
    if (submitted) return;
    const { password, confirmPassword, ...formToSave } = form;
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(formToSave));
  }, [form, submitted]);

  // ── Handlers ──────────────────────────────────────────────────────────────

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    setErrors((p) => ({ ...p, [name]: "" }));
  };

  const handleProfilePic = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Validate file size (2MB)
    if (file.size > 2 * 1024 * 1024) {
      setErrors((p) => ({ ...p, profile: "File size must be under 2MB" }));
      addToast("Profile picture too large (max 2MB)", "error");
      return;
    }
    
    // Validate file type
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      setErrors((p) => ({ ...p, profile: "Please upload a valid image file (JPEG, PNG, GIF, WEBP)" }));
      addToast("Invalid file type. Please upload an image.", "error");
      return;
    }
    
    setProfileFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setProfilePreview(reader.result);
    reader.readAsDataURL(file);
    setErrors((p) => ({ ...p, profile: "" }));
    addToast("Profile picture selected ✓", "success", 2500);
  };

  // ── Navigation ────────────────────────────────────────────────────────────

  const nextStep = () => {
    const errs = validateStep(step, form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      addToast("Please fix the errors before continuing", "warning");
      return;
    }
    setErrors({});
    setStep((s) => Math.min(s + 1, 4));
    addToast(`Step ${step} complete ✓`, "success", 2000);
  };

  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  // ── API calls ─────────────────────────────────────────────────────────────

  const submitRegistrationData = async () => {
    // Convert registerNumber to Long (number)
    const registerNumberValue = parseInt(form.registerNumber.trim(), 10);
    
    // Validate that registerNumber is a valid number
    if (isNaN(registerNumberValue)) {
      throw new Error("Invalid register number");
    }
    
    const registrationData = {
      registerNumber: registerNumberValue,
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      studentNumber: form.studentNumber.trim(),
      emailId: form.emailId.trim(),
      password: form.password,
      departments: form.departments,
      passedOutYear: parseInt(form.passedOutYear, 10),
      gender: form.gender,
      nativePlace: form.nativePlace.trim(),
      cgpa: parseFloat(form.cgpa),
      historyOfArrears: parseInt(form.historyOfArrears, 10) || 0,
      fatherName: form.fatherName.trim(),
      motherName: form.motherName.trim(),
      fatherOccupation: form.fatherOccupation.trim(),
      motherOccupation: form.motherOccupation.trim(),
      familyIncome: parseFloat(form.familyIncome),
      parentNumber: form.parentNumber.trim(),
      resumeUrl: form.resumeUrl.trim(),
    };

    console.log("Submitting registration data:", { ...registrationData, password: "***" });

    const response = await fetch(`${API_BASE_URL}/addStudent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(registrationData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Registration error response:", errorText);
      throw new Error(errorText || "Registration failed");
    }

    const result = await response.text();
    console.log("Registration successful:", result);
    
    return registerNumberValue;
  };

  const uploadProfilePicture = async (registerNumber) => {
    if (!profileFile) {
      console.log("No profile picture to upload");
      return { success: true, message: "No file selected" };
    }
    
    const fd = new FormData();
    fd.append("file", profileFile);
    
    console.log("Uploading profile picture for registerNumber:", registerNumber);
    
    try {
      const res = await fetch(`${API_BASE_URL}/students/${registerNumber}/profile`, {
        method: "POST",
        body: fd,
      });
      
      const responseText = await res.text();
      console.log("Profile upload response:", responseText);
      
      if (!res.ok) {
        throw new Error(responseText || `Upload failed with status ${res.status}`);
      }
      
      addToast("Profile picture uploaded ✓", "success", 2500);
      return { success: true, message: responseText };
    } catch (error) {
      console.error("Profile upload error:", error);
      // Don't fail the whole registration if profile upload fails
      addToast(`Note: Profile picture upload failed - ${error.message}. You can upload it later.`, "warning", 5000);
      return { success: false, message: error.message };
    }
  };

  // ── Submit ────────────────────────────────────────────────────────────────

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (submitLockRef.current || isSubmitting) {
      addToast("Submission already in progress, please wait…", "warning");
      return;
    }

    const errs = validateStep(4, form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      addToast("Please fix the errors before submitting", "warning");
      return;
    }

    submitLockRef.current = true;
    setIsSubmitting(true);

    try {
      // First, register the student and get the register number
      addToast("Registering student information...", "info", 2000);
      const registerNumber = await submitRegistrationData();
      addToast("Student information saved ✓", "success", 2500);
      
      // Add a small delay to ensure student is fully saved in database
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Then upload profile picture if selected
      if (profileFile) {
        addToast("Uploading profile picture...", "info", 2000);
        await uploadProfilePicture(registerNumber);
      } else {
        addToast("No profile picture selected (optional)", "info", 2000);
      }

      // Clear saved form data
      sessionStorage.setItem(SUBMITTED_KEY, "true");
      sessionStorage.removeItem(STORAGE_KEY);
      setSubmitted(true);

      addToast("🎉 Registration submitted successfully!", "success", 6000);
    } catch (error) {
      console.error("Submission error:", error);
      let errorMessage = error.message;
      
      // Try to parse the error message if it's JSON
      try {
        const parsedError = JSON.parse(error.message);
        errorMessage = parsedError.message || parsedError.error || error.message;
      } catch (e) {
        // Not JSON, use as is
      }
      
      addToast(`Registration failed: ${errorMessage}`, "error", 6000);
    } finally {
      setIsSubmitting(false);
      submitLockRef.current = false;
    }
  };

  // ── Helpers ───────────────────────────────────────────────────────────────

  const ic = (field) => `pr-input${errors[field] ? " pr-input--error" : ""}`;
  const sc = (field) => `pr-select${errors[field] ? " pr-select--error" : ""}`;

  const stepCircleClass = (id) => {
    if (step > id) return "pr-step-circle pr-step-circle--done";
    if (step === id) return "pr-step-circle pr-step-circle--active";
    return "pr-step-circle pr-step-circle--inactive";
  };

  const dotClass = (id) => {
    if (step === id) return "pr-dot pr-dot--active";
    if (step > id) return "pr-dot pr-dot--done";
    return "pr-dot pr-dot--inactive";
  };

  // ── Google Drive URL Helper ───────────────────────────────────────────────

  const getGoogleDriveEmbedUrl = (url) => {
    const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      return `https://drive.google.com/file/d/${match[1]}/preview`;
    }
    return url;
  };

  // ── Already submitted guard ───────────────────────────────────────────────

  if (submitted) {
    return (
      <div className="pr-page">
        <Toast toasts={toasts} removeToast={removeToast} />
        <div className="pr-container">
          <div className="pr-success-screen">
            <div className="pr-success-icon">🎉</div>
            <h2 className="pr-success-title">Registration Complete!</h2>
            <p className="pr-success-msg">
              Your placement registration has been submitted successfully.
              The placement cell will reach out to you via email.
            </p>
            <p className="pr-success-email">{form.emailId}</p>
            <button 
              className="pr-btn-reset"
              onClick={() => {
                sessionStorage.clear();
                window.location.reload();
              }}
            >
              Register Another Student
            </button>
          </div>
          <p className="pr-footer">
            © 2025 Placement Portal • For support contact placement@college.edu
          </p>
        </div>
      </div>
    );
  }

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="pr-page">
      <Toast toasts={toasts} removeToast={removeToast} />

      <div className="pr-container">
        {/* Header */}
        <div className="pr-header">
          <div className="pr-portal-badge">
            <span className="pr-portal-badge-icon">🎓</span>
            <span className="pr-portal-badge-text">Placement Portal</span>
          </div>
          <h1 className="pr-title">Student Registration</h1>
          <p className="pr-subtitle">Fill in your details to register for campus placements</p>
        </div>

        {/* Stepper */}
        <div className="pr-stepper">
          {steps.map((s, i) => (
            <div key={s.id} className="pr-step-item">
              <div className="pr-step-info">
                <div className={stepCircleClass(s.id)}>
                  {step > s.id ? "✓" : s.icon}
                </div>
                <span className={`pr-step-label${step === s.id ? " pr-step-label--active" : ""}`}>
                  {s.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className={`pr-step-connector${step > s.id ? " pr-step-connector--done" : ""}`} />
              )}
            </div>
          ))}
        </div>

        {/* Card */}
        <div className="pr-card">
          {/* Card Header */}
          <div className="pr-card-header">
            <span className="pr-card-header-icon">{steps[step - 1].icon}</span>
            <div>
              <div className="pr-card-header-title">{steps[step - 1].label}</div>
              <div className="pr-card-header-sub">Step {step} of {steps.length}</div>
            </div>
            <div className="pr-card-header-pct">
              {Math.round((step / steps.length) * 100)}% Complete
            </div>
          </div>

          {/* Progress Bar */}
          <div className="pr-progress-track">
            <div className="pr-progress-fill" style={{ width: `${(step / steps.length) * 100}%` }} />
          </div>

          {/* Form */}
          <form className="pr-form" onSubmit={handleSubmit} noValidate>

            {/* STEP 1: Academic Info */}
            {step === 1 && (
              <div className="pr-field-group">
                <div className="pr-field">
                  <label className="pr-label">Register Number *</label>
                  <input 
                    name="registerNumber" 
                    value={form.registerNumber} 
                    onChange={handleChange}
                    placeholder="e.g. 9176.." 
                    className={ic("registerNumber")} 
                  />
                  {errors.registerNumber && <p className="pr-error">{errors.registerNumber}</p>}
                </div>

                <div className="pr-grid-2">
                  <div className="pr-field">
                    <label className="pr-label">First Name *</label>
                    <input 
                      name="firstName" 
                      value={form.firstName} 
                      onChange={handleChange}
                      placeholder="First name" 
                      className={ic("firstName")} 
                    />
                    {errors.firstName && <p className="pr-error">{errors.firstName}</p>}
                  </div>
                  <div className="pr-field">
                    <label className="pr-label">Last Name *</label>
                    <input 
                      name="lastName" 
                      value={form.lastName} 
                      onChange={handleChange}
                      placeholder="Last name" 
                      className={ic("lastName")} 
                    />
                    {errors.lastName && <p className="pr-error">{errors.lastName}</p>}
                  </div>
                </div>

                <div className="pr-grid-2">
                  <div className="pr-field">
                    <label className="pr-label">Phone Number *</label>
                    <input 
                      name="studentNumber" 
                      value={form.studentNumber} 
                      onChange={handleChange}
                      placeholder="10-digit mobile" 
                      maxLength={10} 
                      className={ic("studentNumber")} 
                    />
                    {errors.studentNumber && <p className="pr-error">{errors.studentNumber}</p>}
                  </div>
                  <div className="pr-field">
                    <label className="pr-label">Email ID *</label>
                    <input 
                      name="emailId" 
                      type="email" 
                      value={form.emailId} 
                      onChange={handleChange}
                      placeholder="student@gmail.com" 
                      className={ic("emailId")} 
                    />
                    {errors.emailId && <p className="pr-error">{errors.emailId}</p>}
                  </div>
                </div>

                <div className="pr-grid-2">
                  <div className="pr-field">
                    <label className="pr-label">Password *</label>
                    <div className="pr-password-wrapper">
                      <input 
                        name="password" 
                        type={showPassword ? "text" : "password"}
                        value={form.password} 
                        onChange={handleChange}
                        placeholder="Create a password" 
                        className={ic("password")} 
                      />
                      <button
                        type="button"
                        className="pr-password-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? "👁️" : "👁️‍🗨️"}
                      </button>
                    </div>
                    <p className="pr-hint">Minimum 8 chars: uppercase, lowercase, number & special char</p>
                    {errors.password && <p className="pr-error">{errors.password}</p>}
                  </div>
                  <div className="pr-field">
                    <label className="pr-label">Confirm Password *</label>
                    <div className="pr-password-wrapper">
                      <input 
                        name="confirmPassword" 
                        type={showConfirmPassword ? "text" : "password"}
                        value={form.confirmPassword} 
                        onChange={handleChange}
                        placeholder="Confirm your password" 
                        className={ic("confirmPassword")} 
                      />
                      <button
                        type="button"
                        className="pr-password-toggle"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
                      </button>
                    </div>
                    {errors.confirmPassword && <p className="pr-error">{errors.confirmPassword}</p>}
                  </div>
                </div>

                <div className="pr-grid-2">
                  <div className="pr-field">
                    <label className="pr-label">Department *</label>
                    <div className="pr-select-wrap">
                      <select 
                        name="departments" 
                        value={form.departments} 
                        onChange={handleChange}
                        className={sc("departments")}
                      >
                        <option value="">Select Department</option>
                        {departments.map((d) => (
                          <option key={d} value={d}>{d}</option>
                        ))}
                      </select>
                      <span className="pr-select-arrow">▾</span>
                    </div>
                    {errors.departments && <p className="pr-error">{errors.departments}</p>}
                  </div>
                  <div className="pr-field">
                    <label className="pr-label">Passed Out Year *</label>
                    <div className="pr-select-wrap">
                      <select 
                        name="passedOutYear" 
                        value={form.passedOutYear} 
                        onChange={handleChange}
                        className={sc("passedOutYear")}
                      >
                        <option value="">Select Year</option>
                        {passedOutYears.map((y) => (
                          <option key={y} value={y}>{y}</option>
                        ))}
                      </select>
                      <span className="pr-select-arrow">▾</span>
                    </div>
                    {errors.passedOutYear && <p className="pr-error">{errors.passedOutYear}</p>}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Personal Info */}
            {step === 2 && (
              <div className="pr-field-group">
                <div className="pr-grid-2">
                  <div className="pr-field">
                    <label className="pr-label">Gender *</label>
                    <div className="pr-select-wrap">
                      <select 
                        name="gender" 
                        value={form.gender} 
                        onChange={handleChange}
                        className={sc("gender")}
                      >
                        <option value="">Select Gender</option>
                        {genders.map((g) => (
                          <option key={g} value={g}>{genderDisplayLabels[g] || g}</option>
                        ))}
                      </select>
                      <span className="pr-select-arrow">▾</span>
                    </div>
                    {errors.gender && <p className="pr-error">{errors.gender}</p>}
                  </div>
                  <div className="pr-field">
                    <label className="pr-label">Native Place *</label>
                    <input 
                      name="nativePlace" 
                      value={form.nativePlace} 
                      onChange={handleChange}
                      placeholder="City, State" 
                      className={ic("nativePlace")} 
                    />
                    {errors.nativePlace && <p className="pr-error">{errors.nativePlace}</p>}
                  </div>
                </div>

                <div className="pr-grid-2">
                  <div className="pr-field">
                    <label className="pr-label">CGPA *</label>
                    <input 
                      name="cgpa" 
                      type="number" 
                      step="0.01" 
                      min="0" 
                      max="10"
                      value={form.cgpa} 
                      onChange={handleChange}
                      placeholder="e.g. 8.75" 
                      className={ic("cgpa")} 
                    />
                    {errors.cgpa && <p className="pr-error">{errors.cgpa}</p>}
                  </div>
                  <div className="pr-field">
                    <label className="pr-label">History of Arrears *</label>
                    <input 
                      name="historyOfArrears" 
                      type="number" 
                      min="0"
                      value={form.historyOfArrears} 
                      onChange={handleChange}
                      placeholder="0 if none" 
                      className={ic("historyOfArrears")} 
                    />
                    {errors.historyOfArrears && <p className="pr-error">{errors.historyOfArrears}</p>}
                  </div>
                </div>

                <div className="pr-field">
                  <label className="pr-label">Profile Picture (Optional)</label>
                  <div className="pr-profile-row">
                    <div className="pr-profile-preview">
                      {profilePreview
                        ? <img src={profilePreview} alt="Profile" />
                        : <span className="pr-profile-placeholder">👤</span>}
                    </div>
                    <div className="pr-upload-zone" onClick={() => profileRef.current.click()}>
                      <p className="pr-upload-title">Click to upload photo</p>
                      <p className="pr-upload-hint">JPG, PNG, GIF, WEBP • Max 2MB</p>
                      <input 
                        ref={profileRef} 
                        type="file" 
                        accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                        onChange={handleProfilePic} 
                        className="pr-hidden-input" 
                      />
                    </div>
                  </div>
                  {errors.profile && <p className="pr-error">{errors.profile}</p>}
                </div>
              </div>
            )}

            {/* STEP 3: Family Info */}
            {step === 3 && (
              <div className="pr-field-group">
                <div className="pr-family-box">
                  <p className="pr-section-label">Parent Information</p>
                  <div className="pr-family-fields">
                    <div className="pr-grid-2">
                      <div className="pr-field">
                        <label className="pr-label pr-label--muted">Father's Name *</label>
                        <input 
                          name="fatherName" 
                          value={form.fatherName} 
                          onChange={handleChange}
                          placeholder="Father's full name" 
                          className={ic("fatherName")} 
                        />
                        {errors.fatherName && <p className="pr-error">{errors.fatherName}</p>}
                      </div>
                      <div className="pr-field">
                        <label className="pr-label pr-label--muted">Mother's Name *</label>
                        <input 
                          name="motherName" 
                          value={form.motherName} 
                          onChange={handleChange}
                          placeholder="Mother's full name" 
                          className={ic("motherName")} 
                        />
                        {errors.motherName && <p className="pr-error">{errors.motherName}</p>}
                      </div>
                    </div>
                    <div className="pr-grid-2">
                      <div className="pr-field">
                        <label className="pr-label pr-label--muted">Father's Occupation *</label>
                        <input 
                          name="fatherOccupation" 
                          value={form.fatherOccupation} 
                          onChange={handleChange}
                          placeholder="Occupation" 
                          className={ic("fatherOccupation")} 
                        />
                        {errors.fatherOccupation && <p className="pr-error">{errors.fatherOccupation}</p>}
                      </div>
                      <div className="pr-field">
                        <label className="pr-label pr-label--muted">Mother's Occupation *</label>
                        <input 
                          name="motherOccupation" 
                          value={form.motherOccupation} 
                          onChange={handleChange}
                          placeholder="Occupation" 
                          className={ic("motherOccupation")} 
                        />
                        {errors.motherOccupation && <p className="pr-error">{errors.motherOccupation}</p>}
                      </div>
                    </div>
                    <div className="pr-grid-2">
                      <div className="pr-field">
                        <label className="pr-label pr-label--muted">Annual Family Income *</label>
                        <div className="pr-input-prefix-wrap">
                          <span className="pr-input-prefix">₹</span>
                          <input 
                            name="familyIncome" 
                            value={form.familyIncome} 
                            onChange={handleChange}
                            placeholder="e.g. 500000"
                            className={`${ic("familyIncome")} pr-input--prefixed`} 
                          />
                        </div>
                        {errors.familyIncome && <p className="pr-error">{errors.familyIncome}</p>}
                      </div>
                      <div className="pr-field">
                        <label className="pr-label pr-label--muted">Parent's Phone *</label>
                        <input 
                          name="parentNumber" 
                          value={form.parentNumber} 
                          onChange={handleChange}
                          placeholder="10-digit number" 
                          maxLength={10} 
                          className={ic("parentNumber")} 
                        />
                        {errors.parentNumber && <p className="pr-error">{errors.parentNumber}</p>}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: Documents */}
            {step === 4 && (
              <div className="pr-field-group">
                <div className="pr-docs-box">
                  <p className="pr-section-label">Upload Documents</p>
                  
                  <div className="pr-field">
                    <label className="pr-label">Google Drive Resume URL *</label>
                    <input 
                      name="resumeUrl" 
                      type="url"
                      value={form.resumeUrl} 
                      onChange={handleChange}
                      placeholder="https://drive.google.com/file/d/..." 
                      className={ic("resumeUrl")} 
                    />
                    <p className="pr-hint">
                      Share your resume from Google Drive (make sure link sharing is enabled)
                    </p>
                    {errors.resumeUrl && <p className="pr-error">{errors.resumeUrl}</p>}
                  </div>

                  {form.resumeUrl && GOOGLE_DRIVE_URL_REGEX.test(form.resumeUrl) && (
                    <div className="pr-resume-preview">
                      <p className="pr-resume-preview-title">Resume Preview:</p>
                      <iframe
                        src={getGoogleDriveEmbedUrl(form.resumeUrl)}
                        title="Resume Preview"
                        className="pr-resume-iframe"
                        frameBorder="0"
                      />
                    </div>
                  )}
                </div>

                <div className="pr-summary-box">
                  <p className="pr-summary-label">Registration Summary</p>
                  <div className="pr-summary-grid">
                    {[
                      ["Register No.", form.registerNumber || "—"],
                      ["Name", `${form.firstName} ${form.lastName}`.trim() || "—"],
                      ["Department", form.departments || "—"],
                      ["Passed Out Year", form.passedOutYear || "—"],
                      ["Email", form.emailId || "—"],
                      ["Phone", form.studentNumber || "—"],
                      ["CGPA", form.cgpa || "—"],
                      ["Arrears", form.historyOfArrears !== "" ? form.historyOfArrears : "—"],
                    ].map(([label, val]) => (
                      <div key={label} className="pr-summary-row">
                        <span className="pr-summary-key">{label}:</span>
                        <span className="pr-summary-val">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pr-info-banner">
                  <span className="pr-info-banner-icon">ℹ️</span>
                  <p className="pr-info-banner-text">
                    By submitting, you confirm that all provided information is accurate.
                    False information may result in disqualification from placement activities.
                  </p>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="pr-nav">
              <button type="button" onClick={prevStep} disabled={step === 1 || isSubmitting}
                className="pr-btn-prev">
                ← Previous
              </button>

              <div className="pr-dots">
                {steps.map((s) => (
                  <div key={s.id} className={dotClass(s.id)} />
                ))}
              </div>

              {step < 4
                ? <button type="button" onClick={nextStep} disabled={isSubmitting} className="pr-btn-next">
                    Next →
                  </button>
                : <button
                    type="submit"
                    disabled={isSubmitting || submitLockRef.current}
                    className={`pr-btn-submit${isSubmitting ? " pr-btn-submit--loading" : ""}`}
                  >
                    {isSubmitting ? (
                      <><span className="pr-spinner" /> Submitting…</>
                    ) : (
                      "🚀 Submit Registration"
                    )}
                  </button>
              }
            </div>
          </form>
        </div>

        {/* Footer */}
        <p className="pr-footer">
          © 2025 Placement Portal • For support contact placement@college.edu
        </p>
      </div>
    </div>
  );
}