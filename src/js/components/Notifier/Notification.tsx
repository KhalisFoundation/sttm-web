import React from 'react';

interface INotificationProps {
  title: string,
  message: string
}

export const Notification: React.FC<INotificationProps> = ({
  title,
  message
}) => {
  return (
    <div className="toastNotification">
      <h3 className="toastNotificationTitle">{title}</h3>
      <span className="toastNotificationContent">{message}</span>
    </div>
  )
}
