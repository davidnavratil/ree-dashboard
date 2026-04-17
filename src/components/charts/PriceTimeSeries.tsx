'use client'

import { useState, useMemo } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine,
  Brush,
} from 'recharts'
import SourceAttribution from '@/components/ui/SourceAttribution'
import type { PricePoint, EventItem, PricesMeta } from '@/lib/types'
import type { Dictionary } from '@/i18n'
import { CHART_PALETTE } from '@/lib/colors'

interface Props {
  data: PricePoint[]
  events: EventItem[]
  meta: PricesMeta
  dict: Dictionary
}

function getElementKeys(dict: Dictionary) {
  const n = dict.prices.elementNames
  return [
    { key: 'Dy oxid USD/kg', label: n.Dy, default: false },
    { key: 'Pr oxid USD/kg', label: n.Pr, default: true },
    { key: 'Tb oxid USD/kg', label: n.Tb, default: false },
    { key: 'Ce oxid USD/kg', label: n.Ce, default: false },
    { key: 'La oxid USD/kg', label: n.La, default: false },
    { key: 'Sm oxid USD/kg', label: n.Sm, default: false },
    { key: 'Gd oxid USD/kg', label: n.Gd, default: false },
    { key: 'Eu oxid USD/kg', label: n.Eu, default: false },
  ]
}

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload) return null
  return (
    <div className="rounded-lg border border-[#E2E8F0] bg-white p-3 shadow-lg">
      <p className="mb-2 text-sm font-bold text-[#0F172A]">{label}</p>
      {payload.map((entry: any) => (
        <p key={entry.name} className="text-xs" style={{ color: entry.stroke }}>
          {entry.name}: {entry.value?.toFixed(1)} USD/kg
        </p>
      ))}
    </div>
  )
}

export default function PriceTimeSeries({ data, events, meta, dict }: Props) {
  const ELEMENT_KEYS = getElementKeys(dict)

  const [selected, setSelected] = useState<Set<string>>(
    new Set(ELEMENT_KEYS.filter((e) => e.default).map((e) => e.key))
  )
  const [showEvents, setShowEvents] = useState(true)

  const toggleElement = (key: string) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(key)) {
        next.delete(key)
      } else {
        next.add(key)
      }
      return next
    })
  }

  const chartData = useMemo(() =>
    data.map((d) => ({
      ...d,
      date: d.Date?.slice(0, 7),
    })),
    [data]
  )

  return (
    <div>
      {/* Controls */}
      <div className="mb-4 flex flex-wrap gap-2">
        {ELEMENT_KEYS.map((el, i) => (
          <button
            key={el.key}
            onClick={() => toggleElement(el.key)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              selected.has(el.key)
                ? 'text-white'
                : 'bg-[#F1F5F9] text-[#64748B] hover:bg-[#E2E8F0] hover:text-[#475569]'
            }`}
            style={selected.has(el.key) ? { backgroundColor: CHART_PALETTE[i % CHART_PALETTE.length] } : {}}
          >
            {el.label}
          </button>
        ))}
        <button
          onClick={() => setShowEvents(!showEvents)}
          className={`ml-auto rounded-lg px-3 py-1.5 text-xs font-medium ${
            showEvents ? 'bg-[#D97706] text-white' : 'bg-[#F1F5F9] text-[#64748B]'
          }`}
        >
          {showEvents ? dict.prices.hideEvents : dict.prices.showEvents}
        </button>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={450}>
        <LineChart data={chartData} margin={{ left: 10, right: 20, top: 5, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
          <XAxis
            dataKey="date"
            tick={{ fill: '#475569', fontSize: 11 }}
            interval="preserveStartEnd"
          />
          <YAxis tick={{ fill: '#475569', fontSize: 12 }} label={{ value: dict.charts.priceTimeSeries.yAxisLabel, angle: -90, position: 'insideLeft', fill: '#64748B', fontSize: 11 }} />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ fontSize: 11, color: '#475569' }} />

          {showEvents && events.map((event, i) => (
            <ReferenceLine
              key={i}
              x={event.Datum?.slice(0, 7)}
              stroke="#D9770680"
              strokeDasharray="3 3"
              label={{
                value: event.Udalost,
                position: 'top',
                fill: '#D97706',
                fontSize: 9,
                angle: -45,
              }}
            />
          ))}

          {ELEMENT_KEYS.map((el, i) =>
            selected.has(el.key) ? (
              <Line
                key={el.key}
                type="monotone"
                dataKey={el.key}
                name={el.label}
                stroke={CHART_PALETTE[i % CHART_PALETTE.length]}
                strokeWidth={2}
                dot={false}
                connectNulls
              />
            ) : null
          )}
          <Brush
            dataKey="date"
            height={30}
            stroke="#0E7490"
            fill="#F8FAFC"
            travellerWidth={10}
          />
        </LineChart>
      </ResponsiveContainer>
      <SourceAttribution source={dict.charts.priceTimeSeries.source} dict={dict} />
    </div>
  )
}
