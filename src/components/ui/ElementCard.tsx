'use client'

import type { Element } from '@/lib/types'
import { GROUP_COLORS } from '@/lib/colors'

interface Props {
  element: Element
  isSelected: boolean
  onClick: () => void
}

const GROUP_LABELS: Record<string, string> = {
  'LREE': 'lehké',
  'HREE': 'těžké',
  'LREE/MREE': 'lehké/střední',
  'MREE/HREE': 'střední/těžké',
  'REE (spec.)': 'speciální',
  '—': '—',
}

export default function ElementCard({ element, isSelected, onClick }: Props) {
  const groupColor = GROUP_COLORS[element.Skupina] || '#64748B'

  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center rounded-xl border p-4 text-center transition-all hover:scale-105 hover:shadow-md ${
        isSelected
          ? 'border-[#0E7490] bg-[#0E7490]/5 shadow-lg shadow-[#0E7490]/10'
          : 'border-[#E2E8F0] bg-[#F8FAFC] hover:border-[#CBD5E1] hover:bg-[#F1F5F9]'
      }`}
    >
      <span
        className="font-mono text-2xl font-bold"
        style={{ color: groupColor }}
      >
        {element.Symbol}
      </span>
      <span className="mt-1 text-xs text-[#0F172A]">{element.Prvek}</span>
      <span
        className="mt-2 inline-block rounded-full px-2 py-0.5 text-[10px] font-medium"
        style={{ backgroundColor: `${groupColor}15`, color: groupColor }}
      >
        {GROUP_LABELS[element.Skupina] ?? element.Skupina}
      </span>
    </button>
  )
}
