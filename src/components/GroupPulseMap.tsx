
import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface GroupPulseMapProps {
  data: Array<{
    id: number;
    mood: number;
    region: string;
  }>;
}

const GroupPulseMap = ({ data }: GroupPulseMapProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Calculate group average
  const averageMood = data.reduce((acc, item) => acc + item.mood, 0) / data.length;
  const stressLevel = (1 - averageMood) * 100;
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Resize canvas to fit container
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Animation variables
    let particles: {
      id: number;
      x: number;
      y: number;
      radius: number;
      color: string;
      speedX: number;
      speedY: number;
      pulse: number;
      pulseSpeed: number;
      mood: number;
      region: string;
    }[] = [];
    
    // Initialize particles based on data
    data.forEach(item => {
      const mood = item.mood;
      
      // Color based on mood
      let color = '#ff0077'; // Negative
      if (mood > 0.3) color = '#ffaa00'; // Neutral
      if (mood > 0.7) color = '#00ffcc'; // Positive
      
      particles.push({
        id: item.id,
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: 3 + mood * 4, // Size based on mood
        color,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        pulse: 0,
        pulseSpeed: 0.03 + Math.random() * 0.04,
        mood: item.mood,
        region: item.region
      });
    });
    
    // Add some background particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        id: -i - 1,
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: 0.5 + Math.random(),
        color: '#ffffff',
        speedX: (Math.random() - 0.5) * 0.2,
        speedY: (Math.random() - 0.5) * 0.2,
        pulse: 0,
        pulseSpeed: 0.01 + Math.random() * 0.01,
        mood: 0,
        region: ''
      });
    }
    
    // Draw and animate particles
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw particles
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(
          p.x,
          p.y,
          p.radius * (1 + Math.sin(p.pulse) * 0.3),
          0,
          Math.PI * 2
        );
        
        // Glow effect
        if (p.id >= 0) { // Only for mood particles, not background stars
          const gradient = ctx.createRadialGradient(
            p.x,
            p.y,
            0,
            p.x,
            p.y,
            p.radius * 2
          );
          gradient.addColorStop(0, p.color);
          gradient.addColorStop(1, 'transparent');
          
          ctx.fillStyle = gradient;
          ctx.fill();
        }
        
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.id < 0 ? 0.5 : 0.8; // Background stars are dimmer
        ctx.fill();
        ctx.globalAlpha = 1;
        
        // Update position
        p.x += p.speedX;
        p.y += p.speedY;
        
        // Bounce off edges
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
        
        // Update pulse
        p.pulse += p.pulseSpeed;
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [data]);
  
  return (
    <div className="relative h-full w-full">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 rounded-lg"
      />
      <div className="absolute bottom-2 left-2 p-3 bg-[#1a1a2e]/70 backdrop-blur-sm rounded-lg border border-white/10">
        <p className="text-sm font-semibold">
          Group Stress Level: <span className="text-[#ff0077]">{stressLevel.toFixed(0)}%</span>
        </p>
        {stressLevel > 30 && (
          <motion.div 
            className="mt-2 text-xs bg-[#ff0077]/20 p-2 rounded border border-[#ff0077]/30"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            Group stress detected — try a shared positivity challenge!
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default GroupPulseMap;
