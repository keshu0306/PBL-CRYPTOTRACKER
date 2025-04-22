'use client';

import {getTopCryptocurrencies} from '@/services/coin-gecko';
import {useEffect, useState} from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {SparklineChart} from "@/components/sparkline-chart";
import {useRouter} from "next/navigation";
import {formatMarketCap} from "@/lib/utils";

export default function CryptocurrenciesPage() {
  const [cryptocurrencies, setCryptocurrencies] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchCryptocurrencies = async () => {
      try {
        const data = await getTopCryptocurrencies();
        setCryptocurrencies(data);
      } catch (error) {
        console.error("Failed to fetch cryptocurrencies:", error);
        // Optionally, display an error message to the user using a toast or alert
      }
    };

    fetchCryptocurrencies();

    // Set up interval to refetch data every, for example, 60 seconds
    const intervalId = setInterval(fetchCryptocurrencies, 60000);

    return () => clearInterval(intervalId); // Clean up interval on unmount
  }, []);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-5">Today's Crypto Prices by Market Cap</h1>
      <p className="text-muted-foreground mb-5">
        The worldwide cryptocurrency market capitalization today stands at an estimated $2.9T, seeing a 0.35% movement over the last 24 hours. The total cryptocurrency trading volume in the past day is roughly $99B. Bitcoin's market dominance is at about 61.4%.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-secondary rounded-lg p-4">
          <h2 className="text-lg font-semibold">Market Cap</h2>
          <p className="text-2xl font-bold">$2,859,030,737,088 <span className="text-green-500">▲ 0.35%</span></p>
        </div>
        <div className="bg-secondary rounded-lg p-4">
          <h2 className="text-lg font-semibold">Volume 24h</h2>
          <p className="text-2xl font-bold">$98,703,859,307 <span className="text-green-500">▲ 35.3%</span></p>
        </div>
        <div className="bg-secondary rounded-lg p-4">
          <h2 className="text-lg font-semibold">BTC Dominance</h2>
          <p className="text-2xl font-bold">61.4% <span className="text-green-500">▲ 0.64%</span></p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableCaption>
            A list of top cryptocurrencies and thier market cap.
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">#</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>1h %</TableHead>
              <TableHead>24h %</TableHead>
              <TableHead>7d %</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Market Cap</TableHead>
              <TableHead>Volume 24h</TableHead>
              <TableHead>Price Graph (7D)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cryptocurrencies.map((crypto, index) => (
              <TableRow key={crypto.id} onClick={() => router.push(`/cryptocurrencies/${crypto.id}`)} className="cursor-pointer">
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <img src={crypto.image} alt={crypto.name} className="w-6 h-6 rounded-full"/>
                    <span>{crypto.name} ({crypto.symbol.toUpperCase()})</span>
                  </div>
                </TableCell>
                <TableCell>
                  {crypto.priceChangePercentage24h > 0 ? (
                    <span className="text-green-500">▲{crypto.priceChangePercentage24h.toFixed(2)}%</span>
                  ) : (
                    <span className="text-red-500">▼{crypto.priceChangePercentage24h.toFixed(2)}%</span>
                  )}
                </TableCell>
                 <TableCell>
                  {crypto.priceChangePercentage24h > 0 ? (
                    <span className="text-green-500">▲{crypto.priceChangePercentage24h.toFixed(2)}%</span>
                  ) : (
                    <span className="text-red-500">▼{crypto.priceChangePercentage24h.toFixed(2)}%</span>
                  )}
                </TableCell>
                 <TableCell>
                  {crypto.priceChangePercentage24h > 0 ? (
                    <span className="text-green-500">▲{crypto.priceChangePercentage24h.toFixed(2)}%</span>
                  ) : (
                    <span className="text-red-500">▼{crypto.priceChangePercentage24h.toFixed(2)}%</span>
                  )}
                </TableCell>
                <TableCell>${crypto.currentPrice}</TableCell>
                <TableCell>${formatMarketCap(crypto.currentPrice * 1000000)}</TableCell>
                <TableCell>${formatMarketCap(crypto.currentPrice * 10000)}</TableCell>
                <TableCell>
                  <SparklineChart data={[10, 30, 40, 20, 50, 60, 40]} color={crypto.priceChangePercentage24h > 0 ? "green" : "red"}/>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
