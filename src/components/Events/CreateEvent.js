import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import "../../styles/CreateEvent.css";

const CreateEvent = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth); 

  const [formData, setFormData] = useState({
    event_name: "",
    event_description: "",
    event_time: "",
    event_location: "",
  });

  const [isLoading, setIsLoading] = useState(false); 
  const apiUrl = process.env.REACT_APP_API_URL;

  const { event_name, event_description, event_time, event_location } = formData;


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handlePublish = async (e) => {
    e.preventDefault();

    if (!user || !user.email || !user.password) {
      alert("Invalid user credentials. Please log in again.");
      return;
    }


    const base64Credentials = btoa(`${user.email}:${user.password}`);

    setIsLoading(true);

    try {
      const response = await axios.post(
        `${apiUrl}/api/publishevent/`, 
        {
          event_name,
          event_description,
          event_time,
          event_location,
        },
        {
          headers: {
            Authorization: `Basic ${base64Credentials}`, 
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Publish Event response:", response.data);

      alert("Event published successfully!");
      navigate("/events");
    } catch (error) {
      console.error("Publish Event failed:", error.response?.data || error.message);
      alert(
        error.response?.data?.message ||
          "Failed to publish event. Please ensure you have Admin permissions and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };


  if (user.role !== "Admin") {
    navigate("/events");
    return null;
  }

  return (
    <div className="create-event-container">
      <h2>Create New Event</h2>
      <form onSubmit={handlePublish} className="create-event-form">
        <div className="form-group">
          <label>Event Name:</label>
          <input
            type="text"
            name="event_name"
            value={event_name}
            onChange={handleChange}
            required
            placeholder="Enter event name"
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            name="event_description"
            value={event_description}
            onChange={handleChange}
            required
            placeholder="Enter event description"
          ></textarea>
        </div>
        <div className="form-group">
          <label>Event Time:</label>
          <input
            type="datetime-local" 
            name="event_time"
            value={event_time}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Location:</label>
          <input
            type="text"
            name="event_location"
            value={event_location}
            onChange={handleChange}
            required
            placeholder="Enter event location"
          />
        </div>
        <button type="submit" className="btn-primary" disabled={isLoading}>
          {isLoading ? "Publishing..." : "Publish Event"}
        </button>
      </form>
      <button onClick={() => navigate("/events")} className="btn-secondary">
        &larr; Back to Events
      </button>
    </div>
  );
};

export default CreateEvent;