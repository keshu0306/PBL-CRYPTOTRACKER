'use client';

import React from 'react';

interface HeatmapData {
  name: string;
  data: { time: string; value: number }[];
}

interface HeatmapProps {
  data: HeatmapData[];
}

const Heatmap: React.FC<HeatmapProps> = ({data}) => {
  return (
    <div>
      <h2>Price Fluctuation Heatmap (7 Days)</h2>
      <div className="grid grid-cols-7 gap-2">
        {data.map((dayData) => (
          <div key={dayData.name}>
            <h3>{dayData.name}</h3>
            <div className="flex flex-col">
              {dayData.data.map((hourData) => (
                <div
                  key={`${dayData.name}-${hourData.time}`}
                  className="w-6 h-6 rounded-sm"
                  style={{
                    backgroundColor: `hsl(120, ${hourData.value}%, 50%)`,
                  }}
                ></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Heatmap;
