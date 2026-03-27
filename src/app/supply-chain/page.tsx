import { loadData } from '@/lib/data'
import type { Company, PipelineProject, CostBreakdown, SupplyChainStage } from '@/lib/types'
import PageHeader from '@/components/layout/PageHeader'
import CostWaterfall from '@/components/charts/CostWaterfall'
import ConcentrationCascade from '@/components/charts/ConcentrationCascade'
import SankeyFlow from '@/components/charts/SankeyFlow'
import ChartExport from '@/components/ui/ChartExport'
import SupplyChainClient from './SupplyChainClient'

export default async function SupplyChainPage() {
  const [companies, pipeline, costBreakdown, supplyChain] = await Promise.all([
    loadData<Company[]>('companies.json'),
    loadData<PipelineProject[]>('pipeline.json'),
    loadData<CostBreakdown[]>('cost_breakdown.json'),
    loadData<SupplyChainStage[]>('supply_chain.json'),
  ])

  return (
    <div className="space-y-8">
      <PageHeader
        title="Hodnotový řetězec vzácných zemin"
        subtitle="Od těžby rudy po hotový magnet — kde se násobí hodnota a kdo ovládá jednotlivé stupně zpracování."
      />

      {/* Sankey Flow */}
      <div className="group rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-6">
        <ChartExport filename="tok-vzacnych-zemin">
          <SankeyFlow />
        </ChartExport>
      </div>

      {/* Cost Waterfall */}
      <div className="group rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-6">
        <ChartExport filename="nasobeni-hodnoty">
          <CostWaterfall data={costBreakdown} />
        </ChartExport>
      </div>

      {/* Concentration Cascade */}
      <div className="group rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-6">
        <ChartExport filename="koncentrace-retezce">
          <ConcentrationCascade data={supplyChain} />
        </ChartExport>
      </div>

      {/* Companies + Pipeline */}
      <SupplyChainClient companies={companies} pipeline={pipeline} />
    </div>
  )
}
