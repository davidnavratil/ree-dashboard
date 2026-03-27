'use client'

import { useState } from 'react'
import type { CzExposure, VulnerabilityItem } from '@/lib/types'
import SourceAttribution from '@/components/ui/SourceAttribution'

interface Props {
  czExposure: CzExposure[]
  vulnerability: VulnerabilityItem[]
}

const DEPENDENCY_COLORS: Record<string, string> = {
  'KRITICKÁ': '#9D174D',
  'VYSOKÁ': '#D97706',
  'STŘEDNÍ': '#0E7490',
  'NÍZKÁ': '#0E7490',
}

function getDependencyColor(dep: string): string {
  for (const [key, color] of Object.entries(DEPENDENCY_COLORS)) {
    if (dep?.toUpperCase().includes(key)) return color
  }
  return '#64748B'
}

export default function CzechClient({ czExposure, vulnerability }: Props) {
  const [selectedSector, setSelectedSector] = useState<number | null>(null)

  return (
    <div className="space-y-8">
      {/* Exposure Table */}
      <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-6">
        <h3 className="mb-2 text-lg font-bold text-[#0F172A]">
          Expozice českých sektorů na vzácné zeminy
        </h3>
        <p className="mb-4 text-xs text-[#64748B]">
          Klikněte na sektor pro zobrazení detailu. Závislost hodnocena na škále: kritická, vysoká, střední, nízká.
        </p>
        <div className="space-y-3">
          {czExposure.map((sector, i) => {
            const dep = sector['Závislost na REE'] as string
            const color = getDependencyColor(dep)
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
                      {sector['Český sektor'] as string}
                    </span>
                    <span
                      className="rounded-full px-2 py-0.5 text-[10px] font-medium"
                      style={{ backgroundColor: `${color}15`, color }}
                    >
                      {dep?.split('(')[0]?.trim()}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs">
                    <span className="text-[#475569]">
                      HDP: <span className="font-mono font-medium text-[#0F172A]">{sector['Podíl na HDP (%)'] as string}</span>
                    </span>
                    <span className="text-[#475569]">
                      Zaměst.: <span className="font-mono font-medium text-[#0F172A]">{sector['Zaměstnanost (tis.)'] as string} tis.</span>
                    </span>
                    <span className="text-lg text-[#94A3B8]">{isExpanded ? '▲' : '▼'}</span>
                  </div>
                </div>

                {isExpanded && (
                  <div className="mt-4 grid gap-4 border-t border-[#E2E8F0] pt-4 sm:grid-cols-2">
                    <div>
                      <p className="text-xs text-[#64748B]">Závislost na REE</p>
                      <p className="text-sm text-[#334155]">{dep}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#64748B]">Klíčové prvky</p>
                      <p className="text-sm font-medium text-[#0E7490]">{sector['Klíčové REE'] as string}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#64748B]">Alternativy</p>
                      <p className="text-sm text-[#334155]">{sector.Alternativy as string}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#64748B]">Dopad při 6měsíčním výpadku</p>
                      <p className="text-sm font-medium text-[#9D174D]">{sector['Dopad při 6m výpadku'] as string}</p>
                    </div>
                    <div className="sm:col-span-2">
                      <p className="text-xs text-[#64748B]">Příklady firem</p>
                      <p className="text-sm text-[#334155]">{sector['Příklady firem'] as string}</p>
                    </div>
                  </div>
                )}
              </button>
            )
          })}
        </div>
        <SourceAttribution source="ČSÚ, MPO, CzechInvest, sektorové asociace, odhady 2025" />
      </div>

      {/* ÚOCHB Feature */}
      <div className="rounded-xl border-2 border-[#0E7490]/30 bg-[#0E7490]/5 p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#0E7490] text-xl font-bold text-white">
            AV
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#0F172A]">
              Příležitost: ÚOCHB AV ČR — výzkum recyklace vzácných zemin
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#334155]">
              Ústav organické chemie a biochemie Akademie věd ČR vyvíjí inovativní metody
              hydrometalurgické recyklace vzácných zemin z elektronického odpadu a permanentních magnetů.
              Tyto technologie mohou pomoci snížit závislost EU na dovozu primárních surovin
              a přispět k plnění cílů CRMA pro recyklaci (≥25 % do 2030).
            </p>
            <p className="mt-2 text-sm text-[#475569]">
              Česko má potenciál stát se jedním z center recyklace vzácných zemin v EU —
              kombinace výzkumné kapacity, průmyslové základny a strategické polohy je unikátní.
            </p>
          </div>
        </div>
      </div>

      {/* Strategic Priorities */}
      <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-6">
        <h3 className="mb-4 text-lg font-bold text-[#0F172A]">
          Co by měla Česká republika dělat
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            {
              title: 'Strategické zásoby',
              desc: 'Vytvořit národní zásobu kritických REE oxidů (min. 90 dní spotřeby) po vzoru Japonska a Jižní Koreje.',
              color: '#9D174D',
              icon: '🏗️',
            },
            {
              title: 'Recyklační kapacity',
              desc: 'Investovat do hydrometalurgické recyklace permanentních magnetů z EoL produktů. Cíl: 25 % domácí spotřeby z recyklátu do 2035.',
              color: '#0E7490',
              icon: '♻️',
            },
            {
              title: 'Diverzifikace dodávek',
              desc: 'Bilaterální dohody s Austrálií, Kanadou a Brazílií. Účast v EU Raw Materials Alliance a společných nákupech.',
              color: '#0E7490',
              icon: '🌍',
            },
            {
              title: 'Výzkum substitutů',
              desc: 'Podpora výzkumu motorů bez permanentních magnetů (EESM, SRM) a magnetů s nižším obsahem Dy/Tb.',
              color: '#1D4ED8',
              icon: '🔬',
            },
          ].map((priority, i) => (
            <div
              key={i}
              className="rounded-lg border bg-white p-5"
              style={{ borderColor: `${priority.color}30` }}
            >
              <div className="mb-2 flex items-center gap-2">
                <span className="text-xl">{priority.icon}</span>
                <h4 className="text-sm font-bold" style={{ color: priority.color }}>
                  {priority.title}
                </h4>
              </div>
              <p className="text-sm leading-relaxed text-[#334155]">{priority.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
