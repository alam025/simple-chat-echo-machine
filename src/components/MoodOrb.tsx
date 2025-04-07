
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface MoodOrbProps {
  mood: number;
  onClick: () => void;
}

const MoodOrb = ({ mood, onClick }: MoodOrbProps) => {
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
      onClick={onClick}
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
