const czFormatter = new Intl.NumberFormat('cs-CZ', {
  maximumFractionDigits: 2,
})

const czFormatterInt = new Intl.NumberFormat('cs-CZ', {
  maximumFractionDigits: 0,
})

export function formatNumber(value: number, decimals = 2): string {
  if (decimals === 0) return czFormatterInt.format(value)
  return new Intl.NumberFormat('cs-CZ', {
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
  }).format(value)
}

export function formatPercent(value: number, decimals = 1): string {
  return `${formatNumber(value, decimals)} %`
}

export function formatUsd(value: number, decimals = 0): string {
  return `${formatNumber(value, decimals)} USD`
}

export function formatUsdKg(value: number, decimals = 1): string {
  return `${formatNumber(value, decimals)} USD/kg`
}

/**
 * Parse numeric string from XLSX that may contain ~, (), ranges, etc.
 * Returns number or null if unparseable.
 */
export function parseNumericString(val: string | number | null | undefined): number | null {
  if (val === null || val === undefined) return null
  if (typeof val === 'number') return val

  const s = String(val).trim()
  if (!s) return null

  // Handle parentheses as negative: (3) → -3
  const parenMatch = s.match(/^\(([0-9.,]+)\)$/)
  if (parenMatch) return -parseFloat(parenMatch[1])

  // Handle ranges: "3500-4500" → average
  const rangeMatch = s.match(/^([0-9.,]+)\s*[–-]\s*([0-9.,]+)$/)
  if (rangeMatch) {
    const a = parseFloat(rangeMatch[1].replace(',', '.'))
    const b = parseFloat(rangeMatch[2].replace(',', '.'))
    return (a + b) / 2
  }

  // Strip leading ~, +, %, etc.
  const cleaned = s.replace(/^[~+≈]/, '').replace(/%$/, '').replace(/\s/g, '').replace(',', '.')
  const num = parseFloat(cleaned)
  return isNaN(num) ? null : num
}
