import React, { useState } from 'react';

const ChatInput = ({ ws }) => {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (message.trim() && ws && ws.readyState === WebSocket.OPEN) {
      ws.send(message);
      setMessage('');
    }
  };

  return (
    <div className="flex items-center p-4 bg-gray-200 border-t">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
        className="flex-1 p-2 border rounded-lg"
        placeholder="Type a message..."
      />
      <button
        onClick={handleSendMessage}
        className="ml-2 p-2 bg-blue-500 text-white rounded-lg"
      >
        Send
      </button>
    </div>
  );
};

export default ChatInput;
