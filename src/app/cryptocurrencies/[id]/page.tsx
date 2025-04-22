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
        </CardContent>
      </Card>
    </div>
  );
}
