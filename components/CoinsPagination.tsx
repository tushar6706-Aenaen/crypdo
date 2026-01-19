'use client';

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { buildPageNumbers, cn, ELLIPSIS } from "@/lib/utils";

interface CoinsPaginationProps {
    currentPage: number;
    totalPages: number;
    hasMorePages: boolean;
}

const CoinsPagination = ({ currentPage, totalPages, hasMorePages }: CoinsPaginationProps) => {
    const pageNumbers = buildPageNumbers(currentPage, totalPages);

    // Disable next if we're on the last page or no more pages available
    const isNextDisabled = !hasMorePages;
    
    // Disable previous if we're on the first page
    const isPrevDisabled = currentPage <= 1;

    return (
        <Pagination id="coins-pagination">
            <PaginationContent className="pagination-content">
                <PaginationItem className="pagination-control prev">
                    <PaginationPrevious
                        href={!isPrevDisabled ? `/coins?page=${currentPage - 1}` : '#'}
                        className={cn('control-button', {
                            'control-disabled': isPrevDisabled,
                            'pointer-events-none opacity-50': isPrevDisabled
                        })}
                        aria-disabled={isPrevDisabled}
                    />
                </PaginationItem>

                <div className="pagination-pages">
                    {pageNumbers.map((page, index) => (
                        <PaginationItem key={`${page}-${index}`}>
                            {page === ELLIPSIS ? (
                                <span className="ellipsis">...</span>
                            ) : (
                                <PaginationLink
                                    href={`/coins?page=${page}`}
                                    className={cn('page-link', {
                                        'page-link-active': currentPage === page
                                    })}
                                    aria-current={currentPage === page ? 'page' : undefined}
                                >
                                    {page}
                                </PaginationLink>
                            )}
                        </PaginationItem>
                    ))}
                </div>

                <PaginationItem className="pagination-control next">
                    <PaginationNext
                        href={!isNextDisabled ? `/coins?page=${currentPage + 1}` : '#'}
                        className={cn('control-button', {
                            'control-disabled': isNextDisabled,
                            'pointer-events-none opacity-50': isNextDisabled
                        })}
                        aria-disabled={isNextDisabled}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}

export default CoinsPagination