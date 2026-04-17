'use client'

import { useState } from 'react'
import type { ExportControl, CrmaTarget, ProductionCountry } from '@/lib/types'
import type { Dictionary } from '@/i18n'
import { parseNumericString } from '@/lib/format'
import SourceAttribution from '@/components/ui/SourceAttribution'

interface Props {
  exportControls: ExportControl[]
  crmaTargets: CrmaTarget[]
  production: ProductionCountry[]
  dict: Dictionary
  lang: string
}

function getTypeColor(typ: string, eventTypes: Dictionary['geopolitics']['eventTypes']): string {
  if (typ === eventTypes.embargo) return '#9D174D'
  if (typ === eventTypes.quotas) return '#D97706'
  if (typ === eventTypes.exportLicense) return '#D97706'
  if (typ === eventTypes.retaliation) return '#7C3AED'
  if (typ === eventTypes.sanctions) return '#9D174D'
  if (typ === eventTypes.legislation) return '#1D4ED8'
  if (typ === eventTypes.investment) return '#0E7490'
  if (typ === eventTypes.partnership) return '#0E7490'
  return '#64748B'
}

function CrmaProgressBar({ target, dict }: { target: CrmaTarget; dict: Dictionary }) {
  const t = dict.geopolitics
  const currentStr = String(target['Současný stav (~2025)'] ?? '')
  const rawTargetStr = String(target['Cíl 2030'] ?? '')
  const targetStr = (t.crmaTargetValueMap as Record<string, string>)?.[rawTargetStr] ?? rawTargetStr
  const current = parseNumericString(currentStr.replace(/[<>≥≤~%]/g, '')) ?? 0
  const goal = parseNumericString(rawTargetStr.replace(/[<>≥≤~%]/g, '')) ?? 100
  const pct = goal > 0 ? Math.min((current / goal) * 100, 100) : 0

  const isOnTrack = pct > 50
  const barColor = isOnTrack ? '#0E7490' : pct > 25 ? '#D97706' : '#9D174D'

  return (
    <div className="rounded-lg border border-[#E2E8F0] bg-white p-4">
      <div className="mb-1 flex items-center justify-between">
        <span className="text-sm font-bold text-[#0F172A]">{(t.crmaTargetNameMap as Record<string, string>)?.[target['Cíl CRMA 2030'] as string] ?? target['Cíl CRMA 2030'] as string}</span>
        <span className="text-xs font-medium" style={{ color: barColor }}>
          {(t.crmaAssessmentMap as Record<string, string>)?.[target['Hodnocení reálnosti'] as string] ?? target['Hodnocení reálnosti'] as string}
        </span>
      </div>
      <p className="mb-2 text-xs text-[#64748B]">{(t.crmaMetricMap as Record<string, string>)?.[target.Metrika as string] ?? target.Metrika as string}</p>
      <div className="mb-1 h-3 overflow-hidden rounded-full bg-[#E2E8F0]">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${pct}%`, backgroundColor: barColor }}
        />
      </div>
      <div className="flex justify-between text-xs">
        <span className="text-[#475569]">{t.crmaLabels.now} {currentStr}</span>
        <span className="font-medium text-[#0F172A]">{t.crmaLabels.target} {targetStr}</span>
      </div>
      <p className="mt-1 text-xs text-[#64748B]">{t.crmaLabels.gap} {(t.crmaGapMap as Record<string, string>)?.[target.Gap as string] ?? target.Gap as string}</p>
      <p className="mt-1 text-[10px] text-[#94A3B8]">{(t.crmaProjectsMap as Record<string, string>)?.[target['Klíčové projekty'] as string] ?? target['Klíčové projekty'] as string}</p>
    </div>
  )
}

export default function GeopoliticsClient({ exportControls, crmaTargets, production, dict, lang }: Props) {
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const t = dict.geopolitics

  const types = [...new Set(exportControls.map(e => e.Typ as string).filter(Boolean))]

  const filtered = selectedType
    ? exportControls.filter(e => e.Typ === selectedType)
    : exportControls

  // Top producers for cards
  const topProducers = production
    .filter(p => (parseNumericString(String(p['Podíl těžby (%)'] ?? '0')) ?? 0) > 2)
    .sort((a, b) => (parseNumericString(String(b['Podíl těžby (%)'] ?? '0')) ?? 0) - (parseNumericString(String(a['Podíl těžby (%)'] ?? '0')) ?? 0))

  return (
    <div className="space-y-8">
      {/* Export Controls Timeline */}
      <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-6">
        <h3 className="mb-2 text-lg font-bold text-[#0F172A]">
          {t.timelineTitle}
        </h3>
        <p className="mb-4 text-xs text-[#64748B]">
          {t.timelineDesc}
        </p>

        <div className="mb-4 flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedType(null)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              !selectedType ? 'bg-[#0E7490] text-white' : 'bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]'
            }`}
          >
            {t.allFilter} ({exportControls.length})
          </button>
          {types.map(typ => (
            <button
              key={typ}
              onClick={() => setSelectedType(selectedType === typ ? null : typ)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                selectedType === typ ? 'text-white' : 'bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]'
              }`}
              style={selectedType === typ ? { backgroundColor: getTypeColor((t.exportControlTypeMap as Record<string, string>)?.[typ] ?? typ, t.eventTypes) } : {}}
            >
              {(t.exportControlTypeMap as Record<string, string>)?.[typ] ?? typ}
            </button>
          ))}
        </div>

        <div className="relative ml-4 border-l-2 border-[#E2E8F0] pl-6">
          {filtered.map((event, i) => {
            const translatedType = (t.exportControlTypeMap as Record<string, string>)?.[event.Typ as string] ?? event.Typ as string
            const color = getTypeColor(translatedType, t.eventTypes)
            return (
              <div key={i} className="relative mb-6 last:mb-0">
                <div
                  className="absolute -left-[31px] top-1 h-4 w-4 rounded-full border-2 border-white"
                  style={{ backgroundColor: color }}
                />
                <div className="rounded-lg border border-[#E2E8F0] bg-white p-4 transition-colors hover:bg-[#F1F5F9]">
                  <div className="mb-1 flex items-center gap-2">
                    <span className="font-mono text-xs text-[#64748B]">{event.Datum as string}</span>
                    <span
                      className="rounded-full px-2 py-0.5 text-[10px] font-medium"
                      style={{ backgroundColor: `${color}15`, color }}
                    >
                      {translatedType}
                    </span>
                    <span className="text-xs font-medium text-[#475569]">{(t.exportControlActorMap as Record<string, string>)?.[event['Aktér'] as string] ?? event['Aktér'] as string}</span>
                  </div>
                  <p className="text-sm font-medium text-[#0F172A]">{(t.exportControlMeasureMap as Record<string, string>)?.[event['Opatření'] as string] ?? event['Opatření'] as string}</p>
                  <p className="mt-1 text-xs text-[#475569]">{(t.exportControlContextMap as Record<string, string>)?.[event['Cíl / Kontext'] as string] ?? event['Cíl / Kontext'] as string}</p>
                  <p className="mt-1 text-xs font-medium text-[#9D174D]">{(t.exportControlImpactMap as Record<string, string>)?.[event.Dopad as string] ?? event.Dopad as string}</p>
                </div>
              </div>
            )
          })}
        </div>
        <SourceAttribution source={t.timelineSource} dict={dict} />
      </div>

      {/* CRMA Tracker */}
      <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-6">
        <h3 className="mb-2 text-lg font-bold text-[#0F172A]">
          {t.crmaTitle}
        </h3>
        <p className="mb-4 text-xs text-[#64748B]">
          {t.crmaDesc}
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {crmaTargets.map((target, i) => (
            <CrmaProgressBar key={i} target={target} dict={dict} />
          ))}
        </div>
        <SourceAttribution source={t.crmaSource} dict={dict} />
      </div>

      {/* Response Cards — Key Countries */}
      <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-6">
        <h3 className="mb-2 text-lg font-bold text-[#0F172A]">
          {t.producersTitle}
        </h3>
        <p className="mb-4 text-xs text-[#64748B]">
          {t.producersDesc}
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {topProducers.map((country, i) => {
            const share = parseNumericString(String(country['Podíl těžby (%)'] ?? '0')) ?? 0
            const isChina = country.Země === 'Čína'
            const borderColor = isChina ? '#9D174D' : share > 5 ? '#0E7490' : '#64748B'
            const countryName = (t.productionCountryMap as Record<string, string>)?.[country.Země as string] ?? country.Země as string
            const refining = (t.productionRefiningMap as Record<string, string>)?.[country['Rafinační kapacita'] as string] ?? country['Rafinační kapacita'] as string
            const magnets = (t.productionMagnetsMap as Record<string, string>)?.[country.Magnety as string] ?? country.Magnety as string
            const strategy = (t.productionStrategyMap as Record<string, string>)?.[country['Legislativa / Strategie'] as string] ?? country['Legislativa / Strategie'] as string
            const firms = (t.productionFirmsMap as Record<string, string>)?.[country['Klíčové firmy'] as string] ?? country['Klíčové firmy'] as string
            return (
              <div
                key={i}
                className="rounded-lg border bg-white p-4"
                style={{ borderColor: `${borderColor}40` }}
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-lg font-bold text-[#0F172A]">{countryName}</span>
                  <span className="font-mono text-xl font-bold" style={{ color: borderColor }}>
                    {Math.round(share)}%
                  </span>
                </div>
                <div className="space-y-1 text-xs">
                  <p className="text-[#475569]">
                    {t.producerLabels.mining} <span className="font-mono font-medium text-[#0F172A]">
                      {Number(country['Těžba 2024 (t)'] ?? 0).toLocaleString(lang) } t
                    </span>
                  </p>
                  <p className="text-[#475569]">
                    {t.producerLabels.refining} <span className="font-medium text-[#0F172A]">{refining}</span>
                  </p>
                  <p className="text-[#475569]">
                    {t.producerLabels.magnets} <span className="font-medium text-[#0F172A]">{magnets}</span>
                  </p>
                  <p className="text-[#475569]">
                    {t.producerLabels.strategy} <span className="text-[#334155]">{strategy?.slice(0, 120)}</span>
                  </p>
                  <p className="text-[10px] text-[#94A3B8]">
                    {firms}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
        <SourceAttribution source={t.producersSource} dict={dict} />
      </div>
    </div>
  )
}
