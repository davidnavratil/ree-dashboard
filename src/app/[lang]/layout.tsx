import type { Metadata } from 'next'
import { Inter, JetBrains_Mono, Fraunces } from 'next/font/google'
import { notFound } from 'next/navigation'
import { getDictionary, hasLocale, locales } from '@/i18n'
import Navbar from '@/components/layout/Navbar'
import BrandFooter from '@/components/layout/BrandFooter'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin', 'latin-ext'],
})

const jetbrains = JetBrains_Mono({
  variable: '--font-jetbrains',
  subsets: ['latin'],
})

const fraunces = Fraunces({
  variable: '--font-fraunces',
  subsets: ['latin', 'latin-ext'],
})

export async function generateStaticParams() {
  return locales.map(lang => ({ lang }))
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  if (!hasLocale(lang)) return {}
  const dict = await getDictionary(lang)

  return {
    title: dict.meta.title,
    description: dict.meta.description,
    metadataBase: new URL('https://davidnavratil.com/analyses/ree-dashboard'),
    alternates: {
      languages: {
        'cs': '/analyses/ree-dashboard/cs',
        'en': '/analyses/ree-dashboard/en',
      },
    },
    openGraph: {
      type: 'website',
      locale: lang === 'cs' ? 'cs_CZ' : 'en_US',
      url: `https://davidnavratil.com/analyses/ree-dashboard/${lang}/`,
      title: dict.meta.ogTitle,
      description: dict.meta.ogDescription,
      images: [{ url: '/analyses/ree-dashboard/og-image.png', width: 1200, height: 630, alt: dict.meta.ogAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.meta.ogTitle,
      description: dict.meta.ogDescription,
      images: ['/analyses/ree-dashboard/og-image.png'],
    },
  }
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()

  const dict = await getDictionary(lang)

  return (
    <html lang={lang} className={`${inter.variable} ${jetbrains.variable} ${fraunces.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: lang === 'cs' ? 'Vzácné zeminy — interaktivní dashboard' : 'Rare Earth Elements — Interactive Dashboard',
              url: `https://davidnavratil.com/analyses/ree-dashboard/${lang}/`,
              description: lang === 'cs'
                ? 'Interaktivní průvodce světem vzácných zemin. Dodavatelské řetězce, geopolitická rizika a dopady na Česko.'
                : 'Interactive guide to rare earth elements. Supply chains, geopolitical risks, and impact on the Czech Republic.',
              applicationCategory: 'DataVisualization',
              author: {
                '@type': 'Person',
                name: 'David Navrátil',
                jobTitle: lang === 'cs' ? 'Hlavní ekonom' : 'Chief Economist',
                worksFor: { '@type': 'Organization', name: 'Česká spořitelna' },
              },
            }),
          }}
        />
        <script async src="https://plausible.io/js/pa-MLceY4sQroqGo9vckgP7U.js"></script>
        <script dangerouslySetInnerHTML={{ __html: `window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)};plausible.init=plausible.init||function(i){plausible.o=i||{}};plausible.init();` }} />
      </head>
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <Navbar dict={dict} lang={lang} />
        <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6">
          {children}
        </main>
        <BrandFooter lang={lang} />
      </body>
    </html>
  )
}
