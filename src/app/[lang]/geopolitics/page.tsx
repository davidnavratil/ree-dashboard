import { notFound } from 'next/navigation'
import { getDictionary, hasLocale } from '@/i18n'
import { loadData } from '@/lib/data'
import type { ExportControl, CrmaTarget, ProductionCountry } from '@/lib/types'
import PageHeader from '@/components/layout/PageHeader'
import GeopoliticsClient from './GeopoliticsClient'

export default async function GeopoliticsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = await getDictionary(lang)

  const [exportControls, crmaTargets, production] = await Promise.all([
    loadData<ExportControl[]>('export_controls.json'),
    loadData<CrmaTarget[]>('crma_tracker.json'),
    loadData<ProductionCountry[]>('production.json'),
  ])

  return (
    <div className="space-y-8">
      <PageHeader
        title={dict.geopolitics.title}
        subtitle={dict.geopolitics.subtitle}
      />
      <GeopoliticsClient
        exportControls={exportControls}
        crmaTargets={crmaTargets}
        production={production}
        dict={dict}
        lang={lang}
      />
    </div>
  )
}
