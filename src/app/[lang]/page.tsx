import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getDictionary, hasLocale } from '@/i18n'
import { loadData } from '@/lib/data'
import type { SupplyChainStage, GapDataPoint, CostPassthrough, ChinaBalance } from '@/lib/types'
import BigNumber from '@/components/ui/BigNumber'
import ConcentrationCascade from '@/components/charts/ConcentrationCascade'
import GapChart from '@/components/charts/GapChart'
import ChinaBalanceChart from '@/components/charts/ChinaBalance'
import KeyInsights from '@/components/sections/KeyInsights'
import ChartExport from '@/components/ui/ChartExport'
import SourceAttribution from '@/components/ui/SourceAttribution'

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = await getDictionary(lang)

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
          {dict.home.badge}
        </span>
        <h1 className="mt-2 font-serif text-4xl font-bold leading-tight text-[#0F172A] sm:text-5xl lg:text-6xl">
          {dict.home.title}
        </h1>
        <p className="mt-3 max-w-2xl font-serif text-lg italic text-[#64748B] sm:text-xl">
          {dict.home.subtitle}
        </p>
        <p className="mt-4 text-sm text-[#64748B]">
          David Navrátil · {' '}
          <a
            href="https://davidnavratil.substack.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#D97706] hover:underline"
          >
            {dict.home.newsletter}
          </a>
          {' '} · {dict.home.authorLine}
        </p>
      </div>

      {/* Explainer */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <p className="text-sm leading-relaxed text-[#334155]">
            <span className="font-semibold text-[#0F172A]">{dict.home.explainerBold}</span> {dict.home.explainerP1}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[#334155]">
            {dict.home.explainerP2Text} <Link href={`/${lang}/supply-chain`} className="font-medium text-[#0E7490] underline decoration-dotted hover:text-[#0F172A]">{dict.home.explainerP2Link1}</Link> {dict.home.explainerP2Mid} <Link href={`/${lang}/scenarios`} className="font-medium text-[#0E7490] underline decoration-dotted hover:text-[#0F172A]">{dict.home.explainerP2Link2}</Link>{dict.home.explainerP2End}
          </p>
        </div>
        <div className="flex items-center rounded-xl border border-[#D97706]/20 bg-[#D97706]/5 p-5">
          <p className="text-sm italic leading-relaxed text-[#92400E]">
            {dict.home.quote}
          </p>
        </div>
      </div>


      {/* Big Numbers */}
      <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
        <BigNumber
          value={69}
          label={dict.home.bigNumbers.miningShare}
          color="#9D174D"
          href={`/${lang}/supply-chain`}
          delay={0}
        />
        <BigNumber
          value={91}
          label={dict.home.bigNumbers.refiningShare}
          color="#9D174D"
          href={`/${lang}/supply-chain`}
          delay={150}
        />
        <BigNumber
          value={94}
          label={dict.home.bigNumbers.magnetShare}
          color="#9D174D"
          href={`/${lang}/supply-chain`}
          delay={300}
        />
        <BigNumber
          value={98}
          label={dict.home.bigNumbers.terbiumShare}
          color="#9D174D"
          href={`/${lang}/elements`}
          delay={450}
        />
      </div>

      {/* Concentration + Key Insights */}
      <div className="grid gap-6 lg:grid-cols-5">
        <div className="group rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-6 lg:col-span-3">
          <ChartExport filename="koncentrace-dodavatelskeho-retezce" downloadTitle={dict.common.downloadPng}>
            <ConcentrationCascade data={supplyChain} dict={dict} />
          </ChartExport>
        </div>
        <div className="lg:col-span-2">
          <KeyInsights dict={dict} lang={lang} />
        </div>
      </div>

      {/* Gap Chart + China Balance */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="group rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-6">
          <ChartExport filename="nabidka-vs-poptavka" downloadTitle={dict.common.downloadPng}>
            <GapChart data={gapData} dict={dict} />
          </ChartExport>
        </div>
        <div className="group rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-6">
          <ChartExport filename="cinska-bilance" downloadTitle={dict.common.downloadPng}>
            <ChinaBalanceChart data={chinaBalance} dict={dict} />
          </ChartExport>
        </div>
      </div>

      {/* Quote + Cost Passthrough */}
      <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-6">
        <blockquote className="mb-6 border-l-4 border-[#D97706] pl-4">
          <p className="text-xl font-bold italic text-[#0F172A]">
            {dict.home.quoteBlock}
          </p>
          <p className="mt-2 text-sm text-[#475569]">
            {dict.home.quoteExplanation}
          </p>
        </blockquote>

        <h3 className="mb-4 text-lg font-bold text-[#0F172A]">
          {dict.home.costPassTitle}
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E2E8F0]">
                <th className="px-3 py-2 text-left text-xs font-medium text-[#64748B]">{dict.home.costPassHeaders.product}</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-[#64748B]">{dict.home.costPassHeaders.reePrice}</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-[#64748B]">{dict.home.costPassHeaders.productPrice}</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-[#64748B]">{dict.home.costPassHeaders.reeShare}</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-[#64748B]">{dict.home.costPassHeaders.tripleImpact}</th>
              </tr>
            </thead>
            <tbody>
              {costPass.slice(0, 6).map((row, i) => (
                <tr key={i} className="border-b border-[#E2E8F0]/50 hover:bg-[#F1F5F9]">
                  <td className="px-3 py-2 font-medium text-[#0F172A]">{(dict.home.costPassProducts as Record<string, string>)?.[row.Produkt] ?? row.Produkt}</td>
                  <td className="px-3 py-2 font-mono text-xs text-[#475569]">{row['Cena REE (USD)']}</td>
                  <td className="px-3 py-2 font-mono text-xs text-[#475569]">{row['Cena produktu (USD)']}</td>
                  <td className="px-3 py-2 font-mono text-xs text-[#0E7490]">{row['REE/produkt (%)']}</td>
                  <td className="px-3 py-2 font-mono text-xs text-[#D97706]">{(dict.home.costPassImpact as Record<string, string>)?.[row['Dopad 3× zdražení']] ?? row['Dopad 3× zdražení']}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <SourceAttribution source={dict.home.costPassSource} dict={dict} />
      </div>

    </div>
  )
}
