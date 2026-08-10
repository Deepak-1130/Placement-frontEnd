import React from "react";
import "../StyleSheets/PlacementPortal.css";

const PlacementPortal = () => {
    return (
        <section className="placement-portal-section">

            <div className="placement-portal-container">

                <div className="placement-portal-content">

                    <span className="placement-portal-label">
                        PLACEMENT PORTAL
                    </span>

                    <h1>
                        Placement Management
                        <span> Simplified</span>
                    </h1>

                    <p>
                        A centralized platform connecting students,
                        recruiters, and the placement cell through
                        a simple and efficient digital experience.
                    </p>

                    <div className="placement-portal-stats">

                        <div className="portal-stat">
                            <strong>500+</strong>
                            <span>Students</span>
                        </div>

                        <div className="portal-stat">
                            <strong>50+</strong>
                            <span>Recruiters</span>
                        </div>

                        <div className="portal-stat">
                            <strong>100+</strong>
                            <span>Offers</span>
                        </div>

                    </div>

                </div>

                <div className="placement-portal-visual">

                    <div className="portal-card">

                        <div className="portal-card-header">
                            <span>Placement Overview</span>
                            <span className="portal-status">
                                ● Active
                            </span>
                        </div>

                        <div className="portal-card-main">

                            <div className="portal-circle">
                                <strong>78%</strong>
                                <span>Placement</span>
                            </div>

                            <div className="portal-card-details">

                                <div>
                                    <span>Students Placed</span>
                                    <strong>390</strong>
                                </div>

                                <div>
                                    <span>Companies</span>
                                    <strong>52</strong>
                                </div>

                                <div>
                                    <span>Highest Package</span>
                                    <strong>₹45 LPA</strong>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
};

export default PlacementPortal;