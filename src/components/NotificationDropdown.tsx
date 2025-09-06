import React, { useState, useEffect } from 'react';
import { getNotifications, markNotificationAsRead } from '../api';

interface Notification {
  id: number;
  message: string;
  date: string;
  read: boolean;
}

interface NotificationDropdownProps {
  onClose: () => void;
}

const NotificationDropdown: React.FC<NotificationDropdownProps> = ({ onClose }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        // TODO: Replace with live API call when available
        // const response = await fetch('/api/notifications', {
        //   method: 'GET',
        //   headers: {
        //     'Content-Type': 'application/json',
        //     'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        //   }
        // });
        // const data = await response.json();
        // if (response.ok) {
        //   setNotifications(data.notifications);
        // } else {
        //   console.error('Failed to fetch notifications:', data.error);
        // }
        
        // Using mock API for now
        const response = await getNotifications();
        if (response.success) {
          setNotifications(response.notifications);
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const handleMarkAsRead = async (notificationId: number) => {
    try {
      // TODO: Replace with live API call when available
      // const response = await fetch(`/api/notifications/${notificationId}/read`, {
      //   method: 'PATCH',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      //   }
      // });
      // if (!response.ok) {
      //   const data = await response.json();
      //   console.error('Failed to mark notification as read:', data.error);
      //   return;
      // }
      
      // Using mock API for now
      await markNotificationAsRead(notificationId);
      setNotifications(prev =>
        prev.map(notif =>
          notif.id === notificationId ? { ...notif, read: true } : notif
        )
      );
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  return (
    <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
      <div className="py-1 max-h-96 overflow-y-auto">
        <div className="px-4 py-2 text-sm font-medium text-gray-900 border-b border-gray-100">
          Notifications
        </div>
        {isLoading ? (
          <div className="px-4 py-3 text-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600 mx-auto"></div>
          </div>
        ) : notifications.length > 0 ? (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 ${
                !notification.read ? 'bg-blue-50' : ''
              }`}
              onClick={() => handleMarkAsRead(notification.id)}
            >
              <p className="text-sm text-gray-900">{notification.message}</p>
              <p className="text-xs text-gray-500 mt-1">{notification.date}</p>
              {!notification.read && (
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              )}
            </div>
          ))
        ) : (
          <div className="px-4 py-3 text-sm text-gray-500 text-center">
            No notifications
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationDropdown;