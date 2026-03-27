import { loadData } from '@/lib/data'
import type { VulnerabilityItem } from '@/lib/types'
import PageHeader from '@/components/layout/PageHeader'
import ScenariosClient from './ScenariosClient'

export default async function ScenariosPage() {
  const vulnerability = await loadData<VulnerabilityItem[]>('vulnerability.json')

  return (
    <div className="space-y-8">
      <PageHeader
        title="Scénáře a rizika"
        subtitle="Co se stane, když Čína omezí export vzácných zemin? Čtyři scénáře od mírného zpřísnění po úplný technologický decoupling. Interaktivní simulace dopadu na ceny a dostupnost."
      />
      <ScenariosClient vulnerability={vulnerability} />
    </div>
  )
}
