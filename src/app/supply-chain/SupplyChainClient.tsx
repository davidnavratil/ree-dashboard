'use client'

import { useState } from 'react'
import type { Company, PipelineProject } from '@/lib/types'
import SourceAttribution from '@/components/ui/SourceAttribution'

interface Props {
  companies: Company[]
  pipeline: PipelineProject[]
}

type SortKey = 'Firma' | 'Země' | 'Status 2025'
type SortDir = 'asc' | 'desc'

const STATUS_COLORS: Record<string, string> = {
  'Operační': '#0E7490',
  'Operační+expanze': '#0E7490',
  'Operační; expanze': '#0E7490',
  'Výstavba': '#D97706',
  'Příprava': '#1D4ED8',
  'Studie': '#64748B',
  'Plánovaný': '#64748B',
}

function getStatusColor(status: string): string {
  for (const [key, color] of Object.entries(STATUS_COLORS)) {
    if (status?.toLowerCase().includes(key.toLowerCase())) return color
  }
  return '#64748B'
}

const COUNTRY_NAMES: Record<string, string> = {
  'CN': 'Čína',
  'AU': 'Austrálie',
  'US': 'USA',
  'JP': 'Japonsko',
  'DE': 'Německo',
  'NO': 'Norsko',
  'BR': 'Brazílie',
  'CA': 'Kanada',
  'EE': 'Estonsko',
  'BE': 'Belgie',
  'FR': 'Francie',
  'SE': 'Švédsko',
  'GL': 'Grónsko',
  'IN': 'Indie',
  'MY': 'Malajsie',
  'MM': 'Myanmar',
}

function formatCountry(code: string): string {
  if (!code) return code
  return code.split('/').map(c => COUNTRY_NAMES[c.trim()] ?? c.trim()).join(' / ')
}

const FINANCING_TERMS: Record<string, string> = {
  'DoD': 'ministerstvo obrany USA',
  'JP': 'Japonsko',
  'AU': 'Austrálie',
  'KR': 'Jižní Korea',
  'DE': 'Německo',
  'SE': 'Švédsko',
  'FR': 'Francie',
  'US': 'americký',
  'PE fond': 'soukromý kapitálový fond',
  'TBD': 'dosud neurčeno',
}

