import React from "react";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import "../../styles/EventDetail.css";

const EventDetail = () => {
  const { id } = useParams();
  const { events } = useSelector((state) => state.event);
  console.log("Route Param ID:", id);
console.log("Event Detail - Events:", events);  

  // Find the event by ID
  const event = events.find((evt) => evt.event_id === parseInt(id));

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
        <h2>{event.event_name}</h2>
        <p>
          <strong>Category:</strong> {event.event_category}
        </p>
        <p><strong>Description:</strong> {event.event_description}</p>
        <p>
          <strong>Happening Date:</strong>{" "}
          {new Date(event.event_time).toLocaleString()}
        </p>
        <p>
          <strong>Entry Date:</strong>{" "}
          {new Date(event.event_created_at).toLocaleString()}
        </p>
        <p>
          <strong>Created By:</strong> {event.event_published_by}
        </p>
      </div>
    </div>
  );
};

export default EventDetail;