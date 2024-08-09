import React from 'react';

interface Props {
  title: string,
  message: string
}

export const Notification = (props: Props) => {
  return (
    <div className="toastNotification">
      <h3 className="toastNotificationTitle">{props.title}</h3>
      <span className="toastNotificationContent">{props.message}</span>
    </div>
  )
}
