import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { listEvents, updateEventStatus } from "../../apiService"; 
import "../../styles/EventList.css";

const EventList = () => {
  const { user } = useSelector((state) => state.auth);

  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const EVENT_CATEGORIES = [
    "Workshop",
    "Career Fair",
    "Conference",
    "Culture Festival",
    "Volunteer",
    "Opportunity",
  ];

  // State for selected category filter
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...EVENT_CATEGORIES];
  

  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await listEvents();
        console.log("Fetched events:", response.data.events);
        setEvents(response.data.events); 
      } catch (error) {
        console.error("Failed to fetch events:", error.response?.data || error.message);
        setError("Failed to fetch events. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

const handleUpdateStatus = async (eventId, newStatus, eventTime) => {
  try {
    if (newStatus === "Unattended") {
      const currentDateTime = new Date();
      newStatus = new Date(eventTime) < currentDateTime ? "Overdue" : "Upcoming";
    }

    const response = await updateEventStatus(eventId, { status: newStatus });
    console.log(`Event ${eventId} status updated to ${newStatus}:`, response.data);

    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.event_id === eventId ? { ...event, event_status: newStatus } : event
      )
    );

    alert(`Event status updated to ${newStatus}`);
  } catch (error) {
    console.error(`Failed to update status for event ${eventId}:`, error.response?.data || error.message);
    alert("Failed to update event status. Please try again.");
  }
};

  const filteredEvents =
    selectedCategory === "All"
      ? events
      : events.filter((event) => event.event_category === selectedCategory);

  const currentDate = new Date();

  const attendedEvents = filteredEvents.filter((event) => event.event_status === "Attended");
  const upcomingEvents = filteredEvents.filter((event) => event.event_status === "Upcoming");
  const overdueEvents = filteredEvents.filter((event) => event.event_status === "Overdue");

  if (isLoading) {
    return <p>Loading events...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div className="event-container">
      <h2>Events</h2>
      {user.role === "Admin" && (
        <Link to="/events/create" className="btn-primary">
          Create New Event
        </Link>
      )}
  
      <div className="filter-bar">
        <label htmlFor="category-filter">Filter by Category:</label>
        <select
          id="category-filter"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
  
      <div className="event-lists">
        {/* Upcoming Events */}
        <div className="event-section">
          <h3 className="event-title upcoming-title">Upcoming Events</h3>
          {upcomingEvents.length > 0 ? (
            upcomingEvents.map((event) => (
              <div key={event.event_id} className="event-card">
                <h3>{event.event_name}</h3>
                <p>{event.event_description}</p>
                <p>
                  <strong>Category:</strong> {event.event_category}
                </p>
                <p>
                  <strong>Date:</strong> {new Date(event.event_time).toLocaleString()}
                </p>
                <div className="btn-container">
                  <button
                    onClick={() => handleUpdateStatus(event.event_id, "Attended")}
                    className="btn-secondary"
                  >
                    Mark as Attended
                  </button>
                  <Link to={`/events/${event.event_id}`} className="btn-secondary">
                    View Details
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p>No upcoming events available.</p>
          )}
        </div>
  
        {/* Attended Events */}
        <div className="event-section">
          <h3 className="event-title attended-title">Attended Events</h3>
          {attendedEvents.length > 0 ? (
            attendedEvents.map((event) => (
              <div key={event.event_id} className="event-card attended">
                <h3>{event.event_name}</h3>
                <p>{event.event_description}</p>
                <p>
                  <strong>Category:</strong> {event.event_category}
                </p>
                <p>
                  <strong>Date:</strong> {new Date(event.event_time).toLocaleString()}
                </p>
                <div className="btn-container">
                  <button
                    onClick={() =>
                      handleUpdateStatus(event.event_id, "Unattended", event.event_time)
                    }
                    className="btn-secondary"
                  >
                    Mark as Unattended
                  </button>
                  <Link to={`/events/${event.event_id}`} className="btn-secondary">
                    View Details
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p>No attended events available.</p>
          )}
        </div>
  
        {/* Overdue Events */}
        <div className="event-section">
          <h3 className="event-title overdue-title">Overdue Events</h3>
          {overdueEvents.length > 0 ? (
            overdueEvents.map((event) => (
              <div key={event.event_id} className="event-card overdue">
                <h3>{event.event_name}</h3>
                <p>{event.event_description}</p>
                <p>
                  <strong>Category:</strong> {event.event_category}
                </p>
                <p>
                  <strong>Date:</strong> {new Date(event.event_time).toLocaleString()}
                </p>
                <div className="btn-container">
                  <button
                    onClick={() => handleUpdateStatus(event.event_id, "Attended")}
                    className="btn-secondary"
                  >
                    Mark as Attended
                  </button>
                  <Link to={`/events/${event.event_id}`} className="btn-secondary">
                    View Details
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p>No overdue events available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventList;