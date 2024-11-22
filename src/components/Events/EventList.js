import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "../../styles/EventList.css";

// Import action to toggle attended status
import { toggleEventAttendance } from "../../redux/actions";

const EventList = () => {
  const dispatch = useDispatch();
  const { events } = useSelector((state) => state.event);
  const { user } = useSelector((state) => state.auth);

  // Define fixed categories
  const EVENT_CATEGORIES = [
    "Career",
    "Study",
    "Research",
    "Entertainment",
    "Exercise",
  ];

  // State for selected category filter
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Define categories, including "All"
  const categories = ["All", ...EVENT_CATEGORIES];

  // Handler for category change
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  // Filter events based on selected category
  const filteredEvents =
    selectedCategory === "All"
      ? events
      : events.filter((event) => event.category === selectedCategory);

  // Get current date
  const currentDate = new Date();

  // Separate events into categories
  const attendedEvents = filteredEvents.filter((event) => event.attended);
  const upcomingEvents = filteredEvents.filter(
    (event) => !event.attended && new Date(event.happening_date) >= currentDate
  );
  const overdueEvents = filteredEvents.filter(
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

      {/* Advanced Filter Bar */}
      <div className="filter-bar">
        <label htmlFor="category-filter">Filter by Category:</label>
        <select
          id="category-filter"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Overdue Events Section */}
      {overdueEvents.length > 0 && (
        <div className="event-list overdue-events">
          <h3>Overdue Events</h3>
          {overdueEvents.map((event) => (
            <div key={event.id} className="event-card overdue">
              <h3>{event.name}</h3>
              <p>{event.description}</p>
              <p>
                <strong>Category:</strong> {event.category}
              </p>
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
                <strong>Category:</strong> {event.category}
              </p>
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
                <strong>Category:</strong> {event.category}
              </p>
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

// Mock Data Setup
const mockEvents = [
  {
    id: 1,
    name: "Tech Career Fair",
    description: "Connecting students with top tech companies.",
    happening_date: "2024-12-15T10:00:00",
    entry_date: "2024-11-01T00:00:00",
    admin_username: "admin1",
    attended: false,
    category: "Career",
  },
  {
    id: 2,
    name: "Annual Research Showcase",
    description: "Presenting groundbreaking research projects.",
    happening_date: "2024-11-20T09:00:00",
    entry_date: "2024-10-15T00:00:00",
    admin_username: "admin2",
    attended: true,
    category: "Research",
  },
  {
    id: 3,
    name: "Campus Study Group",
    description: "Group study sessions for final exams.",
    happening_date: "2024-11-25T14:00:00",
    entry_date: "2024-11-10T00:00:00",
    admin_username: "admin3",
    attended: false,
    category: "Study",
  },
  {
    id: 4,
    name: "Music Concert",
    description: "Enjoy live performances by local bands.",
    happening_date: "2024-12-05T19:00:00",
    entry_date: "2024-11-05T00:00:00",
    admin_username: "admin4",
    attended: false,
    category: "Entertainment",
  },
  {
    id: 5,
    name: "Yoga Session",
    description: "Morning yoga for relaxation and fitness.",
    happening_date: "2024-11-18T07:00:00",
    entry_date: "2024-11-01T00:00:00",
    admin_username: "admin5",
    attended: true,
    category: "Exercise",
  },
];

export default EventList;
