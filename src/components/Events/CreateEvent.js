import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import "../../styles/CreateEvent.css";
import { addNewEvent } from "../../redux/actions";

const CreateEvent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  // Define fixed categories
  const EVENT_CATEGORIES = [
    "Career",
    "Study",
    "Research",
    "Entertainment",
    "Exercise",
  ];

  // Updated formData to include category
  const [formData, setFormData] = useState({
    event_name: "",
    event_description: "",
    event_time: "",
    event_location: "",
    category: EVENT_CATEGORIES[0],
  });

  const [isLoading, setIsLoading] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;

  const {
    event_name,
    event_description,
    event_time,
    event_location,
    category,
  } = formData;

  // Handler for input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handler for form submission
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
          category,
        },
        {
          headers: {
            Authorization: `Basic ${base64Credentials}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Publish Event response:", response.data);

      dispatch(addNewEvent(response.data));

      alert("Event published successfully!");
      navigate("/events");
    } catch (error) {
      console.error(
        "Publish Event failed:",
        error.response?.data || error.message
      );
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
          <label>Category:</label>
          <select
            name="category"
            value={category}
            onChange={handleChange}
            required
          >
            {EVENT_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
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

// Mock Data Setup
const mockCreateEvent = {
  id: 6,
  name: "Evening Yoga",
  description: "Relax with a session of yoga in the evening.",
  happening_date: "2024-11-22T18:00:00",
  entry_date: "2024-11-15T00:00:00",
  admin_username: "admin6",
  attended: false,
  category: "Exercise",
};

export default CreateEvent;
