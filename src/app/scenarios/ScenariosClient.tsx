'use client'

import { useState, useMemo } from 'react'
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts'
import type { VulnerabilityItem } from '@/lib/types'
import SourceAttribution from '@/components/ui/SourceAttribution'

interface Props {
  vulnerability: VulnerabilityItem[]
}

const SCENARIOS = [
  {
    id: 'baseline',
    title: 'Základní scénář',
    subtitle: 'Pokračování současných trendů',
    color: '#0E7490',
    severity: 'low',
    description: 'Čína pokračuje v postupném zpřísňování exportních kontrol. Mimočínské projekty se realizují s 2–3letým zpožděním. Deficit nastává kolem roku 2028.',
    impacts: {
      price: '+30–50 % do 2030',
      supply: 'Mírný deficit od 2028',
      eu: 'Cíle Nařízení o kritických surovinách splněny z 30–40 %',
      czech: 'Zvýšení nákladů, bez výpadků',
    },
  },
  {
    id: 'escalation',
    title: 'Eskalace',
    subtitle: 'Čínské exportní embargo na magnety',
    color: '#D97706',
    severity: 'medium',
    description: 'Čína zavede úplné embargo na export neodymových magnetů do EU/USA (podobně jako 2010 vůči Japonsku). Trvání 6–12 měsíců.',
    impacts: {
      price: '+200–500 % (dysprosium, terbium)',
      supply: 'Akutní výpadek 6–12 měsíců',
      eu: 'Zastavení výroby motorů pro elektromobily',
      czech: 'Ztráta ~1,5 % hrubého domácího produktu, odstávky Škoda',
    },
  },
  {
    id: 'decoupling',
    title: 'Technologický decoupling',
    subtitle: 'Úplné oddělení dodavatelských řetězců',
    color: '#9D174D',
    severity: 'high',
    description: 'Kompletní oddělení západního a čínského dodavatelského řetězce. Západ buduje paralelní kapacity od těžby po magnety. Realizace trvá 8–12 let.',
    impacts: {
      price: '+100 % trvale (nová nákladová křivka)',
      supply: 'Kritický deficit do 2032',
      eu: 'Nutnost investic přes 50 miliard dolarů',
      czech: 'Příležitost pro recyklaci a výzkum',
    },
  },
  {
    id: 'breakthrough',
    title: 'Technologický průlom',
    subtitle: 'Substituce permanentních magnetů',
    color: '#0E7490',
    severity: 'positive',
    description: 'Úspěšný vývoj motorů bez permanentních magnetů (externě buzené synchronní motory, spínané reluktanční motory) nebo magnetů bez dysprosia a terbia. Snížení závislosti na těžké vzácné zeminy o 50+ % do 2035.',
    impacts: {
      price: 'Stabilizace, dysprosium −30 %',
      supply: 'Deficit eliminován pro těžké vzácné zeminy',
      eu: 'Cíle Nařízení o kritických surovinách snáze dosažitelné',
      czech: 'Nižší riziko, nové příležitosti',
    },
  },
]

const SEVERITY_BG: Record<string, string> = {
  low: '#0E749010',
  medium: '#D9770610',
  high: '#9D174D10',
  positive: '#0E749010',
}

function CustomRadarTooltip({ active, payload }: any) {
  if (!active || !payload?.[0]) return null
  return (
    <div className="rounded-lg border border-[#E2E8F0] bg-white p-2 shadow-lg text-xs">
      <p className="font-bold text-[#0F172A]">{payload[0].payload.dimension}</p>
      {payload.map((entry: any) => (
        <p key={entry.name} style={{ color: entry.color }}>
          {entry.name}: {entry.value}/5
        </p>
      ))}
    </div>
  )
}

