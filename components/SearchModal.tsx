'use client'
import { cn } from '@/lib/utils'
import { Search, X } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'

interface SearchModalProps {
    isOpen: boolean
    onClose: () => void
}

const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
    const [searchQuery, setSearchQuery] = useState('')
    const inputRef = useRef<HTMLInputElement>(null)
    const modalRef = useRef<HTMLDivElement>(null)

    // Focus input when modal opens
    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus()
        }
    }, [isOpen])

    // Handle ESC key to close
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onClose()
            }
        }

        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [isOpen, onClose])

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => {
            document.body.style.overflow = ''
        }
    }, [isOpen])

    // Handle click outside to close
    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose()
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // TODO: Implement search functionality
        console.log('Search for:', searchQuery)
    }

    if (!isOpen) return null

    return (
        <div
            className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-32"
            role="dialog"
            aria-modal="true"
            aria-labelledby="search-modal-title"
            onClick={handleBackdropClick}
        >
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" aria-hidden="true" />

            {/* Modal */}
            <div
                ref={modalRef}
                className={cn(
                    "relative z-10 w-full max-w-xl mx-4",
                    "bg-dark-500 border border-purple-600/30 rounded-lg shadow-2xl",
                    "transform transition-all"
                )}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-dark-400">
                    <h2 id="search-modal-title" className="text-sm font-medium text-purple-100">
                        Search Coins
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-1 rounded-md text-purple-100 hover:text-white hover:bg-dark-400 transition-colors"
                        aria-label="Close search"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Search Form */}
                <form onSubmit={handleSubmit} className="p-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-100" aria-hidden="true" />
                        <input
                            ref={inputRef}
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search for a cryptocurrency..."
                            className={cn(
                                "w-full pl-10 pr-4 py-3 rounded-lg",
                                "bg-dark-700 border border-dark-400",
                                "text-white placeholder:text-purple-100/60",
                                "focus:outline-none focus:ring-2 focus:ring-purple-600/50 focus:border-purple-600/50",
                                "transition-colors"
                            )}
                            aria-label="Search input"
                        />
                    </div>

                    {/* Keyboard shortcut hint */}
                    <div className="mt-3 flex items-center justify-between text-xs text-purple-100/60">
                        <span>Type to search</span>
                        <span className="flex items-center gap-1">
                            <kbd className="px-1.5 py-0.5 rounded bg-dark-400 text-purple-100">ESC</kbd>
                            <span>to close</span>
                        </span>
                    </div>
                </form>

                {/* Results area - placeholder for future implementation */}
                {searchQuery && (
                    <div className="px-4 pb-4">
                        <div className="text-sm text-purple-100/60 text-center py-8">
                            Search results will appear here
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default SearchModal
