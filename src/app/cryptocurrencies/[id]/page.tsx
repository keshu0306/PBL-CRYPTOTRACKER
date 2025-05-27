
'use client';

import { getCryptocurrencyDetails, type CryptocurrencyDetails } from '@/services/coin-gecko';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import HistoricalPriceChart from "@/components/historical-price-chart";
import { Skeleton } from "@/components/ui/skeleton"; // For loading state
import { Badge } from "@/components/ui/badge"; // For displaying symbol

export default function CryptocurrencyDetailPage() {
  const [cryptoDetails, setCryptoDetails] = useState<CryptocurrencyDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const id = params.id as string; // Assuming id is always a string

  useEffect(() => {
    const fetchCryptoDetails = async () => {
      if (!id) return;
      setIsLoading(true);
      setError(null);
      try {
        const data = await getCryptocurrencyDetails(id);
        if (data) {
          setCryptoDetails(data);
        } else {
          setError("Failed to fetch cryptocurrency details. The coin might not exist or there was a network issue.");
        }
      } catch (err) {
        console.error("Error in fetchCryptoDetails:", err);
        setError("An unexpected error occurred while fetching data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCryptoDetails();
  }, [id]);

  if (isLoading) {
    return (
      <div className="container mx-auto py-10">
        <Card className="shadow-lg">
          <CardHeader>
            <Skeleton className="h-8 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/4" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-6 w-full mb-4" />
            <Skeleton className="h-6 w-full mb-4" />
            <Skeleton className="h-64 w-full" /> {/* Placeholder for chart */}
          </CardContent>
           <CardFooter className="text-sm text-muted-foreground">
            <Skeleton className="h-4 w-1/2" />
          </CardFooter>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-10 text-center">
        <Card className="shadow-lg p-6 bg-destructive/10 border-destructive">
          <CardTitle className="text-destructive">Error</CardTitle>
          <CardDescription className="text-destructive-foreground">{error}</CardDescription>
        </Card>
      </div>
    );
  }

  if (!cryptoDetails) {
    return <div className="container mx-auto py-10 text-center text-muted-foreground">No data available for this cryptocurrency.</div>;
  }
  
  // Sanitize HTML content from description
  const cleanDescription = cryptoDetails.description.en.replace(/<a href/g, '<a target="_blank" rel="noopener noreferrer" href');


  return (
    <div className="container mx-auto py-10">
      <Card className="shadow-lg rounded-xl overflow-hidden">
        <CardHeader className="bg-card/50 p-6">
          <div className="flex items-center space-x-4">
            {cryptoDetails.image?.large && (
              <img src={cryptoDetails.image.large} alt={cryptoDetails.name} className="w-16 h-16 rounded-full shadow-md" />
            )}
            <div>
              <CardTitle className="text-3xl font-bold flex items-center">
                {cryptoDetails.name}
                <Badge variant="secondary" className="ml-3 text-lg px-3 py-1 rounded-md">
                  {cryptoDetails.symbol.toUpperCase()}
                </Badge>
              </CardTitle>
              <CardDescription className="text-lg text-muted-foreground">
                {`Current Price: $${cryptoDetails.market_data.current_price.usd.toLocaleString()}`}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Price Chart (7 Days)</h3>
            {cryptoDetails.prices && cryptoDetails.prices.length > 0 ? (
              <HistoricalPriceChart data={cryptoDetails.prices} name={cryptoDetails.name} />
            ) : (
              <p className="text-muted-foreground">Price chart data is not available.</p>
            )}
          </div>

          {cryptoDetails.description?.en && (
            <div>
              <h3 className="text-xl font-semibold mb-2">About {cryptoDetails.name}</h3>
              <div 
                className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground leading-relaxed" 
                dangerouslySetInnerHTML={{ __html: cleanDescription }} 
              />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="bg-secondary/50 p-4 rounded-lg shadow">
              <h4 className="font-semibold text-foreground/80 mb-1">Market Cap</h4>
              <p className="text-foreground">${cryptoDetails.market_data.market_cap.usd.toLocaleString()}</p>
            </div>
            <div className="bg-secondary/50 p-4 rounded-lg shadow">
              <h4 className="font-semibold text-foreground/80 mb-1">Total Volume (24h)</h4>
              <p className="text-foreground">${cryptoDetails.market_data.total_volume.usd.toLocaleString()}</p>
            </div>
             <div className="bg-secondary/50 p-4 rounded-lg shadow">
              <h4 className="font-semibold text-foreground/80 mb-1">24h Price Change</h4>
              <p className={`${cryptoDetails.market_data.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {cryptoDetails.market_data.price_change_percentage_24h.toFixed(2)}%
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="text-xs text-muted-foreground p-4 bg-card/50 border-t border-border">
          Data provided by CoinGecko. Updated periodically.
        </CardFooter>
      </Card>
    </div>
  );
}
