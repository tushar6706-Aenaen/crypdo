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
