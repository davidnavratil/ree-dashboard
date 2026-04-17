'use client'

import type { Element } from '@/lib/types'
import type { Dictionary } from '@/i18n'
import { GROUP_COLORS } from '@/lib/colors'

interface Props {
  element: Element
  isSelected: boolean
  onClick: () => void
  dict: Dictionary
}

export default function ElementCard({ element, isSelected, onClick, dict }: Props) {
  const groupColor = GROUP_COLORS[element.Skupina] || '#64748B'
  const groupLabel = (dict.elements.cardGroupLabels as Record<string, string>)[element.Skupina] ?? element.Skupina
  const elementName = (dict.elements.elementNameMap as Record<string, string>)[element.Prvek] ?? element.Prvek

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
      <span className="mt-1 text-xs text-[#0F172A]">{elementName}</span>
      <span
        className="mt-2 inline-block rounded-full px-2 py-0.5 text-[10px] font-medium"
        style={{ backgroundColor: `${groupColor}15`, color: groupColor }}
      >
        {groupLabel}
      </span>
    </button>
  )
}
