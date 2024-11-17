import React from "react";
import { useSelector } from "react-redux";
import "../../styles/Notification.css";

const Notification = () => {
  const { notifications } = useSelector((state) => state.notification);

  return (
    <div className="notification-container">
      <h2>Your Notifications</h2>
      <div className="notification-list">
        {notifications.map((notif) => (
          <div key={notif.id} className="notification-card">
            <p>{notif.message}</p>
            <p className="notification-date">
              {new Date(notif.date_sent).toLocaleString()}
            </p>
          </div>
        ))}
        {notifications.length === 0 && <p>No notifications available.</p>}
      </div>
    </div>
  );
};

export default Notification;
