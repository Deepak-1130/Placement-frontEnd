import React, { useState } from "react";

import AdminDashboardSideBar from "../Components/AdminDashboardSideBar";
import DashboardMain from "../Components/DashboardMain";
import DashBoardStudents from "../Components/AdminDashBoardStudents";
import DashboardCompanies from "../Components/DashboardCompanies";
import DashboardPlacedStudents from "../Components/DashboardPlacedStudents";

import "../StyleSheets/AdminDashboard.css";

const AdminDashboard = () => {

    const [activePage, setActivePage] = useState("dashboard");

    const onPageChange = (page) => {
        setActivePage(page);
    };

    const renderContent = () => {

        switch (activePage) {

            case "students":
                return <DashBoardStudents />;

            case "companies":
                return <DashboardCompanies />;

            case "placed-students":
                return <DashboardPlacedStudents />;

            case "dashboard":
            default:
                return <DashboardMain />;
        }
    };

    return (
        <div className="admin-dashboard">

            <div className="admin-dashboard-sidebar">

                <AdminDashboardSideBar
                    onPageChange={onPageChange}
                />

            </div>

            <main className="admin-dashboard-main">

                {renderContent()}

            </main>

        </div>
    );
};

export default AdminDashboard;