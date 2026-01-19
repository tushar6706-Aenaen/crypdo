'use server';

import qs from 'query-string';

const BASE_URL = process.env.COINGECKO_BASE_URL;
const API_KEY = process.env.COINGECKO_API_KEY;

if (!BASE_URL) throw new Error('Could not get base url');
if (!API_KEY) throw new Error('Could not get api key');

// Simple in-memory cache
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 60 * 1000; // 1 minute in milliseconds

// Rate limiting: track last request time
let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL = 1200; // 1.2 seconds between requests (50 requests/minute)

async function rateLimitedFetch(url: string, options: RequestInit) {
  const now = Date.now();
  const timeSinceLastRequest = now - lastRequestTime;
  
  if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
    const waitTime = MIN_REQUEST_INTERVAL - timeSinceLastRequest;
    await new Promise(resolve => setTimeout(resolve, waitTime));
  }
  
  lastRequestTime = Date.now();
  return fetch(url, options);
}

export async function fetcher<T>(
  endpoint: string,
  params?: QueryParams,
  revalidate = 60,
): Promise<T> {
  const url = qs.stringifyUrl(
    {
      url: `${BASE_URL}/${endpoint}`,
      query: params,
    },
    { skipEmptyString: true, skipNull: true },
  );

  // Check cache first
  const cached = cache.get(url);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    console.log('Returning cached data for:', endpoint);
    return cached.data as T;
  }

  try {
    const response = await rateLimitedFetch(url, {
      headers: {
        'x-cg-pro-api-key': API_KEY,
        'Content-Type': 'application/json',
      } as Record<string, string>,
      next: { revalidate },
    });

    if (!response.ok) {
      const errorBody: CoinGeckoErrorBody = await response.json().catch(() => ({}));

      // Handle rate limiting specifically
      if (response.status === 429) {
        const retryAfter = response.headers.get('Retry-After');
        const waitTime = retryAfter ? parseInt(retryAfter) * 1000 : 5000;
        
        console.warn(`Rate limited. Waiting ${waitTime}ms before retry...`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
        
        // Retry once after waiting
        return fetcher<T>(endpoint, params, revalidate);
      }

      throw new Error(`API Error: ${response.status}: ${errorBody.error || response.statusText}`);
    }

    const data = await response.json();
    
    // Store in cache
    cache.set(url, { data, timestamp: Date.now() });
    
    return data;
  } catch (error) {
    // If we have cached data, return it even if expired
    if (cached) {
      console.warn('API error, returning stale cached data:', error);
      return cached.data as T;
    }
    throw error;
  }
}

export async function getPools(
  id: string,
  network?: string | null,
  contractAddress?: string | null,
): Promise<PoolData> {
  const fallback: PoolData = {
    id: '',
    address: '',
    name: '',
    network: '',
  };

  if (network && contractAddress) {
    try {
      const poolData = await fetcher<{ data: PoolData[] }>(
        `/onchain/networks/${network}/tokens/${contractAddress}/pools`,
      );

      return poolData.data?.[0] ?? fallback;
    } catch (error) {
      console.log(error);
      return fallback;
    }
  }

  try {
    const poolData = await fetcher<{ data: PoolData[] }>('/onchain/search/pools', { query: id });

    return poolData.data?.[0] ?? fallback;
  } catch {
    return fallback;
  }
}