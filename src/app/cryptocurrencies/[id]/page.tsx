'use client';

import {getCryptocurrencyDetails} from '@/services/coin-gecko';
import {useEffect, useState} from 'react';
import {useParams} from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Heatmap from "@/components/heatmap";

export default function CryptocurrencyDetailPage() {
  const [cryptoDetails, setCryptoDetails] = useState(null);
  const params = useParams();
  const {id} = params;

  useEffect(() => {
    const fetchCryptoDetails = async () => {
      if (typeof id === 'string') {
        try {
          const data = await getCryptocurrencyDetails(id);
          setCryptoDetails(data);
        } catch (error) {
          console.error("Failed to fetch cryptocurrency details:", error);
        }
      }
    };

    fetchCryptoDetails();
  }, [id]);

  if (!cryptoDetails) {
    return <div>Loading...</div>;
  }

  // Generate sample heatmap data (replace with actual data)
  const heatmapData = Array.from({length: 7}, (_, i) => ({
    name: `Day ${i + 1}`,
    data: Array.from({length: 24}, (_, j) => ({
      time: `${j}:00`,
      value: Math.floor(Math.random() * 100), // Random value for demonstration
    })),
  }));

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>{cryptoDetails.name}</CardTitle>
          <CardDescription>{cryptoDetails.symbol.toUpperCase()}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{cryptoDetails.description}</p>
          {/* Display historical prices or other details here */}
          <Heatmap data={heatmapData} />
        </CardContent>
      </Card>
    </div>
  );
}

