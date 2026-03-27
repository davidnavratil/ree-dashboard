import { loadData } from '@/lib/data'
import type { Element, VulnerabilityItem } from '@/lib/types'
import PageHeader from '@/components/layout/PageHeader'
import ElementsClient from './ElementsClient'

export default async function ElementsPage() {
  const [elements, vulnerability] = await Promise.all([
    loadData<Element[]>('elements.json'),
    loadData<VulnerabilityItem[]>('vulnerability.json'),
  ])

  return (
    <div>
      <PageHeader
        title="Prvky vzácných zemin"
        subtitle="17 prvků tvořících skupinu vzácných zemin. Klikněte na prvek pro zobrazení detailu včetně indexu zranitelnosti."
      />
      <ElementsClient elements={elements} vulnerability={vulnerability} />
    </div>
  )
}
