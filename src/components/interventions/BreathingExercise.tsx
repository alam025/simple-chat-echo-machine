
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

interface BreathingExerciseProps {
  onComplete: () => void;
}

const BreathingExercise = ({ onComplete }: BreathingExerciseProps) => {
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [count, setCount] = useState(4);
  const [cycles, setCycles] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (!isActive) return;

    const timer = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount <= 1) {
          // Move to next phase
          if (phase === 'inhale') {
            setPhase('hold');
            return 7; // Hold for 7 seconds
          } else if (phase === 'hold') {
            setPhase('exhale');
            return 8; // Exhale for 8 seconds
          } else {
            setPhase('inhale');
            setCycles(prev => prev + 1);
            return 4; // Inhale for 4 seconds
          }
        }
        return prevCount - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, phase]);

  useEffect(() => {
    if (cycles >= 3) {
      // Exercise complete after 3 cycles
      setIsActive(false);
      toast({
        title: "Exercise Complete!",
        description: "Great job! Your resilience score has increased.",
      });
      onComplete();
    }
  }, [cycles, onComplete, toast]);

  const startExercise = () => {
    setIsActive(true);
    setPhase('inhale');
    setCount(4);
    setCycles(0);
  };

  const getInstructions = () => {
    switch (phase) {
      case 'inhale':
        return 'Breathe in slowly';
      case 'hold':
        return 'Hold your breath';
      case 'exhale':
        return 'Breathe out slowly';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h3 className="text-xl font-semibold text-white mb-6">Breathing Exercise</h3>
      
      {!isActive ? (
        <div className="text-center">
          <p className="text-white/70 mb-4">Take a moment to breathe and calm your mind with this simple 4-7-8 breathing technique.</p>
          <Button onClick={startExercise} className="bg-[#00ffcc] hover:bg-[#00ffcc]/80 text-[#1a1a2e]">
            Begin Exercise
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <div className="relative mb-8">
            <motion.div 
              className="w-40 h-40 rounded-full border-2 border-[#00ffcc] flex items-center justify-center"
              animate={{
                scale: phase === 'inhale' ? [1, 1.2] : phase === 'exhale' ? [1.2, 1] : 1.2,
              }}
              transition={{
                duration: phase === 'inhale' ? 4 : phase === 'exhale' ? 8 : 0,
                ease: "easeInOut"
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={phase}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="text-center"
                >
                  <p className="text-white font-medium">{getInstructions()}</p>
                  <p className="text-4xl font-bold text-[#00ffcc]">{count}</p>
                </motion.div>
              </AnimatePresence>
            </motion.div>
            
            <motion.div
              className="absolute inset-0 rounded-full border border-[#00ffcc]/30"
              animate={{ 
                scale: [1, 1.4, 1],
                opacity: [0.1, 0.3, 0.1]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity,
                repeatType: "loop"
              }}
            />
          </div>
          
          <p className="text-white/70 mb-2">Cycle: {cycles + 1} / 3</p>
        </div>
      )}
    </div>
  );
};

export default BreathingExercise;
