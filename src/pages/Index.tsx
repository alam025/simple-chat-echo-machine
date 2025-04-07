
import React, { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';
import MoodOrb from '@/components/MoodOrb';
import Dashboard from '@/components/Dashboard';
import { generateMockData } from '@/lib/mockDataGenerator';
import { useMoodAnalysis } from '@/hooks/useMoodAnalysis';

const Index = () => {
  const { toast } = useToast();
  const [dashboardOpen, setDashboardOpen] = useState(false);
  const [mockData, setMockData] = useState(() => generateMockData());
  const { currentMood, moodHistory, resilience, analyzeContent } = useMoodAnalysis(mockData);

  useEffect(() => {
    toast({
      title: "Welcome to MindSphere",
      description: "Your Personal and Global Mental Resilience Hub",
    });

    // Simulate content analysis every 30 seconds
    const interval = setInterval(() => {
      const randomContent = mockData.contentSamples[Math.floor(Math.random() * mockData.contentSamples.length)];
      analyzeContent(randomContent);
    }, 30000);

    return () => clearInterval(interval);
  }, [toast, mockData.contentSamples, analyzeContent]);

  return (
    <div className="min-h-screen flex flex-col bg-[#1a1a2e] text-white p-4 md:py-8 md:px-16 lg:px-32 xl:px-64">
      <motion.div 
        className="text-center mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-[#00ffcc] to-[#ff0077] bg-clip-text text-transparent">MindSphere</h1>
        <p className="text-gray-300">Your Personal and Global Mental Resilience Hub</p>
      </motion.div>
      
      <MoodOrb 
        mood={currentMood}
        onClick={() => setDashboardOpen(true)}
      />
      
      <Dashboard 
        isOpen={dashboardOpen}
        onClose={() => setDashboardOpen(false)}
        moodData={moodHistory}
        groupData={mockData.groupMoodData}
        resilience={resilience}
      />
      
      <div className="text-center text-gray-400 text-sm mt-auto pt-8">
        © {new Date().getFullYear()} MindSphere
      </div>
    </div>
  );
};

export default Index;
