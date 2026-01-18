import CoinsPagination from '@/components/CoinsPagination';
import DataTable from '@/components/DataTable'
import { fetcher } from '@/lib/coingecko.actions'
import { cn, formatCurrency, formatPercentage } from '@/lib/utils';
import { TrendingDown, TrendingUp } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const page = async () => {
    const coinsData = await fetcher<CoinMarketData[]>('/coins/markets', {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: perPage,
        page: currentPage,
        sparkline: 'false',
        price_change_percentage: '24h',
    });





    const columns: DataTableColumn<CoinMarketData>[] = [
        {
            header: 'Rank',
            cellClassName: 'rank-cell',
            cell: (coin) => (
                <>
                    #{coin.market_cap_rank}
                    <Link href={`/coins/${coin.id}`} aria-label='View coin' />
                </>
            ),
        },
        {
            header: 'Token',
            cellClassName: 'token-cell',
            cell: (coin) => (
                <div className='token-info'>
                    <Image src={coin.image} alt={coin.name} width={36} height={36} />
                    <p>
                        {coin.name} <span className='symbol'>{coin.symbol.toUpperCase()}</span>
                    </p>
                </div>
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
                    <div className={cn('change-cell', isTrendingUp ? 'text-green-500' : 'text-red-500')}>
                        <p className='flex items-center gap-2'>
                            {isTrendingUp ? (
                                <TrendingUp width={16} height={16} />
                            ) : (
                                <TrendingDown width={16} height={16} />
                            )}
                            {formatPercentage(coin.price_change_percentage_24h)}
                        </p>
                    </div>
                )
            }
        },
        {
            header: 'Market Cap',
            cellClassName: 'market-cap-cell',
            cell: (coin) => formatCurrency(coin.market_cap),            
        }


    ]
    return (
        <div className='coins-page'>
            <h4>All Coins</h4>
                <DataTable columns={columns} data={coinsData} rowKey={(coin) => coin.id} tableClassName="coins-table" />
            <CoinsPagination/>            
        </div>
    )
}

export default page
