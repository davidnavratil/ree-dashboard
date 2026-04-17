'use client'

import {
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine,
} from 'recharts'
import SourceAttribution from '@/components/ui/SourceAttribution'
import type { GapDataPoint } from '@/lib/types'
import type { Dictionary } from '@/i18n'
import { parseNumericString } from '@/lib/format'

interface Props {
  data: GapDataPoint[]
  dict: Dictionary
}

function CustomTooltip({ active, payload, label, tooltipYear }: any) {
  if (!active || !payload) return null
  return (
    <div className="rounded-lg border border-[#E2E8F0] bg-white p-3 shadow-lg">
      <p className="mb-2 text-sm font-bold text-[#0F172A]">{tooltipYear} {label}</p>
      {payload.map((entry: any) => (
        <p key={entry.name} className="text-xs" style={{ color: entry.color }}>
          {entry.name}: {entry.value?.toFixed(0)} kt
        </p>
      ))}
    </div>
  )
}

export default function GapChart({ data, dict }: Props) {
  const chartData = data
    .filter((d) => d.Rok && parseNumericString(d['Poptávka (kt NdPr)']) !== null)
    .map((d) => {
      const demand = parseNumericString(d['Poptávka (kt NdPr)']) ?? 0
      const supply = parseNumericString(d['Nabídka (kt NdPr)']) ?? 0
      return {
        year: d.Rok,
        demand,
        supply,
        gap: supply - demand,
      }
    })

  const s = dict.charts.gap.seriesNames

  return (
    <div>
      <h3 className="mb-4 text-lg font-bold text-[#0F172A]">
        {dict.charts.gap.title}
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={chartData} margin={{ left: 10, right: 20, top: 5, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
          <XAxis dataKey="year" tick={{ fill: '#475569', fontSize: 12 }} />
          <YAxis tick={{ fill: '#475569', fontSize: 12 }} label={{ value: dict.charts.gap.yAxisLabel, angle: -90, position: 'insideLeft', fill: '#64748B', fontSize: 11 }} />
          <Tooltip content={<CustomTooltip tooltipYear={dict.charts.gap.tooltipYear} />} />
          <Legend wrapperStyle={{ fontSize: 12, color: '#475569' }} />
          <ReferenceLine y={0} stroke="#E2E8F0" />
          <Area
            type="monotone"
            dataKey="gap"
            name={s.gap}
            fill="#9D174D20"
            stroke="none"
          />
          <Line
            type="monotone"
            dataKey="demand"
            name={s.demand}
            stroke="#0E7490"
            strokeWidth={2.5}
            dot={{ fill: '#0E7490', r: 3 }}
          />
          <Line
            type="monotone"
            dataKey="supply"
            name={s.supply}
            stroke="#1D4ED8"
            strokeWidth={2.5}
            dot={{ fill: '#1D4ED8', r: 3 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
      <SourceAttribution source={dict.charts.gap.source} dict={dict} />
    </div>
  )
}
