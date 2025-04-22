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
}

/**
 * Asynchronously retrieves a list of top cryptocurrencies.
 *
 * @returns A promise that resolves to an array of Cryptocurrency objects.
 */
export async function getTopCryptocurrencies(): Promise<Cryptocurrency[]> {
  // TODO: Implement this by calling an API.

  return [
    {
      id: 'bitcoin',
      symbol: 'btc',
      name: 'Bitcoin',
      currentPrice: 60000,
    },
    {
      id: 'ethereum',
      symbol: 'eth',
      name: 'Ethereum',
      currentPrice: 3000,
    },
  ];
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
