'use client'

import {getTopCryptocurrencies} from '@/services/coin-gecko';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {useEffect, useState} from 'react';

export default function Home() {
  const [cryptocurrencies, setCryptocurrencies] = useState([]);

  useEffect(() => {
    const fetchCryptocurrencies = async () => {
      const data = await getTopCryptocurrencies();
      setCryptocurrencies(data);
    };

    fetchCryptocurrencies();
  }, []);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-5">Top Cryptocurrencies</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cryptocurrencies.map((crypto) => (
          <Card key={crypto.id}>
            <CardHeader>
              <CardTitle>{crypto.name}</CardTitle>
              <CardDescription>{crypto.symbol.toUpperCase()}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Current Price: ${crypto.currentPrice}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
