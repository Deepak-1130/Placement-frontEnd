import React from "react";

function StudentDashboard() {
  const role = sessionStorage.getItem("role");

  return (
    <div style={{ padding: "30px" }}>
      <h1>🎓 Student Dashboard</h1>
      <p>Welcome, Student!</p>

      <div style={{ marginTop: "20px" }}>
        <h3>Available Companies</h3>
        <p>Here you can view and apply for companies.</p>
      </div>

      <button
        onClick={() => {
          sessionStorage.clear();
          window.location.href = "/login";
        }}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          background: "red",
          color: "white",
          border: "none",
          borderRadius: "5px",
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default StudentDashboard;