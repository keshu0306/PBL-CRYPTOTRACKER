
/**
 * Represents a cryptocurrency.
 */
export interface Cryptocurrency {
  /**
   * The ID of the cryptocurrency.
   */
  id: string;
  /**
   * The symbol of the cryptocurrency (e.g., BTC).
   */
  symbol: string;
  /**
   * The name of the cryptocurrency (e.g., Bitcoin).
   */
  name: string;
  /**
   * The current price of the cryptocurrency in USD.
   */
  currentPrice: number;
  /**
   * URL for the cryptocurrency image.
   */
  image: string;
   /**
   * Price change percentage in 24 hours.
   */
  priceChangePercentage24h: number;
   /**
   * Price change percentage in 1 hour.
   */
  priceChangePercentage1hInCurrency: number;
  /**
   * Price change percentage in 7 days.
   */
  priceChangePercentage7dInCurrency: number;
   /**
   * Market Cap.
   */
  marketCap: number;
    /**
   * Volume in 24 hours.
   */
  volume24h: number;
  /**
   * 7-day sparkline data.
   */
  sparklineIn7d?: { price: number[] };
}

/**
 * Asynchronously retrieves a list of top cryptocurrencies from the CoinGecko API.
 *
 * @returns A promise that resolves to an array of Cryptocurrency objects.
 */
export async function getTopCryptocurrencies(): Promise<Cryptocurrency[]> {
  const url =
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true&price_change_percentage=1h,7d';

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    return data.map((item: any) => ({
      id: item.id,
      symbol: item.symbol,
      name: item.name,
      currentPrice: item.current_price,
      image: item.image,
      priceChangePercentage24h: item.price_change_percentage_24h,
      priceChangePercentage1hInCurrency: item.price_change_percentage_1h_in_currency,
      priceChangePercentage7dInCurrency: item.price_change_percentage_7d_in_currency,
      marketCap: item.market_cap,
      volume24h: item.total_volume,
      sparklineIn7d: item.sparkline_in_7d,
    }));
  } catch (error) {
    console.error('Failed to fetch cryptocurrencies:', error);
    return [];
  }
}

/**
 * Represents detailed information about a cryptocurrency.
 */
export interface CryptocurrencyDetails {
  id: string;
  symbol: string;
  name: string;
  description: { en: string };
  image: { large: string };
  market_data: {
    current_price: { usd: number };
    market_cap: { usd: number };
    total_volume: { usd: number };
    price_change_percentage_24h: number;
    // Add other fields as needed from the API response
  };
  // Historical data for the chart [timestamp, price]
  prices: Array<[number, number]>;
}

/**
 * Asynchronously retrieves detailed information for a specific cryptocurrency,
 * including its 7-day historical price data.
 *
 * @param id The ID of the cryptocurrency to retrieve.
 * @returns A promise that resolves to a CryptocurrencyDetails object or null if an error occurs.
 */
export async function getCryptocurrencyDetails(id: string): Promise<CryptocurrencyDetails | null> {
  const detailUrl = `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`;
  const chartUrl = `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7&interval=daily`;

  try {
    const [detailResponse, chartResponse] = await Promise.all([
      fetch(detailUrl),
      fetch(chartUrl),
    ]);

    if (!detailResponse.ok) {
      throw new Error(`HTTP error! status: ${detailResponse.status} for details`);
    }
    if (!chartResponse.ok) {
      throw new Error(`HTTP error! status: ${chartResponse.status} for chart`);
    }

    const detailData = await detailResponse.json();
    const chartData = await chartResponse.json();

    return {
      id: detailData.id,
      symbol: detailData.symbol,
      name: detailData.name,
      description: detailData.description,
      image: detailData.image,
      market_data: detailData.market_data,
      prices: chartData.prices,
    };
  } catch (error) {
    console.error(`Failed to fetch cryptocurrency details for ${id}:`, error);
    return null;
  }
}
