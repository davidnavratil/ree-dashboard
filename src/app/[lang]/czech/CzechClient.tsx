'use client'

import { useState } from 'react'
import type { CzExposure, VulnerabilityItem } from '@/lib/types'
import type { Dictionary } from '@/i18n'
import SourceAttribution from '@/components/ui/SourceAttribution'

interface Props {
  czExposure: CzExposure[]
  vulnerability: VulnerabilityItem[]
  dict: Dictionary
  lang: string
}

function getDependencyColor(dep: string, levels: Dictionary['czech']['dependencyLevels']): string {
  const upper = dep?.toUpperCase() ?? ''
  if (upper.includes(levels.critical.toUpperCase()) || upper.includes('KRITICKÁ') || upper.includes('CRITICAL')) return '#9D174D'
  if (upper.includes(levels.high.toUpperCase()) || upper.includes('VYSOKÁ') || upper.includes('HIGH')) return '#D97706'
  if (upper.includes(levels.medium.toUpperCase()) || upper.includes('STŘEDNÍ') || upper.includes('MEDIUM')) return '#0E7490'
  if (upper.includes(levels.low.toUpperCase()) || upper.includes('NÍZKÁ') || upper.includes('LOW')) return '#0E7490'
  return '#64748B'
}

export default function CzechClient({ czExposure, vulnerability, dict, lang }: Props) {
  const [selectedSector, setSelectedSector] = useState<number | null>(null)
  const t = dict.czech

  return (
    <div className="space-y-8">
      {/* Exposure Table */}
      <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-6">
        <h3 className="mb-2 text-lg font-bold text-[#0F172A]">
          {t.exposureTitle}
        </h3>
        <p className="mb-4 text-xs text-[#64748B]">
          {t.exposureDesc}
        </p>
        <div className="space-y-3">
          {czExposure.map((sector, i) => {
            const dep = sector['Závislost na REE'] as string
            const color = getDependencyColor(dep, t.dependencyLevels)
            const isExpanded = selectedSector === i

            return (
              <button
                key={i}
                onClick={() => setSelectedSector(isExpanded ? null : i)}
                className="w-full rounded-lg border border-[#E2E8F0] bg-white p-4 text-left transition-all hover:bg-[#F1F5F9]"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span
                      className="inline-block h-3 w-3 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                    <span className="text-sm font-bold text-[#0F172A]">
                      {(t.sectorNameMap as Record<string, string>)?.[sector['Český sektor'] as string] ?? sector['Český sektor'] as string}
                    </span>
                    <span
                      className="rounded-full px-2 py-0.5 text-[10px] font-medium"
                      style={{ backgroundColor: `${color}15`, color }}
                    >
                      {((t.dependencyMap as Record<string, string>)?.[dep] ?? dep)?.split('(')[0]?.trim()}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs">
                    <span className="text-[#475569]">
                      {t.exposureLabels.gdp} <span className="font-mono font-medium text-[#0F172A]">{sector['Podíl na HDP (%)'] as string}</span>
                    </span>
                    <span className="text-[#475569]">
                      {t.exposureLabels.employment} <span className="font-mono font-medium text-[#0F172A]">{sector['Zaměstnanost (tis.)'] as string} {t.exposureLabels.thousands}</span>
                    </span>
                    <span className="text-lg text-[#94A3B8]">{isExpanded ? '▲' : '▼'}</span>
                  </div>
                </div>

                {isExpanded && (
                  <div className="mt-4 grid gap-4 border-t border-[#E2E8F0] pt-4 sm:grid-cols-2">
                    <div>
                      <p className="text-xs text-[#64748B]">{t.exposureLabels.reeDependency}</p>
                      <p className="text-sm text-[#334155]">{(t.dependencyMap as Record<string, string>)?.[dep] ?? dep}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#64748B]">{t.exposureLabels.keyElements}</p>
                      <p className="text-sm font-medium text-[#0E7490]">{sector['Klíčové REE'] as string}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#64748B]">{t.exposureLabels.alternatives}</p>
                      <p className="text-sm text-[#334155]">{(t.alternativesMap as Record<string, string>)?.[sector.Alternativy as string] ?? sector.Alternativy as string}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#64748B]">{t.exposureLabels.sixMonthImpact}</p>
                      <p className="text-sm font-medium text-[#9D174D]">{(t.impactMap as Record<string, string>)?.[sector['Dopad při 6m výpadku'] as string] ?? sector['Dopad při 6m výpadku'] as string}</p>
                    </div>
                    <div className="sm:col-span-2">
                      <p className="text-xs text-[#64748B]">{t.exposureLabels.exampleCompanies}</p>
                      <p className="text-sm text-[#334155]">{sector['Příklady firem'] as string}</p>
                    </div>
                  </div>
                )}
              </button>
            )
          })}
        </div>
        <SourceAttribution source={t.exposureSource} dict={dict} />
      </div>

      {/* UOCHB Feature */}
      <div className="rounded-xl border-2 border-[#0E7490]/30 bg-[#0E7490]/5 p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#0E7490] text-xl font-bold text-white">
            AV
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#0F172A]">
              {t.uochbTitle}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#334155]">
              {t.uochbP1}
            </p>
            <p className="mt-2 text-sm text-[#475569]">
              {t.uochbP2}
            </p>
          </div>
        </div>
      </div>

      {/* Strategic Priorities */}
      <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-6">
        <h3 className="mb-4 text-lg font-bold text-[#0F172A]">
          {t.recommendationsTitle}
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {t.recommendations.map((rec, i) => {
            const colors = ['#9D174D', '#0E7490', '#0E7490', '#1D4ED8']
            const icons = ['\u{1F3D7}\u{FE0F}', '\u267B\u{FE0F}', '\u{1F30D}', '\u{1F52C}']
            const color = colors[i] ?? '#64748B'
            const icon = icons[i] ?? ''
            return (
              <div
                key={i}
                className="rounded-lg border bg-white p-5"
                style={{ borderColor: `${color}30` }}
              >
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-xl">{icon}</span>
                  <h4 className="text-sm font-bold" style={{ color }}>
                    {rec.title}
                  </h4>
                </div>
                <p className="text-sm leading-relaxed text-[#334155]">{rec.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
