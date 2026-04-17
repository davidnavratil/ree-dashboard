import { notFound } from 'next/navigation'
import { getDictionary, hasLocale } from '@/i18n'
import { loadData } from '@/lib/data'
import type { PricePoint, EventItem, CorrelationData, PricesMeta, SummaryStats } from '@/lib/types'
import PageHeader from '@/components/layout/PageHeader'
import PriceTimeSeries from '@/components/charts/PriceTimeSeries'
import CorrelationMatrix from '@/components/charts/CorrelationMatrix'
import ChartExport from '@/components/ui/ChartExport'

export default async function PricesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = await getDictionary(lang)

  const [prices, events, correlation, meta, stats] = await Promise.all([
    loadData<PricePoint[]>('prices_history.json'),
    loadData<EventItem[]>('events.json'),
    loadData<CorrelationData>('correlation.json'),
    loadData<PricesMeta>('prices_meta.json'),
    loadData<SummaryStats>('summary_stats.json'),
  ])

  const lastPeriod = stats.periods[stats.periods.length - 1]

  return (
    <div className="space-y-8">
      <PageHeader
        title={dict.prices.title}
        subtitle={dict.prices.subtitle}
      />

      {/* Main Price Chart */}
      <div className="group rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-6">
        <ChartExport filename="cenova-analyza" downloadTitle={dict.common.downloadPng}>
          <PriceTimeSeries data={prices} events={events} meta={meta} dict={dict} />
        </ChartExport>
      </div>

      {/* Stats + Correlation */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Key Insight */}
        <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-6">
          <h3 className="mb-4 text-lg font-bold text-[#0F172A]">
            {dict.prices.insightsTitle}
          </h3>
          <div className="space-y-4">
            <div className="rounded-lg border border-[#E2E8F0] bg-white p-4">
              <p className="text-sm text-[#334155]">
                <span className="font-bold text-[#D97706]">{dict.prices.insight1bold}</span>
                {dict.prices.insight1text}
              </p>
            </div>
            <div className="rounded-lg border border-[#E2E8F0] bg-white p-4">
              <p className="text-sm text-[#334155]">
                <span className="font-bold text-[#9D174D]">{dict.prices.insight2bold}</span>
                {dict.prices.insight2text}
              </p>
            </div>
            <div className="rounded-lg border border-[#E2E8F0] bg-white p-4">
              <p className="text-sm text-[#334155]">
                <span className="font-bold text-[#0E7490]">{dict.prices.insight3bold}</span>
                {dict.prices.insight3text}
              </p>
            </div>
          </div>

          {/* Period stats table */}
          {lastPeriod && (
            <div className="mt-6">
              <h4 className="mb-2 text-sm font-bold text-[#475569]">
                {dict.prices.statsTitle} {lastPeriod.period}
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-[#E2E8F0]">
                      <th className="px-2 py-1 text-left text-[#64748B]">{dict.prices.statsHeaders.element}</th>
                      <th className="px-2 py-1 text-right text-[#64748B]">{dict.prices.statsHeaders.average}</th>
                      <th className="px-2 py-1 text-right text-[#64748B]">{dict.prices.statsHeaders.min}</th>
                      <th className="px-2 py-1 text-right text-[#64748B]">{dict.prices.statsHeaders.max}</th>
                      <th className="px-2 py-1 text-right text-[#64748B]">{dict.prices.statsHeaders.volatility}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lastPeriod.stats.map((s, i) => (
                      <tr key={i} className="border-b border-[#E2E8F0]/50">
                        <td className="px-2 py-1 text-[#0F172A]">{s.Prvek}</td>
                        <td className="px-2 py-1 text-right font-mono text-[#475569]">{s.Prumer?.toFixed(1)}</td>
                        <td className="px-2 py-1 text-right font-mono text-[#0E7490]">{s.Min?.toFixed(1)}</td>
                        <td className="px-2 py-1 text-right font-mono text-[#9D174D]">{s.Max?.toFixed(1)}</td>
                        <td className="px-2 py-1 text-right font-mono text-[#D97706]">{s['Vol 12M ann (%)']?.toFixed(1)}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Correlation Matrix */}
        <div className="group rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-6">
          <ChartExport filename="korelacni-matice" downloadTitle={dict.common.downloadPng}>
            <CorrelationMatrix data={correlation} dict={dict} />
          </ChartExport>
        </div>
      </div>
    </div>
  )
}
