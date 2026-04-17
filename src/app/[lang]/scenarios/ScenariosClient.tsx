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
import type { Dictionary } from '@/i18n'
import SourceAttribution from '@/components/ui/SourceAttribution'

interface Props {
  vulnerability: VulnerabilityItem[]
  dict: Dictionary
  lang: string
}

const SCENARIO_IDS = ['baseline', 'escalation', 'decoupling', 'breakthrough'] as const
const SCENARIO_COLORS = ['#0E7490', '#D97706', '#9D174D', '#0E7490']
const SCENARIO_SEVERITIES = ['low', 'medium', 'high', 'positive']

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

export default function ScenariosClient({ vulnerability, dict, lang }: Props) {
  const t = dict.scenarios

  // Build scenarios from dictionary
  const SCENARIOS = useMemo(() =>
    t.cards.map((card, i) => ({
      id: SCENARIO_IDS[i],
      title: card.title,
      subtitle: card.subtitle,
      color: SCENARIO_COLORS[i],
      severity: SCENARIO_SEVERITIES[i],
      description: card.description,
      impacts: card.impacts,
    })),
    [t.cards]
  )

  const [activeScenario, setActiveScenario] = useState<string>('baseline')
  const [selectedElements, setSelectedElements] = useState<string[]>(['Nd', 'Dy', 'Tb'])
  const [restrictionLevel, setRestrictionLevel] = useState(50)

  const scenario = SCENARIOS.find(s => s.id === activeScenario)!

  const ELEMENT_NAMES = t.elementNames as Record<string, string>

  // Build radar data from vulnerability scores
  const radarDimensions = useMemo(() => [
    { key: 'Substituovatelnost (1–5)', label: t.radarDimensions.substitutability },
    { key: 'Recyklovatelnost (1–5)', label: t.radarDimensions.recyclability },
    { key: 'Cenová volatilita (1–5)', label: t.radarDimensions.priceVolatility },
    { key: 'Strategický význam (1–5)', label: t.radarDimensions.strategicImportance },
  ], [t.radarDimensions])

  const radarData = useMemo(() => {
    return radarDimensions.map(dim => {
      const point: any = { dimension: dim.label }
      selectedElements.forEach(symbol => {
        const item = vulnerability.find(v => v.Prvek === symbol)
        if (item) {
          point[symbol] = Number(item[dim.key] ?? 0)
        }
      })
      return point
    })
  }, [vulnerability, selectedElements, radarDimensions])

  const RADAR_COLORS = ['#9D174D', '#0E7490', '#D97706', '#0E7490', '#1D4ED8']
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
            { label: t.impactLabels.price, value: scenario.impacts.price, icon: '\u{1F4B0}' },
            { label: t.impactLabels.supply, value: scenario.impacts.supply, icon: '\u{1F4E6}' },
            { label: t.impactLabels.eu, value: scenario.impacts.eu, icon: '\u{1F1EA}\u{1F1FA}' },
            { label: t.impactLabels.czech, value: scenario.impacts.czech, icon: '\u{1F1E8}\u{1F1FF}' },
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
          {t.simulatorTitle}
        </h3>
        <p className="mb-4 text-xs text-[#64748B]">
          {t.simulatorDesc}
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
            <span>{t.sliderLabels.noRestrictions}</span>
            <span className="font-medium" style={{
              color: restrictionLevel > 66 ? '#9D174D' : restrictionLevel > 33 ? '#D97706' : '#0E7490'
            }}>
              {t.sliderLabels.restrictionLevel} {restrictionLevel} %
            </span>
            <span>{t.sliderLabels.fullEmbargo}</span>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-[#E2E8F0] bg-white p-4 text-center">
            <p className="text-xs text-[#64748B]">{t.simulatorMetrics.priceMultiplier}</p>
            <p className="font-mono text-2xl font-bold" style={{
              color: priceMultiplier > 3 ? '#9D174D' : priceMultiplier > 2 ? '#D97706' : '#0E7490'
            }}>
              {priceMultiplier.toFixed(1)}×
            </p>
          </div>
          <div className="rounded-lg border border-[#E2E8F0] bg-white p-4 text-center">
            <p className="text-xs text-[#64748B]">{t.simulatorMetrics.dyOxidePrice}</p>
            <p className="font-mono text-2xl font-bold text-[#9D174D]">
              {Math.round(230 * priceMultiplier)} USD/kg
            </p>
          </div>
          <div className="rounded-lg border border-[#E2E8F0] bg-white p-4 text-center">
            <p className="text-xs text-[#64748B]">{t.simulatorMetrics.evMotorImpact}</p>
            <p className="font-mono text-2xl font-bold text-[#D97706]">
              +{((priceMultiplier - 1) * 0.8).toFixed(1)} %
            </p>
          </div>
        </div>
      </div>

      {/* Vulnerability Radar */}
      <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-6">
        <h3 className="mb-2 text-lg font-bold text-[#0F172A]">
          {t.radarTitle}
        </h3>
        <p className="mb-4 text-xs text-[#64748B]">
          {t.radarDesc}
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
                <th className="px-2 py-1 text-left text-[#64748B]">{t.vulnerabilityHeaders.element}</th>
                <th className="px-2 py-1 text-right text-[#64748B]">{t.vulnerabilityHeaders.miningConcentration}</th>
                <th className="px-2 py-1 text-right text-[#64748B]">{t.vulnerabilityHeaders.refiningConcentration}</th>
                <th className="px-2 py-1 text-right text-[#64748B]">{t.vulnerabilityHeaders.substitutability}</th>
                <th className="px-2 py-1 text-right text-[#64748B]">{t.vulnerabilityHeaders.recyclability}</th>
                <th className="px-2 py-1 text-right text-[#64748B]">{t.vulnerabilityHeaders.priceVolatility}</th>
                <th className="px-2 py-1 text-right text-[#64748B]">{t.vulnerabilityHeaders.strategicImportance}</th>
                <th className="px-2 py-1 text-right text-[#64748B]">{t.vulnerabilityHeaders.score}</th>
                <th className="px-2 py-1 text-left text-[#64748B]">{t.vulnerabilityHeaders.profile}</th>
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
                    <td className="px-2 py-1 text-[#9D174D]">{(dict.elements.riskProfiles as Record<string, string>)[v.Prvek as string] ?? v['Rizikový profil'] as string}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <SourceAttribution source={t.vulnerabilitySource} dict={dict} />
      </div>

      {/* Historical Substitutions */}
      <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-6">
        <h3 className="mb-2 text-lg font-bold text-[#0F172A]">
          {t.substitutionTitle}
        </h3>
        <p className="mb-4 text-xs text-[#64748B]">
          {t.substitutionDesc}
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {t.substitutions.map((sub, i) => {
            const periodColors = ['#0E7490', '#D97706', '#D97706', '#1D4ED8', '#9D174D']
            const color = periodColors[i] ?? '#64748B'
            return (
              <div key={i} className="rounded-lg border border-[#E2E8F0] bg-white p-4">
                <div className="mb-2 flex items-center gap-2">
                  <span
                    className="inline-block rounded-full px-2 py-0.5 text-[10px] font-medium"
                    style={{ backgroundColor: `${color}15`, color }}
                  >
                    {sub.period}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-[#0F172A]">{sub.title}</h4>
                <p className="mt-1 text-xs leading-relaxed text-[#475569]">
                  {sub.text}
                </p>
                <p className="mt-2 text-[10px] font-medium" style={{ color }}>{sub.success}</p>
              </div>
            )
          })}
        </div>
        <SourceAttribution source={t.substitutionSource} dict={dict} />
      </div>
    </div>
  )
}
