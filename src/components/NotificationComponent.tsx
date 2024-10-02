// NotificationComponent.tsx
import React, { useEffect, useState } from 'react';
import * as signalR from '@microsoft/signalr';

const NotificationComponent = () => {
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5258/notificationHub')
      .withAutomaticReconnect()
      .build();

    connection
      .start()
      .then(() => {
        console.log('Connected to SignalR hub');
      })
      .catch((err) => console.error('Error connecting to SignalR hub:', err));

    connection.on('ReceiveCreateNotification', (employeeName: string) => {
      setMessage(`Employee ${employeeName} has been created.`);
    });

    connection.on('ReceiveUpdateNotification', (employeeName: string) => {
      setMessage(`Employee ${employeeName} has been updated.`);
    });

    connection.on('ReceiveDeleteNotification', (employeeName: string) => {
      setMessage(`EmployeeId ${employeeName} has been deleted.`);
    });

    return () => {
      connection.stop();
    };
  }, []);

  return (
    <div className="card mt-4 mb-4 p-3">
      <h2>Real-Time Notifications</h2>
      {message && <p>{message}</p>}
    </div>
  );
};

export default NotificationComponent;
