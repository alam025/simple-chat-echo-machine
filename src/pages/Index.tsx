
import React from 'react';
import ChatContainer from '@/components/ChatContainer';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';

const Index = () => {
  const { toast } = useToast();
  
  React.useEffect(() => {
    toast({
      title: "Welcome to Echo Chat!",
      description: "Type a message and watch it echo back to you.",
    });
  }, [toast]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 p-4 md:py-8 md:px-16 lg:px-32 xl:px-64">
      <motion.div 
        className="text-center mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2 text-primary">Echo Chat</h1>
        <p className="text-gray-600">Send a message and watch it echo back</p>
      </motion.div>
      
      <div className="flex-grow bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
        <ChatContainer />
      </div>
      
      <div className="text-center text-gray-500 text-sm mt-4">
        © {new Date().getFullYear()} Echo Chat
      </div>
    </div>
  );
};

export default Index;
