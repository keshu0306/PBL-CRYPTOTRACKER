"use client";

import React from 'react';

interface SparklineChartProps {
  data: number[];
  color: "emerald" | "rose" | "blue" | "violet" | "amber" | "gray" | "zinc" | "neutral" | "stone";
}

export const SparklineChart: React.FC<SparklineChartProps> = ({ data, color }) => {
  return (
    <div>
      {/* Placeholder for Sparkline Chart */}
      Sparkline Chart Here
    </div>
  );
};

