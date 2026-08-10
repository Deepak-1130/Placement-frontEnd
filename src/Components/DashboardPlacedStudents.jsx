import React, { useEffect, useState } from "react";
import "../StyleSheets/DashboardPlacedStudents.css";
import MarkStudentPlaced from "./MarkStudentPlaced";

const DashboardPlacedStudents = () => {

    const [placedStudents, setPlacedStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [showMarkPlaced, setShowMarkPlaced] = useState(false);

    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("all");
    const [department, setDepartment] = useState("all");
    const [company, setCompany] = useState("all");

    const [selectedPlacement, setSelectedPlacement] = useState(null);

    useEffect(() => {

        const fetchPlacedStudents = async () => {

            try {

                const response = await fetch(
                    "http://localhost:8080/getPlacedStudents"
                );

                if (!response.ok) {
                    throw new Error(
                        "Failed to fetch placed students"
                    );
                }

                const data = await response.json();

                setPlacedStudents(data);

            } catch (error) {

                console.error(error);

                setError(
                    "Unable to load placed students"
                );

            } finally {

                setLoading(false);

            }
        };

        fetchPlacedStudents();

    }, []);

    const handleShowDetails = (placement) => {
        setSelectedPlacement(placement);
    };

    const handleBackToList = () => {
        setSelectedPlacement(null);
    };

    const statuses = [
        ...new Set(
            placedStudents
                .map((item) => item.placedstatus)
                .filter(Boolean)
        )
    ];

    const departments = [
        ...new Set(
            placedStudents
                .map((item) => item.student?.departments)
                .filter(Boolean)
        )
    ];

    const companies = [
        ...new Set(
            placedStudents
                .map((item) => item.company?.companyName)
                .filter(Boolean)
        )
    ];

    const filteredPlacements = placedStudents.filter(
        (item) => {

            const student = item.student || {};
            const companyData = item.company || {};

            const searchValue =
                search.toLowerCase().trim();

            const fullName =
                `${student.firstName || ""} ${
                    student.lastName || ""
                }`.toLowerCase();

            const matchesSearch =
                fullName.includes(searchValue) ||

                String(
                    student.registerNumber || ""
                ).includes(searchValue) ||

                String(
                    student.emailId || ""
                )
                    .toLowerCase()
                    .includes(searchValue) ||

                String(
                    companyData.companyName || ""
                )
                    .toLowerCase()
                    .includes(searchValue);

            const matchesStatus =
                status === "all" ||
                item.placedstatus === status;

            const matchesDepartment =
                department === "all" ||
                student.departments === department;

            const matchesCompany =
                company === "all" ||
                companyData.companyName === company;

            return (
                matchesSearch &&
                matchesStatus &&
                matchesDepartment &&
                matchesCompany
            );
        }
    );

    const handleClearFilters = () => {

        setSearch("");
        setStatus("all");
        setDepartment("all");
        setCompany("all");

    };

    if (loading) {

        return (
            <div className="placed-students-page">

                <div className="placed-loading">
                    Loading placed students...
                </div>

            </div>
        );

    }

    if (error) {

        return (
            <div className="placed-students-page">

                <p className="placed-error">
                    {error}
                </p>

            </div>
        );

    }

    return (

        <div className="placed-students-page">

            {showMarkPlaced ? (

                <MarkStudentPlaced
                    onBack={() => {
                        setShowMarkPlaced(false);
                    }}
                />

            ) : selectedPlacement ? (

                <div className="placement-details-page">

                    <button
                        className="placement-back-button"
                        onClick={handleBackToList}
                    >
                        ← Back to Placed Students
                    </button>

                    <div className="placement-details-card">

                        <div className="placement-details-header">

                            <div className="student-avatar">

                                {selectedPlacement.student
                                    ?.firstName
                                    ?.charAt(0)
                                    .toUpperCase()}

                            </div>

                            <div>

                                <h1>

                                    {
                                        selectedPlacement.student
                                            ?.firstName
                                    }{" "}

                                    {
                                        selectedPlacement.student
                                            ?.lastName
                                    }

                                </h1>

                                <p>

                                    Register Number:{" "}

                                    {
                                        selectedPlacement.student
                                            ?.registerNumber
                                    }

                                </p>

                            </div>

                        </div>

                        <section className="placement-section">

                            <h2>
                                Student Information
                            </h2>

                            <div className="placement-details-grid">

                                <DetailItem
                                    label="Register Number"
                                    value={
                                        selectedPlacement
                                            .student
                                            ?.registerNumber
                                    }
                                />

                                <DetailItem
                                    label="Student Name"
                                    value={`
                                        ${
                                            selectedPlacement.student
                                                ?.firstName || ""
                                        } ${
                                            selectedPlacement.student
                                                ?.lastName || ""
                                        }
                                    `}
                                />

                                <DetailItem
                                    label="Department"
                                    value={
                                        selectedPlacement.student
                                            ?.departments
                                    }
                                />

                                <DetailItem
                                    label="Passed Out Year"
                                    value={
                                        selectedPlacement.student
                                            ?.passedOutYear
                                    }
                                />

                                <DetailItem
                                    label="CGPA"
                                    value={
                                        selectedPlacement.student
                                            ?.CGPA
                                    }
                                />

                                <DetailItem
                                    label="Email"
                                    value={
                                        selectedPlacement.student
                                            ?.emailId
                                    }
                                />

                                <DetailItem
                                    label="Student Number"
                                    value={
                                        selectedPlacement.student
                                            ?.studentNumber
                                    }
                                />

                                <DetailItem
                                    label="History of Arrears"
                                    value={
                                        selectedPlacement.student
                                            ?.historyOfArrears
                                    }
                                />

                            </div>

                        </section>

                        <section className="placement-section">

                            <h2>
                                Company Information
                            </h2>

                            <div className="placement-details-grid">

                                <DetailItem
                                    label="Company ID"
                                    value={
                                        selectedPlacement.company
                                            ?.companyId
                                    }
                                />

                                <DetailItem
                                    label="Company Name"
                                    value={
                                        selectedPlacement.company
                                            ?.companyName
                                    }
                                />

                                <DetailItem
                                    label="Company Type"
                                    value={
                                        selectedPlacement.company
                                            ?.companyType
                                    }
                                />

                                <DetailItem
                                    label="Branch"
                                    value={
                                        selectedPlacement.company
                                            ?.branch
                                    }
                                />

                                <DetailItem
                                    label="Location"
                                    value={
                                        selectedPlacement.company
                                            ?.location
                                    }
                                />

                                <DetailItem
                                    label="Highest Package"
                                    value={
                                        selectedPlacement.company
                                            ?.lastHighestPackage !==
                                            null &&
                                        selectedPlacement.company
                                            ?.lastHighestPackage !==
                                            undefined
                                            ? `₹${selectedPlacement.company.lastHighestPackage} LPA`
                                            : null
                                    }
                                />

                            </div>

                        </section>

                        <section className="placement-section">

                            <h2>
                                Placement Information
                            </h2>

                            <div className="placement-details-grid">

                                <DetailItem
                                    label="Placement ID"
                                    value={
                                        selectedPlacement.placedId
                                    }
                                />

                                <DetailItem
                                    label="Placement Status"
                                    value={
                                        selectedPlacement.placedstatus
                                    }
                                />

                                <DetailItem
                                    label="Package"
                                    value={
                                        selectedPlacement.packages !==
                                        null &&
                                        selectedPlacement.packages !==
                                        undefined
                                            ? `₹${selectedPlacement.packages} LPA`
                                            : null
                                    }
                                />
                                <button
                                    label="offer letter"
                                    onClick={() => {
                                        window.open(`http://localhost:8080/uploads/Offers/${ selectedPlacement.student?.registerNumber}-offer.pdf`);
                                    }}
                                >View Offer
                                </button>

                            </div>

                        </section>

                    </div>

                </div>

            ) : (

                <>

                    <div className="placed-header">

                        <div>

                            <h1>
                                Placed Students
                            </h1>

                            <p>
                                Manage student placement records
                            </p>

                        </div>

                        <div className="placed-header-actions">

                            <div className="placed-count">

                                Showing{" "}

                                <strong>
                                    {
                                        filteredPlacements.length
                                    }
                                </strong>

                                {" "}of{" "}

                                <strong>
                                    {
                                        placedStudents.length
                                    }
                                </strong>

                            </div>

                            <button
                                className="mark-student-button"
                                onClick={() =>
                                    setShowMarkPlaced(true)
                                }
                            >
                                + Mark Student Placed
                            </button>

                        </div>

                    </div>

                    <div className="placed-filters">

                        <div className="placed-search">

                            <span>
                                🔍
                            </span>

                            <input
                                type="text"
                                placeholder="Search student, register number or company..."
                                value={search}
                                onChange={(e) =>
                                    setSearch(
                                        e.target.value
                                    )
                                }
                            />

                        </div>

                        <select
                            value={status}
                            onChange={(e) =>
                                setStatus(
                                    e.target.value
                                )
                            }
                        >

                            <option value="all">
                                All Status
                            </option>

                            {statuses.map((item) => (

                                <option
                                    key={item}
                                    value={item}
                                >
                                    {item}
                                </option>

                            ))}

                        </select>

                        <select
                            value={department}
                            onChange={(e) =>
                                setDepartment(
                                    e.target.value
                                )
                            }
                        >

                            <option value="all">
                                All Departments
                            </option>

                            {departments.map((item) => (

                                <option
                                    key={item}
                                    value={item}
                                >
                                    {item}
                                </option>

                            ))}

                        </select>

                        <select
                            value={company}
                            onChange={(e) =>
                                setCompany(
                                    e.target.value
                                )
                            }
                        >

                            <option value="all">
                                All Companies
                            </option>

                            {companies.map((item) => (

                                <option
                                    key={item}
                                    value={item}
                                >
                                    {item}
                                </option>

                            ))}

                        </select>

                        {(search ||
                            status !== "all" ||
                            department !== "all" ||
                            company !== "all") && (

                            <button
                                className="placed-clear-button"
                                onClick={
                                    handleClearFilters
                                }
                            >
                                Clear
                            </button>

                        )}

                    </div>

                    <div className="placed-table-container">

                        <table className="placed-table">

                            <thead>

                                <tr>

                                    <th>
                                        Register Number
                                    </th>

                                    <th>
                                        Student
                                    </th>

                                    <th>
                                        Department
                                    </th>

                                    <th>
                                        Passed Out
                                    </th>

                                    <th>
                                        Company
                                    </th>

                                    <th>
                                        Package
                                    </th>

                                    <th>
                                        Status
                                    </th>

                                    <th>
                                        Details
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {filteredPlacements.length >
                                0 ? (

                                    filteredPlacements.map(
                                        (item) => (

                                            <tr
                                                key={
                                                    item.placedId
                                                }
                                            >

                                                <td>
                                                    {
                                                        item.student
                                                            ?.registerNumber
                                                    }
                                                </td>

                                                <td>

                                                    <div className="placed-student-name">

                                                        <div className="student-small-avatar">

                                                            {item.student
                                                                ?.firstName
                                                                ?.charAt(0)
                                                                .toUpperCase()}

                                                        </div>

                                                        <div>

                                                            <strong>

                                                                {
                                                                    item.student
                                                                        ?.firstName
                                                                }{" "}

                                                                {
                                                                    item.student
                                                                        ?.lastName
                                                                }

                                                            </strong>

                                                            <small>

                                                                {
                                                                    item.student
                                                                        ?.emailId
                                                                }

                                                            </small>

                                                        </div>

                                                    </div>

                                                </td>

                                                <td>

                                                    {
                                                        item.student
                                                            ?.departments ||
                                                        "N/A"
                                                    }

                                                </td>

                                                <td>

                                                    {
                                                        item.student
                                                            ?.passedOutYear ||
                                                        "N/A"
                                                    }

                                                </td>

                                                <td>

                                                    <strong>

                                                        {
                                                            item.company
                                                                ?.companyName ||
                                                            "N/A"
                                                        }

                                                    </strong>

                                                </td>

                                                <td>

                                                    ₹{" "}

                                                    {
                                                        item.packages ??
                                                        "N/A"
                                                    }

                                                    {" "}LPA

                                                </td>

                                                <td>

                                                    <span
                                                        className={`placement-status ${String(
                                                            item.placedstatus ||
                                                            ""
                                                        ).toLowerCase()}`}
                                                    >

                                                        {
                                                            item.placedstatus ||
                                                            "N/A"
                                                        }

                                                    </span>

                                                </td>

                                                <td>

                                                    <button
                                                        className="placement-details-button"
                                                        onClick={() =>
                                                            handleShowDetails(
                                                                item
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
                                            colSpan="8"
                                            className="no-placements"
                                        >
                                            No placed students
                                            found matching
                                            your filters.
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

const DetailItem = ({ label, value }) => {

    return (

        <div className="placement-detail-item">

            <span>
                {label}
            </span>

            <strong>

                {value !== null &&
                value !== undefined &&
                value !== ""
                    ? value
                    : "Not available"}

            </strong>

        </div>

    );

};

export default DashboardPlacedStudents;