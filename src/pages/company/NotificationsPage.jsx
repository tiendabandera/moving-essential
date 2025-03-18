import MyNotificationsTable from "@/components/MyNotificationsTable";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);

  const { createCompanyInstance } = useAuth();
  const company = createCompanyInstance({});

  useEffect(() => {
    const fetchNotifications = async () => {
      const notifications = await company.getAllNotifications();
      setNotifications(notifications.data);
    };

    fetchNotifications();
  }, []);

  return (
    <div>
      <h2 className="text-2xl mb-4 font-normal">Notifications</h2>
      <div className="shadow-xs bg-background rounded-lg p-5">
        <MyNotificationsTable notifications={notifications} />
      </div>
    </div>
  );
};

export default NotificationsPage;
