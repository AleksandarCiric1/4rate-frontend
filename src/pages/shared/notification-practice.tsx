import { Card } from "@/components/ui/card";
import { notificationEndpoinst } from "@/environments/api-endpoints";
import { useNotificationContext } from "@/providers/notification";
import { useUser } from "@/providers/user";
import { Notification, NotificationType } from "@/types/notification";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const NotificationBell = () => {
  const { user } = useUser();
  const [newNotifications, setNewNotifications] = useState<boolean>(false);
  const navigate = useNavigate();
  const { addNotification, emptyNotifications } = useNotificationContext();

  useEffect(() => {
    if (!user || !user.id) return;
    emptyNotifications();
    const fetchNotifications = async () => {
      const response = await axios.get<Notification[]>(
        notificationEndpoinst.unread(user?.id)
      );
      if (response.data.length > 0) {
        response.data.forEach((notification) => {
          addNotification(notification);
        });
        setNewNotifications(true);
      }
    };

    fetchNotifications();
  }, []);

  useEffect(() => {
    if (!user || !user.id) return;
    const url = notificationEndpoinst.stream(user?.id);
    const sse = new EventSource(url);

    const notificationType =
      user?.role === "guest"
        ? NotificationType.NOTIFICATION_GUEST
        : NotificationType.NOTIFICATION_MANAGER;
    sse.addEventListener(notificationType, (event) => {
      const notification = JSON.parse(event.data);
      setNewNotifications(true);
      addNotification(notification);
    });

    sse.onerror = () => {
      sse.close();
    };

    return () => {
      sse.close();
    };
  }, []);

  const handleNotificationClick = () => {
    setNewNotifications(false);
    navigate("/notifications");
  };

  return (
    <div>
      <button onClick={handleNotificationClick} className="notification-bell">
        🛎️
        {newNotifications && (
          <span className="relative">
            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
          </span>
        )}
      </button>
    </div>
  );
};

const NotificationPage = () => {
  const { notifications, emptyNotifications } = useNotificationContext();
  const [notViewedNotifications, setNotViewedNotifications] = useState<
    Notification[] | []
  >([]);
  const { user } = useUser();
  useEffect(() => {
    setNotViewedNotifications(notifications);
  }, []);

  useEffect(() => {
    if (!user || !user.id) return;
    emptyNotifications();
    axios
      .post(notificationEndpoinst.read(user?.id))
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  }, [notViewedNotifications]);

  return (
    <div className="flex flex-col items-center p-4 md:p-8 lg:p-12">
      <h1 className="text-2xl font-bold mb-4">Your Notifications</h1>
      <div className="w-full max-w-3xl">
        {notViewedNotifications.length > 0 ? (
          <ul className="space-y-4">
            {notViewedNotifications.map((notification, index) => (
              <Card key={index} className="p-4 shadow-md">
                <h2 className="text-lg font-semibold">{notification.title}</h2>
                <p className="text-gray-700">{notification.message}</p>
                <p className="text-sm text-gray-500">
                  {new Date(notification.createdAt).toLocaleString()}
                </p>
              </Card>
            ))}
          </ul>
        ) : (
          <Card className="p-4 text-center shadow-md">
            <p>No new notifications</p>
          </Card>
        )}
      </div>
    </div>
  );
};

export { NotificationBell, NotificationPage };
