'use client'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Header = () => {
    const pathname = usePathname();
    return (
        <div className=' py-2 md:py-4 mx-auto px-2 sm:px-4 max-w-360 w-full  flex justify-between items-center border-b ' >
            <Link href={'/'} >
                <Image src="logo.svg" alt='logo' width={132} height={40} />
            </Link>
            <nav className='flex h-full items-center' >
                <Link href="/" className={cn('px-6 py-5 flex items-center transition-all hover:text-white font-medium h-full text-purple-100 cursor-pointer', {
                    'text-white': pathname === '/',
                    'max-sm:hidden': true
                })}>Home</Link>
                <p>Search Modal</p>
                <Link href="/coins" className={cn('px-6 py-5 flex items-center transition-all hover:text-white font-medium h-full text-purple-100 cursor-pointer', {
                    'text-white': pathname === '/coins',
                    
                })}>All Coins</Link>
            </nav>
        </div>
    )
}

export default Header
