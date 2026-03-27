import { loadData } from '@/lib/data'
import type { CzExposure, VulnerabilityItem } from '@/lib/types'
import PageHeader from '@/components/layout/PageHeader'
import BigNumber from '@/components/ui/BigNumber'
import CzechClient from './CzechClient'

export default async function CzechPage() {
  const [czExposure, vulnerability] = await Promise.all([
    loadData<CzExposure[]>('cz_exposure.json'),
    loadData<VulnerabilityItem[]>('vulnerability.json'),
  ])

  return (
    <div className="space-y-8">
      <PageHeader
        title="Český a evropský rozměr"
        subtitle="Jak se závislost na vzácných zeminách dotýká České republiky. Automobilový průmysl, strojírenství a elektrotechnický sektor jsou nejvíce ohroženy."
      />

      {/* Big Numbers */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <BigNumber
          value={10}
          label="Podíl autoprůmyslu na HDP ČR"
          color="#9D174D"
          delay={0}
        />
        <BigNumber
          value={434}
          suffix=" tis."
          label="Zaměstnanců v autoprůmyslu"
          color="#D97706"
          delay={150}
        />
        <BigNumber
          value={151}
          suffix=" tis."
          label="Bateriových elektromobilů (BEV) ročně"
          color="#0E7490"
          delay={300}
        />
        <BigNumber
          value={35}
          suffix="%"
          label="Exponovaných sektorů na HDP ČR"
          color="#9D174D"
          delay={450}
        />
      </div>

      <CzechClient czExposure={czExposure} vulnerability={vulnerability} />
    </div>
  )
}
