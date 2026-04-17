import Link from 'next/link'
import type { Dictionary } from '@/i18n'

interface KeyInsightsProps {
  dict: Dictionary
  lang: string
}

const icons = ['🔴', '⚡', '📉', '💰', '🛡️']

const linkClass = 'font-medium text-[#0E7490] underline decoration-dotted hover:text-[#0F172A]'

function buildInsights(dict: Dictionary, lang: string) {
  const items = dict.insights.items
  return [
    {
      icon: icons[0],
      text: (
        <>
          {items[0].split(/rafinaci|refining/i).length === 2 ? (
            <>
              {items[0].split(/rafinaci|refining/i)[0]}
              <Link href={`/${lang}/supply-chain`} className={linkClass}>
                {items[0].match(/rafinaci|refining/i)?.[0] ?? (lang === 'cs' ? 'rafinaci' : 'refining')}
              </Link>
              {items[0].split(/rafinaci|refining/i)[1]}
            </>
          ) : (
            items[0]
          )}
        </>
      ),
    },
    {
      icon: icons[1],
      text: (
        <>
          <Link href={`/${lang}/demand`} className={linkClass}>
            {lang === 'cs' ? 'Poptávka' : 'Demand'}
          </Link>
          {' '}{items[1].split(/^Poptávka |^Demand /i)[1] ?? items[1].replace(/^Poptávka |^Demand /i, '')}
        </>
      ),
    },
    {
      icon: icons[2],
      text: <>{items[2]}</>,
    },
    {
      icon: icons[3],
      text: (
        <>
          {items[3].split(/ceně|price/i).length === 2 ? (
            <>
              {items[3].split(/ceně|price/i)[0]}
              <Link href={`/${lang}/prices`} className={linkClass}>
                {items[3].match(/ceně|price/i)?.[0] ?? (lang === 'cs' ? 'ceně' : 'price')}
              </Link>
              {items[3].split(/ceně|price/i)[1]}
            </>
          ) : (
            items[3]
          )}
        </>
      ),
    },
    {
      icon: icons[4],
      text: (
        <>
          {items[4].split(/Exportní kontroly Číny|China's export controls/i).length === 2 ? (
            <>
              {items[4].split(/Exportní kontroly Číny|China's export controls/i)[0]}
              <Link href={`/${lang}/geopolitics`} className={linkClass}>
                {items[4].match(/Exportní kontroly Číny|China's export controls/i)?.[0] ?? (lang === 'cs' ? 'Exportní kontroly Číny' : "China's export controls")}
              </Link>
              {items[4].split(/Exportní kontroly Číny|China's export controls/i)[1]}
            </>
          ) : (
            items[4]
          )}
        </>
      ),
    },
  ]
}

export default function KeyInsights({ dict, lang }: KeyInsightsProps) {
  const insights = buildInsights(dict, lang)

  return (
    <div>
      <h3 className="mb-4 text-lg font-bold text-[#0F172A]">
        {dict.insights.title}
      </h3>
      <div className="space-y-4">
        {insights.map((insight, i) => (
          <div
            key={i}
            className="flex gap-3 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-4 transition-colors hover:bg-[#F1F5F9]"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <span className="shrink-0 text-lg">{insight.icon}</span>
            <p className="text-sm leading-relaxed text-[#334155]">{insight.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
