import type { Metadata } from 'next'
import { Inter, JetBrains_Mono, Playfair_Display } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin', 'latin-ext'],
})

const jetbrains = JetBrains_Mono({
  variable: '--font-jetbrains',
  subsets: ['latin'],
})

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin', 'latin-ext'],
})

export const metadata: Metadata = {
  title: 'Vzácné zeminy — Strategická analýza',
  description: 'Interaktivní dashboard strategické analýzy vzácných zemin (REE) pro Českou spořitelnu.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="cs" className={`${inter.variable} ${jetbrains.variable} ${playfair.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-white text-[#0F172A]">
        <Navbar />
        <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
