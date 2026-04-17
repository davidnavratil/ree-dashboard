'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { Dictionary } from '@/i18n'

interface NavbarProps {
  dict: Dictionary
  lang: string
}

export default function Navbar({ dict, lang }: NavbarProps) {
  const pathname = usePathname()

  const navItems = [
    { href: `/${lang}`, label: dict.nav.overview },
    { href: `/${lang}/elements`, label: dict.nav.elements },
    { href: `/${lang}/prices`, label: dict.nav.prices },
    { href: `/${lang}/supply-chain`, label: dict.nav.supplyChain },
    { href: `/${lang}/geopolitics`, label: dict.nav.geopolitics },
    { href: `/${lang}/demand`, label: dict.nav.demand },
    { href: `/${lang}/czech`, label: dict.nav.czech },
    { href: `/${lang}/scenarios`, label: dict.nav.scenarios },
    { href: `/${lang}/pribeh`, label: dict.nav.story },
    { href: `/${lang}/about`, label: dict.nav.about },
  ]

  const otherLang = lang === 'cs' ? 'en' : 'cs'
  const switchHref = pathname.replace(`/${lang}`, `/${otherLang}`)

  return (
    <nav className="sticky top-0 z-50 border-b border-[#E0DCD4] bg-white/95 backdrop-blur py-4">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 overflow-x-auto scrollbar-hide text-sm">
          <a
            href={`https://davidnavratil.com/${lang === 'en' ? 'en/' : ''}`}
            className="flex shrink-0 items-center gap-1.5 text-[#736D64] hover:text-[#111111] transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            <span className="hidden sm:inline">davidnavratil.com</span>
          </a>
          <span className="text-[#E0DCD4]">|</span>
          {navItems.map((item, i) => {
            const isActive = pathname === item.href
            return (
              <span key={item.href} className="flex shrink-0 items-center gap-4">
                {i > 0 && <span className="text-[#E0DCD4]">|</span>}
                <Link
                  href={item.href}
                  className={`transition-colors ${
                    isActive
                      ? 'font-semibold text-[#0E7490]'
                      : 'text-[#736D64] hover:text-[#111111]'
                  }`}
                >
                  {item.label}
                </Link>
              </span>
            )
          })}
          <span className="text-[#E0DCD4]">|</span>
          <Link
            href={switchHref}
            className="shrink-0 font-semibold text-[#0E7490] hover:text-[#111111] transition-colors"
          >
            {dict.nav.langSwitch}
          </Link>
        </div>
      </div>
    </nav>
  )
}
