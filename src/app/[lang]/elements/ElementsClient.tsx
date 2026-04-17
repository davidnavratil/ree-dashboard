'use client'

import { useState } from 'react'
import ElementCard from '@/components/ui/ElementCard'
import type { Element, VulnerabilityItem } from '@/lib/types'
import type { Dictionary } from '@/i18n'

interface Props {
  elements: Element[]
  vulnerability: VulnerabilityItem[]
  dict: Dictionary
  lang: string
}

const MAGNETIC_ELEMENTS = ['Nd', 'Pr', 'Dy', 'Tb', 'Sm']
const CRITICAL_ELEMENTS = ['Nd', 'Pr', 'Dy', 'Tb', 'Eu', 'Y']

export default function ElementsClient({ elements, vulnerability, dict, lang }: Props) {
  const [filter, setFilter] = useState('all')
  const [selectedElement, setSelectedElement] = useState<Element | null>(null)
  const t = dict.elements

  const FILTERS = [
    { key: 'all', label: t.filters.all },
    { key: 'LREE', label: t.filters.lree },
    { key: 'HREE', label: t.filters.hree },
    { key: 'magnetic', label: t.filters.magnetic },
    { key: 'critical', label: t.filters.critical },
  ]

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

  function formatGroup(group: string): string {
    return (t.groupNames as Record<string, string>)[group] ?? group
  }

  function formatAbundance(val: string | number): string {
    const s = String(val)
    if (s === '~0' || s === '0') return t.abundanceLabels.zero
    const n = parseFloat(s)
    let rarity = ''
    if (!isNaN(n)) {
      if (n >= 30) rarity = t.abundanceLabels.veryAbundant
      else if (n >= 10) rarity = t.abundanceLabels.mediumAbundant
      else if (n >= 5) rarity = t.abundanceLabels.lessCommon
      else if (n >= 2) rarity = t.abundanceLabels.rare
      else if (n >= 0.5) rarity = t.abundanceLabels.veryRare
      else rarity = t.abundanceLabels.extremelyRare
    }
    return `${s} ${dict.common.ppmUnit}${rarity ? ` — ${rarity}` : ''}`
  }

  function formatProducers(raw: string): string {
    return raw.split(',').map(s => {
      const code = s.trim()
      return (dict.countries as Record<string, string>)[code] ?? code
    }).join(', ')
  }

  function formatScore(val: unknown): string {
    const n = Number(val)
    if (isNaN(n)) return '—'
    const labels = t.scoreLabels
    return `${n}/5 — ${labels[n] ?? ''}`
  }

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
              dict={dict}
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
                {(t.elementNameMap as Record<string, string>)[selectedElement.Prvek] ?? selectedElement.Prvek}
              </h2>
              <p className="text-sm text-[#64748B]">
                {t.detailLabels.atomicNumber} {selectedElement['At. číslo']}
              </p>
            </div>

            <div className="space-y-3">
              <DetailRow label={t.detailLabels.group} value={formatGroup(selectedElement.Skupina)} />
              <DetailRow label={t.detailLabels.abundance} value={formatAbundance(selectedElement['Hojnost (ppm)'])} />
              <DetailRow label={t.detailLabels.oxidePrice} value={`${selectedElement['Cena oxidu (USD/kg)']} ${dict.common.usdKgUnit}`} />
              <DetailRow label={t.detailLabels.mainApplication} value={(t.applicationMap as Record<string, string>)?.[selectedElement.Symbol] ?? selectedElement['Hlavní aplikace']} />
              <DetailRow label={t.detailLabels.strategicImportance} value={(t.importanceMap as Record<string, string>)?.[selectedElement.Symbol] ?? selectedElement['Strategický význam']} />
              <DetailRow label={t.detailLabels.mainSource} value={(t.sourceMap as Record<string, string>)?.[selectedElement.Symbol] ?? selectedElement['Hlavní zdroj (minerál)']} />
              <DetailRow label={t.detailLabels.topProducers} value={formatProducers(selectedElement['Top producent'])} />

              {selectedVuln && (
                <>
                  <div className="my-3 border-t border-[#E2E8F0]" />
                  <h3 className="text-sm font-bold text-[#D97706]">{t.vulnerabilityTitle}</h3>
                  <DetailRow
                    label={t.vulnerabilityLabels.compositeScore}
                    value={String(selectedVuln['Composite Vulnerability Score'] ?? '—')}
                    highlight
                  />
                  <DetailRow label={t.vulnerabilityLabels.substitutability} value={formatScore(selectedVuln['Substituovatelnost (1–5)'])} />
                  <DetailRow label={t.vulnerabilityLabels.recyclability} value={formatScore(selectedVuln['Recyklovatelnost (1–5)'])} />
                  <DetailRow label={t.vulnerabilityLabels.priceVolatility} value={formatScore(selectedVuln['Cenová volatilita (1–5)'])} />
                  <DetailRow label={t.vulnerabilityLabels.strategicImportance} value={formatScore(selectedVuln['Strategický význam (1–5)'])} />
                  <p className="mt-2 text-xs text-[#9D174D]">
                    {(t.riskProfiles as Record<string, string>)[selectedElement.Symbol] ?? selectedVuln['Rizikový profil'] as string}
                  </p>
                </>
              )}
            </div>
          </div>
        ) : (
          <div className="sticky top-24 flex h-64 items-center justify-center rounded-xl border border-dashed border-[#CBD5E1] bg-[#F8FAFC] p-6 text-center">
            <p className="text-sm text-[#64748B]">
              {t.clickPrompt}
            </p>
          </div>
        )}
      </div>
    </div>
  )
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
