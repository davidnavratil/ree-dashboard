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
import { parseNumericString } from '@/lib/format'

interface Props {
  data: SupplyChainStage[]
}

const COUNTRIES = [
  { key: 'Čína (%)', color: '#DC2626', label: 'Čína' },
  { key: 'USA (%)', color: '#374151', label: 'USA' },
  { key: 'Austrálie (%)', color: '#FBBF24', label: 'Austrálie' },
  { key: 'Myanmar (%)', color: '#F97316', label: 'Myanmar' },
  { key: 'Japonsko (%)', color: '#EC4899', label: 'Japonsko' },
  { key: 'EU (%)', color: '#1D4ED8', label: 'EU' },
  { key: 'Ostatní (%)', color: '#CBD5E1', label: 'Ostatní' },
]

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

export default function ConcentrationCascade({ data }: Props) {
  // Replace technical abbreviations with readable Czech labels
  const LABEL_MAP: Record<string, string> = {
    'Výroba NdFeB magnetů': 'Neodymové\nmagnety',
    'Separace Dy/Tb': 'Separace\ndysprosia a terbia',
    'Výroba SmCo magnetů': 'Samariumkobaltové\nmagnety',
    'Konverze oxid → kov/slitina': 'Konverze oxid\n→ kov/slitina',
    'Separace → oxidy': 'Separace\n→ oxidy',
    'Koncentrace rudy': 'Koncentrace\nrudy',
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
        Koncentrace dodavatelského řetězce podle zemí
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
      <SourceAttribution source="USGS 2025" />
    </div>
  )
}
