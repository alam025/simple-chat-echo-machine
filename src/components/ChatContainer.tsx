
import React, { useState, useRef, useEffect } from 'react';
import ChatMessage, { ChatMessageProps } from './ChatMessage';
import ChatInput from './ChatInput';

const ChatContainer = () => {
  const [messages, setMessages] = useState<ChatMessageProps[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const addMessage = (content: string, isUser: boolean) => {
    const newMessage = {
      content,
      isUser,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSendMessage = (message: string) => {
    // Add user message
    addMessage(message, true);
    
    // Echo the message back after a delay
    setTimeout(() => {
      addMessage(message, false);
    }, 1000);
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {messages.map((msg, index) => (
          <ChatMessage
            key={index}
            content={msg.content}
            isUser={msg.isUser}
            timestamp={msg.timestamp}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatContainer;
