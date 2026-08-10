import React from "react";
import "../StyleSheets/OurRecruiters.css";

const OurRecruiters = () => {

    const recruiters = [
        "ZOHO",
        "Larsen & Toubro",
        "Adminroid",
        "Lucas TVS",
        "TCS",
        "Infosys",
        "Accenture",
        "Cognizant"
    ];

    return (
        <section className="recruiters-section">

            <div className="recruiters-container">

                <div className="section-heading">

                    <span>
                        INDUSTRY PARTNERS
                    </span>

                    <h2>
                        Our Recruiters
                    </h2>

                </div>

                <div className="recruiters-grid">

                    {recruiters.map((recruiter, index) => (

                        <div
                            className="recruiter-item"
                            key={index}
                        >
                            {recruiter}
                        </div>

                    ))}

                </div>

            </div>

        </section>
    );
};

export default OurRecruiters;