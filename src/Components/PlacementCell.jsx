import React from "react";
import "../StyleSheets/PlacementCell.css";

const PlacementCell = () => {

    return (
        <section className="placement-cell-section">

            <div className="placement-cell-container">

                <div className="section-heading">

                    <span>
                        ABOUT US
                    </span>

                    <h2>
                        ACGCET Placement Cell
                    </h2>

                </div>

                <div className="placement-cell-content">

                    <div className="placement-cell-image">

                        <div className="placement-cell-image-box">
                            Photos of the Placement Cell
                        </div>

                    </div>

                    <div className="placement-cell-text">

                        <h3>
                            Connecting Education with Opportunity
                        </h3>

                        <p>
                            The ACGCET Placement Cell is instrumental
                            in facilitating students' transition from
                            academics to successful careers.
                        </p>

                        <p>
                            Through strategic collaboration with
                            industry leaders, the Placement Cell
                            secures internships and placements,
                            offering students valuable practical
                            exposure.
                        </p>

                        <p>
                            Dedicated teams provide guidance on resume
                            building, interview preparation and
                            professional skills, enhancing the overall
                            employability of students.
                        </p>

                        <p>
                            These efforts across all departments ensure
                            that students are well-prepared for
                            fulfilling professional journeys.
                        </p>

                    </div>

                </div>

            </div>

        </section>
    );
};

export default PlacementCell;