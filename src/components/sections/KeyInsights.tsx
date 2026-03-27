import Link from 'next/link'

const insights = [
  {
    icon: '🔴',
    text: (
      <>
        Čína kontroluje 69 % těžby, ale 91–98 % zpracování vzácných zemin — skutečná závislost leží
        v <Link href="/supply-chain" className="font-medium text-[#0E7490] underline decoration-dotted hover:text-[#0F172A]">rafinaci</Link>, ne v dolech.
      </>
    ),
  },
  {
    icon: '⚡',
    text: (
      <>
        <Link href="/demand" className="font-medium text-[#0E7490] underline decoration-dotted hover:text-[#0F172A]">Poptávka</Link> po
        magnetických vzácných zeminách (<Link href="/elements" className="font-medium text-[#0E7490] underline decoration-dotted hover:text-[#0F172A]">neodym, dysprosium</Link>)
        poroste o 7–13 % ročně díky elektromobilitě a větrné energii.
      </>
    ),
  },
  {
    icon: '📉',
    text: (
      <>
        Od roku 2026 se očekává strukturální deficit — nabídka mimo Čínu nestíhá růst poptávky.
      </>
    ),
  },
  {
    icon: '💰',
    text: (
      <>
        Vzácné zeminy nejsou cenový problém. I trojnásobné zdražení přidá méně než 1 % k <Link href="/prices" className="font-medium text-[#0E7490] underline decoration-dotted hover:text-[#0F172A]">ceně</Link> elektromobilu.
      </>
    ),
  },
  {
    icon: '🛡️',
    text: (
      <>
        Hlavní riziko je dostupnost, ne cena. <Link href="/geopolitics" className="font-medium text-[#0E7490] underline decoration-dotted hover:text-[#0F172A]">Exportní kontroly Číny</Link> z roku 2025
        mohou zastavit dodávky do Evropy.
      </>
    ),
  },
]

export default function KeyInsights() {
  return (
    <div>
      <h3 className="mb-4 text-lg font-bold text-[#0F172A]">
        Klíčová zjištění
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
