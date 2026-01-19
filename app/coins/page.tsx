import CoinsPagination from '@/components/CoinsPagination';
import DataTable from '@/components/DataTable'
import { fetcher } from '@/lib/coingecko.actions'
import { cn, formatCurrency, formatPercentage } from '@/lib/utils';
import { TrendingDown, TrendingUp } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const page = async ({ searchParams }: NextPageProps) => {
    const { page } = await searchParams;
    const currentPage = Number(page) || 1;
    const perPage = 10;

    let coinsData: CoinMarketData[] = [];
    let error = null;

    try {
        // Increase revalidate time to 5 minutes (300 seconds) to reduce API calls
        coinsData  = await fetcher<CoinMarketData[]>('/coins/markets', {
            vs_currency: 'usd',
            order: 'market_cap_desc',
            per_page: perPage,
            page: currentPage,
            sparkline: false,
        }, 300); // 5 minutes cache
    } catch (err) {
        error = err instanceof Error ? err.message : 'Failed to fetch coins';
        console.error('Error fetching coins:', error);
    }

    const columns: DataTableColumn<any>[] = [
        {
            header: 'Rank',
            cellClassName: 'rank-cell',
            cell: (coin) => (
                <>
                    #{coin.market_cap_rank}
                </>
            ),
        },
        {
            header: 'Token',
            cellClassName: 'token-cell',
            cell: (coin) => (
                <Link href={`/coins/${coin.id}`} className="token-link">
                    <Image
                        src={coin.image}
                        alt={coin.name}
                        width={32}
                        height={32}
                        className="token-image"
                    />
                    <div className="token-info">
                        <span className="token-name">{coin.name}</span>
                        <span className="token-symbol">{coin.symbol.toUpperCase()}</span>
                    </div>
                </Link>
            ),
        },
        {
            header: 'Price',
            cellClassName: 'price-cell',
            cell: (coin) => formatCurrency(coin.current_price),
        },
        {
            header: '24h Change',
            cellClassName: 'change-cell',
            cell: (coin) => {
                const isTrendingUp = coin.price_change_percentage_24h > 0;
                return (
                    <div
                        className={cn('change-wrapper', {
                            'change-up': isTrendingUp,
                            'change-down': !isTrendingUp,
                        })}
                    >
                        {isTrendingUp ? (
                            <TrendingUp className="change-icon" />
                        ) : (
                            <TrendingDown className="change-icon" />
                        )}
                        {formatPercentage(coin.price_change_percentage_24h)}
                    </div>
                )
            }
        },
        {
            header: 'Market Cap',
            cellClassName: 'market-cap-cell',
            cell: (coin) => formatCurrency(coin.market_cap),
        }
    ];

    const hasMorePages = coinsData.length === perPage;
    const estimatedTotalPages = hasMorePages ? currentPage + 10 : currentPage;

    return (
        <main id='coins-page'>

        <div className="content">
            <h1 className="coins-title">All Coins</h1>

            {error && (
                <div className="error-message" style={{
                    padding: '1rem',
                    marginBottom: '1rem',
                    background: '#fee',
                    border: '1px solid #fcc',
                    borderRadius: '4px',
                    color: '#c00'
                }}>
                    <strong>Error:</strong> {error}. Please try refreshing the page.
                </div>
            )}

            {coinsData.length > 0 ? (
                <>
                    <DataTable
                        data={coinsData}
                        columns={columns}
                        rowKey={(coin) => coin.id}
                        tableClassName="coins-table"
                        />
                    <CoinsPagination
                        currentPage={currentPage}
                        totalPages={estimatedTotalPages}
                        hasMorePages={hasMorePages}
                        />
                </>
            ) : !error ? (
                <div className="loading-message">Loading coins...</div>
            ) : null}
        </div>
                        </main>
    )
}

export default page