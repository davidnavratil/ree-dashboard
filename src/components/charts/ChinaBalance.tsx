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
import type { ChinaBalance as ChinaBalanceType } from '@/lib/types'
import { parseNumericString } from '@/lib/format'

interface Props {
  data: ChinaBalanceType[]
}

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload) return null
  return (
    <div className="rounded-lg border border-[#E2E8F0] bg-white p-3 shadow-lg">
      <p className="mb-2 text-sm font-bold text-[#0F172A]">{label}</p>
      {payload.map((entry: any) => (
        <p key={entry.name} className="text-xs" style={{ color: entry.fill }}>
          {entry.name}: {entry.value?.toFixed(0)} kt
        </p>
      ))}
    </div>
  )
}

export default function ChinaBalanceChart({ data }: Props) {
  const years = ['2018', '2020', '2022', '2024e', '2030p']

  const tezbaRow = data.find((d) => d.Metrika?.includes('Těžba'))
  const spotrebaRow = data.find((d) => d.Metrika?.includes('spotřeba'))
  const exportRow = data.find((d) => d.Metrika?.includes('Export') || d.Metrika?.includes('export'))

  const chartData = years.map((year) => ({
    year: year.replace('e', ' (odhad)').replace('p', ' (projekce)'),
    'Těžba': parseNumericString(tezbaRow?.[year] as any) ?? 0,
    'Domácí spotřeba': parseNumericString(spotrebaRow?.[year] as any) ?? 0,
    'Volný export': Math.max(0,
      (parseNumericString(tezbaRow?.[year] as any) ?? 0) -
      (parseNumericString(spotrebaRow?.[year] as any) ?? 0)
    ),
  }))

  return (
    <div>
      <h3 className="mb-4 text-lg font-bold text-[#0F172A]">
        Čínská bilance vzácných zemin
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} margin={{ left: 10, right: 20, top: 5, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
          <XAxis dataKey="year" tick={{ fill: '#475569', fontSize: 11 }} />
          <YAxis tick={{ fill: '#475569', fontSize: 12 }} label={{ value: 'kt REO', angle: -90, position: 'insideLeft', fill: '#64748B', fontSize: 11 }} />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ fontSize: 12, color: '#475569' }} />
          <Bar dataKey="Těžba" fill="#9D174D" />
          <Bar dataKey="Domácí spotřeba" fill="#D97706" />
          <Bar dataKey="Volný export" fill="#0E7490" />
        </BarChart>
      </ResponsiveContainer>
      <SourceAttribution source="USGS 2025, MII Čína, odhady Adamas Intelligence" />
    </div>
  )
}
