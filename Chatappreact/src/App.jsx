import React, { useState, useEffect } from 'react';
import ChatWindow from './components/ChatWindow';
import ChatInput from './components/ChatInput';

const App = () => {
  const [ws, setWs] = useState(null);

  useEffect(() => {
    // Initialize WebSocket connection
    const socket = new WebSocket('ws://localhost:8080');

    // Define WebSocket event handlers
    socket.onopen = () => {
      console.log('WebSocket connection established');
    };

    socket.onmessage = (event) => {
      console.log('Message received from server:', event.data);
    };

    socket.onclose = (event) => {
      console.log('WebSocket connection closed:', event.reason);
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    setWs(socket);

    // Cleanup WebSocket connection on component unmount
    return () => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.close();
      }
    };
  }, []); // Empty dependency array to establish connection once

  return (
    <div className="flex flex-col h-screen">
      <ChatWindow ws={ws} />
      <ChatInput ws={ws} />
    </div>
  );
};

export default App;
