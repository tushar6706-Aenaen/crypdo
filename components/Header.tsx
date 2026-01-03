'use client'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Header = () => {
  const pathname = usePathname()
  return (
    <div className="mx-auto flex w-full max-w-360 items-center justify-between border-b px-2 py-2 sm:px-4 md:py-4">
      <Link href={'/'}>
        <Image src="/logo.svg" alt="logo" width={132} height={40} />
      </Link>
      <nav className="flex h-full items-center">
        <Link
          href="/"
          className={cn(
            'flex h-full cursor-pointer items-center px-6 py-5 font-medium text-purple-100 transition-all hover:text-white',
            {
              'text-white': pathname === '/',
              'max-sm:hidden': true,
            }
          )}
        >
          Home
        </Link>
        <p>Search Modal</p>
        <Link
          href="/coins"
          className={cn(
            'flex h-full cursor-pointer items-center px-6 py-5 font-medium text-purple-100 transition-all hover:text-white',
            {
              'text-white': pathname === '/coins',
            }
          )}
        >
          All Coins
        </Link>
      </nav>
    </div>
  )
}

export default Header
