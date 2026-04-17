'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import SourceAttribution from '@/components/ui/SourceAttribution'
import type { SupplyChainStage } from '@/lib/types'
import type { Dictionary } from '@/i18n'
import { parseNumericString } from '@/lib/format'

interface Props {
  data: SupplyChainStage[]
  dict: Dictionary
}

function getCountries(dict: Dictionary) {
  const c = dict.charts.concentration.countries
  return [
    { key: 'Čína (%)', color: '#DC2626', label: c.china },
    { key: 'USA (%)', color: '#374151', label: c.usa },
    { key: 'Austrálie (%)', color: '#FBBF24', label: c.australia },
    { key: 'Myanmar (%)', color: '#F97316', label: c.myanmar },
    { key: 'Japonsko (%)', color: '#EC4899', label: c.japan },
    { key: 'EU (%)', color: '#1D4ED8', label: c.eu },
    { key: 'Ostatní (%)', color: '#CBD5E1', label: c.other },
  ]
}

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload) return null
  return (
    <div className="rounded-lg border border-[#E2E8F0] bg-white p-3 shadow-lg">
      <p className="mb-2 text-sm font-bold text-[#0F172A]">{label}</p>
      {payload.map((entry: any) => (
        <p key={entry.name} className="text-xs" style={{ color: entry.fill }}>
          {entry.name}: {typeof entry.value === 'number' ? entry.value.toFixed(1) : entry.value} %
        </p>
      ))}
    </div>
  )
}

export default function ConcentrationCascade({ data, dict }: Props) {
  const COUNTRIES = getCountries(dict)
  const lm = dict.charts.concentration.labelMap

  const LABEL_MAP: Record<string, string> = {
    'Těžba': lm.mining,
    'Výroba NdFeB magnetů': lm.ndfebMagnets,
    'Separace Dy/Tb': lm.dyTbSeparation,
    'Výroba SmCo magnetů': lm.smCoMagnets,
    'Konverze oxid → kov/slitina': lm.oxideConversion,
    'Separace → oxidy': lm.separationOxides,
    'Koncentrace rudy': lm.oreConcentration,
  }

  const chartData = data.map((row) => {
    const shortLabel = row['Stupeň řetězce'].replace(/^\d+\.\s*/, '').replace(/\s*\(.*\)/, '')
    const result: any = { name: LABEL_MAP[shortLabel] ?? shortLabel }
    COUNTRIES.forEach(({ key }) => {
      result[key] = parseNumericString(row[key as keyof SupplyChainStage] as any) ?? 0
    })
    return result
  })

  return (
    <div>
      <h3 className="mb-4 text-lg font-bold text-[#0F172A]">
        {dict.charts.concentration.title}
      </h3>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={chartData} layout="vertical" margin={{ left: 10, right: 20, top: 5, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" horizontal={false} />
          <XAxis type="number" domain={[0, 100]} tick={{ fill: '#475569', fontSize: 12 }} tickFormatter={(v) => `${v}%`} />
          <YAxis
            dataKey="name"
            type="category"
            width={140}
            tick={{ fill: '#475569', fontSize: 11 }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ fontSize: 11, color: '#475569' }} />
          {COUNTRIES.map(({ key, color, label }) => (
            <Bar key={key} dataKey={key} name={label} stackId="a" fill={color} />
          ))}
        </BarChart>
      </ResponsiveContainer>
      <SourceAttribution source={dict.charts.concentration.source} dict={dict} />
    </div>
  )
}
