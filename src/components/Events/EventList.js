import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "../../styles/EventList.css";

// Import action to toggle attended status
import { toggleEventAttendance } from "../../redux/actions";

const EventList = () => {
  const dispatch = useDispatch();
  const { events } = useSelector((state) => state.event);
  const { user } = useSelector((state) => state.auth);

  // Get current date
  const currentDate = new Date();

  // Separate events into categories
  const attendedEvents = events.filter((event) => event.attended);
  const upcomingEvents = events.filter(
    (event) => !event.attended && new Date(event.happening_date) >= currentDate
  );
  const overdueEvents = events.filter(
    (event) => !event.attended && new Date(event.happening_date) < currentDate
  );

  // Handler to toggle attendance
  const handleToggleAttendance = (eventId) => {
    dispatch(toggleEventAttendance(eventId));
  };

  return (
    <div className="event-container">
      <h2>Events</h2>
      {user.role === "Admin" && (
        <Link to="/events/create" className="btn-primary">
          Create New Event
        </Link>
      )}

      {/* Overdue Events Section */}
      {overdueEvents.length > 0 && (
        <div className="event-list overdue-events">
          <h3>Overdue Events</h3>
          {overdueEvents.map((event) => (
            <div key={event.id} className="event-card overdue">
              <h3>{event.name}</h3>
              <p>{event.description}</p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(event.happening_date).toLocaleString()}
              </p>
              <button
                onClick={() => handleToggleAttendance(event.id)}
                className="btn-secondary"
              >
                Mark as Attended
              </button>
              <Link to={`/events/${event.id}`} className="btn-secondary">
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* Upcoming Events Section */}
      <div className="event-list upcoming-events">
        <h3>Upcoming Events</h3>
        {upcomingEvents.length > 0 ? (
          upcomingEvents.map((event) => (
            <div key={event.id} className="event-card">
              <h3>{event.name}</h3>
              <p>{event.description}</p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(event.happening_date).toLocaleString()}
              </p>
              <button
                onClick={() => handleToggleAttendance(event.id)}
                className="btn-secondary"
              >
                Mark as Attended
              </button>
              <Link to={`/events/${event.id}`} className="btn-secondary">
                View Details
              </Link>
            </div>
          ))
        ) : (
          <p>No upcoming events available.</p>
        )}
      </div>

      {/* Attended Events Section */}
      {attendedEvents.length > 0 && (
        <div className="event-list attended-events">
          <h3>Attended Events</h3>
          {attendedEvents.map((event) => (
            <div key={event.id} className="event-card attended">
              <h3>{event.name}</h3>
              <p>{event.description}</p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(event.happening_date).toLocaleString()}
              </p>
              <button
                onClick={() => handleToggleAttendance(event.id)}
                className="btn-secondary"
              >
                Mark as Not Attended
              </button>
              <Link to={`/events/${event.id}`} className="btn-secondary">
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventList;
