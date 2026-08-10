import React, { useEffect, useState } from "react";
import "../StyleSheets/MarkStudentPlaced.css";

const MarkStudentPlaced = ({ onBack }) => {

    const [registerNumber, setRegisterNumber] = useState("");
    const [student, setStudent] = useState(null);

    const [students, setStudents] = useState([]);
    const [companies, setCompanies] = useState([]);

    const [companyId, setCompanyId] = useState("");
    const [placedStatus, setPlacedStatus] = useState("");
    const [packages, setPackages] = useState("");
    const [offerLetter, setOfferLetter] = useState(null);

    const [loading, setLoading] = useState(false);
    const [studentLoading, setStudentLoading] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        fetchStudents();
        fetchCompanies();
    }, []);

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

        }
    };

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

        }
    };

    const handleRegisterNumberChange = (e) => {

        const value = e.target.value;

        setRegisterNumber(value);
        setStudent(null);
        setError("");
        setSuccess("");

        if (!value) {
            return;
        }

        setStudentLoading(true);

        const foundStudent = students.find(
            (item) =>
                String(item.registerNumber) === String(value)
        );

        if (foundStudent) {

            setStudent(foundStudent);

        } else {

            setError("Student not found");

        }

        setStudentLoading(false);
    };

    const handleOfferLetterChange = (e) => {

        const file = e.target.files[0];

        if (!file) {
            setOfferLetter(null);
            return;
        }

        setOfferLetter(file);
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");
        setSuccess("");

        if (!student) {
            setError("Please enter a valid register number");
            return;
        }

        if (!companyId) {
            setError("Please select a company");
            return;
        }

        if (!placedStatus) {
            setError("Please select status");
            return;
        }

        if (!packages) {
            setError("Please enter the package");
            return;
        }

        if (!offerLetter) {
            setError("Please upload the offer letter");
            return;
        }

        try {

            setLoading(true);

            const selectedCompany = companies.find(
                (company) =>
                    String(company.companyId) === String(companyId)
            );

            if (!selectedCompany) {
                throw new Error("Company not found");
            }

            const placedStudentData = {

                student: {
                    registerNumber: student.registerNumber
                },

                company: {
                    companyId: selectedCompany.companyId
                },

                placedstatus: placedStatus,

                packages: Number(packages)

            };

            const formData = new FormData();

            formData.append(
                "placedStudent",
                JSON.stringify(placedStudentData)
            );

            formData.append(
                "offerLetter",
                offerLetter
            );

            const response = await fetch(
                "http://localhost:8080/markPlacedStudent",
                {
                    method: "POST",
                    body: formData
                }
            );

            if (!response.ok) {

                const message = await response.text();

                throw new Error(
                    message || "Failed to mark student"
                );
            }

          const result = await response.text();

            console.log(
                "Placement created:",
                result
            );

            setSuccess(
                `${student.firstName} ${student.lastName} has been marked as ${placedStatus.toLowerCase()} successfully.`
            );

            setRegisterNumber("");
            setStudent(null);
            setCompanyId("");
            setPlacedStatus("");
            setPackages("");
            setOfferLetter(null);

            const fileInput =
                document.getElementById(
                    "offer-letter-input"
                );

            if (fileInput) {
                fileInput.value = "";
            }

        } catch (error) {

            console.error(error);

            setError(
                error.message ||
                "Unable to mark student"
            );

        } finally {

            setLoading(false);

        }
    };

    return (

        <div className="mark-placed-page">

            <div className="mark-placed-header">

                <div>

                    <h1>
                        Mark Student Placed
                    </h1>

                    <p>
                        Add a student's placement details
                    </p>

                </div>

                <button
                    className="mark-back-button"
                    onClick={onBack}
                >
                    ← Back
                </button>

            </div>

            <form
                className="mark-placed-form"
                onSubmit={handleSubmit}
            >

                <div className="form-section">

                    <h2>
                        Student Information
                    </h2>

                    <div className="form-group">

                        <label>
                            Register Number
                        </label>

                        <input
                            type="number"
                            placeholder="Enter register number"
                            value={registerNumber}
                            onChange={
                                handleRegisterNumberChange
                            }
                        />

                    </div>

                    {studentLoading && (
                        <p className="form-info">
                            Searching student...
                        </p>
                    )}

                    {student && (

                        <div className="student-preview">

                            <div className="student-avatar">

                                {student.firstName
                                    ?.charAt(0)
                                    .toUpperCase()}

                            </div>

                            <div className="student-preview-info">

                                <h3>

                                    {student.firstName}{" "}
                                    {student.lastName}

                                </h3>

                                <div className="student-preview-grid">

                                    <div>

                                        <span>
                                            Department
                                        </span>

                                        <strong>
                                            {student.departments}
                                        </strong>

                                    </div>

                                    <div>

                                        <span>
                                            Passed Out
                                        </span>

                                        <strong>
                                            {student.passedOutYear}
                                        </strong>

                                    </div>

                                    <div>

                                        <span>
                                            Email
                                        </span>

                                        <strong>
                                            {student.emailId}
                                        </strong>

                                    </div>

                                    <div>

                                        <span>
                                            CGPA
                                        </span>

                                        <strong>
                                            {student.CGPA}
                                        </strong>

                                    </div>

                                </div>

                            </div>

                        </div>

                    )}

                </div>

                <div className="form-section">

                    <h2>
                        Placement Information
                    </h2>

                    <div className="form-row">

                        <div className="form-group">

                            <label>
                                Company
                            </label>

                            <select
                                value={companyId}
                                onChange={(e) =>
                                    setCompanyId(
                                        e.target.value
                                    )
                                }
                            >

                                <option value="">
                                    Select Company
                                </option>

                                {companies.map(
                                    (company) => (

                                        <option
                                            key={
                                                company.companyId
                                            }
                                            value={
                                                company.companyId
                                            }
                                        >

                                            {
                                                company.companyName
                                            }

                                        </option>

                                    )
                                )}

                            </select>

                        </div>

                        <div className="form-group">

                            <label>
                                Status
                            </label>

                            <select
                                value={placedStatus}
                                onChange={(e) =>
                                    setPlacedStatus(
                                        e.target.value
                                    )
                                }
                            >

                                <option value="">
                                    Select Status
                                </option>

                                <option value="Placed">
                                    Placed
                                </option>

                                <option value="Intern">
                                    Intern
                                </option>

                            </select>

                        </div>

                        <div className="form-group">

                            <label>
                                Package (LPA)
                            </label>

                            <input
                                type="number"
                                step="0.1"
                                min="0"
                                placeholder="Example: 7"
                                value={packages}
                                onChange={(e) =>
                                    setPackages(
                                        e.target.value
                                    )
                                }
                            />

                        </div>

                    </div>

                    <div className="selected-company">

                        {companyId && (

                            (() => {

                                const company =
                                    companies.find(
                                        (item) =>
                                            String(
                                                item.companyId
                                            ) ===
                                            String(
                                                companyId
                                            )
                                    );

                                if (!company) {
                                    return null;
                                }

                                return (

                                    <div>

                                        <strong>
                                            {
                                                company.companyName
                                            }
                                        </strong>

                                        <span>

                                            {
                                                company.companyType
                                            }

                                            {" • "}

                                            {
                                                company.location
                                            }

                                        </span>

                                    </div>

                                );

                            })()

                        )}

                    </div>

                </div>

                <div className="form-section">

                    <h2>
                        Offer Letter
                    </h2>

                    <div className="form-group">

                        <label>
                            Upload Offer Letter
                        </label>

                        <input
                            id="offer-letter-input"
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={
                                handleOfferLetterChange
                            }
                        />

                        {offerLetter && (

                            <p className="file-selected">

                                Selected:{" "}

                                <strong>
                                    {offerLetter.name}
                                </strong>

                            </p>

                        )}

                    </div>

                </div>

                {error && (

                    <div className="form-error">
                        {error}
                    </div>

                )}

                {success && (

                    <div className="form-success">
                        {success}
                    </div>

                )}

                <div className="form-actions">

                    <button
                        type="button"
                        className="cancel-button"
                        onClick={onBack}
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="mark-placed-button"
                        disabled={loading}
                    >

                        {loading
                            ? "Saving..."
                            : "Save Placement"}

                    </button>

                </div>

            </form>

        </div>
    );
};

export default MarkStudentPlaced;