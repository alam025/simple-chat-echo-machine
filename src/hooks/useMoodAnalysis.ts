
import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { MockContentSample } from '@/lib/mockDataGenerator';

interface MoodDataPoint {
  timestamp: number;
  value: number;
  trigger?: string;
}

export const useMoodAnalysis = (mockData: { contentSamples: MockContentSample[] }) => {
  const [currentMood, setCurrentMood] = useState(0.7); // Start with a neutral-positive mood
  const [moodHistory, setMoodHistory] = useState<MoodDataPoint[]>([
    { timestamp: Date.now() - 60000 * 30, value: 0.7 }, // 30 min ago
    { timestamp: Date.now() - 60000 * 20, value: 0.65 }, // 20 min ago
    { timestamp: Date.now() - 60000 * 10, value: 0.7 }, // 10 min ago
  ]);
  const [resilience, setResilience] = useState(() => {
    // Try to get resilience from localStorage or start at 20
    const stored = localStorage.getItem('mindSphereResilience');
    return stored ? parseInt(stored, 10) : 20;
  });
  const [negativeContentCount, setNegativeContentCount] = useState(0);
  
  const { toast } = useToast();
  
  // Save resilience to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('mindSphereResilience', resilience.toString());
  }, [resilience]);
  
  // Analyze content and update mood
  const analyzeContent = useCallback((content: MockContentSample) => {
    const { sentiment, text, source } = content;
    
    // Update mood based on content sentiment
    // Current mood is influenced by content but doesn't change drastically
    setCurrentMood(prevMood => {
      const newMood = prevMood * 0.7 + sentiment * 0.3;
      return newMood;
    });
    
    // Add to mood history
    setMoodHistory(prev => [
      ...prev,
      { 
        timestamp: Date.now(),
        value: sentiment,
        trigger: `${source}: ${text.substring(0, 30)}${text.length > 30 ? '...' : ''}`
      }
    ]);
    
    // Track consecutive negative content
    if (sentiment < 0.3) {
      setNegativeContentCount(prev => prev + 1);
      
      // Show notification after 3 negative items
      if (negativeContentCount >= 2) {
        toast({
          title: "Content Detox Suggested",
          description: "You've been consuming heavy content. Consider a quick break?",
        });
        setNegativeContentCount(0);
      }
    } else {
      setNegativeContentCount(0);
    }
    
    return sentiment;
  }, [negativeContentCount, toast]);
  
  // Increase resilience score
  const increaseResilience = useCallback((points: number) => {
    setResilience(prev => Math.min(prev + points, 100));
  }, []);
  
  // Simulate initial content
  useEffect(() => {
    // Analyze a random content sample on load
    if (mockData.contentSamples.length > 0) {
      const randomSample = mockData.contentSamples[
        Math.floor(Math.random() * mockData.contentSamples.length)
      ];
      analyzeContent(randomSample);
    }
  }, [mockData.contentSamples, analyzeContent]);
  
  return {
    currentMood,
    moodHistory,
    resilience,
    analyzeContent,
    increaseResilience
  };
};
