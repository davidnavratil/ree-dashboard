import Link from 'next/link'
import { loadData } from '@/lib/data'
import type { SupplyChainStage, GapDataPoint, CostPassthrough, ChinaBalance } from '@/lib/types'
import BigNumber from '@/components/ui/BigNumber'
import ConcentrationCascade from '@/components/charts/ConcentrationCascade'
import GapChart from '@/components/charts/GapChart'
import ChinaBalanceChart from '@/components/charts/ChinaBalance'
import KeyInsights from '@/components/sections/KeyInsights'
import ChartExport from '@/components/ui/ChartExport'
import SourceAttribution from '@/components/ui/SourceAttribution'

export default async function HomePage() {
  const [supplyChain, gapData, costPass, chinaBalance] = await Promise.all([
    loadData<SupplyChainStage[]>('supply_chain.json'),
    loadData<GapDataPoint[]>('gap_analysis.json'),
    loadData<CostPassthrough[]>('cost_passthrough.json'),
    loadData<ChinaBalance[]>('china_balance.json'),
  ])

  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="pt-4 pb-2 sm:pt-8 sm:pb-4">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#D97706]">
          Strategická analýza
        </span>
        <h1 className="mt-2 font-serif text-4xl font-bold leading-tight text-[#0F172A] sm:text-5xl lg:text-6xl">
          Vzácné zeminy
        </h1>
        <p className="mt-3 max-w-2xl font-serif text-lg italic text-[#64748B] sm:text-xl">
          Interaktivní přehled globálního trhu se vzácnými zeminami
        </p>
        <p className="mt-4 text-sm text-[#64748B]">
          David Navrátil · {' '}
          <a
            href="https://davidnavratil.substack.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#D97706] hover:underline"
          >
            Peníze, procenta a prosperita
          </a>
          {' '} · hlavní ekonom České spořitelny
        </p>
      </div>

      {/* Explainer */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <p className="text-sm leading-relaxed text-[#334155]">
            <span className="font-semibold text-[#0F172A]">Vzácné zeminy</span> je skupina 17 kovových prvků,
            bez kterých se neobejde žádný elektromobil, větrná turbína, smartphone ani řízená střela.
            Paradoxně nejsou geologicky vzácné — vzácná je schopnost je ekonomicky těžit, separovat
            a zpracovat na průmyslově využitelné materiály. Tuto schopnost má dnes téměř výhradně Čína.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[#334155]">
            Tato analýza mapuje celý <Link href="/supply-chain" className="font-medium text-[#0E7490] underline decoration-dotted hover:text-[#0F172A]">hodnotový řetězec</Link> od
            rudy po hotový magnet, identifikuje kritická místa závislosti a modeluje <Link href="/scenarios" className="font-medium text-[#0E7490] underline decoration-dotted hover:text-[#0F172A]">scénáře</Link>,
            co se stane, když se dodavatelský řetězec přeruší.
          </p>
        </div>
        <div className="flex items-center rounded-xl border border-[#D97706]/20 bg-[#D97706]/5 p-5">
          <p className="text-sm italic leading-relaxed text-[#92400E]">
            „Kdo ovládá vzácné zeminy, ovládá technologickou budoucnost.
            A dnes je ovládá jedna země."
          </p>
        </div>
      </div>


      {/* Big Numbers */}
      <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
        <BigNumber
          value={69}
          label="Podíl Číny na těžbě"
          color="#9D174D"
          href="/supply-chain"
          delay={0}
        />
        <BigNumber
          value={91}
          label="Podíl Číny na rafinaci"
          color="#9D174D"
          href="/supply-chain"
          delay={150}
        />
        <BigNumber
          value={94}
          label="Podíl Číny na magnetech"
          color="#9D174D"
          href="/supply-chain"
          delay={300}
        />
        <BigNumber
          value={98}
          label="Podíl na zpracování terbia (Tb)"
          color="#9D174D"
          href="/elements"
          delay={450}
        />
      </div>

      {/* Concentration + Key Insights */}
      <div className="grid gap-6 lg:grid-cols-5">
        <div className="group rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-6 lg:col-span-3">
          <ChartExport filename="koncentrace-dodavatelskeho-retezce">
            <ConcentrationCascade data={supplyChain} />
          </ChartExport>
        </div>
        <div className="lg:col-span-2">
          <KeyInsights />
        </div>
      </div>

      {/* Gap Chart + China Balance */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="group rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-6">
          <ChartExport filename="nabidka-vs-poptavka">
            <GapChart data={gapData} />
          </ChartExport>
        </div>
        <div className="group rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-6">
          <ChartExport filename="cinska-bilance">
            <ChinaBalanceChart data={chinaBalance} />
          </ChartExport>
        </div>
      </div>

      {/* Quote + Cost Passthrough */}
      <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-6">
        <blockquote className="mb-6 border-l-4 border-[#D97706] pl-4">
          <p className="text-xl font-bold italic text-[#0F172A]">
            „Vzácné zeminy nejsou cenový problém — jsou problém dostupnosti."
          </p>
          <p className="mt-2 text-sm text-[#475569]">
            I trojnásobné zdražení vzácných zemin přidá méně než 1 % k ceně elektromobilu.
            Skutečné riziko je, že dodávky prostě přestanou proudit.
          </p>
        </blockquote>

        <h3 className="mb-4 text-lg font-bold text-[#0F172A]">
          Cenový přenos vzácných zemin do produktů
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E2E8F0]">
                <th className="px-3 py-2 text-left text-xs font-medium text-[#64748B]">Produkt</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-[#64748B]">Cena REE</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-[#64748B]">Cena produktu</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-[#64748B]">Podíl REE</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-[#64748B]">Dopad 3× zdražení</th>
              </tr>
            </thead>
            <tbody>
              {costPass.slice(0, 6).map((row, i) => (
                <tr key={i} className="border-b border-[#E2E8F0]/50 hover:bg-[#F1F5F9]">
                  <td className="px-3 py-2 font-medium text-[#0F172A]">{row.Produkt}</td>
                  <td className="px-3 py-2 font-mono text-xs text-[#475569]">{row['Cena REE (USD)']}</td>
                  <td className="px-3 py-2 font-mono text-xs text-[#475569]">{row['Cena produktu (USD)']}</td>
                  <td className="px-3 py-2 font-mono text-xs text-[#0E7490]">{row['REE/produkt (%)']}</td>
                  <td className="px-3 py-2 font-mono text-xs text-[#D97706]">{row['Dopad 3× zdražení']}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <SourceAttribution source="výpočty na základě tržních cen komponentů a spotových cen vzácných zemin (Datastream 2025)" />
      </div>

    </div>
  )
}
