// NotificationContext.tsx
import React, { createContext, useContext, useState } from "react";

type Notification = {
  id: number;
  type: string;
  message: string;
  time: string;
};

type NotificationContextType = {
  notifications: Notification[];
  addNotification: (type: string, message: string) => void;
};

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([
  ]);

  const addNotification = (type: string, message: string) => {
    setNotifications((prev) => [
      { id: Date.now(), type, message, time: "Just now" },
      ...prev
    ]);
  };

  return (
    <NotificationContext.Provider value={{ notifications, addNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) throw new Error("useNotifications must be used within NotificationProvider");
  return context;
};
