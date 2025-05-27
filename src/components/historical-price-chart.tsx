
'use client';

import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { format } from 'date-fns';

interface HistoricalPriceChartProps {
  data: Array<[number, number]>; // Array of [timestamp, price]
  dataKey?: string; // Optional: if data structure is different
  name?: string; // Name of the dataset (e.g., coin name)
}

const HistoricalPriceChart: React.FC<HistoricalPriceChartProps> = ({ data, dataKey = "price", name }) => {
  if (!data || data.length === 0) {
    return <div className="flex items-center justify-center h-64 text-muted-foreground">No price data available.</div>;
  }

  const formattedData = data.map(([timestamp, price]) => ({
    date: format(new Date(timestamp), 'MMM d, yy'),
    price: price,
  }));

  // Determine if prices are generally going up or down to set line color
  const startPrice = formattedData[0]?.price;
  const endPrice = formattedData[formattedData.length - 1]?.price;
  const lineColor = endPrice >= startPrice ? 'hsl(var(--chart-2))' : 'hsl(var(--chart-5))'; // Greenish for up, Reddish for down

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={formattedData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
        <XAxis 
          dataKey="date" 
          stroke="hsl(var(--foreground))" 
          tick={{ fontSize: 12 }} 
        />
        <YAxis 
          stroke="hsl(var(--foreground))" 
          tick={{ fontSize: 12 }}
          tickFormatter={(value) => `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          domain={['auto', 'auto']}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'hsl(var(--background))',
            borderColor: 'hsl(var(--border))',
            borderRadius: 'var(--radius)',
          }}
          labelStyle={{ color: 'hsl(var(--foreground))' }}
          itemStyle={{ color: lineColor }}
          formatter={(value: number, name: string, props: any) => [`$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, name === 'price' && props.payload.name ? props.payload.name : "Price"]}
        />
        <Legend wrapperStyle={{ color: 'hsl(var(--foreground))' }} />
        <Line
          type="monotone"
          dataKey={dataKey}
          stroke={lineColor}
          strokeWidth={2}
          activeDot={{ r: 8, stroke: 'hsl(var(--background))', strokeWidth: 2 }}
          dot={{ r: 3, fill: lineColor, strokeWidth: 0 }}
          name={name || "Price"}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default HistoricalPriceChart;
