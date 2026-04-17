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
import type { Dictionary } from '@/i18n'
import { parseNumericString } from '@/lib/format'

interface Props {
  data: ChinaBalanceType[]
  dict: Dictionary
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

export default function ChinaBalanceChart({ data, dict }: Props) {
  const years = ['2018', '2020', '2022', '2024e', '2030p']
  const s = dict.charts.chinaBalance.seriesNames
  const suffixes = dict.charts.chinaBalance.yearSuffixes

  const tezbaRow = data.find((d) => d.Metrika?.includes('Těžba'))
  const spotrebaRow = data.find((d) => d.Metrika?.includes('spotřeba'))
  const exportRow = data.find((d) => d.Metrika?.includes('Export') || d.Metrika?.includes('export'))

  const chartData = years.map((year) => ({
    year: year.replace('e', ` ${suffixes.estimate}`).replace('p', ` ${suffixes.projection}`),
    [s.mining]: parseNumericString(tezbaRow?.[year] as any) ?? 0,
    [s.domesticConsumption]: parseNumericString(spotrebaRow?.[year] as any) ?? 0,
    [s.freeExport]: Math.max(0,
      (parseNumericString(tezbaRow?.[year] as any) ?? 0) -
      (parseNumericString(spotrebaRow?.[year] as any) ?? 0)
    ),
  }))

  return (
    <div>
      <h3 className="mb-4 text-lg font-bold text-[#0F172A]">
        {dict.charts.chinaBalance.title}
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} margin={{ left: 10, right: 20, top: 5, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
          <XAxis dataKey="year" tick={{ fill: '#475569', fontSize: 11 }} />
          <YAxis tick={{ fill: '#475569', fontSize: 12 }} label={{ value: dict.charts.chinaBalance.yAxisLabel, angle: -90, position: 'insideLeft', fill: '#64748B', fontSize: 11 }} />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ fontSize: 12, color: '#475569' }} />
          <Bar dataKey={s.mining} fill="#9D174D" />
          <Bar dataKey={s.domesticConsumption} fill="#D97706" />
          <Bar dataKey={s.freeExport} fill="#0E7490" />
        </BarChart>
      </ResponsiveContainer>
      <SourceAttribution source={dict.charts.chinaBalance.source} dict={dict} />
    </div>
  )
}
