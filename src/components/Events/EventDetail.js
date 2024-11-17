import React from "react";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import "../../styles/EventDetail.css";

const EventDetail = () => {
  const { id } = useParams();
  const { events } = useSelector((state) => state.event);

  const event = events.find((evt) => evt.id === parseInt(id));

  if (!event) {
    return (
      <div className="event-detail-container">
        <p>Event not found.</p>
        <Link to="/events" className="btn-secondary">
          &larr; Back to Events
        </Link>
      </div>
    );
  }

  return (
    <div className="event-detail-container">
      <Link to="/events" className="btn-secondary">
        &larr; Back to Events
      </Link>
      <div className="event-detail-card">
        <h2>{event.name}</h2>
        <p>{event.description}</p>
        <p>
          <strong>Happening Date:</strong> {event.happening_date}
        </p>
        <p>
          <strong>Entry Date:</strong> {event.entry_date}
        </p>
        <p>
          <strong>Created By:</strong> {event.admin_username}
        </p>
      </div>
    </div>
  );
};

export default EventDetail;
