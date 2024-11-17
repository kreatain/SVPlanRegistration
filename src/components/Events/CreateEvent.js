import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "../../styles/CreateEvent.css";

const CreateEvent = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    happening_date: "",
    entry_date: "",
  });

  const { name, description, happening_date, entry_date } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreate = (e) => {
    e.preventDefault();
    // For simulation purposes only
    navigate("/events");
    alert("Event Created Successfully! (Mock)");
  };

  // Redirect non-admin users
  if (user.role !== "admin") {
    navigate("/events");
    return null;
  }

  return (
    <div className="create-event-container">
      <h2>Create New Event</h2>
      <form onSubmit={handleCreate} className="create-event-form">
        <div className="form-group">
          <label>Event Name:</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            required
            placeholder="Enter event name"
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            name="description"
            value={description}
            onChange={handleChange}
            required
            placeholder="Enter event description"
          ></textarea>
        </div>
        <div className="form-group">
          <label>Happening Date:</label>
          <input
            type="date"
            name="happening_date"
            value={happening_date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Entry Date:</label>
          <input
            type="date"
            name="entry_date"
            value={entry_date}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn-primary">
          Create Event
        </button>
      </form>
      <button onClick={() => navigate("/events")} className="btn-secondary">
        &larr; Back to Events
      </button>
    </div>
  );
};

export default CreateEvent;
