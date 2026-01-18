import { fetcher } from '@/lib/coingecko.actions';
import DataTable from '../DataTable';
import Image from 'next/image';
import { TrendingDown, TrendingUp } from 'lucide-react';
import { cn, formatPercentage } from '@/lib/utils';

const Categories = async () => {
    const Categories = await fetcher<Category[]>('/coins/categories');

    const columns: DataTableColumn<Category>[] = [
        {
            header: 'Category Name',
            cellClassName: 'category-cell',
             cell: (category) => category.name
        },
        {
            header: 'Top Gainers',
            cellClassName: 'top-gainers-cell',
            cell: (category) => category.top_3_coins?.map((coin) => (
                <Image
                    key={coin}    
                    src={coin} // Placeholder image URL
                    alt={coin}
                    width={24}
                    height={24}
                />
            )) ?? <span className="text-gray-500">-</span>
        },
        {
            header : "24h Change",
            cellClassName: 'change-header-cell',
            cell: (category) => {
                const isTrandingUp = category.market_cap_change_24h > 0;

                return (
                    <div className={cn('change-cell', isTrandingUp ? 'text-green-500' : 'text-red-500')}>
                        <p className='flex items-center gap-2'>
                            {isTrandingUp ? (
                                <TrendingUp width={16} height={16} />
                            ) : (
                                <TrendingDown width={16} height={16} />
                            )}
                            {formatPercentage(category.market_cap_change_24h)}
                        </p>
                    </div>
                )
            },
                
        },
        {
            header: 'Market Cap',
            cellClassName: 'market-cap-cell',
            cell: (category) => `$${category.market_cap.toLocaleString()}`
        },
        {
            header: '24h Volume',
            cellClassName: 'volume-cell',
            cell: (category) => `$${category.volume_24h.toLocaleString()}`
        }
    ]

    return (
        <div id='categories' className='custom-scrollbar'>
            <h4>Top Categories</h4>
            <DataTable
                columns={columns}
                data={Categories.slice(0, 10) || []}
                rowKey={(_, index) => index}
                tableClassName='mt-3'
            />
        </div>
    )
}

export default Categories
