import React from "react";
import "../StyleSheets/UpcomingEvents.css";

const UpcomingEvents = () => {
    const events = [
        {
            id: 1,
            date: "15 AUG 2026",
            type: "Placement Drive",
            title: "TCS Placement Drive",
            description:
                "Campus recruitment drive for eligible final-year students.",
            location: "ACGCET Campus",
        },
        {
            id: 2,
            date: "18 AUG 2026",
            type: "Aptitude Test",
            title: "Infosys Recruitment Test",
            description:
                "Aptitude and technical assessment for shortlisted students.",
            location: "Placement Cell",
        },
        {
            id: 3,
            date: "22 AUG 2026",
            type: "Interview",
            title: "L&T Recruitment Drive",
            description:
                "Technical and HR interview rounds for selected candidates.",
            location: "Virtual / Campus",
        },
    ];

    return (
        <section className="upcoming-events-section">
            <div className="upcoming-events-container">

                <div className="section-heading">
                    <span>STAY UPDATED</span>

                    <h2>
                        Upcoming Events
                    </h2>

                    <p>
                        Stay informed about upcoming placement
                        drives, recruitment tests, and interviews.
                    </p>
                </div>

                <div className="events-grid">

                    {events.map((event) => (
                        <div
                            className="event-card"
                            key={event.id}
                        >

                            <div className="event-date">
                                <span>
                                    {event.date}
                                </span>
                            </div>

                            <div className="event-content">

                                <span className="event-type">
                                    {event.type}
                                </span>

                                <h3>
                                    {event.title}
                                </h3>

                                <p>
                                    {event.description}
                                </p>

                                <span className="event-location">
                                    📍 {event.location}
                                </span>

                            </div>

                        </div>
                    ))}

                </div>

            </div>
        </section>
    );
};

export default UpcomingEvents;