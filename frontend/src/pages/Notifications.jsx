import { useEffect, useState } from "react";
import axios from "axios";

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:5000/api/notifications",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setNotifications(response.data);

    } catch (error) {
      console.error(
        "Failed to fetch notifications:",
        error
      );

      alert(
        error.response?.data?.message ||
        "Failed to load notifications"
      );

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const markAsRead = async (id) => {
    try {
      await axios.put(
        `http://127.0.0.1:5000/api/notifications/${id}/read`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      fetchNotifications();

    } catch (error) {
      console.error(
        "Failed to mark notification:",
        error
      );

      alert(
        error.response?.data?.message ||
        "Failed to mark notification as read"
      );
    }
  };

  if (loading) {
    return (
      <div className="dashboard-page">
        <h1>🔔 Notifications</h1>
        <p>Loading notifications...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-page">

      <h1>🔔 Notifications</h1>

      {notifications.length === 0 ? (
        <p>No notifications yet.</p>
      ) : (

        notifications.map((notification) => (

          <div
            key={notification._id}
            className="listing-card"
          >

            <h3>
              {notification.type}
            </h3>

            <p>
              {notification.message}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              {notification.isRead
                ? "Read"
                : "Unread"}
            </p>

            <p>
              <strong>Date:</strong>{" "}
              {new Date(
                notification.createdAt
              ).toLocaleString()}
            </p>

            {!notification.isRead && (
              <button
                onClick={() =>
                  markAsRead(notification._id)
                }
              >
                Mark as Read
              </button>
            )}

          </div>

        ))
      )}

    </div>
  );
}

export default Notifications;