'use client'

import { useState } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
} from 'recharts'
import type { DemandRow } from '@/lib/types'
import type { Dictionary } from '@/i18n'
import SourceAttribution from '@/components/ui/SourceAttribution'

interface MaterialIntensity {
  [key: string]: string | number | null
}

interface Projection {
  [key: string]: string | number | null
}

interface Props {
  demand: DemandRow[]
  materialIntensity: MaterialIntensity[]
  projections: Projection[]
  dict: Dictionary
  lang: string
}

const ELEMENTS = ['Nd', 'Pr', 'Dy', 'Tb', 'La', 'Ce', 'Sm', 'Y', 'Gd', 'Sc']
const DOTS_TO_VALUE: Record<string, number> = { '●●●': 3, '●●': 2, '●': 1, '—': 0 }

function getTrendColor(trend: string, trendLabels: Dictionary['demand']['trendLabels']): string {
  const t = trend?.toLowerCase() ?? ''
  if (trend === trendLabels.fastest || t.includes('nejrychlej') || t.includes('fastest')) return '#9D174D'
  if (trend === trendLabels.fast || t.includes('rychlý') || t.includes('fast')) return '#D97706'
  if (trend === trendLabels.moderate || t.includes('mírn') || t.includes('moderate')) return '#0E7490'
  if (trend === trendLabels.stable || t.includes('stabil') || t.includes('stálý') || t.includes('stable')) return '#64748B'
  if (trend === trendLabels.decline || t.includes('klesaj') || t.includes('decline') || t.includes('declining')) return '#0E7490'
  if (t.includes('strategick') || t.includes('strategic') || t.includes('kritick') || t.includes('critical')) return '#9D174D'
  if (t.includes('vznikaj') || t.includes('emerging') || t.includes('růst') || t.includes('growth')) return '#D97706'
  return '#64748B'
}

