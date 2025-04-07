
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import confetti from 'canvas-confetti';

interface GratitudePromptProps {
  onComplete: () => void;
}

const GratitudePrompt = ({ onComplete }: GratitudePromptProps) => {
  const [entries, setEntries] = useState<string[]>(['', '', '']);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (value: string, index: number) => {
    const newEntries = [...entries];
    newEntries[index] = value;
    setEntries(newEntries);
  };

  const handleContinue = () => {
    if (currentIndex < 2) {
      setCurrentIndex(prevIndex => prevIndex + 1);
    } else {
      // All three gratitude items completed
      triggerConfetti();
      setIsComplete(true);
      toast({
        title: "Gratitude Practice Complete!",
        description: "Great job! Your resilience score has increased.",
      });
      
      // Store in localStorage
      const savedEntries = JSON.parse(localStorage.getItem('gratitudeEntries') || '[]');
      localStorage.setItem('gratitudeEntries', JSON.stringify([
        ...savedEntries,
        {
          date: new Date().toISOString(),
          entries: entries
        }
      ]));
      
      setTimeout(onComplete, 2000);
    }
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const isButtonDisabled = entries[currentIndex].trim().length < 3;

  return (
    <div className="flex flex-col items-center p-4">
      <h3 className="text-xl font-semibold text-white mb-6">Gratitude Practice</h3>
      
      <AnimatePresence mode="wait">
        {!isComplete ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-md"
          >
            <p className="text-white/70 mb-4">
              What are you grateful for today? Taking a moment to reflect on gratitude can shift your perspective.
            </p>
            
            <div className="mb-6">
              <p className="text-white mb-2">
                I am grateful for{" "}
                <span className="text-[#ffaa00]">
                  {currentIndex + 1}/{entries.length}
                </span>
              </p>
              
              <div className="flex gap-2">
                <Input
                  value={entries[currentIndex]}
                  onChange={(e) => handleInputChange(e.target.value, currentIndex)}
                  placeholder="Something meaningful to you..."
                  className="bg-white/5 border-white/10 text-white"
                  autoFocus
                />
                
                <Button
                  onClick={handleContinue}
                  disabled={isButtonDisabled}
                  className="bg-[#ffaa00] hover:bg-[#ffaa00]/80 text-[#1a1a2e]"
                >
                  {currentIndex < 2 ? "Next" : "Complete"}
                </Button>
              </div>
            </div>
            
            <div className="flex justify-center gap-2 mt-4">
              {entries.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-2 w-8 rounded-full ${
                    idx === currentIndex 
                      ? "bg-[#ffaa00]" 
                      : idx < currentIndex 
                        ? "bg-[#ffaa00]/50" 
                        : "bg-white/20"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="complete"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <p className="text-2xl text-[#ffaa00] mb-4">✨ Beautiful! ✨</p>
            <p className="text-white/70">
              Gratitude helps build resilience and positive emotions.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GratitudePrompt;
