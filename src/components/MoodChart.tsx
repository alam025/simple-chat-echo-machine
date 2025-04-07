
import React from 'react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Line, LineChart, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

interface MoodChartProps {
  data: Array<{
    timestamp: number;
    value: number;
    trigger?: string;
  }>;
}

const MoodChart = ({ data }: MoodChartProps) => {
  const chartConfig = {
    mood: {
      label: 'Mood',
      theme: {
        light: '#00ffcc',
        dark: '#00ffcc',
      },
    },
  };

  const formattedData = data.map(item => ({
    time: new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    mood: item.value,
    trigger: item.trigger || 'Unknown',
  }));

  return (
    <ChartContainer
      config={chartConfig}
      className="aspect-auto h-[200px] w-full text-white"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={formattedData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
          <XAxis
            dataKey="time"
            stroke="#888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            domain={[0, 1]}
            ticks={[0, 0.25, 0.5, 0.75, 1]}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                return (
                  <div className="rounded-lg border border-white/10 bg-[#1a1a2e] p-2 shadow-md">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="font-semibold text-white">{data.time}</div>
                      <div className="font-semibold text-[#00ffcc]">
                        Mood: {data.mood.toFixed(2)}
                      </div>
                      <div className="col-span-2 text-xs text-white/70">
                        Trigger: {data.trigger}
                      </div>
                    </div>
                  </div>
                );
              }
              return null;
            }}
          />
          <Line
            type="monotone"
            dataKey="mood"
            stroke="#00ffcc"
            strokeWidth={2}
            dot={{ r: 4, fill: '#1a1a2e', strokeWidth: 2 }}
            activeDot={{ r: 6, fill: '#00ffcc' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default MoodChart;
