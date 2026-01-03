'use server'

import qs from 'query-string'

const BASE_URL = process.env.COINGECKO_BASE_URL
const API_KEY = process.env.COINGECKO_API_KEY

if (!BASE_URL) {
  throw new Error('COINGECKO_API_BASE_URL is not defined')
}
if (!API_KEY) {
  throw new Error('COINGECKO_API_KEY is not defined')
}

export async function fetcher<T>(
  endpoint: string,
  params?: QueryParams,
  revalidate = 60
): Promise<T> {
  const url = qs.stringifyUrl(
    {
      url: `${BASE_URL}/${endpoint}`,
      query: params,
    },
    { skipEmptyString: true, skipNull: true }
  )
  const repsonse = await fetch(url, {
    headers: {
      'x-cg-pro-api-key': API_KEY,
      'Content-Type': 'application/json',
    } as Record<string, string>,
    next: {
      revalidate,
    },
  })

  if (!repsonse.ok) {
    const errorBody: CoinGeckoErrorBody = await repsonse.json().catch(() => ({}))

    throw new Error(`Error ${repsonse.status} : ${errorBody.error || repsonse.statusText}`)
  }
  return repsonse.json()
}
