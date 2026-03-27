import { loadData } from '@/lib/data'
import type { DemandRow, GapDataPoint } from '@/lib/types'
import PageHeader from '@/components/layout/PageHeader'
import GapChart from '@/components/charts/GapChart'
import DemandClient from './DemandClient'

interface MaterialIntensity {
  [key: string]: string | number | null
}

interface Projection {
  [key: string]: string | number | null
}

export default async function DemandPage() {
  const [demand, materialIntensity, projections, gapData] = await Promise.all([
    loadData<DemandRow[]>('demand.json'),
    loadData<MaterialIntensity[]>('material_intensity.json'),
    loadData<Projection[]>('projections.json'),
    loadData<GapDataPoint[]>('gap_analysis.json'),
  ])

  return (
    <div className="space-y-8">
      <PageHeader
        title="Poptávka po vzácných zeminách"
        subtitle="Kdo potřebuje jaké vzácné zeminy, kolik jich spotřebuje a jak rychle poptávka poroste. Elektromobilita a větrná energie jsou hlavními tahouny růstu."
      />

      {/* Gap Chart */}
      <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-6">
        <GapChart data={gapData} />
      </div>

      <DemandClient
        demand={demand}
        materialIntensity={materialIntensity}
        projections={projections}
      />
    </div>
  )
}
