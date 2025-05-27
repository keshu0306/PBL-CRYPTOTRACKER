
'use client';

import {getTopCryptocurrencies, type Cryptocurrency} from '@/services/coin-gecko';
import {useEffect, useState, useCallback} from 'react';
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
import {Button} from "@/components/ui/button";
import {RedoIcon} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import {Grid} from "lucide-react";

export default function CryptocurrenciesPage() {
  const [cryptocurrencies, setCryptocurrencies] = useState<Cryptocurrency[]>([]);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const fetchCryptocurrencies = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getTopCryptocurrencies();
      setCryptocurrencies(data);
    } catch (error) {
      console.error("Failed to fetch cryptocurrencies:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCryptocurrencies();
    const intervalId = setInterval(fetchCryptocurrencies, 60000);
    return () => clearInterval(intervalId);
  }, [fetchCryptocurrencies]);

  const handleRowClick = (id: string) => {
    router.push(`/cryptocurrencies/${id}`);
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-3xl font-bold">Today's Crypto Prices by Market Cap</h1>
        <Button onClick={fetchCryptocurrencies} disabled={isLoading}  className="rounded-full hover:bg-yellow-500 hover:text-gray-900">
          {isLoading ? (
            <>
              <RedoIcon className="mr-2 h-4 w-4 animate-spin transition-transform duration-200" />
              Refreshing...
            </>
          ) : (
            <>
              <RedoIcon className="mr-2 h-4 w-4 transition-transform duration-200 group-hover:rotate-90" />
              Refresh
            </>
          )}
        </Button>

      </div>
      <p className="text-muted-foreground mb-5">
        The worldwide cryptocurrency market capitalization today stands at an estimated $2.9T, seeing a 0.35% movement over the last 24 hours. The total cryptocurrency trading volume in the past day is roughly $99B. Bitcoin's market dominance is at about 61.4%.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-secondary rounded-lg p-4 transition-transform duration-200 hover:scale-105">
          <h2 className="text-lg font-semibold">Market Cap</h2>
          <p className="text-2xl font-bold">$2,859,030,737,088 <span className="text-green-500">▲ 0.35%</span></p>
        </div>
        <div className="bg-secondary rounded-lg p-4 transition-transform duration-200 hover:scale-105">
          <h2 className="text-lg font-semibold">Volume 24h</h2>
          <p className="text-2xl font-bold">$98,703,859,307 <span className="text-green-500">▲ 35.3%</span></p>
        </div>
        <div className="bg-secondary rounded-lg p-4 transition-transform duration-200 hover:scale-105">
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
              <TableRow 
                key={crypto.id} 
                onClick={() => handleRowClick(crypto.id)} 
                className="cursor-pointer transition-colors duration-200 hover:bg-muted/50"
              >
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2 group">
                    <img src={crypto.image} alt={crypto.name} className="w-6 h-6 rounded-full transition-transform duration-200 group-hover:scale-110"/>
                    <span>{crypto.name} ({crypto.symbol.toUpperCase()})</span>
                  </div>
                </TableCell>
                <TableCell>
                  {crypto.priceChangePercentage1hInCurrency > 0 ? (
                    <span className="text-green-500">▲{crypto.priceChangePercentage1hInCurrency?.toFixed(2)}%</span>
                  ) : (
                    <span className="text-red-500">▼{crypto.priceChangePercentage1hInCurrency?.toFixed(2)}%</span>
                  )}
                </TableCell>
                 <TableCell>
                  {crypto.priceChangePercentage24h > 0 ? (
                    <span className="text-green-500">▲{crypto.priceChangePercentage24h?.toFixed(2)}%</span>
                  ) : (
                    <span className="text-red-500">▼{crypto.priceChangePercentage24h?.toFixed(2)}%</span>
                  )}
                </TableCell>
                 <TableCell>
                  {crypto.priceChangePercentage7dInCurrency > 0 ? (
                    <span className="text-green-500">▲{crypto.priceChangePercentage7dInCurrency?.toFixed(2)}%</span>
                  ) : (
                    <span className="text-red-500">▼{crypto.priceChangePercentage7dInCurrency?.toFixed(2)}%</span>
                  )}
                </TableCell>
                <TableCell>${crypto.currentPrice.toLocaleString()}</TableCell>
                <TableCell>${formatMarketCap(crypto.marketCap)}</TableCell>
                <TableCell>${formatMarketCap(crypto.volume24h)}</TableCell>
                <TableCell>
                  {crypto.sparklineIn7d && crypto.sparklineIn7d.price && crypto.sparklineIn7d.price.length > 0 ? (
                    <SparklineChart
                      data={crypto.sparklineIn7d.price}
                      color={crypto.priceChangePercentage24h > 0 ? "green" : "red"}
                    />
                  ) : (
                    <div style={{ width: '100px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="text-xs text-muted-foreground">N/A</div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
