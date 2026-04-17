import { notFound } from 'next/navigation'
import { getDictionary, hasLocale } from '@/i18n'
import { loadData } from '@/lib/data'
import type { Element, VulnerabilityItem } from '@/lib/types'
import PageHeader from '@/components/layout/PageHeader'
import ElementsClient from './ElementsClient'

export default async function ElementsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = await getDictionary(lang)

  const [elements, vulnerability] = await Promise.all([
    loadData<Element[]>('elements.json'),
    loadData<VulnerabilityItem[]>('vulnerability.json'),
  ])

  return (
    <div>
      <PageHeader
        title={dict.elements.title}
        subtitle={dict.elements.subtitle}
      />
      <ElementsClient elements={elements} vulnerability={vulnerability} dict={dict} lang={lang} />
    </div>
  )
}
