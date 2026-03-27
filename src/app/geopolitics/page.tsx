import { loadData } from '@/lib/data'
import type { ExportControl, CrmaTarget, ProductionCountry } from '@/lib/types'
import PageHeader from '@/components/layout/PageHeader'
import GeopoliticsClient from './GeopoliticsClient'

export default async function GeopoliticsPage() {
  const [exportControls, crmaTargets, production] = await Promise.all([
    loadData<ExportControl[]>('export_controls.json'),
    loadData<CrmaTarget[]>('crma_tracker.json'),
    loadData<ProductionCountry[]>('production.json'),
  ])

  return (
    <div className="space-y-8">
      <PageHeader
        title="Geopolitika vzácných zemin"
        subtitle="Exportní kontroly, odpovědi Západu a Nařízení EU o kritických surovinách (CRMA). Vzácné zeminy jsou strategická zbraň — kdo je kontroluje, má páku na celý průmysl."
      />
      <GeopoliticsClient
        exportControls={exportControls}
        crmaTargets={crmaTargets}
        production={production}
      />
    </div>
  )
}
