import { Navbar } from '@/components/navbar'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from "@/components/ui/toaster"
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Customer Product Demo',
  description: 'Take home interview problem, create a demo page to perform CRUD operations on a list of customers and their products.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className='flex flex-col md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-16 bg-slate-50 min-h-screen'>
          <Navbar />
          {children}
          <Analytics />
        </div>
        <Toaster />
      </body>
    </html>
  )
}
