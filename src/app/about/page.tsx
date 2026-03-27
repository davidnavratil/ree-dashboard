import PageHeader from '@/components/layout/PageHeader'

export default function AboutPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="O projektu"
        subtitle="Kdo stojí za analýzou, odkud pocházejí data a jakou metodologií byla zpracována."
      />

      {/* Author Card */}
      <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-6 sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-[#0E7490] text-2xl font-bold text-white">
            DN
          </div>
          <div>
            <a
              href="https://www.linkedin.com/in/david-navratil/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl font-bold text-[#0F172A] transition-colors hover:text-[#0E7490]"
            >
              David Navrátil
            </a>
            <p className="mt-1 text-sm font-medium text-[#475569]">
              Hlavní ekonom České spořitelny
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[#334155]">
              Tato interaktivní analýza vznikla jako podkladový materiál pro pochopení strategického
              významu vzácných zemin v kontextu geopolitických změn, energetické tranzice a průmyslové
              politiky EU. Cílem je zpřístupnit komplexní problematiku surovinové bezpečnosti
              srozumitelnou a datově podloženou formou.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href="https://davidnavratil.substack.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-[#FF6719]/10 px-4 py-2 text-sm font-semibold text-[#FF6719] transition-colors hover:bg-[#FF6719]/20"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current"><path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z"/></svg>
                Peníze, procenta a prosperita
              </a>
              <a
                href="https://www.linkedin.com/in/david-navratil/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-[#0A66C2]/10 px-4 py-2 text-sm font-semibold text-[#0A66C2] transition-colors hover:bg-[#0A66C2]/20"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Elements Table */}
      <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-6">
        <h3 className="mb-4 text-lg font-bold text-[#0F172A]">Prvky vzácných zemin</h3>
        <p className="mb-4 text-sm text-[#64748B]">
          17 prvků tvořících skupinu vzácných zemin — 15 lanthanoidů plus skandium (Sc) a yttrium (Y).
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E2E8F0]">
                <th className="px-2 py-2 text-left text-xs font-medium text-[#64748B]">Symbol</th>
                <th className="px-2 py-2 text-left text-xs font-medium text-[#64748B]">Český název</th>
                <th className="px-2 py-2 text-left text-xs font-medium text-[#64748B]">At. číslo</th>
                <th className="px-2 py-2 text-left text-xs font-medium text-[#64748B]">Skupina</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Sc', 'Skandium', '21', 'spec.'],
                ['Y', 'Yttrium', '39', 'HREE'],
                ['La', 'Lanthan', '57', 'LREE'],
                ['Ce', 'Cer', '58', 'LREE'],
                ['Pr', 'Praseodym', '59', 'LREE'],
                ['Nd', 'Neodym', '60', 'LREE'],
                ['Pm', 'Promethium', '61', '—'],
                ['Sm', 'Samarium', '62', 'LREE'],
                ['Eu', 'Europium', '63', 'LREE'],
                ['Gd', 'Gadolinium', '64', 'HREE'],
                ['Tb', 'Terbium', '65', 'HREE'],
                ['Dy', 'Dysprosium', '66', 'HREE'],
                ['Ho', 'Holmium', '67', 'HREE'],
                ['Er', 'Erbium', '68', 'HREE'],
                ['Tm', 'Thulium', '69', 'HREE'],
                ['Yb', 'Ytterbium', '70', 'HREE'],
                ['Lu', 'Lutetium', '71', 'HREE'],
              ].map(([sym, name, num, group]) => (
                <tr key={sym} className="border-b border-[#E2E8F0]/50">
                  <td className="px-2 py-1.5 font-mono font-bold text-[#0E7490]">{sym}</td>
                  <td className="px-2 py-1.5 text-[#0F172A]">{name}</td>
                  <td className="px-2 py-1.5 font-mono text-[#64748B]">{num}</td>
                  <td className="px-2 py-1.5 text-[#64748B]">{group}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Abbreviations */}
      <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-6">
        <h3 className="mb-4 text-lg font-bold text-[#0F172A]">Použité zkratky</h3>
        <div className="grid gap-x-8 gap-y-2 text-sm sm:grid-cols-2">
          <div className="flex gap-2">
            <span className="shrink-0 font-bold text-[#0E7490]">REE</span>
            <span className="text-[#334155]">— Rare Earth Elements, vzácné zeminy</span>
          </div>
          <div className="flex gap-2">
            <span className="shrink-0 font-bold text-[#0E7490]">LREE</span>
            <span className="text-[#334155]">— lehké vzácné zeminy (Light REE)</span>
          </div>
          <div className="flex gap-2">
            <span className="shrink-0 font-bold text-[#0E7490]">HREE</span>
            <span className="text-[#334155]">— těžké vzácné zeminy (Heavy REE)</span>
          </div>
          <div className="flex gap-2">
            <span className="shrink-0 font-bold text-[#0E7490]">NdFeB</span>
            <span className="text-[#334155]">— neodymové magnety (Neodymium-Iron-Boron)</span>
          </div>
          <div className="flex gap-2">
            <span className="shrink-0 font-bold text-[#0E7490]">HHI</span>
            <span className="text-[#334155]">— index tržní koncentrace (Herfindahl-Hirschman)</span>
          </div>
          <div className="flex gap-2">
            <span className="shrink-0 font-bold text-[#0E7490]">CRMA</span>
            <span className="text-[#334155]">— Nařízení EU o kritických surovinách (Critical Raw Materials Act)</span>
          </div>
          <div className="flex gap-2">
            <span className="shrink-0 font-bold text-[#0E7490]">CAGR</span>
            <span className="text-[#334155]">— průměrný roční růst (Compound Annual Growth Rate)</span>
          </div>
          <div className="flex gap-2">
            <span className="shrink-0 font-bold text-[#0E7490]">BEV</span>
            <span className="text-[#334155]">— bateriové elektromobily (Battery Electric Vehicle)</span>
          </div>
          <div className="flex gap-2">
            <span className="shrink-0 font-bold text-[#0E7490]">REO</span>
            <span className="text-[#334155]">— oxidy vzácných zemin (Rare Earth Oxides)</span>
          </div>
          <div className="flex gap-2">
            <span className="shrink-0 font-bold text-[#0E7490]">EV</span>
            <span className="text-[#334155]">— elektromobily (Electric Vehicle)</span>
          </div>
        </div>
      </div>

      {/* Methodology + Data Sources */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-6">
          <h3 className="mb-4 text-lg font-bold text-[#0F172A]">Metodologie</h3>
          <div className="space-y-3 text-sm leading-relaxed text-[#334155]">
            <p>
              Analýza vychází z konsolidace veřejně dostupných dat od předních světových institucí.
              Cenová data jsou měsíční kotace oxidů vzácných zemin v USD/kg z platformy LSEG Datastream (Asian Metals).
            </p>
            <p>
              Korelační matice je vypočtena z měsíčních výnosů za období 2014–2025.
            </p>
            <p>
              Index zranitelnosti kombinuje pět dimenzí (váhy dle metodiky EU CRMA —
              Nařízení o kritických surovinách):
            </p>
            <ul className="ml-4 list-disc space-y-1 text-sm text-[#334155]">
              <li><strong>Koncentrace dodávek</strong> — míra závislosti na jednom dodavateli (HHI index)</li>
              <li><strong>Substituovatelnost</strong> — existence náhradních materiálů či technologií</li>
              <li><strong>Recyklovatelnost</strong> — podíl sekundární produkce z odpadu</li>
              <li><strong>Cenová volatilita</strong> — historická kolísavost ceny (12M anualizovaná)</li>
              <li><strong>Strategický význam</strong> — role v klíčových technologiích (obrana, energetika, elektromobilita)</li>
            </ul>
            <p className="mt-2">
              Výsledné skóre 0–30 bodů. Čím vyšší, tím zranitelnější prvek. Dysprosium (Dy) a terbium (Tb)
              dosahují nejvyšších hodnot kvůli extrémní koncentraci těžby a nenahraditelnosti v permanentních magnetech.
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-6">
          <h3 className="mb-4 text-lg font-bold text-[#0F172A]">Datové zdroje</h3>
          <ul className="space-y-3 text-sm text-[#334155]">
            <li className="flex gap-2">
              <span className="shrink-0 font-bold text-[#64748B]">USGS 2025</span>
              <span>— produkce, rezervy a dodavatelská struktura vzácných zemin</span>
            </li>
            <li className="flex gap-2">
              <span className="shrink-0 font-bold text-[#64748B]">IEA</span>
              <span>— projekce poptávky dle scénářů energetické tranzice</span>
            </li>
            <li className="flex gap-2">
              <span className="shrink-0 font-bold text-[#64748B]">LSEG Datastream</span>
              <span>— historické ceny oxidů (Asian Metals, měsíční řady)</span>
            </li>
            <li className="flex gap-2">
              <span className="shrink-0 font-bold text-[#64748B]">Adamas Intelligence</span>
              <span>— analýza dodavatelského řetězce, pipeline projektů, firemní profily</span>
            </li>
            <li className="flex gap-2">
              <span className="shrink-0 font-bold text-[#64748B]">McKinsey</span>
              <span>— projekce poptávky po magnetických materiálech</span>
            </li>
            <li className="flex gap-2">
              <span className="shrink-0 font-bold text-[#64748B]">EU CRMA</span>
              <span>— Nařízení o kritických surovinách, benchmark cíle 2030</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-6">
        <h3 className="mb-2 text-sm font-bold text-[#0E7490]">Upozornění</h3>
        <p className="text-sm text-[#64748B]">
          Veškeré údaje mají výhradně informativní charakter a nepředstavují investiční doporučení.
          Projekce vycházejí z aktuálně dostupných dat a předpokladů, které se mohou změnit.
        </p>
      </div>
    </div>
  )
}
