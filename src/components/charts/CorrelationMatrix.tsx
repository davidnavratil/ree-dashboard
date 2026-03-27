'use client'

import React, { useState } from 'react'
import type { CorrelationData } from '@/lib/types'
import SourceAttribution from '@/components/ui/SourceAttribution'

interface Props {
  data: CorrelationData
}

function getColor(value: number): string {
  if (value >= 0.7) return '#1D4ED8'
  if (value >= 0.5) return '#0E7490'
  if (value >= 0.3) return '#0E749060'
  if (value >= 0.1) return '#CBD5E1'
  if (value >= -0.1) return '#E2E8F0'
  if (value >= -0.3) return '#D9770640'
  return '#9D174D40'
}

function getTextColor(value: number): string {
  if (value >= 0.5) return '#FFFFFF'
  if (value <= -0.3) return '#0F172A'
  return '#0F172A'
}

export default function CorrelationMatrix({ data }: Props) {
  const [hoveredCell, setHoveredCell] = useState<{ row: number; col: number } | null>(null)

  const shortLabels = data.labels.map((l) =>
    l.replace(' oxid', '').replace(' karb.', '')
  )

  return (
    <div>
      <h3 className="mb-4 text-lg font-bold text-[#0F172A]">
        Korelační matice měsíčních výnosů
      </h3>
      <p className="mb-3 text-xs text-[#64748B]">
        Ukazuje, jak silně se pohybují ceny jednotlivých prvků společně. Hodnota 1,0 = dokonalá korelace, 0 = žádný vztah.
      </p>

      <div className="overflow-x-auto">
        <div
          className="inline-grid"
          style={{ gridTemplateColumns: `80px repeat(${shortLabels.length}, 1fr)` }}
        >
          {[
            <div key="header-empty" />,
            ...shortLabels.map((label, i) => (
              <div key={`header-${i}`} className="p-1 text-center text-[10px] text-[#475569]" style={{ writingMode: 'vertical-lr', transform: 'rotate(180deg)', height: 60 }}>
                {label}
              </div>
            )),
            ...data.matrix.flatMap((row, rowIdx) => [
              <div key={`label-${rowIdx}`} className="flex items-center pr-2 text-right text-[10px] text-[#475569]">
                {shortLabels[rowIdx]}
              </div>,
              ...row.map((val, colIdx) => (
                <div
                  key={`cell-${rowIdx}-${colIdx}`}
                  className="flex items-center justify-center rounded-sm p-1 text-[10px] font-mono transition-transform hover:scale-110"
                  style={{
                    backgroundColor: getColor(val ?? 0),
                    minWidth: 40,
                    minHeight: 32,
                  }}
                  onMouseEnter={() => setHoveredCell({ row: rowIdx, col: colIdx })}
                  onMouseLeave={() => setHoveredCell(null)}
                >
                  <span style={{ color: getTextColor(val ?? 0) }}>
                    {val !== null ? val.toFixed(2) : '—'}
                  </span>
                </div>
              )),
            ]),
          ]}
        </div>
      </div>

      {hoveredCell && (
        <p className="mt-2 text-xs text-[#475569]">
          {shortLabels[hoveredCell.row]} × {shortLabels[hoveredCell.col]}:{' '}
          <span className="font-mono font-bold text-[#0E7490]">
            {data.matrix[hoveredCell.row]?.[hoveredCell.col]?.toFixed(4)}
          </span>
        </p>
      )}

      <SourceAttribution source="korelace měsíčních výnosů oxidů vzácných zemin 2014–2025" />
    </div>
  )
}
