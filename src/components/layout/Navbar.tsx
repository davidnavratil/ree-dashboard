'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/', label: 'Přehled' },
  { href: '/elements', label: 'Prvky' },
  { href: '/prices', label: 'Ceny' },
  { href: '/supply-chain', label: 'Řetězec' },
  { href: '/geopolitics', label: 'Geopolitika' },
  { href: '/demand', label: 'Poptávka' },
  { href: '/czech', label: 'Česko' },
  { href: '/scenarios', label: 'Scénáře' },
  { href: '/pribeh', label: 'Příběh' },
  { href: '/about', label: 'O projektu' },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="sticky top-0 z-50 border-b border-[#E2E8F0] bg-white/95 backdrop-blur py-4">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 overflow-x-auto scrollbar-hide text-sm">
          {navItems.map((item, i) => {
            const isActive = pathname === item.href
            return (
              <span key={item.href} className="flex shrink-0 items-center gap-4">
                {i > 0 && <span className="text-[#E2E8F0]">|</span>}
                <Link
                  href={item.href}
                  className={`transition-colors ${
                    isActive
                      ? 'font-semibold text-[#0E7490]'
                      : 'text-[#64748B] hover:text-[#0F172A]'
                  }`}
                >
                  {item.label}
                </Link>
              </span>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
