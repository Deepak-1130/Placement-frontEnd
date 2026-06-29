import React from "react";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "30px" }}>
      <h1>🛠 Admin Dashboard</h1>
      <p>Welcome, Admin!</p>

      <div style={{ marginTop: "20px" }}>
        <button
          onClick={() => navigate("/admin/company/register")}
          style={{
            padding: "10px 20px",
            marginRight: "10px",
            background: "green",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
          ➕ Add Company
        </button>

        <button
          onClick={() => navigate("/admin/dashboard")}
          style={{
            padding: "10px 20px",
            background: "blue",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
          📋 View Companies
        </button>
      </div>

      <button
        onClick={() => {
          sessionStorage.clear();
          navigate("/login");
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

export default AdminDashboard;