function DemandHeatmap({ demand, dict }: { demand: DemandRow[]; dict: Dictionary }) {
  const t = dict.demand
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b border-[#E2E8F0]">
            <th className="px-2 py-2 text-left text-[#64748B]">{t.sectorHeaders.sector}</th>
            {ELEMENTS.map(el => (
              <th key={el} className="px-1 py-2 text-center text-[#64748B]">{el}</th>
            ))}
            <th className="px-2 py-2 text-right text-[#64748B]">{t.sectorHeaders.valueShare}</th>
            <th className="px-2 py-2 text-left text-[#64748B]">{t.sectorHeaders.trend}</th>
          </tr>
        </thead>
        <tbody>
          {demand.map((row, i) => (
            <tr key={i} className="border-b border-[#E2E8F0]/50 hover:bg-[#F1F5F9]">
              <td className="px-2 py-2 font-medium text-[#0F172A] whitespace-nowrap">
                {(t.sectorNameMap as Record<string, string>)?.[row.Sektor as string] ?? row.Sektor as string}
              </td>
              {ELEMENTS.map(el => {
                const val = DOTS_TO_VALUE[row[el] as string] ?? 0
                const bg = val === 3 ? '#9D174D' : val === 2 ? '#D97706' : val === 1 ? '#0E7490' : 'transparent'
                const textColor = val >= 2 ? '#FFFFFF' : val === 1 ? '#FFFFFF' : '#CBD5E1'
                return (
                  <td key={el} className="px-1 py-2 text-center">
                    {val > 0 && (
                      <span
                        className="inline-block rounded px-1.5 py-0.5 text-[10px] font-bold"
                        style={{ backgroundColor: bg, color: textColor }}
                      >
                        {row[el] as string}
                      </span>
                    )}
                    {val === 0 && <span className="text-[#CBD5E1]">—</span>}
                  </td>
                )
              })}
              <td className="px-2 py-2 text-right font-mono text-[#0E7490]">
                {row['Podíl na hodnotě REE (%)'] as string}
              </td>
              <td className="px-2 py-2">
                <span
                  className="rounded-full px-2 py-0.5 text-[10px] font-medium"
                  style={{
                    backgroundColor: `${getTrendColor(row.Trend as string, t.trendLabels)}15`,
                    color: getTrendColor(row.Trend as string, t.trendLabels),
                  }}
                >
                  {(t.trendMap as Record<string, string>)?.[row.Trend as string] ?? row.Trend as string}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function MaterialIntensityCards({ data, dict }: { data: MaterialIntensity[]; dict: Dictionary }) {
  const [expanded, setExpanded] = useState<number | null>(null)
  const t = dict.demand

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {data.map((item, i) => (
        <button
          key={i}
          onClick={() => setExpanded(expanded === i ? null : i)}
          className="rounded-lg border border-[#E2E8F0] bg-white p-4 text-left transition-all hover:bg-[#F1F5F9] hover:shadow-sm"
        >
          <p className="text-sm font-bold text-[#0F172A]">{(t.technologyNameMap as Record<string, string>)?.[item.Technologie as string] ?? item.Technologie as string}</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-mono text-lg font-bold text-[#0E7490]">
              {item['NdFeB magnety (kg)'] as string}
            </span>
            <span className="text-xs text-[#64748B]">{t.materialUnit}</span>
          </div>
          <p className="mt-1 text-xs text-[#D97706]">
            {item['Hodnota REE (USD, ~2025)'] as string} USD
          </p>
          {expanded === i && (
            <div className="mt-3 space-y-1 border-t border-[#E2E8F0] pt-3 text-xs text-[#475569]">
              <p>Nd+Pr: {item['Nd+Pr obsah (kg)'] as string} kg</p>
              <p>Dy: {item['Dy obsah (kg)'] as string} kg</p>
              <p>Tb: {item['Tb obsah (kg)'] as string} kg</p>
              <p className="text-[10px] text-[#94A3B8]">{(t.noteMap as Record<string, string>)?.[item['Poznámka'] as string] ?? item['Poznámka'] as string}</p>
            </div>
          )}
        </button>
      ))}
    </div>
  )
}

function ProjectionsTable({ data, dict }: { data: Projection[]; dict: Dictionary }) {
  const t = dict.demand
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b border-[#E2E8F0]">
            <th className="px-2 py-2 text-left text-[#64748B]">{t.projectionsHeaders.sourceScenario}</th>
            <th className="px-2 py-2 text-left text-[#64748B]">{t.projectionsHeaders.metric}</th>
            <th className="px-2 py-2 text-right text-[#64748B]">2024</th>
            <th className="px-2 py-2 text-right text-[#64748B]">2030</th>
            <th className="px-2 py-2 text-right text-[#64748B]">2035</th>
            <th className="px-2 py-2 text-right text-[#64748B]">2040</th>
            <th className="px-2 py-2 text-right text-[#64748B]">{t.projectionsHeaders.cagr}</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} className="border-b border-[#E2E8F0]/50 hover:bg-[#F1F5F9]">
              <td className="px-2 py-2 font-medium text-[#0F172A] whitespace-nowrap">
                {(t.projectionSourceMap as Record<string, string>)?.[row['Zdroj / Scénář'] as string] ?? row['Zdroj / Scénář'] as string}
              </td>
              <td className="px-2 py-2 text-[#475569] max-w-[200px] truncate">
                {(t.projectionMetricMap as Record<string, string>)?.[row.Metrika as string] ?? row.Metrika as string}
              </td>
              <td className="px-2 py-2 text-right font-mono text-[#475569]">{row['2024'] as string}</td>
              <td className="px-2 py-2 text-right font-mono font-medium text-[#0E7490]">{row['2030'] as string}</td>
              <td className="px-2 py-2 text-right font-mono text-[#D97706]">{row['2035'] as string}</td>
              <td className="px-2 py-2 text-right font-mono text-[#9D174D]">{row['2040'] as string}</td>
              <td className="px-2 py-2 text-right font-mono font-bold text-[#0F172A]">{row['CAGR (%)'] as string}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function DemandClient({ demand, materialIntensity, projections, dict, lang }: Props) {
  const t = dict.demand

  return (
    <div className="space-y-8">
      {/* Demand Heatmap */}
      <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-6">
        <h3 className="mb-2 text-lg font-bold text-[#0F172A]">
          {t.sectorTitle}
        </h3>
        <p className="mb-4 text-xs text-[#64748B]">
          {t.sectorDesc}
        </p>
        <DemandHeatmap demand={demand} dict={dict} />
        <SourceAttribution source={t.sectorSource} dict={dict} />
      </div>

      {/* Material Intensity */}
      <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-6">
        <h3 className="mb-2 text-lg font-bold text-[#0F172A]">
          {t.materialTitle}
        </h3>
        <p className="mb-4 text-xs text-[#64748B]">
          {t.materialDesc}
        </p>
        <MaterialIntensityCards data={materialIntensity} dict={dict} />
        <SourceAttribution source={t.materialSource} dict={dict} />
      </div>

      {/* Projections Table */}
      <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-6">
        <h3 className="mb-2 text-lg font-bold text-[#0F172A]">
          {t.projectionsTitle}
        </h3>
        <p className="mb-4 text-xs text-[#64748B]">
          {t.projectionsDesc}
        </p>
        <ProjectionsTable data={projections} dict={dict} />
        <SourceAttribution source={t.projectionsSource} dict={dict} />
      </div>
    </div>
  )
}
