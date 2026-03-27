import { loadData } from '@/lib/data'
import type { PricePoint, EventItem, CorrelationData, PricesMeta, SummaryStats } from '@/lib/types'
import PageHeader from '@/components/layout/PageHeader'
import PriceTimeSeries from '@/components/charts/PriceTimeSeries'
import CorrelationMatrix from '@/components/charts/CorrelationMatrix'
import ChartExport from '@/components/ui/ChartExport'

export default async function PricesPage() {
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
        title="Cenová analýza vzácných zemin"
        subtitle="Historické ceny oxidů vzácných zemin v USD/kg na základě dat z LSEG Datastream (Asian Metals). Vyberte prvky a období pro porovnání."
      />

      {/* Main Price Chart */}
      <div className="group rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-6">
        <ChartExport filename="cenova-analyza">
          <PriceTimeSeries data={prices} events={events} meta={meta} />
        </ChartExport>
      </div>

      {/* Stats + Correlation */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Key Insight */}
        <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-6">
          <h3 className="mb-4 text-lg font-bold text-[#0F172A]">
            Klíčová zjištění z cenových dat
          </h3>
          <div className="space-y-4">
            <div className="rounded-lg border border-[#E2E8F0] bg-white p-4">
              <p className="text-sm text-[#334155]">
                <span className="font-bold text-[#D97706]">Korelace s ropou Brent = 0,09</span>
                {' '}— vzácné zeminy jsou geopolitická, nikoli cyklická komodita. Jejich ceny nereagují na hospodářský cyklus,
                ale na exportní kontroly Číny a průmyslovou politiku.
              </p>
            </div>
            <div className="rounded-lg border border-[#E2E8F0] bg-white p-4">
              <p className="text-sm text-[#334155]">
                <span className="font-bold text-[#9D174D]">Dysprosium</span> je nejvolatilnější prvek.
                V roce 2011 dosáhlo ceny přes 3 000 USD/kg. Dnes se obchoduje kolem 300 USD/kg, ale nové
                exportní kontroly Číny z roku 2025 mohou vyvolat další cenový šok.
              </p>
            </div>
            <div className="rounded-lg border border-[#E2E8F0] bg-white p-4">
              <p className="text-sm text-[#334155]">
                <span className="font-bold text-[#0E7490]">Terbium a dysprosium</span> jsou silně korelované
                (0,69) — obojí se používá v permanentních magnetech. Praseodym sleduje podobný trend (korelace s Dy = 0,53).
              </p>
            </div>
          </div>

          {/* Period stats table */}
          {lastPeriod && (
            <div className="mt-6">
              <h4 className="mb-2 text-sm font-bold text-[#475569]">
                Statistiky za období {lastPeriod.period}
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-[#E2E8F0]">
                      <th className="px-2 py-1 text-left text-[#64748B]">Prvek</th>
                      <th className="px-2 py-1 text-right text-[#64748B]">Průměr</th>
                      <th className="px-2 py-1 text-right text-[#64748B]">Min</th>
                      <th className="px-2 py-1 text-right text-[#64748B]">Max</th>
                      <th className="px-2 py-1 text-right text-[#64748B]">Volatilita</th>
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
          <ChartExport filename="korelacni-matice">
            <CorrelationMatrix data={correlation} />
          </ChartExport>
        </div>
      </div>
    </div>
  )
}
