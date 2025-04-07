
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import confetti from 'canvas-confetti';

interface MoodOrbProps {
  mood: number;
  onClick: () => void;
}

const MoodOrb = ({ mood, onClick }: MoodOrbProps) => {
  const [showConfetti, setShowConfetti] = useState(false);

  // Determine mood color based on score (0-1)
  const getMoodColor = (mood: number) => {
    if (mood < 0.3) return 'from-[#ff0077] to-[#ff5555]'; // Negative
    if (mood < 0.7) return 'from-[#ffaa00] to-[#ffcc00]'; // Neutral
    return 'from-[#00ffcc] to-[#00ccff]'; // Positive
  };

  const getMoodEmoji = (mood: number) => {
    if (mood < 0.3) return '😔';
    if (mood < 0.7) return '😐';
    return '😊';
  };

  // Function to trigger confetti effect
  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6, x: 0.8 }
    });
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 2000);
  };

  // Check for confetti trigger from Python backend
  useEffect(() => {
    // This would typically fetch from an API or data file created by Python
    // In a real app, you might use polling or websockets
    const checkForConfetti = async () => {
      try {
        // In a real app, you'd fetch from '/api/confetti-status' or similar
        // For demo, we'll simulate a trigger sometimes
        if (Math.random() < 0.05) { // 5% chance to trigger
          triggerConfetti();
        }
      } catch (error) {
        console.error('Error checking confetti status:', error);
      }
    };

    const interval = setInterval(checkForConfetti, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className={cn(
        "fixed top-8 right-8 w-24 h-24 rounded-full cursor-pointer backdrop-blur-xl z-50",
        "flex items-center justify-center shadow-lg",
        "border border-white/10",
        "bg-gradient-to-br",
        getMoodColor(mood)
      )}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ 
        scale: [1, 1.05, 1],
        opacity: 1 
      }}
      transition={{ 
        scale: {
          repeat: Infinity,
          repeatType: "reverse",
          duration: 2
        },
        opacity: {
          duration: 0.5
        }
      }}
      whileHover={{ 
        scale: 1.1,
        boxShadow: `0 0 20px ${mood < 0.3 ? '#ff0077' : mood < 0.7 ? '#ffaa00' : '#00ffcc'}` 
      }}
      onClick={() => {
        onClick();
        if (showConfetti) triggerConfetti();
      }}
    >
      <span className="text-3xl">{getMoodEmoji(mood)}</span>
      <motion.div 
        className="absolute inset-0 rounded-full opacity-20 bg-white"
        animate={{
          scale: [0.8, 1.2, 0.8],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.div>
  );
};

export default MoodOrb;
