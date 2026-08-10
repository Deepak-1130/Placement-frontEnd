import React, { useEffect, useState } from "react";
import "../StyleSheets/DashBoardStudents.css";
import StudentDashboard from "./StudentDashBoard";

const DashBoardStudents = () => {

    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Filters
    const [search, setSearch] = useState("");
    const [department, setDepartment] = useState("all");
    const [passedOutYear, setPassedOutYear] = useState("all");

    // Selected student
    const [selectedStudent, setSelectedStudent] = useState(null);


    // ================= FETCH STUDENTS =================

    useEffect(() => {

        const fetchStudents = async () => {

            try {

                const response = await fetch(
                    "http://localhost:8080/getAllStudents"
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch students");
                }

                const data = await response.json();

                setStudents(data);

            } catch (error) {

                console.error(error);
                setError("Unable to load students");

            } finally {

                setLoading(false);

            }
        };

        fetchStudents();

    }, []);


    // ================= SHOW DETAILS =================

    const handleShowDetails = (student) => {
        setSelectedStudent(student);
    };


    // ================= BACK TO LIST =================

    const handleBackToStudents = () => {
        setSelectedStudent(null);
    };


    // ================= UNIQUE DEPARTMENTS =================

    const departments = [
        ...new Set(
            students
                .map((student) => student.departments)
                .filter(Boolean)
        )
    ];


    // ================= UNIQUE YEARS =================

    const passedOutYears = [
        ...new Set(
            students
                .map((student) => student.passedOutYear)
                .filter(Boolean)
        )
    ].sort((a, b) => b - a);


    // ================= FILTER STUDENTS =================

    const filteredStudents = students.filter((student) => {

        const fullName =
            `${student.firstName || ""} ${student.lastName || ""}`
                .toLowerCase();

        const searchValue = search.toLowerCase();

        const matchesSearch =
            fullName.includes(searchValue) ||
            String(student.registerNumber)
                .includes(searchValue) ||
            String(student.emailId || "")
                .toLowerCase()
                .includes(searchValue);

        const matchesDepartment =
            department === "all" ||
            student.departments === department;

        const matchesYear =
            passedOutYear === "all" ||
            String(student.passedOutYear) ===
            String(passedOutYear);

        return (
            matchesSearch &&
            matchesDepartment &&
            matchesYear
        );
    });


    // ================= LOADING =================

    if (loading) {

        return (
            <div className="students-page">
                <p>Loading students...</p>
            </div>
        );

    }


    // ================= ERROR =================

    if (error) {

        return (
            <div className="students-page">
                <p className="error-message">
                    {error}
                </p>
            </div>
        );

    }


    return (

        <div className="students-page">

            {/* ================================================= */}
            {/* STUDENT DETAILS PAGE */}
            {/* ================================================= */}

            {selectedStudent ? (

                <div className="student-details-page">

                    <div className="details-page-header">

                        <button
                            className="back-button"
                            onClick={handleBackToStudents}
                        >
                            ← Back to Students
                        </button>

                    </div>

                    <StudentDashboard
                        student={selectedStudent}
                    />

                </div>

            ) : (

                /* ================================================= */
                /* STUDENT LIST PAGE */
                /* ================================================= */

                <>

                    {/* Header */}

                    <div className="students-header">

                        <div>

                           

                        </div>

                        <div className="student-count">

                            Showing{" "}
                            <strong>
                                {filteredStudents.length}
                            </strong>

                            {" "}of{" "}

                            <strong>
                                {students.length}
                            </strong>

                        </div>

                    </div>


                    {/* ================================================= */}
                    {/* FILTERS */}
                    {/* ================================================= */}

                    <div className="student-filters">

                        {/* Search */}

                        <div className="search-box">

                            <span className="search-icon">
                                🔍
                            </span>

                            <input
                                type="text"
                                placeholder="Search by name, register number or email..."
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                            />

                        </div>


                        {/* Department */}

                        <select
                            value={department}
                            onChange={(e) =>
                                setDepartment(e.target.value)
                            }
                        >

                            <option value="all">
                                All Departments
                            </option>

                            {departments.map((dept) => (

                                <option
                                    key={dept}
                                    value={dept}
                                >
                                    {dept}
                                </option>

                            ))}

                        </select>


                        {/* Passed Out Year */}

                        <select
                            value={passedOutYear}
                            onChange={(e) =>
                                setPassedOutYear(e.target.value)
                            }
                        >

                            <option value="all">
                                All Years
                            </option>

                            {passedOutYears.map((year) => (

                                <option
                                    key={year}
                                    value={year}
                                >
                                    {year}
                                </option>

                            ))}

                        </select>


                        {/* Clear Filters */}

                        {(search ||
                            department !== "all" ||
                            passedOutYear !== "all") && (

                            <button
                                className="clear-filter"
                                onClick={() => {

                                    setSearch("");
                                    setDepartment("all");
                                    setPassedOutYear("all");

                                }}
                            >
                                Clear
                            </button>

                        )}

                    </div>


                    {/* ================================================= */}
                    {/* STUDENTS TABLE */}
                    {/* ================================================= */}

                    <div className="students-table-container">

                        <table className="students-table">

                            <thead>

                                <tr>

                                    <th>
                                        Register Number
                                    </th>

                                    <th>
                                        Name
                                    </th>

                                    <th>
                                        Department
                                    </th>

                                    <th>
                                        Passed Out
                                    </th>

                                    <th>
                                        Resume
                                    </th>

                                    <th>
                                        Details
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {filteredStudents.length > 0 ? (

                                    filteredStudents.map(
                                        (student) => (

                                            <tr
                                                key={
                                                    student.registerNumber
                                                }
                                            >

                                                <td>
                                                    {
                                                        student.registerNumber
                                                    }
                                                </td>


                                                <td className="student-name">

                                                    {
                                                        student.firstName
                                                    }{" "}

                                                    {
                                                        student.lastName
                                                    }

                                                </td>


                                                <td>
                                                    {
                                                        student.departments
                                                    }
                                                </td>


                                                <td>
                                                    {
                                                        student.passedOutYear
                                                    }
                                                </td>


                                                {/* Resume */}

                                                <td>

                                                    <a
                                                        href={`http://localhost:8080/uploads/Resume/${student.registerNumber}-resume.pdf`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="resume-button"
                                                    >
                                                        View Resume
                                                    </a>

                                                </td>


                                                {/* Details */}

                                                <td>

                                                    <button
                                                        className="details-button"
                                                        onClick={() =>
                                                            handleShowDetails(
                                                                student
                                                            )
                                                        }
                                                    >
                                                        Show Details
                                                    </button>

                                                </td>

                                            </tr>

                                        )
                                    )

                                ) : (

                                    <tr>

                                        <td
                                            colSpan="6"
                                            className="no-students"
                                        >
                                            No students found
                                            matching your filters.
                                        </td>

                                    </tr>

                                )}

                            </tbody>

                        </table>

                    </div>

                </>

            )}

        </div>
    );
};

export default DashBoardStudents;