import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { cn } from '@/lib/utils'

// Note: Ensure your types (DataTableProps) are imported or defined as they were before.

const DataTable = <T,>({
    columns,
    data,
    rowKey,
    tableClassName,
    headerClassName,
    headerRowClassName,
    headerCellClassName,
    bodyRowClassName,
    bodyCellClassName
}: DataTableProps<T>) => {
    return (
        <Table
            className={cn(
                // Table container styling
                'w-full caption-bottom border-separate border-spacing-y-[2px] text-sm',
                tableClassName
            )}
        >
            <TableHeader
                className={cn(
                    // Sticky header with glassmorphism effect
                    'sticky top-0 z-10 bg-zinc-950/80 backdrop-blur-md supports-[backdrop-filter]:bg-zinc-950/60',
                    headerClassName
                )}
            >
                <TableRow
                    className={cn(
                        // Remove default border, add specific hover behavior
                        'border-none hover:bg-transparent',
                        headerRowClassName
                    )}
                >
                    {columns.map((column, index) => (
                        <TableHead
                            key={index}
                            className={cn(
                                // Header Text Styling: Uppercase, tracking, lighter text for contrast
                                'h-12 px-4 text-xs font-semibold tracking-wider text-zinc-400 uppercase first:rounded-l-lg last:rounded-r-lg',
                                headerCellClassName , column.headClassName
                            )}
                        >
                            {column.header}
                        </TableHead>
                    ))}
                </TableRow>
            </TableHeader>

            <TableBody className="bg-transparent">
                {data.map((row, rowIndex) => (
                    <TableRow
                        key={rowKey(row, rowIndex)}
                        className={cn(
                            // Row Styling: Background colors, transitions, and hover effects
                            'group transition-all duration-200 ease-in-out',
                            'bg-zinc-900/40 hover:bg-violet-900/10 hover:shadow-sm',
                            'border-transparent', // Handled by spacing-y instead of border-b
                            bodyRowClassName
                        )}
                    >
                        {columns.map((column, columnIndex) => (
                            <TableCell
                                key={columnIndex}
                                className={cn(
                                    // Cell Styling: Padding and text color
                                    'px-4 py-4 font-medium text-zinc-300',
                                    'transition-colors group-hover:text-violet-100', // Light up text on hover
                                    'first:rounded-l-md last:rounded-r-md', // Rounded row edges
                                    bodyCellClassName , column.cellClassName
                                )}
                            >
                                {column.cell(row, rowIndex)}
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default DataTable