export default function ScenariosClient({ vulnerability }: Props) {
  const [activeScenario, setActiveScenario] = useState<string>('baseline')
  const [selectedElements, setSelectedElements] = useState<string[]>(['Nd', 'Dy', 'Tb'])
  const [restrictionLevel, setRestrictionLevel] = useState(50)

  const scenario = SCENARIOS.find(s => s.id === activeScenario)!

  // Build radar data from vulnerability scores
  const radarData = useMemo(() => {
    const dimensions = [
      { key: 'Substituovatelnost (1–5)', label: 'Nahraditelnost jinými materiály' },
      { key: 'Recyklovatelnost (1–5)', label: 'Možnost recyklace z odpadu' },
      { key: 'Cenová volatilita (1–5)', label: 'Volatilita tržní ceny' },
      { key: 'Strategický význam (1–5)', label: 'Důležitost pro klíčové technologie' },
    ]

    return dimensions.map(dim => {
      const point: any = { dimension: dim.label }
      selectedElements.forEach(symbol => {
        const item = vulnerability.find(v => v.Prvek === symbol)
        if (item) {
          point[symbol] = Number(item[dim.key] ?? 0)
        }
      })
      return point
    })
  }, [vulnerability, selectedElements])

  const RADAR_COLORS = ['#9D174D', '#0E7490', '#D97706', '#0E7490', '#1D4ED8']
  const ELEMENT_NAMES: Record<string, string> = {
    'Nd': 'Neodym (Nd)', 'Pr': 'Praseodym (Pr)', 'Dy': 'Dysprosium (Dy)',
    'Tb': 'Terbium (Tb)', 'Sm': 'Samarium (Sm)', 'La': 'Lanthan (La)',
    'Ce': 'Cer (Ce)', 'Y': 'Yttrium (Y)', 'Gd': 'Gadolinium (Gd)',
    'Eu': 'Europium (Eu)', 'Sc': 'Skandium (Sc)', 'Er': 'Erbium (Er)',
    'Lu': 'Lutetium (Lu)',
  }
  const allElements = vulnerability.map(v => v.Prvek as string).filter(Boolean)

  const toggleElement = (el: string) => {
    setSelectedElements(prev =>
      prev.includes(el) ? prev.filter(e => e !== el) : [...prev, el]
    )
  }

  // Price adjustment based on slider
  const priceMultiplier = 1 + (restrictionLevel / 100) * 3

  return (
    <div className="space-y-8">
      {/* Scenario Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {SCENARIOS.map(s => (
          <button
            key={s.id}
            onClick={() => setActiveScenario(s.id)}
            className={`rounded-xl border-2 p-5 text-left transition-all ${
              activeScenario === s.id
                ? 'shadow-lg scale-[1.02]'
                : 'border-[#E2E8F0] hover:border-[#CBD5E1]'
            }`}
            style={{
              borderColor: activeScenario === s.id ? s.color : undefined,
              backgroundColor: activeScenario === s.id ? SEVERITY_BG[s.severity] : '#F8FAFC',
            }}
          >
            <h4 className="text-sm font-bold" style={{ color: s.color }}>{s.title}</h4>
            <p className="mt-1 text-xs text-[#475569]">{s.subtitle}</p>
          </button>
        ))}
      </div>

      {/* Active Scenario Detail */}
      <div
        className="rounded-xl border-2 p-6"
        style={{ borderColor: `${scenario.color}40`, backgroundColor: SEVERITY_BG[scenario.severity] }}
      >
        <h3 className="text-xl font-bold" style={{ color: scenario.color }}>
          {scenario.title}: {scenario.subtitle}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-[#334155]">{scenario.description}</p>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: 'Dopad na ceny', value: scenario.impacts.price, icon: '💰' },
            { label: 'Dodávky', value: scenario.impacts.supply, icon: '📦' },
            { label: 'Dopad na EU', value: scenario.impacts.eu, icon: '🇪🇺' },
            { label: 'Dopad na ČR', value: scenario.impacts.czech, icon: '🇨🇿' },
          ].map((impact, i) => (
            <div key={i} className="rounded-lg border border-[#E2E8F0] bg-white p-3">
              <p className="text-xs text-[#64748B]">{impact.icon} {impact.label}</p>
              <p className="mt-1 text-sm font-medium text-[#0F172A]">{impact.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Restriction Slider */}
      <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-6">
        <h3 className="mb-2 text-lg font-bold text-[#0F172A]">
          Simulace: Jak moc se zhorší situace?
        </h3>
        <p className="mb-4 text-xs text-[#64748B]">
          Posuňte posuvník pro simulaci různé míry čínských restrikcí na export vzácných zemin.
        </p>

        <div className="mb-6">
          <input
            type="range"
            min={0}
            max={100}
            value={restrictionLevel}
            onChange={e => setRestrictionLevel(Number(e.target.value))}
            className="w-full accent-[#9D174D]"
          />
          <div className="mt-1 flex justify-between text-xs text-[#64748B]">
            <span>Bez restrikcí</span>
            <span className="font-medium" style={{
              color: restrictionLevel > 66 ? '#9D174D' : restrictionLevel > 33 ? '#D97706' : '#0E7490'
            }}>
              Míra restrikce: {restrictionLevel} %
            </span>
            <span>Úplné embargo</span>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-[#E2E8F0] bg-white p-4 text-center">
            <p className="text-xs text-[#64748B]">Cenový multiplikátor</p>
            <p className="font-mono text-2xl font-bold" style={{
              color: priceMultiplier > 3 ? '#9D174D' : priceMultiplier > 2 ? '#D97706' : '#0E7490'
            }}>
              {priceMultiplier.toFixed(1)}×
            </p>
          </div>
          <div className="rounded-lg border border-[#E2E8F0] bg-white p-4 text-center">
            <p className="text-xs text-[#64748B]">Odhad ceny oxidu dysprosia</p>
            <p className="font-mono text-2xl font-bold text-[#9D174D]">
              {Math.round(230 * priceMultiplier)} USD/kg
            </p>
          </div>
          <div className="rounded-lg border border-[#E2E8F0] bg-white p-4 text-center">
            <p className="text-xs text-[#64748B]">Dopad na cenu motoru elektromobilu</p>
            <p className="font-mono text-2xl font-bold text-[#D97706]">
              +{((priceMultiplier - 1) * 0.8).toFixed(1)} %
            </p>
          </div>
        </div>
      </div>

      {/* Vulnerability Radar */}
      <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-6">
        <h3 className="mb-2 text-lg font-bold text-[#0F172A]">
          Index zranitelnosti — radarový graf
        </h3>
        <p className="mb-4 text-xs text-[#64748B]">
          Porovnání zranitelnosti vybraných prvků podle čtyř dimenzí. 5 = nejvyšší riziko.
          Klikněte na prvek pro přidání/odebrání z grafu.
        </p>

        <div className="mb-4 flex flex-wrap gap-2">
          {allElements.map((el, i) => (
            <button
              key={el}
              onClick={() => toggleElement(el)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                selectedElements.includes(el)
                  ? 'text-white'
                  : 'bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]'
              }`}
              style={selectedElements.includes(el) ? { backgroundColor: RADAR_COLORS[selectedElements.indexOf(el) % RADAR_COLORS.length] } : {}}
            >
              {ELEMENT_NAMES[el] ?? el}
            </button>
          ))}
        </div>

        <ResponsiveContainer width="100%" height={700}>
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
            <PolarGrid stroke="#E2E8F0" />
            <PolarAngleAxis dataKey="dimension" tick={{ fill: '#475569', fontSize: 12 }} />
            <PolarRadiusAxis angle={90} domain={[0, 5]} tick={{ fill: '#64748B', fontSize: 10 }} />
            <Tooltip content={<CustomRadarTooltip />} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            {selectedElements.map((el, i) => (
              <Radar
                key={el}
                name={ELEMENT_NAMES[el] ?? el}
                dataKey={el}
                stroke={RADAR_COLORS[i % RADAR_COLORS.length]}
                fill={RADAR_COLORS[i % RADAR_COLORS.length]}
                fillOpacity={0.15}
                strokeWidth={2}
              />
            ))}
          </RadarChart>
        </ResponsiveContainer>

        {/* Vulnerability Scores Table */}
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[#E2E8F0]">
                <th className="px-2 py-1 text-left text-[#64748B]">Prvek</th>
                <th className="px-2 py-1 text-right text-[#64748B]">Koncentrace těžby</th>
                <th className="px-2 py-1 text-right text-[#64748B]">Koncentrace rafinace</th>
                <th className="px-2 py-1 text-right text-[#64748B]">Nahraditelnost</th>
                <th className="px-2 py-1 text-right text-[#64748B]">Recyklovatelnost</th>
                <th className="px-2 py-1 text-right text-[#64748B]">Volatilita tržní ceny</th>
                <th className="px-2 py-1 text-right text-[#64748B]">Strategický význam</th>
                <th className="px-2 py-1 text-right text-[#64748B]">Skóre</th>
                <th className="px-2 py-1 text-left text-[#64748B]">Profil</th>
              </tr>
            </thead>
            <tbody>
              {vulnerability.map((v, i) => {
                const score = Number(v['Composite Vulnerability Score'] ?? 0)
                const scoreColor = score >= 25 ? '#9D174D' : score >= 20 ? '#D97706' : '#0E7490'
                return (
                  <tr key={i} className="border-b border-[#E2E8F0]/50 hover:bg-[#F1F5F9]">
                    <td className="px-2 py-1 font-medium text-[#0F172A]">{ELEMENT_NAMES[v.Prvek as string] ?? v.Prvek as string}</td>
                    <td className="px-2 py-1 text-right font-mono text-[#475569]">{v['HHI Těžba'] as string}</td>
                    <td className="px-2 py-1 text-right font-mono text-[#475569]">{v['HHI Rafinace'] as string}</td>
                    <td className="px-2 py-1 text-right font-mono text-[#475569]">{v['Substituovatelnost (1–5)'] as string}</td>
                    <td className="px-2 py-1 text-right font-mono text-[#475569]">{v['Recyklovatelnost (1–5)'] as string}</td>
                    <td className="px-2 py-1 text-right font-mono text-[#475569]">{v['Cenová volatilita (1–5)'] as string}</td>
                    <td className="px-2 py-1 text-right font-mono text-[#475569]">{v['Strategický význam (1–5)'] as string}</td>
                    <td className="px-2 py-1 text-right font-mono font-bold" style={{ color: scoreColor }}>
                      {score}
                    </td>
                    <td className="px-2 py-1 text-[#9D174D]">{v['Rizikový profil'] as string}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <SourceAttribution source="USGS 2025, Adamas Intelligence, vlastní výpočty" />
      </div>

      {/* Historical Substitutions */}
      <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-6">
        <h3 className="mb-2 text-lg font-bold text-[#0F172A]">
          Historické příklady úspěšné substituce
        </h3>
        <p className="mb-4 text-xs text-[#64748B]">
          Tlak na ceny a dostupnost vzácných zemin už v minulosti vedl k úspěšnému nahrazení některých materiálů.
          Tyto případy ukazují, že substituce je možná — ale vyžaduje čas, investice a často kompromis ve výkonu.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border border-[#E2E8F0] bg-white p-4">
            <div className="mb-2 flex items-center gap-2">
              <span className="inline-block rounded-full bg-[#0E7490]/10 px-2 py-0.5 text-[10px] font-medium text-[#0E7490]">2011–2015</span>
            </div>
            <h4 className="text-sm font-bold text-[#0F172A]">Europium → LED osvětlení</h4>
            <p className="mt-1 text-xs leading-relaxed text-[#475569]">
              Europium byl klíčový pro červené luminofory v zářivkách. Přechod na LED technologii
              eliminoval většinu poptávky. Cena europia klesla o 95 % z vrcholu 2011.
            </p>
            <p className="mt-2 text-[10px] font-medium text-[#0E7490]">Úspěšnost: úplná náhrada</p>
          </div>
          <div className="rounded-lg border border-[#E2E8F0] bg-white p-4">
            <div className="mb-2 flex items-center gap-2">
              <span className="inline-block rounded-full bg-[#D97706]/10 px-2 py-0.5 text-[10px] font-medium text-[#D97706]">2012–2020</span>
            </div>
            <h4 className="text-sm font-bold text-[#0F172A]">Snížení dysprosia v magnetech</h4>
            <p className="mt-1 text-xs leading-relaxed text-[#475569]">
              Po cenové krizi 2011 vyvinuly firmy jako TDK a Shin-Etsu neodymové magnety s o 50 % nižším
              obsahem dysprosia díky technologii difúze po hranicích zrn. Výkon zůstal zachován.
            </p>
            <p className="mt-2 text-[10px] font-medium text-[#D97706]">Úspěšnost: částečná (snížení, ne eliminace)</p>
          </div>
          <div className="rounded-lg border border-[#E2E8F0] bg-white p-4">
            <div className="mb-2 flex items-center gap-2">
              <span className="inline-block rounded-full bg-[#D97706]/10 px-2 py-0.5 text-[10px] font-medium text-[#D97706]">2015–dosud</span>
            </div>
            <h4 className="text-sm font-bold text-[#0F172A]">Feritové magnety v malých motorech</h4>
            <p className="mt-1 text-xs leading-relaxed text-[#475569]">
              Pro méně náročné aplikace (domácí spotřebiče, ventilátory) byly neodymové magnety
              nahrazeny levnějšími feritovými. Nevhodné pro elektromobily — příliš nízký výkon na kilogram.
            </p>
            <p className="mt-2 text-[10px] font-medium text-[#D97706]">Úspěšnost: částečná (jen nízkovýkonové aplikace)</p>
          </div>
          <div className="rounded-lg border border-[#E2E8F0] bg-white p-4">
            <div className="mb-2 flex items-center gap-2">
              <span className="inline-block rounded-full bg-[#1D4ED8]/10 px-2 py-0.5 text-[10px] font-medium text-[#1D4ED8]">2020–dosud</span>
            </div>
            <h4 className="text-sm font-bold text-[#0F172A]">Motory bez permanentních magnetů</h4>
            <p className="mt-1 text-xs leading-relaxed text-[#475569]">
              BMW (iX3), Renault (Zoe) a čínský BYD používají v některých modelech synchronní motory
              s externím buzením nebo reluktanční motory bez vzácných zemin. Kompromis v účinnosti 3–5 %.
            </p>
            <p className="mt-2 text-[10px] font-medium text-[#1D4ED8]">Úspěšnost: probíhá (zatím okrajové využití)</p>
          </div>
          <div className="rounded-lg border border-[#E2E8F0] bg-white p-4">
            <div className="mb-2 flex items-center gap-2">
              <span className="inline-block rounded-full bg-[#9D174D]/10 px-2 py-0.5 text-[10px] font-medium text-[#9D174D]">dosud neúspěšné</span>
            </div>
            <h4 className="text-sm font-bold text-[#0F172A]">Nahrazení neodymu ve výkonných magnetech</h4>
            <p className="mt-1 text-xs leading-relaxed text-[#475569]">
              Přes desítky let výzkumu neexistuje alternativa k neodymovým magnetům pro větrné turbíny
              a výkonné elektromotory. Železo-nitridové a manganové magnety zůstávají v laboratorní fázi.
            </p>
            <p className="mt-2 text-[10px] font-medium text-[#9D174D]">Úspěšnost: žádná reálná alternativa</p>
          </div>
        </div>
        <SourceAttribution source="Shin-Etsu, TDK, výroční zprávy výrobců motorů, akademická literatura" />
      </div>
    </div>
  )
}
