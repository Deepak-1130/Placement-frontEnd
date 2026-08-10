import React, { useEffect, useState } from "react";
import "../StyleSheets/DashboardCompanies.css";

const DashboardCompanies = () => {

    // =====================================================
    // STATE
    // =====================================================

    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Filters
    const [search, setSearch] = useState("");
    const [companyType, setCompanyType] = useState("all");
    const [branch, setBranch] = useState("all");
    const [location, setLocation] = useState("all");

    // Selected company
    const [selectedCompany, setSelectedCompany] = useState(null);


    // =====================================================
    // FETCH COMPANIES
    // =====================================================

    useEffect(() => {

        const fetchCompanies = async () => {

            try {

                const response = await fetch(
                    "http://localhost:8080/getCompany"
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch companies");
                }

                const data = await response.json();

                setCompanies(data);

            } catch (error) {

                console.error(error);

                setError("Unable to load companies");

            } finally {

                setLoading(false);

            }

        };

        fetchCompanies();

    }, []);


    // =====================================================
    // SHOW COMPANY DETAILS
    // =====================================================

    const handleShowDetails = (company) => {

        setSelectedCompany(company);

    };


    // =====================================================
    // BACK TO COMPANY LIST
    // =====================================================

    const handleBackToCompanies = () => {

        setSelectedCompany(null);

    };


    // =====================================================
    // ADD COMPANY
    // =====================================================

    const handleAddCompany = () => {

        console.log("Add company clicked");

        // Later:
        // navigate("/add-company")
        // or
        // setShowAddCompany(true)

    };


    // =====================================================
    // UNIQUE COMPANY TYPES
    // =====================================================

    const companyTypes = [
        ...new Set(
            companies
                .map((company) => company.companyType)
                .filter(Boolean)
        )
    ];


    // =====================================================
    // UNIQUE BRANCHES
    // =====================================================

    const branches = [
        ...new Set(
            companies
                .map((company) => company.branch)
                .filter(Boolean)
        )
    ];


    // =====================================================
    // UNIQUE LOCATIONS
    // =====================================================

    const locations = [
        ...new Set(
            companies
                .map((company) => company.location)
                .filter(Boolean)
        )
    ];


    // =====================================================
    // FILTER COMPANIES
    // =====================================================

    const filteredCompanies = companies.filter((company) => {

        const searchValue = search.toLowerCase().trim();


        // Search
        const matchesSearch =

            String(company.companyName || "")
                .toLowerCase()
                .includes(searchValue)

            ||

            String(company.location || "")
                .toLowerCase()
                .includes(searchValue)

            ||

            String(company.email || "")
                .toLowerCase()
                .includes(searchValue)

            ||

            String(company.branch || "")
                .toLowerCase()
                .includes(searchValue);


        // Company Type
        const matchesType =
            companyType === "all" ||
            company.companyType === companyType;


        // Branch
        const matchesBranch =
            branch === "all" ||
            company.branch === branch;


        // Location
        const matchesLocation =
            location === "all" ||
            company.location === location;


        return (
            matchesSearch &&
            matchesType &&
            matchesBranch &&
            matchesLocation
        );

    });


    // =====================================================
    // CLEAR FILTERS
    // =====================================================

    const handleClearFilters = () => {

        setSearch("");
        setCompanyType("all");
        setBranch("all");
        setLocation("all");

    };


    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {

        return (

            <div className="companies-page">

                <div className="companies-loading">

                    <p>
                        Loading companies...
                    </p>

                </div>

            </div>

        );

    }


    // =====================================================
    // ERROR
    // =====================================================

    if (error) {

        return (

            <div className="companies-page">

                <p className="company-error">
                    {error}
                </p>

            </div>

        );

    }


    // =====================================================
    // MAIN UI
    // =====================================================

    return (

        <div className="companies-page">


            {/* ================================================= */}
            {/* COMPANY DETAILS */}
            {/* ================================================= */}

            {selectedCompany ? (

                <div className="company-details-page">


                    {/* Back Button */}

                    <button
                        className="company-back-button"
                        onClick={handleBackToCompanies}
                    >
                        ← Back to Companies
                    </button>


                    {/* Details Card */}

                    <div className="company-details-card">


                        {/* ================= HEADER ================= */}

                        <div className="company-details-header">


                            {/* Logo */}

                            <div className="company-logo-large">

                                {selectedCompany.logoPicPath ? (

                                    <img
                                        src={
                                            selectedCompany.logoPicPath
                                        }
                                        alt={
                                            selectedCompany.companyName
                                        }
                                    />

                                ) : (

                                    <span>

                                        {selectedCompany.companyName
                                            ?.charAt(0)
                                            .toUpperCase()}

                                    </span>

                                )}

                            </div>


                            {/* Name */}

                            <div>

                                <h1>

                                    {
                                        selectedCompany.companyName
                                    }

                                </h1>

                                <p>

                                    {
                                        selectedCompany.companyType ||
                                        "Company"
                                    }

                                </p>

                            </div>

                        </div>


                        {/* ================= COMPANY INFORMATION ================= */}

                        <section className="company-section">

                            <h2>
                                Company Information
                            </h2>


                            <div className="company-details-grid">


                                <DetailItem
                                    label="Company ID"
                                    value={
                                        selectedCompany.companyId
                                    }
                                />


                                <DetailItem
                                    label="Company Name"
                                    value={
                                        selectedCompany.companyName
                                    }
                                />


                                <DetailItem
                                    label="Branch"
                                    value={
                                        selectedCompany.branch
                                    }
                                />


                                <DetailItem
                                    label="Company Type"
                                    value={
                                        selectedCompany.companyType
                                    }
                                />


                                <DetailItem
                                    label="Location"
                                    value={
                                        selectedCompany.location
                                    }
                                />


                                <DetailItem
                                    label="Email"
                                    value={
                                        selectedCompany.email
                                    }
                                />


                                <DetailItem
                                    label="Mobile Number"
                                    value={
                                        selectedCompany.mobileNo
                                    }
                                />


                                <DetailItem
                                    label="Highest Package"
                                    value={
                                        selectedCompany.lastHighestPackage !==
                                        null &&
                                        selectedCompany.lastHighestPackage !==
                                        undefined
                                            ? `₹${selectedCompany.lastHighestPackage} LPA`
                                            : null
                                    }
                                />


                                <DetailItem
                                    label="History of Arrears"
                                    value={
                                        selectedCompany.histOfArrear ===
                                        true
                                            ? "Allowed"
                                            : selectedCompany.histOfArrear ===
                                              false
                                                ? "Not Allowed"
                                                : "Not specified"
                                    }
                                />

                            </div>

                        </section>


                        {/* ================= DESCRIPTION ================= */}

                        <section className="company-section">

                            <h2>
                                Description
                            </h2>


                            <p className="company-description">

                                {
                                    selectedCompany.description ||
                                    "No description available."
                                }

                            </p>

                        </section>


                    </div>

                </div>

            ) : (

                /* ================================================= */
                /* COMPANY LIST */
                /* ================================================= */

                <>


                    {/* ================================================= */}
                    {/* HEADER */}
                    {/* ================================================= */}

                    <div className="companies-header">


                        {/* Title */}

                        <div>

                            <h1>
                                Companies
                            </h1>

                            <p>
                                Manage registered companies
                            </p>

                        </div>


                        {/* Count + Add Button */}

                        <div className="company-header-actions">


                            {/* Count */}

                            <div className="company-count">

                                Showing{" "}

                                <strong>
                                    {filteredCompanies.length}
                                </strong>

                                {" "}of{" "}

                                <strong>
                                    {companies.length}
                                </strong>

                            </div>


                            {/* Add Company */}

                            <button
                                className="add-company-button"
                                onClick={handleAddCompany}
                            >

                                + Add Company

                            </button>


                        </div>

                    </div>


                    {/* ================================================= */}
                    {/* FILTERS */}
                    {/* ================================================= */}

                    <div className="company-filters">


                        {/* ================= SEARCH ================= */}

                        <div className="company-search">

                            <span>
                                🔍
                            </span>


                            <input
                                type="text"
                                placeholder="Search company, location or email..."
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                            />

                        </div>


                        {/* ================= COMPANY TYPE ================= */}

                        <select
                            value={companyType}
                            onChange={(e) =>
                                setCompanyType(e.target.value)
                            }
                        >

                            <option value="all">
                                All Types
                            </option>


                            {companyTypes.map((type) => (

                                <option
                                    key={type}
                                    value={type}
                                >
                                    {type}
                                </option>

                            ))}

                        </select>


                        {/* ================= BRANCH ================= */}

                        <select
                            value={branch}
                            onChange={(e) =>
                                setBranch(e.target.value)
                            }
                        >

                            <option value="all">
                                All Branches
                            </option>


                            {branches.map((item) => (

                                <option
                                    key={item}
                                    value={item}
                                >
                                    {item}
                                </option>

                            ))}

                        </select>


                        {/* ================= LOCATION ================= */}

                        <select
                            value={location}
                            onChange={(e) =>
                                setLocation(e.target.value)
                            }
                        >

                            <option value="all">
                                All Locations
                            </option>


                            {locations.map((item) => (

                                <option
                                    key={item}
                                    value={item}
                                >
                                    {item}
                                </option>

                            ))}

                        </select>


                        {/* ================= CLEAR ================= */}

                        {(search ||
                            companyType !== "all" ||
                            branch !== "all" ||
                            location !== "all") && (

                            <button
                                className="company-clear-button"
                                onClick={handleClearFilters}
                            >
                                Clear
                            </button>

                        )}

                    </div>


                    {/* ================================================= */}
                    {/* COMPANY TABLE */}
                    {/* ================================================= */}

                    <div className="companies-table-container">


                        <table className="companies-table">


                            {/* ================= TABLE HEADER ================= */}

                            <thead>

                                <tr>

                                    <th>
                                        Company
                                    </th>

                                    <th>
                                        Branch
                                    </th>

                                    <th>
                                        Type
                                    </th>

                                    <th>
                                        Location
                                    </th>

                                    <th>
                                        Highest Package
                                    </th>

                                    <th>
                                        Details
                                    </th>

                                </tr>

                            </thead>


                            {/* ================= TABLE BODY ================= */}

                            <tbody>


                                {filteredCompanies.length > 0 ? (

                                    filteredCompanies.map(
                                        (company) => (

                                            <tr
                                                key={
                                                    company.companyId
                                                }
                                            >


                                                {/* ================= COMPANY ================= */}

                                                <td>

                                                    <div className="company-name-cell">


                                                        {/* Logo */}

                                                        <div className="company-logo">

                                                            {company.logoPicPath ? (

                                                                <img
                                                                    src={
                                                                        company.logoPicPath
                                                                    }
                                                                    alt={
                                                                        company.companyName
                                                                    }
                                                                />

                                                            ) : (

                                                                <span>

                                                                    {company.companyName
                                                                        ?.charAt(0)
                                                                        .toUpperCase()}

                                                                </span>

                                                            )}

                                                        </div>


                                                        {/* Name + Email */}

                                                        <div>

                                                            <strong>

                                                                {
                                                                    company.companyName
                                                                }

                                                            </strong>


                                                            <small>

                                                                {
                                                                    company.email
                                                                }

                                                            </small>

                                                        </div>

                                                    </div>

                                                </td>


                                                {/* ================= BRANCH ================= */}

                                                <td>

                                                    {
                                                        company.branch ||
                                                        "N/A"
                                                    }

                                                </td>


                                                {/* ================= TYPE ================= */}

                                                <td>

                                                    <span className="company-type">

                                                        {
                                                            company.companyType ||
                                                            "N/A"
                                                        }

                                                    </span>

                                                </td>


                                                {/* ================= LOCATION ================= */}

                                                <td>

                                                    {
                                                        company.location ||
                                                        "N/A"
                                                    }

                                                </td>


                                                {/* ================= PACKAGE ================= */}

                                                <td>

                                                    ₹{" "}

                                                    {
                                                        company.lastHighestPackage
                                                    }

                                                    {" "}LPA

                                                </td>


                                                {/* ================= DETAILS ================= */}

                                                <td>

                                                    <button
                                                        className="company-details-button"
                                                        onClick={() =>
                                                            handleShowDetails(
                                                                company
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


                                    /* ================= NO COMPANIES ================= */

                                    <tr>

                                        <td
                                            colSpan="6"
                                            className="no-companies"
                                        >

                                            No companies found
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


/* ================================================= */
/* DETAIL ITEM COMPONENT */
/* ================================================= */

const DetailItem = ({ label, value }) => {

    return (

        <div className="company-detail-item">

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


export default DashboardCompanies;