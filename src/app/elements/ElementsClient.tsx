'use client'

import { useState } from 'react'
import ElementCard from '@/components/ui/ElementCard'
import type { Element, VulnerabilityItem } from '@/lib/types'

interface Props {
  elements: Element[]
  vulnerability: VulnerabilityItem[]
}

const FILTERS = [
  { key: 'all', label: 'Všechny' },
  { key: 'LREE', label: 'Lehké (LREE)' },
  { key: 'HREE', label: 'Těžké (HREE)' },
  { key: 'magnetic', label: 'Magnetické' },
  { key: 'critical', label: 'Kritické' },
]

const MAGNETIC_ELEMENTS = ['Nd', 'Pr', 'Dy', 'Tb', 'Sm']
const CRITICAL_ELEMENTS = ['Nd', 'Pr', 'Dy', 'Tb', 'Eu', 'Y']

export default function ElementsClient({ elements, vulnerability }: Props) {
  const [filter, setFilter] = useState('all')
  const [selectedElement, setSelectedElement] = useState<Element | null>(null)

  const filtered = elements.filter((el) => {
    if (filter === 'all') return true
    if (filter === 'LREE') return el.Skupina === 'LREE'
    if (filter === 'HREE') return el.Skupina === 'HREE'
    if (filter === 'magnetic') return MAGNETIC_ELEMENTS.includes(el.Symbol)
    if (filter === 'critical') return CRITICAL_ELEMENTS.includes(el.Symbol)
    return true
  })

  const vulnMap = new Map(
    vulnerability.map((v) => [v.Prvek as string, v])
  )

  const selectedVuln = selectedElement
    ? vulnMap.get(selectedElement.Symbol) || null
    : null

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Left: Grid */}
      <div className="lg:col-span-2">
        {/* Filters */}
        <div className="mb-6 flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                filter === f.key
                  ? 'bg-[#0E7490] text-white'
                  : 'bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0] hover:text-[#0F172A]'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5">
          {filtered.map((el) => (
            <ElementCard
              key={el.Symbol}
              element={el}
              isSelected={selectedElement?.Symbol === el.Symbol}
              onClick={() => setSelectedElement(
                selectedElement?.Symbol === el.Symbol ? null : el
              )}
            />
          ))}
        </div>

      </div>

      {/* Right: Detail Panel */}
      <div className="lg:col-span-1">
        {selectedElement ? (
          <div className="sticky top-24 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-6">
            <div className="mb-4 text-center">
              <span className="font-mono text-5xl font-bold text-[#0E7490]">
                {selectedElement.Symbol}
              </span>
              <h2 className="mt-2 text-xl font-bold text-[#0F172A]">
                {selectedElement.Prvek}
              </h2>
              <p className="text-sm text-[#64748B]">
                Atomové číslo: {selectedElement['At. číslo']}
              </p>
            </div>

            <div className="space-y-3">
              <DetailRow label="Skupina prvků" value={formatGroup(selectedElement.Skupina)} />
              <DetailRow label="Hojnost v zemské kůře" value={formatAbundance(selectedElement['Hojnost (ppm)'])} />
              <DetailRow label="Cena oxidu na světovém trhu" value={`${selectedElement['Cena oxidu (USD/kg)']} USD/kg`} />
              <DetailRow label="Hlavní průmyslové využití" value={selectedElement['Hlavní aplikace']} />
              <DetailRow label="Strategický význam pro průmysl" value={selectedElement['Strategický význam']} />
              <DetailRow label="Hlavní minerální zdroj" value={selectedElement['Hlavní zdroj (minerál)']} />
              <DetailRow label="Největší producenti" value={formatProducers(selectedElement['Top producent'])} />

              {selectedVuln && (
                <>
                  <div className="my-3 border-t border-[#E2E8F0]" />
                  <h3 className="text-sm font-bold text-[#D97706]">Index zranitelnosti (0–30 bodů)</h3>
                  <DetailRow
                    label="Celkové skóre zranitelnosti"
                    value={String(selectedVuln['Composite Vulnerability Score'] ?? '—')}
                    highlight
                  />
                  <DetailRow label="Nahraditelnost jinými materiály" value={formatScore(selectedVuln['Substituovatelnost (1–5)'])} />
                  <DetailRow label="Možnost recyklace z odpadu" value={formatScore(selectedVuln['Recyklovatelnost (1–5)'])} />
                  <DetailRow label="Kolísavost ceny na trhu" value={formatScore(selectedVuln['Cenová volatilita (1–5)'])} />
                  <DetailRow label="Důležitost pro klíčové technologie" value={formatScore(selectedVuln['Strategický význam (1–5)'])} />
                  <p className="mt-2 text-xs text-[#9D174D]">
                    {selectedVuln['Rizikový profil'] as string}
                  </p>
                </>
              )}
            </div>
          </div>
        ) : (
          <div className="sticky top-24 flex h-64 items-center justify-center rounded-xl border border-dashed border-[#CBD5E1] bg-[#F8FAFC] p-6 text-center">
            <p className="text-sm text-[#64748B]">
              Klikněte na prvek pro zobrazení detailu
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

const GROUP_NAMES: Record<string, string> = {
  'LREE': 'Lehké vzácné zeminy (LREE)',
  'HREE': 'Těžké vzácné zeminy (HREE)',
  'LREE/MREE': 'Lehké / střední vzácné zeminy',
  'MREE/HREE': 'Střední / těžké vzácné zeminy',
  'REE (spec.)': 'Speciální (mimo lanthanoidy)',
  '—': 'Nezařazeno (radioaktivní, bez stabilního izotopu)',
}

const COUNTRY_NAMES: Record<string, string> = {
  'CN': 'Čína',
  'PH': 'Filipíny',
  'RU': 'Rusko',
  'AU': 'Austrálie',
  'US': 'USA',
  'IN': 'Indie',
  'MM': 'Myanmar',
  'BR': 'Brazílie',
  'JP': 'Japonsko',
  'MY': 'Malajsie',
}

function formatAbundance(val: string | number): string {
  const s = String(val)
  if (s === '~0' || s === '0') return 'prakticky nulová (radioaktivní, syntetický prvek)'
  const n = parseFloat(s)
  let rarity = ''
  if (!isNaN(n)) {
    if (n >= 30) rarity = 'relativně hojný — srovnatelný s mědí či zinkem'
    else if (n >= 10) rarity = 'středně hojný'
    else if (n >= 5) rarity = 'méně běžný'
    else if (n >= 2) rarity = 'vzácný'
    else if (n >= 0.5) rarity = 'velmi vzácný'
    else rarity = 'extrémně vzácný'
  }
  return `${s} ppm${rarity ? ` — ${rarity}` : ''}`
}

function formatGroup(group: string): string {
  return GROUP_NAMES[group] ?? group
}

function formatProducers(raw: string): string {
  return raw.split(',').map(s => {
    const code = s.trim()
    return COUNTRY_NAMES[code] ?? code
  }).join(', ')
}

function formatScore(val: unknown): string {
  const n = Number(val)
  if (isNaN(n)) return '—'
  const labels = ['', 'velmi nízká', 'nízká', 'střední', 'vysoká', 'velmi vysoká']
  return `${n}/5 — ${labels[n] ?? ''}`
}

function DetailRow({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div>
      <p className="text-xs text-[#64748B]">{label}</p>
      <p className={`text-sm ${highlight ? 'font-mono text-lg font-bold text-[#D97706]' : 'text-[#334155]'}`}>
        {value}
      </p>
    </div>
  )
}
