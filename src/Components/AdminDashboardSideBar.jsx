import React, { useState } from "react";
import "../StyleSheets/AdminDashboardSideBar.css";

const AdminDashboardSideBar = ({ onPageChange }) => {
    const [activeLink, setActiveLink] = useState("dashboard");

    const items = [
        { key: "dashboard", label: "Dashboard" },
        { key: "students", label: "Students" },
        { key: "companies", label: "Companies" },
        { key: "placed-students", label: "Placed Students" },
    ];

    return (
        <div className="admin-sidebar">

          
            <nav>
                {items.map((item) => (
                    <button
                        key={item.key}
                        className={`sidebar-link ${
                            activeLink === item.key ? "active" : ""
                        }`}
                        onClick={() => {
                            setActiveLink(item.key);
                            onPageChange(item.key);
                        }}
                    >
                        <span className="icon">●</span>
                        <span>{item.label}</span>
                    </button>
                ))}
            </nav>

        </div>
    );
};

export default AdminDashboardSideBar;