import { notFound } from 'next/navigation'
import { getDictionary, hasLocale } from '@/i18n'
import { loadData } from '@/lib/data'
import type { Company, PipelineProject, CostBreakdown, SupplyChainStage } from '@/lib/types'
import PageHeader from '@/components/layout/PageHeader'
import CostWaterfall from '@/components/charts/CostWaterfall'
import ConcentrationCascade from '@/components/charts/ConcentrationCascade'
import SankeyFlow from '@/components/charts/SankeyFlow'
import ChartExport from '@/components/ui/ChartExport'
import SupplyChainClient from './SupplyChainClient'

export default async function SupplyChainPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = await getDictionary(lang)

  const [companies, pipeline, costBreakdown, supplyChain] = await Promise.all([
    loadData<Company[]>('companies.json'),
    loadData<PipelineProject[]>('pipeline.json'),
    loadData<CostBreakdown[]>('cost_breakdown.json'),
    loadData<SupplyChainStage[]>('supply_chain.json'),
  ])

  return (
    <div className="space-y-8">
      <PageHeader
        title={dict.supplyChain.title}
        subtitle={dict.supplyChain.subtitle}
      />

      {/* Sankey Flow */}
      <div className="group rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-6">
        <ChartExport filename="tok-vzacnych-zemin" downloadTitle={dict.common.downloadPng}>
          <SankeyFlow dict={dict} />
        </ChartExport>
      </div>

      {/* Cost Waterfall */}
      <div className="group rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-6">
        <ChartExport filename="nasobeni-hodnoty" downloadTitle={dict.common.downloadPng}>
          <CostWaterfall data={costBreakdown} dict={dict} />
        </ChartExport>
      </div>

      {/* Concentration Cascade */}
      <div className="group rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-6">
        <ChartExport filename="koncentrace-retezce" downloadTitle={dict.common.downloadPng}>
          <ConcentrationCascade data={supplyChain} dict={dict} />
        </ChartExport>
      </div>

      {/* Companies + Pipeline */}
      <SupplyChainClient companies={companies} pipeline={pipeline} dict={dict} lang={lang} />
    </div>
  )
}
