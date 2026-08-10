import React from "react";
import "../StyleSheets/StudentDashboard.css";

const StudentDashboard = ({ student }) => {

    if (!student) {
        return (
            <div className="student-dashboard">
                <div className="student-empty">
                    <h2>No Student Data</h2>
                    <p>Student information is not available.</p>
                </div>
            </div>
        );
    }

    const resumeUrl =
        `http://localhost:8080/uploads/Resume/${student.registerNumber}-resume.pdf`;

    return (
        <div className="student-dashboard">

            {/* ================= HEADER ================= */}

            <div className="student-dashboard-header">

                <div>
                    <h1>
                        {student.firstName} {student.lastName}
                    </h1>

                    <p>
                        Register Number: {student.registerNumber}
                    </p>
                </div>

                <a
                    href={resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="resume-button"
                >
                    View Resume
                </a>

            </div>


            {/* ================= BASIC INFORMATION ================= */}

            <section className="student-section">

                <div className="section-header">
                    <h2>Basic Information</h2>
                    <span>Student Details</span>
                </div>

                <div className="details-grid">

                    <DetailItem
                        label="First Name"
                        value={student.firstName}
                    />

                    <DetailItem
                        label="Last Name"
                        value={student.lastName}
                    />

                    <DetailItem
                        label="Register Number"
                        value={student.registerNumber}
                    />

                    <DetailItem
                        label="Student Number"
                        value={student.studentNumber}
                    />

                    <DetailItem
                        label="Email"
                        value={student.emailId}
                    />

                    <DetailItem
                        label="Native Place"
                        value={student.nativePlace}
                    />

                </div>

            </section>


            {/* ================= ACADEMIC INFORMATION ================= */}

            <section className="student-section">

                <div className="section-header">
                    <h2>Academic Information</h2>
                    <span>Academic Performance</span>
                </div>

                <div className="details-grid">

                    <DetailItem
                        label="Department"
                        value={student.departments}
                    />

                    <DetailItem
                        label="Passed Out Year"
                        value={student.passedOutYear}
                    />

                    <DetailItem
                        label="CGPA"
                        value={student.CGPA}
                    />

                    <DetailItem
                        label="History of Arrears"
                        value={student.historyOfArrears}
                    />

                </div>

            </section>


            {/* ================= PARENT INFORMATION ================= */}

            <section className="student-section">

                <div className="section-header">
                    <h2>Parent Information</h2>
                    <span>Family Details</span>
                </div>

                <div className="details-grid">

                    <DetailItem
                        label="Father Name"
                        value={student.fatherName}
                    />

                    <DetailItem
                        label="Father Occupation"
                        value={student.fatherOccupation}
                    />

                    <DetailItem
                        label="Mother Name"
                        value={student.motherName}
                    />

                    <DetailItem
                        label="Mother Occupation"
                        value={student.motherOccupation}
                    />

                    <DetailItem
                        label="Parent Contact"
                        value={student.parentNumber}
                    />

                </div>

            </section>


            {/* ================= PLACEMENT INFORMATION ================= */}


<section className="student-section">

    <div className="section-header">
        <h2>Placement Information</h2>
        <span>Placement Status</span>
    </div>

    <div className="placement-card">

        {/* STATUS */}

        <div className="placement-info">

           

            <div>
                <span>
                    Placement status
                </span>
                <strong>
                    {student.placedStatus || "Not Placed"}
                </strong>

                
            </div>

        </div>


        {/* PLACEMENT DETAILS */}

        <div className="placement-info">

            <div>
                <span>Company</span>

                <strong>
                    {student.company?.companyName || "Not Placed"}
                </strong>
            </div>


            <div>
                <span>Location</span>

                <strong>
                    {student.company?.location || "Not Available"}
                </strong>
            </div>


            <div>
                <span>Package</span>

                <strong>
                    {student.packages !== null &&
                     student.packages !== undefined
                        ? `${student.packages} LPA`
                        : "Not Available"}
                </strong>
            </div>

        </div>

    </div>

</section>

        </div>
    );
};


/* ================= DETAIL ITEM ================= */

const DetailItem = ({ label, value }) => {

    return (
        <div className="detail-item">

            <span className="detail-label">
                {label}
            </span>

            <span className="detail-value">
                {value !== null &&
                 value !== undefined &&
                 value !== ""
                    ? value
                    : "Not available"}
            </span>

        </div>
    );
};

export default StudentDashboard;