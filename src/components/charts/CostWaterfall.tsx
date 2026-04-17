'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from 'recharts'
import SourceAttribution from '@/components/ui/SourceAttribution'
import type { CostBreakdown } from '@/lib/types'
import type { Dictionary } from '@/i18n'
import { parseNumericString } from '@/lib/format'

interface Props {
  data: CostBreakdown[]
  dict: Dictionary
}

const BAR_COLORS = [
  '#94A3B8', // ruda - low
  '#64748B',
  '#0E7490',
  '#0E7490',
  '#D97706',
  '#D97706',
  '#9D174D',
  '#9D174D', // magnet - high
]

function CustomTooltip({ active, payload, multiplierLabel }: any) {
  if (!active || !payload?.[0]) return null
  const d = payload[0].payload
  return (
    <div className="max-w-xs rounded-lg border border-[#E2E8F0] bg-white p-3 shadow-lg">
      <p className="text-sm font-bold text-[#0F172A]">{d.name}</p>
      <p className="text-xs text-[#475569]">{d.product}</p>
      <p className="mt-1 font-mono text-sm text-[#0E7490]">{d.price} USD/kg</p>
      <p className="text-xs text-[#D97706]">{multiplierLabel} {d.multiplier}</p>
      <p className="mt-1 text-xs text-[#64748B]">{d.dominant}</p>
    </div>
  )
}

export default function CostWaterfall({ data, dict }: Props) {
  const stageNames = (dict.charts.costWaterfall as any).stageNames as Record<string, string> | undefined
  const products = (dict.charts.costWaterfall as any).products as Record<string, string> | undefined
  const dominantPlayers = (dict.charts.costWaterfall as any).dominantPlayers as Record<string, string> | undefined

  const chartData = data.map((row) => {
    const price = parseNumericString(row['Typická cena (USD/kg)'] as string) ?? 0
    const rawName = (row['Stupeň řetězce'] as string)?.replace(/^\d+\.\s*/, '')
    const rawProduct = row['Produkt'] as string
    const rawDominant = row['Dominantní hráč'] as string
    return {
      name: stageNames?.[rawName] ?? rawName,
      product: products?.[rawProduct] ?? rawProduct,
      price,
      multiplier: row['Multiplikátor vs. ruda'] as string,
      dominant: dominantPlayers?.[rawDominant] ?? rawDominant,
    }
  })

  return (
    <div>
      <h3 className="mb-2 text-lg font-bold text-[#0F172A]">
        {dict.charts.costWaterfall.title}
      </h3>
      <p className="mb-4 text-sm text-[#475569]">
        {dict.charts.costWaterfall.description}
      </p>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={chartData} margin={{ left: 10, right: 30, top: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
          <XAxis
            dataKey="name"
            tick={{ fill: '#475569', fontSize: 10 }}
            interval={0}
            angle={-20}
            textAnchor="end"
            height={60}
          />
          <YAxis
            tick={{ fill: '#475569', fontSize: 12 }}
            label={{ value: dict.charts.costWaterfall.yAxisLabel, angle: -90, position: 'insideLeft', fill: '#64748B', fontSize: 11 }}
            scale="log"
            domain={[0.3, 500]}
            allowDataOverflow
          />
          <Tooltip content={<CustomTooltip multiplierLabel={dict.charts.costWaterfall.tooltipMultiplier} />} />
          <Bar dataKey="price" radius={[4, 4, 0, 0]}>
            {chartData.map((_, i) => (
              <Cell key={i} fill={BAR_COLORS[i % BAR_COLORS.length]} />
            ))}
            <LabelList
              dataKey="multiplier"
              position="top"
              fill="#D97706"
              fontSize={10}
              fontWeight="bold"
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <SourceAttribution source={dict.charts.costWaterfall.source} dict={dict} />
    </div>
  )
}
