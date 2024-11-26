import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { publishEvent } from "../../apiService"; 
import "../../styles/CreateEvent.css";
import { addNewEvent } from "../../redux/actions";

const CreateEvent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const EVENT_CATEGORIES = [
    "Workshop",
    "Career Fair",
    "Conference",
    "Culture Festival",
    "Volunteer",
    "Opportunity",
  ];

  const [formData, setFormData] = useState({
    event_name: "",
    event_description: "",
    event_time: "",
    event_location: "",
    category: EVENT_CATEGORIES[0],
  });

  const [isLoading, setIsLoading] = useState(false);

  const {
    event_name,
    event_description,
    event_time,
    event_location,
    category,
  } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePublish = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const response = await publishEvent({
        event_name,
        event_description,
        event_time,
        event_location,
        event_category: category,
      });

      console.log("Publish Event response:", response);

      dispatch(addNewEvent(response.data));

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

export default CreateEvent;