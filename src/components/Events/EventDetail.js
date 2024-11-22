import React from "react";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import "../../styles/EventDetail.css";

const EventDetail = () => {
  const { id } = useParams();
  const { events } = useSelector((state) => state.event);

  // Find the event by ID
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
        <p>
          <strong>Category:</strong> {event.category}
        </p>
        <p>{event.description}</p>
        <p>
          <strong>Happening Date:</strong>{" "}
          {new Date(event.happening_date).toLocaleString()}
        </p>
        <p>
          <strong>Entry Date:</strong>{" "}
          {new Date(event.entry_date).toLocaleString()}
        </p>
        <p>
          <strong>Created By:</strong> {event.admin_username}
        </p>
      </div>
    </div>
  );
};

// Mock Data Setup
const mockEvent = {
  id: 1,
  name: "Tech Career Fair",
  description: "Connecting students with top tech companies.",
  happening_date: "2024-12-15T10:00:00",
  entry_date: "2024-11-01T00:00:00",
  admin_username: "admin1",
  attended: false,
  category: "Career",
};

export default EventDetail;
