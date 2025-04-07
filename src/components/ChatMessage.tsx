
import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export interface ChatMessageProps {
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatMessage = ({ content, isUser, timestamp }: ChatMessageProps) => {
  return (
    <motion.div
      className={cn(
        "flex mb-4",
        isUser ? "justify-end" : "justify-start"
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className={cn(
          "max-w-[80%] px-4 py-2 rounded-lg",
          isUser 
            ? "bg-primary text-primary-foreground rounded-br-none" 
            : "bg-blue-100 text-gray-800 rounded-bl-none"
        )}
      >
        <p className="break-words">{content}</p>
        <p className={cn(
          "text-xs mt-1",
          isUser ? "text-blue-100" : "text-gray-500"
        )}>
          {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </motion.div>
  );
};

export default ChatMessage;
