import { notFound } from 'next/navigation'
import { getDictionary, hasLocale } from '@/i18n'
import { loadData } from '@/lib/data'
import type { CzExposure, VulnerabilityItem } from '@/lib/types'
import PageHeader from '@/components/layout/PageHeader'
import BigNumber from '@/components/ui/BigNumber'
import CzechClient from './CzechClient'

export default async function CzechPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = await getDictionary(lang)

  const [czExposure, vulnerability] = await Promise.all([
    loadData<CzExposure[]>('cz_exposure.json'),
    loadData<VulnerabilityItem[]>('vulnerability.json'),
  ])

  return (
    <div className="space-y-8">
      <PageHeader
        title={dict.czech.title}
        subtitle={dict.czech.subtitle}
      />

      {/* Big Numbers */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <BigNumber
          value={10}
          label={dict.czech.bigNumbers.autoGdp}
          color="#9D174D"
          delay={0}
        />
        <BigNumber
          value={434}
          suffix=" tis."
          label={dict.czech.bigNumbers.autoEmployees}
          color="#D97706"
          delay={150}
        />
        <BigNumber
          value={151}
          suffix=" tis."
          label={dict.czech.bigNumbers.bevProduction}
          color="#0E7490"
          delay={300}
        />
        <BigNumber
          value={35}
          suffix="%"
          label={dict.czech.bigNumbers.exposedGdp}
          color="#9D174D"
          delay={450}
        />
      </div>

      <CzechClient czExposure={czExposure} vulnerability={vulnerability} dict={dict} lang={lang} />
    </div>
  )
}
