
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface ContentDetoxProps {
  onComplete: () => void;
}

const ContentDetox = ({ onComplete }: ContentDetoxProps) => {
  const [selectedContent, setSelectedContent] = useState<string | null>(null);
  const { toast } = useToast();

  const handleContentSelection = (content: string) => {
    setSelectedContent(content);
    toast({
      title: "Great Choice!",
      description: "Taking a break with positive content can shift your mood.",
    });
    setTimeout(onComplete, 1500);
  };

  const contentOptions = [
    {
      title: "Funny Videos",
      description: "Take a quick laugh break with curated funny clips.",
      icon: "😂",
      color: "from-[#00ffcc] to-[#00ccff]"
    },
    {
      title: "Inspiring Stories",
      description: "Read uplifting stories about resilience and hope.",
      icon: "✨",
      color: "from-[#ffaa00] to-[#ffcc00]"
    },
    {
      title: "Nature Scenes",
      description: "Take a visual break with beautiful nature photography.",
      icon: "🌿",
      color: "from-[#00cc88] to-[#00aa44]"
    },
    {
      title: "Music Break",
      description: "Listen to mood-boosting playlists curated for you.",
      icon: "🎵",
      color: "from-[#ff0077] to-[#ff5555]"
    }
  ];

  return (
    <div className="flex flex-col items-center p-2">
      <h3 className="text-xl font-semibold text-white mb-4">Content Detox</h3>
      
      <p className="text-white/70 mb-4 text-sm">
        You've been consuming heavy content lately. Take a break with something uplifting:
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
        {contentOptions.map((option, index) => (
          <motion.div
            key={option.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <Card 
              className="bg-white/5 backdrop-blur-sm border-white/10 h-full cursor-pointer hover:border-white/25"
              onClick={() => handleContentSelection(option.title)}
            >
              <CardHeader className="py-3 px-3 flex flex-row items-center gap-2">
                <div className={`h-8 w-8 rounded-full bg-gradient-to-br ${option.color} flex items-center justify-center text-lg shrink-0`}>
                  {option.icon}
                </div>
                <CardTitle className="text-white text-base">{option.title}</CardTitle>
              </CardHeader>
              <CardContent className="py-2 px-3">
                <p className="text-white/70 text-xs">{option.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ContentDetox;
