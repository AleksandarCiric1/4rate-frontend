import React, { useEffect, useState } from "react";

const ReservationNotifications = () => {
  const [userId, setUserId] = useState(1);
  const [notifications, setNotifications] = useState<string[]>([]);

  useEffect(() => {
    // Define the URL for the SSE connection (replace with your backend URL)
    const url = `http://localhost:8080/v1/reservations/stream/${userId}`;

    // Create a new EventSource connection
    const sse = new EventSource(url);

    // Listen for the "reservation-approval" event
    sse.addEventListener("reservation-approval", (event) => {
      const notification = JSON.parse(event.data);
      setNotifications((prev) => [...prev, notification.message]);
    });

    // Handle errors or connection closing
    sse.onerror = () => {
      sse.close();
    };

    // Clean up the EventSource connection when the component unmounts
    return () => {
      sse.close();
    };
  }, [userId]);

  return (
    <div>
      <h2>Reservation Notifications</h2>
      {notifications.length > 0 ? (
        <ul>
          {notifications.map((notification, index) => (
            <li key={index}>{notification}</li>
          ))}
        </ul>
      ) : (
        <p>No new notifications</p>
      )}
    </div>
  );
};

export default ReservationNotifications;
