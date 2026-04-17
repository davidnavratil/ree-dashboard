'use client'

import { useState } from 'react'
import type { Company, PipelineProject } from '@/lib/types'
import type { Dictionary } from '@/i18n'
import SourceAttribution from '@/components/ui/SourceAttribution'

interface Props {
  companies: Company[]
  pipeline: PipelineProject[]
  dict: Dictionary
  lang: string
}

type SortKey = 'Firma' | 'Země' | 'Status 2025'
type SortDir = 'asc' | 'desc'

const STATUS_COLOR_MAP: Record<string, string> = {
  'operational': '#0E7490',
  'operationalExpansion': '#0E7490',
  'construction': '#D97706',
  'preparation': '#1D4ED8',
  'study': '#64748B',
  'planned': '#64748B',
}

function getStatusColor(status: string): string {
  const lower = status?.toLowerCase() ?? ''
  for (const [, color] of Object.entries(STATUS_COLOR_MAP)) {
    // match against the status text loosely
    if (lower.includes('operační') || lower.includes('operational')) return '#0E7490'
  }
  if (lower.includes('výstavba') || lower.includes('construction')) return '#D97706'
  if (lower.includes('příprava') || lower.includes('preparation')) return '#1D4ED8'
  if (lower.includes('studie') || lower.includes('study') || lower.includes('plánovan') || lower.includes('planned')) return '#64748B'
  return '#64748B'
}

function formatCountry(code: string, countries: Dictionary['countries']): string {
  if (!code) return code
  return code.split('/').map(c => {
    const trimmed = c.trim()
    return (countries as Record<string, string>)[trimmed] ?? trimmed
  }).join(' / ')
}

function formatFinancing(raw: string, terms: Dictionary['supplyChain']['financingTerms']): string {
  if (!raw) return raw
  let result = raw
  const entries: [string, string][] = [
    ['PE fond', terms.PEFund],
    ['DoD', terms.DoD],
    ['JP', terms.JP],
    ['AU', terms.AU],
    ['KR', terms.KR],
    ['DE', terms.DE],
    ['SE', terms.SE],
    ['FR', terms.FR],
    ['US', terms.US],
    ['TBD', terms.TBD],
  ]
  // Sort by length desc to replace longer matches first
  const sorted = entries.sort((a, b) => b[0].length - a[0].length)
  for (const [abbr, full] of sorted) {
    result = result.replace(new RegExp(`\\b${abbr.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'g'), full)
  }
  return result
}

export default function SupplyChainClient({ companies, pipeline, dict, lang }: Props) {
  const [sortKey, setSortKey] = useState<SortKey>('Země')
  const [sortDir, setSortDir] = useState<SortDir>('asc')
  const t = dict.supplyChain

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
    return sortDir === 'asc' ? aVal.localeCompare(bVal, lang) : bVal.localeCompare(aVal, lang)
  })

  return (
    <div className="space-y-8">
      {/* Companies Table */}
      <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-6">
        <h3 className="mb-4 text-lg font-bold text-[#0F172A]">
          {t.companiesTitle}
        </h3>
        <p className="mb-4 text-xs text-[#64748B]">
          {t.companiesDesc}
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E2E8F0]">
                {[
                  { key: 'Firma' as SortKey, label: t.headers.company },
                  { key: 'Země' as SortKey, label: t.headers.country },
                ].map(({ key, label }) => (
                  <th
                    key={key}
                    className="cursor-pointer px-3 py-2 text-left text-xs font-medium text-[#64748B] hover:text-[#475569]"
                    onClick={() => handleSort(key)}
                  >
                    {label} {sortKey === key ? (sortDir === 'asc' ? '↑' : '↓') : ''}
                  </th>
                ))}
                <th className="px-3 py-2 text-center text-xs font-medium text-[#64748B]">{t.headers.mining}</th>
                <th className="px-3 py-2 text-center text-xs font-medium text-[#64748B]">{t.headers.separation}</th>
                <th className="px-3 py-2 text-center text-xs font-medium text-[#64748B]">{t.headers.metal}</th>
                <th className="px-3 py-2 text-center text-xs font-medium text-[#64748B]">{t.headers.magnets}</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-[#64748B]">{t.headers.capacity}</th>
                <th
                  className="cursor-pointer px-3 py-2 text-left text-xs font-medium text-[#64748B] hover:text-[#475569]"
                  onClick={() => handleSort('Status 2025')}
                >
                  {t.headers.status} {sortKey === 'Status 2025' ? (sortDir === 'asc' ? '↑' : '↓') : ''}
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
                        {formatCountry(c.Země, dict.countries)}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-center">{c.Těžba === '●' ? '✓' : ''}</td>
                    <td className="px-3 py-2 text-center">{c.Separace === '●' ? '✓' : ''}</td>
                    <td className="px-3 py-2 text-center">{c.Kov === '●' ? '✓' : ''}</td>
                    <td className="px-3 py-2 text-center">{c.Magnety === '●' ? '✓' : ''}</td>
                    <td className="px-3 py-2 text-xs text-[#475569]">{(t.companyCapacityMap as Record<string, string>)?.[c['Kapacita / pozice']] ?? c['Kapacita / pozice']}</td>
                    <td className="px-3 py-2">
                      <span
                        className="inline-block rounded-full px-2 py-0.5 text-xs font-medium"
                        style={{
                          backgroundColor: `${getStatusColor(c['Status 2025'])}20`,
                          color: getStatusColor(c['Status 2025']),
                        }}
                      >
                        {(t.companyStatusMap as Record<string, string>)?.[c['Status 2025']] ?? c['Status 2025']}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <SourceAttribution source={t.companiesSource} dict={dict} />
      </div>

      {/* Pipeline Timeline */}
      <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-6">
        <h3 className="mb-4 text-lg font-bold text-[#0F172A]">
          {t.pipelineTitle}
        </h3>
        <p className="mb-4 text-xs text-[#64748B]">
          {t.pipelineDesc}
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
                    {(t.pipelineStatusMap as Record<string, string>)?.[p.Status] ?? p.Status}
                  </span>
                </div>
                <p className="mb-3 text-xs text-[#475569]">
                  {p.Firma} · {formatCountry(p.Země, dict.countries)} · {(t.pipelineTypeMap as Record<string, string>)?.[p.Typ] ?? p.Typ}
                </p>
                <div className="grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-4">
                  <div>
                    <p className="text-[10px] text-[#64748B]">{t.pipelineLabels.capacityTpa}</p>
                    <p className="font-mono text-sm font-medium text-[#0E7490]">{p['Kapacita (tpa)']}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-[#64748B]">{t.pipelineLabels.startEstimate}</p>
                    <p className="text-sm text-[#0F172A]">{p['Start (odhad)']}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-[#64748B]">{t.pipelineLabels.investment}</p>
                    <p className="text-sm font-medium text-[#D97706]">{p['Investice (mil. USD)']} {t.pipelineLabels.milUsd}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-[#64748B]">{t.pipelineLabels.financing}</p>
                    <p className="text-sm text-[#475569]">{(t.pipelineFinancingMap as Record<string, string>)?.[p.Financování] ?? formatFinancing(p.Financování, t.financingTerms)}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        <SourceAttribution source={t.pipelineSource} dict={dict} />
      </div>
    </div>
  )
}
