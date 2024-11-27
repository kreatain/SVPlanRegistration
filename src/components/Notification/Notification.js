import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllTasks, listEvents } from "../../apiService";
import dayjs from "dayjs"; // Import day.js for date formatting
import "../../styles/Notification.css";

const Notification = () => {
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.task);
  const { events } = useSelector((state) => state.event);
  const { user } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!user || !user.email) {
        console.error("No user logged in. Cannot fetch notifications.");
        return;
      }

      setLoading(true);

      try {
        // Fetch tasks
        const taskResponse = await getAllTasks(user.email);
        if (taskResponse && taskResponse.data.tasks) {
          dispatch({ type: "SET_TASKS", payload: taskResponse.data.tasks });
        }

        // Fetch events
        const eventResponse = await listEvents();
        if (eventResponse && eventResponse.data.events) {
          dispatch({ type: "SET_EVENTS", payload: eventResponse.data.events });
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [dispatch, user?.email]);

  const currentDate = new Date();
  const upcomingThreshold = new Date();
  upcomingThreshold.setDate(currentDate.getDate() + 5);

  const upcomingTasks = useMemo(
    () =>
      tasks.filter((task) => {
        const dueDate = new Date(task.dueDate);
        return dueDate >= currentDate && dueDate <= upcomingThreshold;
      }),
    [tasks, currentDate, upcomingThreshold]
  );

  const upcomingEvents = useMemo(
    () =>
      events.filter((event) => {
        const eventDate = new Date(event.event_time);
        return eventDate >= currentDate && eventDate <= upcomingThreshold;
      }),
    [events, currentDate, upcomingThreshold]
  );

  console.log("Fetched Tasks:", tasks);
  console.log("Fetched Events:", events);

  return (
    <div className="notification-container">
      <h2>Your Notifications</h2>
      {loading ? (
        <p>Loading notifications...</p>
      ) : (
        <div className="notification-list">
          {/* Task Notifications */}
          {upcomingTasks.length > 0 ? (
            upcomingTasks.map((task) => (
              <div key={task.taskId} className="notification-card taskn-card">
                <p>Your task "{task.taskName}" is due soon.</p>
                <p className="notification-date">
                  {dayjs(task.dueDate).format("YYYY-MM-DD HH:mm:ss")}
                </p>
              </div>
            ))
          ) : (
            <p>No upcoming tasks available.</p>
          )}

          {/* Event Notifications */}
          {upcomingEvents.length > 0 ? (
            upcomingEvents.map((event) => (
              <div key={event.event_id} className="notification-card event-card">
                <p>Your event "{event.event_name}" is happening soon.</p>
                <p className="notification-date">
                  {dayjs(event.event_time).format("YYYY-MM-DD HH:mm:ss")}
                </p>
              </div>
            ))
          ) : (
            <p>No upcoming events available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Notification;