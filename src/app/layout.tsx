'use client'
import './globals.css'
import {Inter} from 'next/font/google'
import {Navbar} from '@/components/Navbar'
import {MetamaskProvider} from '@hooks/useMetamask'
import Wallet from '@components/Wallet'

const inter = Inter({subsets: ['latin']})

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MetamaskProvider>
          <Navbar />
          <Wallet />
          {children}
        </MetamaskProvider>
      </body>
    </html>
  )
}
