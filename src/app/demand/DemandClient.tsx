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
}

const ELEMENTS = ['Nd', 'Pr', 'Dy', 'Tb', 'La', 'Ce', 'Sm', 'Y', 'Gd', 'Sc']
const DOTS_TO_VALUE: Record<string, number> = { '●●●': 3, '●●': 2, '●': 1, '—': 0 }

const TREND_COLORS: Record<string, string> = {
  'Nejrychlejší růst': '#9D174D',
  'Rychlý růst': '#D97706',
  'Mírný růst': '#0E7490',
  'Stabilní': '#64748B',
  'Pokles': '#0E7490',
}

function DemandHeatmap({ demand }: { demand: DemandRow[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b border-[#E2E8F0]">
            <th className="px-2 py-2 text-left text-[#64748B]">Sektor</th>
            {ELEMENTS.map(el => (
              <th key={el} className="px-1 py-2 text-center text-[#64748B]">{el}</th>
            ))}
            <th className="px-2 py-2 text-right text-[#64748B]">Podíl hodnoty</th>
            <th className="px-2 py-2 text-left text-[#64748B]">Trend</th>
          </tr>
        </thead>
        <tbody>
          {demand.map((row, i) => (
            <tr key={i} className="border-b border-[#E2E8F0]/50 hover:bg-[#F1F5F9]">
              <td className="px-2 py-2 font-medium text-[#0F172A] whitespace-nowrap">
                {row.Sektor as string}
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
                    backgroundColor: `${TREND_COLORS[row.Trend as string] ?? '#64748B'}15`,
                    color: TREND_COLORS[row.Trend as string] ?? '#64748B',
                  }}
                >
                  {row.Trend as string}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function MaterialIntensityCards({ data }: { data: MaterialIntensity[] }) {
  const [expanded, setExpanded] = useState<number | null>(null)

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {data.map((item, i) => (
        <button
          key={i}
          onClick={() => setExpanded(expanded === i ? null : i)}
          className="rounded-lg border border-[#E2E8F0] bg-white p-4 text-left transition-all hover:bg-[#F1F5F9] hover:shadow-sm"
        >
          <p className="text-sm font-bold text-[#0F172A]">{item.Technologie as string}</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-mono text-lg font-bold text-[#0E7490]">
              {item['NdFeB magnety (kg)'] as string}
            </span>
            <span className="text-xs text-[#64748B]">kg NdFeB</span>
          </div>
          <p className="mt-1 text-xs text-[#D97706]">
            {item['Hodnota REE (USD, ~2025)'] as string} USD
          </p>
          {expanded === i && (
            <div className="mt-3 space-y-1 border-t border-[#E2E8F0] pt-3 text-xs text-[#475569]">
              <p>Nd+Pr: {item['Nd+Pr obsah (kg)'] as string} kg</p>
              <p>Dy: {item['Dy obsah (kg)'] as string} kg</p>
              <p>Tb: {item['Tb obsah (kg)'] as string} kg</p>
              <p className="text-[10px] text-[#94A3B8]">{item['Poznámka'] as string}</p>
            </div>
          )}
        </button>
      ))}
    </div>
  )
}

function ProjectionsTable({ data }: { data: Projection[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b border-[#E2E8F0]">
            <th className="px-2 py-2 text-left text-[#64748B]">Zdroj / Scénář</th>
            <th className="px-2 py-2 text-left text-[#64748B]">Metrika</th>
            <th className="px-2 py-2 text-right text-[#64748B]">2024</th>
            <th className="px-2 py-2 text-right text-[#64748B]">2030</th>
            <th className="px-2 py-2 text-right text-[#64748B]">2035</th>
            <th className="px-2 py-2 text-right text-[#64748B]">2040</th>
            <th className="px-2 py-2 text-right text-[#64748B]">CAGR</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} className="border-b border-[#E2E8F0]/50 hover:bg-[#F1F5F9]">
              <td className="px-2 py-2 font-medium text-[#0F172A] whitespace-nowrap">
                {row['Zdroj / Scénář'] as string}
              </td>
              <td className="px-2 py-2 text-[#475569] max-w-[200px] truncate">
                {row.Metrika as string}
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

export default function DemandClient({ demand, materialIntensity, projections }: Props) {
  return (
    <div className="space-y-8">
      {/* Demand Heatmap */}
      <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-6">
        <h3 className="mb-2 text-lg font-bold text-[#0F172A]">
          Poptávka podle sektorů a prvků
        </h3>
        <p className="mb-4 text-xs text-[#64748B]">
          Intenzita spotřeby vzácných zemin (REE) v jednotlivých průmyslových sektorech.
          ●●● = vysoká závislost, ●● = střední, ● = nízká, — = nepoužívá.
        </p>
        <DemandHeatmap demand={demand} />
        <SourceAttribution source="firemní specifikace, IEA 2025" />
      </div>

      {/* Material Intensity */}
      <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-6">
        <h3 className="mb-2 text-lg font-bold text-[#0F172A]">
          Materiálová náročnost klíčových technologií
        </h3>
        <p className="mb-4 text-xs text-[#64748B]">
          Kolik kilogramů neodymových magnetů (NdFeB) potřebuje každá technologie.
          Klikněte na kartu pro detail obsahu jednotlivých prvků.
        </p>
        <MaterialIntensityCards data={materialIntensity} />
        <SourceAttribution source="výrobci motorů a turbín, IEA 2025" />
      </div>

      {/* Projections Table */}
      <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-6">
        <h3 className="mb-2 text-lg font-bold text-[#0F172A]">
          Projekce poptávky po vzácných zeminách
        </h3>
        <p className="mb-4 text-xs text-[#64748B]">
          Srovnání projekcí z různých zdrojů a scénářů. CAGR = průměrný roční růst.
          Všechny hlavní scénáře ukazují na výrazné zvýšení poptávky do roku 2030.
        </p>
        <ProjectionsTable data={projections} />
        <SourceAttribution source="IEA, USGS 2025, vlastní odhady" />
      </div>
    </div>
  )
}
