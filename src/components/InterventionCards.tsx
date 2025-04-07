
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import BreathingExercise from '@/components/interventions/BreathingExercise';
import GratitudePrompt from '@/components/interventions/GratitudePrompt';
import ContentDetox from '@/components/interventions/ContentDetox';

const InterventionCards = () => {
  const [activeIntervention, setActiveIntervention] = useState<string | null>(null);

  const startIntervention = (type: string) => {
    setActiveIntervention(type);
  };

  const closeIntervention = () => {
    setActiveIntervention(null);
  };

  return (
    <div className="space-y-4">
      <AnimatePresence mode="wait">
        {activeIntervention ? (
          <motion.div
            key="intervention"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-4"
          >
            {activeIntervention === 'breathing' && <BreathingExercise onComplete={closeIntervention} />}
            {activeIntervention === 'gratitude' && <GratitudePrompt onComplete={closeIntervention} />}
            {activeIntervention === 'detox' && <ContentDetox onComplete={closeIntervention} />}
          </motion.div>
        ) : (
          <motion.div
            key="cards"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <InterventionCard
              title="Breathing Exercise"
              description="A 1-minute guided breathing exercise to center yourself."
              icon="🫁"
              onClick={() => startIntervention('breathing')}
              color="from-[#00ffcc] to-[#00ccff]"
            />
            
            <InterventionCard
              title="Gratitude Practice"
              description="Name 3 things you're grateful for right now."
              icon="🙏"
              onClick={() => startIntervention('gratitude')}
              color="from-[#ffaa00] to-[#ffcc00]"
            />
            
            <InterventionCard
              title="Content Detox"
              description="Find uplifting content alternatives."
              icon="🧘"
              onClick={() => startIntervention('detox')}
              color="from-[#ff0077] to-[#ff5555]"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface InterventionCardProps {
  title: string;
  description: string;
  icon: string;
  onClick: () => void;
  color: string;
}

const InterventionCard = ({ title, description, icon, onClick, color }: InterventionCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03, boxShadow: '0 0 15px rgba(0, 255, 204, 0.2)' }}
      transition={{ duration: 0.2 }}
    >
      <Card className="bg-white/5 backdrop-blur-sm border-white/10 h-full flex flex-col">
        <CardHeader className="pb-2">
          <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${color} flex items-center justify-center text-2xl mb-2`}>
            {icon}
          </div>
          <CardTitle className="text-white">{title}</CardTitle>
        </CardHeader>
        <CardContent className="text-white/70 text-sm">
          {description}
        </CardContent>
        <CardFooter className="mt-auto">
          <Button 
            onClick={onClick} 
            variant="outline" 
            className="w-full bg-white/5 hover:bg-white/10 border-white/10 text-white"
          >
            Start
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default InterventionCards;