function formatFinancing(raw: string): string {
  if (!raw) return raw
  let result = raw
  // Sort by length desc to replace longer matches first (e.g. "PE fond" before "PE")
  const sorted = Object.entries(FINANCING_TERMS).sort((a, b) => b[0].length - a[0].length)
  for (const [abbr, full] of sorted) {
    result = result.replace(new RegExp(`\\b${abbr.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'g'), full)
  }
  return result
}

export default function SupplyChainClient({ companies, pipeline }: Props) {
  const [sortKey, setSortKey] = useState<SortKey>('Země')
  const [sortDir, setSortDir] = useState<SortDir>('asc')

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
  }

  const sorted = [...companies].sort((a, b) => {
    const aVal = String(a[sortKey] ?? '')
    const bVal = String(b[sortKey] ?? '')
    return sortDir === 'asc' ? aVal.localeCompare(bVal, 'cs') : bVal.localeCompare(aVal, 'cs')
  })

  return (
    <div className="space-y-8">
      {/* Companies Table */}
      <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-6">
        <h3 className="mb-4 text-lg font-bold text-[#0F172A]">
          Klíčové firmy v hodnotovém řetězci
        </h3>
        <p className="mb-4 text-xs text-[#64748B]">
          Klikněte na záhlaví sloupce pro seřazení. Vertikální integrace označuje,
          které fáze řetězce firma pokrývá (těžba → separace → kov → magnety).
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E2E8F0]">
                {[
                  { key: 'Firma' as SortKey, label: 'Firma' },
                  { key: 'Země' as SortKey, label: 'Země' },
                ].map(({ key, label }) => (
                  <th
                    key={key}
                    className="cursor-pointer px-3 py-2 text-left text-xs font-medium text-[#64748B] hover:text-[#475569]"
                    onClick={() => handleSort(key)}
                  >
                    {label} {sortKey === key ? (sortDir === 'asc' ? '↑' : '↓') : ''}
                  </th>
                ))}
                <th className="px-3 py-2 text-center text-xs font-medium text-[#64748B]">Těžba</th>
                <th className="px-3 py-2 text-center text-xs font-medium text-[#64748B]">Separace</th>
                <th className="px-3 py-2 text-center text-xs font-medium text-[#64748B]">Kov</th>
                <th className="px-3 py-2 text-center text-xs font-medium text-[#64748B]">Magnety</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-[#64748B]">Kapacita</th>
                <th
                  className="cursor-pointer px-3 py-2 text-left text-xs font-medium text-[#64748B] hover:text-[#475569]"
                  onClick={() => handleSort('Status 2025')}
                >
                  Status {sortKey === 'Status 2025' ? (sortDir === 'asc' ? '↑' : '↓') : ''}
                </th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((c, i) => {
                const isChina = c.Země === 'CN'
                return (
                  <tr
                    key={i}
                    className={`border-b border-[#E2E8F0]/50 transition-colors hover:bg-[#F1F5F9] ${
                      isChina ? 'bg-[#9D174D]/5' : ''
                    }`}
                  >
                    <td className="px-3 py-2 font-medium text-[#0F172A]">{c.Firma}</td>
                    <td className="px-3 py-2 text-[#475569]">
                      <span className={isChina ? 'text-[#9D174D]' : 'text-[#0E7490]'}>
                        {formatCountry(c.Země)}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-center">{c.Těžba === '●' ? '✓' : ''}</td>
                    <td className="px-3 py-2 text-center">{c.Separace === '●' ? '✓' : ''}</td>
                    <td className="px-3 py-2 text-center">{c.Kov === '●' ? '✓' : ''}</td>
                    <td className="px-3 py-2 text-center">{c.Magnety === '●' ? '✓' : ''}</td>
                    <td className="px-3 py-2 text-xs text-[#475569]">{c['Kapacita / pozice']}</td>
                    <td className="px-3 py-2">
                      <span
                        className="inline-block rounded-full px-2 py-0.5 text-xs font-medium"
                        style={{
                          backgroundColor: `${getStatusColor(c['Status 2025'])}20`,
                          color: getStatusColor(c['Status 2025']),
                        }}
                      >
                        {c['Status 2025']}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <SourceAttribution source="výroční zprávy firem, SEC/ASX filings, 2025" />
      </div>

      {/* Pipeline Timeline */}
      <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-6">
        <h3 className="mb-4 text-lg font-bold text-[#0F172A]">
          Plánované mimočínské projekty
        </h3>
        <p className="mb-4 text-xs text-[#64748B]">
          Projekty mimo Čínu, které mají potenciál snížit závislost na čínském dodavatelském řetězci.
          Barva označuje aktuální stav projektu.
        </p>
        <div className="space-y-3">
          {pipeline.map((p, i) => {
            const color = getStatusColor(p.Status)
            return (
              <div
                key={i}
                className="rounded-lg border border-[#E2E8F0] bg-white p-4 transition-colors hover:bg-[#F1F5F9]"
              >
                <div className="mb-3 flex items-center gap-2">
                  <span className="font-bold text-[#0F172A]">{p.Projekt}</span>
                  <span
                    className="inline-block rounded-full px-2 py-0.5 text-[10px] font-medium"
                    style={{ backgroundColor: `${color}20`, color }}
                  >
                    {p.Status}
                  </span>
                </div>
                <p className="mb-3 text-xs text-[#475569]">
                  {p.Firma} · {formatCountry(p.Země)} · {p.Typ}
                </p>
                <div className="grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-4">
                  <div>
                    <p className="text-[10px] text-[#64748B]">Kapacita (t/rok)</p>
                    <p className="font-mono text-sm font-medium text-[#0E7490]">{p['Kapacita (tpa)']}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-[#64748B]">Zahájení provozu</p>
                    <p className="text-sm text-[#0F172A]">{p['Start (odhad)']}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-[#64748B]">Investice</p>
                    <p className="text-sm font-medium text-[#D97706]">{p['Investice (mil. USD)']} mil. USD</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-[#64748B]">Financování</p>
                    <p className="text-sm text-[#475569]">{formatFinancing(p.Financování)}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        <SourceAttribution source="firemní oznámení, DFS studie, vládní granty (DoD, JOGMEC, EU), 2025" />
      </div>
    </div>
  )
}
