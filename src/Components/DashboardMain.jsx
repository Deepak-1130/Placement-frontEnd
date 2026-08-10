import React, { useState } from "react";
import AdminCalendar from "./AdminCalendar";
import "../StyleSheets/DashboardMain.css";

const DashboardMain = () => {
    const [showEventForm, setShowEventForm] = useState(false);

    const [eventTitle, setEventTitle] = useState("");
    const [eventDate, setEventDate] = useState("");
    const [eventDescription, setEventDescription] = useState("");

    const [events, setEvents] = useState([]);

    const handleAddEvent = (e) => {
        e.preventDefault();

        if (!eventTitle || !eventDate) {
            return;
        }

        const newEvent = {
            id: String(Date.now()),
            title: eventTitle,
            date: eventDate,
            description: eventDescription
        };

        setEvents((previousEvents) => [
            ...previousEvents,
            newEvent
        ]);

        setEventTitle("");
        setEventDate("");
        setEventDescription("");
        setShowEventForm(false);
    };

    return (
        <div className="dashboard-main">

            <div className="dashboard-main-header">
                <div>
                    <h1>Admin Dashboard</h1>
                    <p>
                        Overview of placement activities and
                        college recruitment operations.
                    </p>
                </div>
            </div>

            <div className="dashboard-top-section">

                <div className="dashboard-overview">

                    <div className="dashboard-stat-card">
                        <div className="stat-icon">🎓</div>

                        <div>
                            <span>Total Students</span>
                            <h2>1200</h2>
                            <small>Registered students</small>
                        </div>
                    </div>

                    <div className="dashboard-stat-card">
                        <div className="stat-icon">🏢</div>

                        <div>
                            <span>Companies</span>
                            <h2>48</h2>
                            <small>Recruiting companies</small>
                        </div>
                    </div>

                    <div className="dashboard-stat-card">
                        <div className="stat-icon">💼</div>

                        <div>
                            <span>Placed Students</span>
                            <h2>324</h2>
                            <small>Successfully placed</small>
                        </div>
                    </div>

                    <div className="dashboard-stat-card">
                        <div className="stat-icon">📈</div>

                        <div>
                            <span>Placement Rate</span>
                            <h2>78%</h2>
                            <small>Current placement rate</small>
                        </div>
                    </div>

                </div>

                <div className="dashboard-calendar-section">

                    <AdminCalendar />

                    <button
                        className="mark-event-button"
                        onClick={() =>
                            setShowEventForm(!showEventForm)
                        }
                    >
                        {showEventForm
                            ? "✕ Close"
                            : "+ Mark Event"}
                    </button>

                    {showEventForm && (

                        <form
                            className="dashboard-event-form"
                            onSubmit={handleAddEvent}
                        >

                            <h3>Mark New Event</h3>

                            <div className="event-form-group">

                                <label>
                                    Event Title
                                </label>

                                <input
                                    type="text"
                                    placeholder="TCS Placement Drive"
                                    value={eventTitle}
                                    onChange={(e) =>
                                        setEventTitle(
                                            e.target.value
                                        )
                                    }
                                    required
                                />

                            </div>

                            <div className="event-form-group">

                                <label>
                                    Event Date
                                </label>

                                <input
                                    type="date"
                                    value={eventDate}
                                    onChange={(e) =>
                                        setEventDate(
                                            e.target.value
                                        )
                                    }
                                    required
                                />

                            </div>

                            <div className="event-form-group">

                                <label>
                                    Description
                                </label>

                                <textarea
                                    placeholder="Enter event details"
                                    value={
                                        eventDescription
                                    }
                                    onChange={(e) =>
                                        setEventDescription(
                                            e.target.value
                                        )
                                    }
                                />

                            </div>

                            <button
                                type="submit"
                                className="save-event-button"
                            >
                                Save Event
                            </button>

                        </form>

                    )}

                </div>

            </div>

            <div className="dashboard-bottom-section">



            </div>

        </div>
    );
};

export default DashboardMain;