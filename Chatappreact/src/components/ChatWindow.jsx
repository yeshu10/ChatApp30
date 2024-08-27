import React, { useEffect, useState } from 'react';

const ChatWindow = ({ ws }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!ws) return;

    const handleMessage = (event) => {
      const { data } = event;

      if (data instanceof Blob) {
        // Convert Blob to text
        data.text().then((text) => {
          console.log('Message received from WebSocket:', text);
          setMessages((prevMessages) => [...prevMessages, text]);
        });
      } else {
        console.log('Message received from WebSocket:', data);
        setMessages((prevMessages) => [...prevMessages, data]);
      }
    };

    ws.addEventListener('message', handleMessage);

    return () => {
      ws.removeEventListener('message', handleMessage);
    };
  }, [ws]);

  return (
    <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
      <div className="flex flex-col space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className="bg-white p-3 rounded-lg shadow-md">
            {msg}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatWindow;
 