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
}

/**
 * Asynchronously retrieves a list of top cryptocurrencies from the CoinGecko API.
 *
 * @returns A promise that resolves to an array of Cryptocurrency objects.
 */
export async function getTopCryptocurrencies(): Promise<Cryptocurrency[]> {
  const url =
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false';

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    // Map the API response to the Cryptocurrency interface
    return data.map((item: any) => ({
      id: item.id,
      symbol: item.symbol,
      name: item.name,
      currentPrice: item.current_price,
      image: item.image,
      priceChangePercentage24h: item.price_change_percentage_24h,
    }));
  } catch (error) {
    console.error('Failed to fetch cryptocurrencies:', error);
    return []; // Return an empty array in case of an error
  }
}

/**
 * Represents detailed information about a cryptocurrency.
 */
export interface CryptocurrencyDetails {
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
   * Description of the cryptocurrency. 
   */
  description: string;
  /**
   * An array of historical price data points.
   */
  historicalPrices: { time: string; price: number }[];
}

/**
 * Asynchronously retrieves detailed information for a specific cryptocurrency.
 *
 * @param id The ID of the cryptocurrency to retrieve.
 * @returns A promise that resolves to a CryptocurrencyDetails object.
 */
export async function getCryptocurrencyDetails(
  id: string
): Promise<CryptocurrencyDetails> {
  // TODO: Implement this by calling an API.

  return {
    id: 'bitcoin',
    symbol: 'btc',
    name: 'Bitcoin',
    description: 'Bitcoin is a cryptocurrency.',
    historicalPrices: [
      { time: '2024-01-01', price: 40000 },
      { time: '2024-01-02', price: 41000 },
    ],
  };
}
