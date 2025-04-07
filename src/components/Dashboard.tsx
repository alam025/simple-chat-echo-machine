
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import MoodChart from '@/components/MoodChart';
import GroupPulseMap from '@/components/GroupPulseMap';
import InterventionCards from '@/components/InterventionCards';

interface DashboardProps {
  isOpen: boolean;
  onClose: () => void;
  moodData: Array<{
    timestamp: number;
    value: number;
    trigger?: string;
  }>;
  groupData: Array<{
    id: number;
    mood: number;
    region: string;
  }>;
  resilience: number;
}

const Dashboard = ({ isOpen, onClose, moodData, groupData, resilience }: DashboardProps) => {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        className="bg-[#1a1a2e]/90 backdrop-blur-xl border-l border-white/10 p-0 overflow-y-auto"
        side="right"
      >
        <SheetHeader className="p-6 border-b border-white/10">
          <SheetTitle className="text-2xl text-white">MindSphere Dashboard</SheetTitle>
        </SheetHeader>

        <div className="p-6 space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
              <span className="bg-gradient-to-r from-[#00ffcc] to-[#00ccff] h-6 w-1 mr-2 rounded"></span>
              Your Mood Trends
            </h2>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <MoodChart data={moodData} />
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
              <span className="bg-gradient-to-r from-[#ff0077] to-[#ff5555] h-6 w-1 mr-2 rounded"></span>
              Resilience Score: {resilience}
            </h2>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <InterventionCards />
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
              <span className="bg-gradient-to-r from-[#ffaa00] to-[#ffcc00] h-6 w-1 mr-2 rounded"></span>
              Group Mood Pulse
            </h2>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 h-[300px]">
              <GroupPulseMap data={groupData} />
            </div>
          </section>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Dashboard;
