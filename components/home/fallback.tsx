import DataTable from '../DataTable'

export function CoinOverviewFallback() {
  return (
    <div id="coin-overview-fallback">
      <div className="header pt-2">
        <div className="skeleton header-image" />
        <div className="info">
          <div className="skeleton header-line-sm" />
          <div className="skeleton header-line-lg" />
        </div>
      </div>
    </div>
  )
}

export function TrendingCoinsFallback() {
  const skeletonColumns: DataTableColumn<{ id: number }>[] = [
    {
      header: 'Name',
      cellClassName: 'name-cell',
      cell: () => (
        <div className="name-link">
          <div className="skeleton name-image" />
          <div className="skeleton name-line" />
        </div>
      ),
    },
    {
      header: '24h Change',
      cellClassName: 'change-cell',
      cell: () => (
        <div className="price-change">
          <div className="skeleton change-icon" />
          <div className="skeleton change-line" />
        </div>
      ),
    },
    {
      header: 'Price',
      cellClassName: 'price-cell',
      cell: () => <div className="skeleton price-line" />,
    },
  ]

  const skeletonData = Array.from({ length: 6 }, (_, i) => ({ id: i }))

  return (
    <div id="trending-coins-fallback">
      <h4>Trending Coins</h4>
      <DataTable
        columns={skeletonColumns}
        data={skeletonData}
        rowKey={(row) => row.id}
        tableClassName="trending-coins-table"
        headerCellClassName="!py-3"
        bodyCellClassName="!py-2"
      />
    </div>
  )
}

export function CategoriesFallback() {
  const skeletonColumns: DataTableColumn<{ id: number }>[] = [
    {
      header: 'Category Name',
      cellClassName: 'category-cell',
      cell: () => <div className="skeleton category-skeleton" />,
    },
    {
      header: 'Top Gainers',
      cellClassName: 'top-gainers-cell',
      cell: () => (
        <div className="flex gap-1">
          <div className="skeleton coin-skeleton" />
          <div className="skeleton coin-skeleton" />
          <div className="skeleton coin-skeleton" />
        </div>
      ),
    },
    {
      header: '24h Change',
      cellClassName: 'change-header-cell',
      cell: () => (
        <div className="flex items-center gap-2">
          <div className="skeleton change-icon" />
          <div className="skeleton value-skeleton-sm" />
        </div>
      ),
    },
    {
      header: 'Market Cap',
      cellClassName: 'market-cap-cell',
      cell: () => <div className="skeleton value-skeleton-lg" />,
    },
    {
      header: '24h Volume',
      cellClassName: 'volume-cell',
      cell: () => <div className="skeleton value-skeleton-md" />,
    },
  ]

  const skeletonData = Array.from({ length: 10 }, (_, i) => ({ id: i }))

  return (
    <div id="categories" className="custom-scrollbar">
      <h4>Top Categories</h4>
      <DataTable
        columns={skeletonColumns}
        data={skeletonData}
        rowKey={(row) => row.id}
        tableClassName="mt-3"
      />
    </div>
  )
}
