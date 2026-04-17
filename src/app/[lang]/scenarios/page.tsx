import { notFound } from 'next/navigation'
import { getDictionary, hasLocale } from '@/i18n'
import { loadData } from '@/lib/data'
import type { VulnerabilityItem } from '@/lib/types'
import PageHeader from '@/components/layout/PageHeader'
import ScenariosClient from './ScenariosClient'

export default async function ScenariosPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = await getDictionary(lang)

  const vulnerability = await loadData<VulnerabilityItem[]>('vulnerability.json')

  return (
    <div className="space-y-8">
      <PageHeader
        title={dict.scenarios.title}
        subtitle={dict.scenarios.subtitle}
      />
      <ScenariosClient vulnerability={vulnerability} dict={dict} lang={lang} />
    </div>
  )
}
