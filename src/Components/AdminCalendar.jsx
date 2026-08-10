import React, { useEffect, useState } from "react";
import axios from "axios";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

import "../StyleSheets/AdminCalendar.css";

const AdminCalendar = () => {

    const [events, setEvents] = useState([]);

    const [selectedDate, setSelectedDate] = useState("");
    const [selectedEvents, setSelectedEvents] = useState([]);

    const [showForm, setShowForm] = useState(false);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [eventDate, setEventDate] = useState("");
    const [eventType, setEventType] = useState("");
    const [location, setLocation] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchCalendarEvents();
    }, []);

    const fetchCalendarEvents = async () => {

        try {

            setError("");

            const response = await axios.get(
                "http://localhost:8080/getCalendarEvents"
            );

            const calendarEvents = response.data.map(
                (event) => ({
                    id: String(event.eventId),

                    title: event.title,

                    start: event.eventDate,

                    extendedProps: {
                        description: event.description,
                        eventType: event.eventType,
                        location: event.location
                    }
                })
            );

            setEvents(calendarEvents);

        } catch (error) {

            console.error(error);

            setError(
                "Unable to load calendar events."
            );
        }
    };

    const handleDateClick = (info) => {

        setSelectedDate(info.dateStr);

        const dateEvents = events.filter(
            (event) =>
                event.start === info.dateStr
        );

        setSelectedEvents(dateEvents);
    };

    const openAddEventForm = () => {

        setEventDate(
            selectedDate || ""
        );

        setTitle("");
        setDescription("");
        setEventType("");
        setLocation("");

        setShowForm(true);
    };

    const closeAddEventForm = () => {

        setShowForm(false);

        setTitle("");
        setDescription("");
        setEventDate("");
        setEventType("");
        setLocation("");
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!title.trim()) {
            setError("Please enter event title.");
            return;
        }

        if (!eventDate) {
            setError("Please select event date.");
            return;
        }

        if (!eventType) {
            setError("Please select event type.");
            return;
        }

        try {

            setLoading(true);
            setError("");

            const newEvent = {

                title: title,

                description: description,

                eventDate: eventDate,

                eventType: eventType,

                location: location
            };

            await axios.post(
                "http://localhost:8080/addCalendarEvent",
                newEvent
            );

            closeAddEventForm();

            await fetchCalendarEvents();

            setSelectedDate(eventDate);

        } catch (error) {

            console.error(error);

            setError(
                error.response?.data?.message ||
                "Unable to add event."
            );

        } finally {

            setLoading(false);
        }
    };

    const handleEventClick = (info) => {

        const clickedEvent = events.find(
            (event) =>
                event.id === info.event.id
        );

        if (!clickedEvent) {
            return;
        }

        setSelectedDate(
            clickedEvent.start
        );

        setSelectedEvents([
            clickedEvent
        ]);
    };

    const handleDeleteEvent = async (eventId) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this event?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            await axios.delete(
                `http://localhost:8080/deleteCalendarEvent/${eventId}`
            );

            await fetchCalendarEvents();

            setSelectedEvents(
                (previousEvents) =>
                    previousEvents.filter(
                        (event) =>
                            event.id !==
                            String(eventId)
                    )
            );

        } catch (error) {

            console.error(error);

            setError(
                "Unable to delete event."
            );
        }
    };

    return (

        <div className="admin-calendar">

            <div className="calendar-top">

                <div className="calendar-heading">

                    <h2>
                        Calendar
                    </h2>

                    <p>
                        Placement drives and important
                        college events
                    </p>

                </div>

                <button
                    className="calendar-add-button"
                    onClick={openAddEventForm}
                    title="Add Event"
                >
                    +
                </button>

            </div>

            {error && (

                <div className="calendar-error">
                    {error}
                </div>

            )}

            <div className="calendar-wrapper">

                <FullCalendar

                    plugins={[
                        dayGridPlugin,
                        interactionPlugin
                    ]}

                    initialView="dayGridMonth"

                    events={events}

                    dateClick={
                        handleDateClick
                    }

                    eventClick={
                        handleEventClick
                    }

                    height="auto"

                    contentHeight="300px"

                    headerToolbar={{
                        left: "prev,next",
                        center: "title",
                        right: "today"
                    }}

                    dayMaxEvents={2}

                />

            </div>

            {selectedDate && (

                <div className="calendar-event-popup">

                    <div className="popup-header">

                        <div>

                            <h3>
                                Events
                            </h3>

                            <span>
                                {selectedDate}
                            </span>

                        </div>

                        <button
                            className="popup-close"
                            onClick={() => {
                                setSelectedDate("");
                                setSelectedEvents([]);
                            }}
                        >
                            ×
                        </button>

                    </div>

                    {selectedEvents.length === 0 ? (

                        <div className="no-events">

                            <p>
                                No events scheduled
                                for this date.
                            </p>

                            <button
                                onClick={openAddEventForm}
                                className="popup-add-button"
                            >
                                + Add Event
                            </button>

                        </div>

                    ) : (

                        <div className="event-list">

                            {selectedEvents.map(
                                (event) => (

                                    <div
                                        className="event-item"
                                        key={event.id}
                                    >

                                        <div className="event-info">

                                            <h4>
                                                {event.title}
                                            </h4>

                                            <span className="event-type">
                                                {event
                                                    .extendedProps
                                                    ?.eventType}
                                            </span>

                                            {event
                                                .extendedProps
                                                ?.location && (

                                                <p>
                                                    📍{" "}
                                                    {
                                                        event
                                                            .extendedProps
                                                            .location
                                                    }
                                                </p>

                                            )}

                                            {event
                                                .extendedProps
                                                ?.description && (

                                                <p>
                                                    {
                                                        event
                                                            .extendedProps
                                                            .description
                                                    }
                                                </p>

                                            )}

                                        </div>

                                        <button
                                            className="event-delete-button"
                                            onClick={() =>
                                                handleDeleteEvent(
                                                    event.id
                                                )
                                            }
                                        >
                                            🗑
                                        </button>

                                    </div>

                                )
                            )}

                            <button
                                className="popup-add-button"
                                onClick={openAddEventForm}
                            >
                                + Add Event
                            </button>

                        </div>

                    )}

                </div>

            )}

            {showForm && (

                <div className="event-modal">

                    <form
                        className="event-form"
                        onSubmit={handleSubmit}
                    >

                        <div className="event-form-header">

                            <div>

                                <h3>
                                    Add Event
                                </h3>

                                <p>
                                    Create a new
                                    calendar event
                                </p>

                            </div>

                            <button
                                type="button"
                                onClick={
                                    closeAddEventForm
                                }
                            >
                                
                            </button>

                        </div>

                        <div className="event-form-group">

                            <label>
                                Event Title
                            </label>

                            <input
                                type="text"
                                placeholder="TCS Placement Drive"
                                value={title}
                                onChange={(e) =>
                                    setTitle(
                                        e.target.value
                                    )
                                }
                            />

                        </div>

                        <div className="event-form-row">

                            <div className="event-form-group">

                                <label>
                                    Date
                                </label>

                                <input
                                    type="date"
                                    value={eventDate}
                                    onChange={(e) =>
                                        setEventDate(
                                            e.target.value
                                        )
                                    }
                                />

                            </div>

                            <div className="event-form-group">

                                <label>
                                    Event Type
                                </label>

                                <select
                                    value={eventType}
                                    onChange={(e) =>
                                        setEventType(
                                            e.target.value
                                        )
                                    }
                                >

                                    <option value="">
                                        Select Type
                                    </option>

                                    <option value="Placement Drive">
                                        Placement Drive
                                    </option>

                                    <option value="Interview">
                                        Interview
                                    </option>

                                    <option value="Aptitude Test">
                                        Aptitude Test
                                    </option>

                                    <option value="Workshop">
                                        Workshop
                                    </option>

                                    <option value="Seminar">
                                        Seminar
                                    </option>

                                    <option value="Other">
                                        Other
                                    </option>

                                </select>

                            </div>

                        </div>

                        <div className="event-form-group">

                            <label>
                                Location
                            </label>

                            <input
                                type="text"
                                placeholder="Sangamam Hall , Saaral building"
                                value={location}
                                onChange={(e) =>
                                    setLocation(
                                        e.target.value
                                    )
                                }
                            />

                        </div>

                        <div className="event-form-group">

                            <label>
                                Description
                            </label>

                            <textarea
                                placeholder="Enter event details..."
                                value={description}
                                onChange={(e) =>
                                    setDescription(
                                        e.target.value
                                    )
                                }
                            />

                        </div>

                        <div className="event-form-actions">

                            <button
                                type="button"
                                onClick={
                                    closeAddEventForm
                                }
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                disabled={loading}
                            >
                                {loading
                                    ? "Saving..."
                                    : "Add Event"}
                            </button>

                        </div>

                    </form>

                </div>

            )}

        </div>
    );
};

export default AdminCalendar;