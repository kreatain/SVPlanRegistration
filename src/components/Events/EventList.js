import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../../styles/EventList.css";

const EventList = () => {
  const { events } = useSelector((state) => state.event);
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="event-container">
      <h2>Upcoming Events</h2>
      {user.role === "admin" && (
        <Link to="/events/create" className="btn-primary">
          Create New Event
        </Link>
      )}
      <div className="event-list">
        {events.length > 0 ? (
          events.map((event) => (
            <div key={event.id} className="event-card">
              <h3>{event.name}</h3>
              <p>{event.description}</p>
              <p>
                <strong>Date:</strong> {event.happening_date}
              </p>
              <Link to={`/events/${event.id}`} className="btn-secondary">
                View Details
              </Link>
            </div>
          ))
        ) : (
          <p>No events available.</p>
        )}
      </div>
    </div>
  );
};

export default EventList;
