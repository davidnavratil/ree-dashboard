'use client'

import { useState } from 'react'
import type { ExportControl, CrmaTarget, ProductionCountry } from '@/lib/types'
import { parseNumericString } from '@/lib/format'
import SourceAttribution from '@/components/ui/SourceAttribution'

interface Props {
  exportControls: ExportControl[]
  crmaTargets: CrmaTarget[]
  production: ProductionCountry[]
}

const TYPE_COLORS: Record<string, string> = {
  Embargo: '#9D174D',
  Kvóty: '#D97706',
  'Exportní licence': '#D97706',
  Odveta: '#7C3AED',
  Sankce: '#9D174D',
  Legislativa: '#1D4ED8',
  Investice: '#0E7490',
  Partnerství: '#0E7490',
}

function getTypeColor(typ: string): string {
  for (const [key, color] of Object.entries(TYPE_COLORS)) {
    if (typ?.toLowerCase().includes(key.toLowerCase())) return color
  }
  return '#64748B'
}

function CrmaProgressBar({ target }: { target: CrmaTarget }) {
  const currentStr = String(target['Současný stav (~2025)'] ?? '')
  const targetStr = String(target['Cíl 2030'] ?? '')
  const current = parseNumericString(currentStr.replace(/[<>≥≤~%]/g, '')) ?? 0
  const goal = parseNumericString(targetStr.replace(/[<>≥≤~%]/g, '')) ?? 100
  const pct = goal > 0 ? Math.min((current / goal) * 100, 100) : 0

  const isOnTrack = pct > 50
  const barColor = isOnTrack ? '#0E7490' : pct > 25 ? '#D97706' : '#9D174D'

  return (
    <div className="rounded-lg border border-[#E2E8F0] bg-white p-4">
      <div className="mb-1 flex items-center justify-between">
        <span className="text-sm font-bold text-[#0F172A]">{target['Cíl CRMA 2030'] as string}</span>
        <span className="text-xs font-medium" style={{ color: barColor }}>
          {target['Hodnocení reálnosti'] as string}
        </span>
      </div>
      <p className="mb-2 text-xs text-[#64748B]">{target.Metrika as string}</p>
      <div className="mb-1 h-3 overflow-hidden rounded-full bg-[#E2E8F0]">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${pct}%`, backgroundColor: barColor }}
        />
      </div>
      <div className="flex justify-between text-xs">
        <span className="text-[#475569]">Nyní: {currentStr}</span>
        <span className="font-medium text-[#0F172A]">Cíl: {targetStr}</span>
      </div>
      <p className="mt-1 text-xs text-[#64748B]">Gap: {target.Gap as string}</p>
      <p className="mt-1 text-[10px] text-[#94A3B8]">{target['Klíčové projekty'] as string}</p>
    </div>
  )
}

export default function GeopoliticsClient({ exportControls, crmaTargets, production }: Props) {
  const [selectedType, setSelectedType] = useState<string | null>(null)

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
          Chronologie exportních kontrol a geopolitických událostí
        </h3>
        <p className="mb-4 text-xs text-[#64748B]">
          Klíčové momenty, které formovaly globální trh se vzácnými zeminami. Klikněte na typ pro filtraci.
        </p>

        <div className="mb-4 flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedType(null)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              !selectedType ? 'bg-[#0E7490] text-white' : 'bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]'
            }`}
          >
            Všechny ({exportControls.length})
          </button>
          {types.map(t => (
            <button
              key={t}
              onClick={() => setSelectedType(selectedType === t ? null : t)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                selectedType === t ? 'text-white' : 'bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]'
              }`}
              style={selectedType === t ? { backgroundColor: getTypeColor(t) } : {}}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="relative ml-4 border-l-2 border-[#E2E8F0] pl-6">
          {filtered.map((event, i) => {
            const color = getTypeColor(event.Typ as string)
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
                      {event.Typ as string}
                    </span>
                    <span className="text-xs font-medium text-[#475569]">{event['Aktér'] as string}</span>
                  </div>
                  <p className="text-sm font-medium text-[#0F172A]">{event['Opatření'] as string}</p>
                  <p className="mt-1 text-xs text-[#475569]">{event['Cíl / Kontext'] as string}</p>
                  <p className="mt-1 text-xs font-medium text-[#9D174D]">{event.Dopad as string}</p>
                </div>
              </div>
            )
          })}
        </div>
        <SourceAttribution source="USGS, MOFCOM Čína, EU Official Journal, US DoD, firemní oznámení" />
      </div>

      {/* CRMA Tracker */}
      <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-6">
        <h3 className="mb-2 text-lg font-bold text-[#0F172A]">
          Nařízení EU o kritických surovinách (CRMA) — plnění cílů 2030
        </h3>
        <p className="mb-4 text-xs text-[#64748B]">
          CRMA stanovuje minimální podíly EU na těžbě, zpracování a recyklaci kritických surovin.
          Ukazuje se, že většina cílů bude obtížně splnitelná.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {crmaTargets.map((target, i) => (
            <CrmaProgressBar key={i} target={target} />
          ))}
        </div>
        <SourceAttribution source="EU CRMA (Regulation 2024/1252), národní energetické strategie" />
      </div>

      {/* Response Cards — Key Countries */}
      <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-6">
        <h3 className="mb-2 text-lg font-bold text-[#0F172A]">
          Globální producenti vzácných zemin
        </h3>
        <p className="mb-4 text-xs text-[#64748B]">
          Přehled klíčových zemí podle podílu na těžbě, rafinaci a strategické pozice.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {topProducers.map((country, i) => {
            const share = parseNumericString(String(country['Podíl těžby (%)'] ?? '0')) ?? 0
            const isChina = country.Země === 'Čína'
            const borderColor = isChina ? '#9D174D' : share > 5 ? '#0E7490' : '#64748B'
            return (
              <div
                key={i}
                className="rounded-lg border bg-white p-4"
                style={{ borderColor: `${borderColor}40` }}
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-lg font-bold text-[#0F172A]">{country.Země as string}</span>
                  <span className="font-mono text-xl font-bold" style={{ color: borderColor }}>
                    {Math.round(share)}%
                  </span>
                </div>
                <div className="space-y-1 text-xs">
                  <p className="text-[#475569]">
                    Těžba: <span className="font-mono font-medium text-[#0F172A]">
                      {Number(country['Těžba 2024 (t)'] ?? 0).toLocaleString('cs-CZ')} t
                    </span>
                  </p>
                  <p className="text-[#475569]">
                    Rafinace: <span className="font-medium text-[#0F172A]">{country['Rafinační kapacita'] as string}</span>
                  </p>
                  <p className="text-[#475569]">
                    Magnety: <span className="font-medium text-[#0F172A]">{country.Magnety as string}</span>
                  </p>
                  <p className="text-[#475569]">
                    Strategie: <span className="text-[#334155]">{(country['Legislativa / Strategie'] as string)?.slice(0, 80)}</span>
                  </p>
                  <p className="text-[10px] text-[#94A3B8]">
                    {country['Klíčové firmy'] as string}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
        <SourceAttribution source="USGS 2025, národní statistické úřady" />
      </div>
    </div>
  )
}
