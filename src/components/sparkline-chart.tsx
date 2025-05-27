
"use client";

import React from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface SparklineChartProps {
  data: number[];
  color: "green" | "red";
}

export const SparklineChart: React.FC<SparklineChartProps> = ({ data, color }) => {
  if (!data || data.length === 0) {
    return <div style={{ width: '100px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="text-xs text-muted-foreground">N/A</div>;
  }

  // Convert number[] to { name: number, value: number }[] for Recharts
  const chartData = data.map((value, index) => ({ name: index, value }));

  // Determine stroke color based on the 'color' prop
  const strokeColor = color === 'green' ? '#10B981' : '#EF4444'; // Tailwind green-500 and red-500 hex codes

  return (
    <div style={{ width: '100px', height: '40px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <Line
            type="monotone"
            dataKey="value"
            stroke={strokeColor}
            strokeWidth={2}
            dot={false} // No dots on the line for a cleaner sparkline
            isAnimationActive={false} // Disable animation for performance with many charts
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
