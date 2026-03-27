export interface Element {
  '#': number
  Prvek: string
  Symbol: string
  'At. číslo': number
  Skupina: string
  'Hojnost (ppm)': string | number
  'Cena oxidu (USD/kg)': string
  'Hlavní aplikace': string
  'Strategický význam': string
  'Hlavní zdroj (minerál)': string
  'Top producent': string
}

export interface SupplyChainStage {
  'Stupeň řetězce': string
  'Čína (%)': number | string
  'USA (%)': number | string
  'Austrálie (%)': number | string
  'Myanmar (%)': number | string
  'Japonsko (%)': number | string
  'EU (%)': number | string
  'Ostatní (%)': number | string
  HHI: string | number
  Zranitelnost: string
}

export interface Company {
  Firma: string
  Země: string
  Vlastnictví: string
  Těžba: string
  Separace: string
  Kov: string
  Magnety: string
  'Kapacita / pozice': string
  'Klíčové aktivy': string
  'Status 2025': string
}

export interface PipelineProject {
  Projekt: string
  Firma: string
  Země: string
  Typ: string
  'Kapacita (tpa)': string
  'Investice (mil. USD)': string
  'Start (odhad)': string
  Status: string
  Financování: string
  'Strategický význam': string
}

export interface PricePoint {
  Date: string
  'Ce oxid USD/kg': number | null
  'Dy oxid USD/kg': number | null
  'Pr oxid USD/kg': number | null
  'Tb oxid USD/kg': number | null
  'La oxid USD/kg': number | null
  'Sm oxid USD/kg': number | null
  'Gd oxid USD/kg': number | null
  'Eu oxid USD/kg': number | null
  'REO karb. USD/kg': number | null
  'Brent USD/bbl': number | null
  USDCNY: number | null
}

export interface GapDataPoint {
  Rok: string
  'Poptávka (kt NdPr)': string
  'z toho EV': string
  'z toho Vítr': string
  'z toho Ost.': string
  'Nabídka (kt NdPr)': string
  'z toho Čína': string
  'z toho Non-CN': string
  'Gap (kt)': string
  'Gap (%)': string
  'Non-CN nové kapacity': string
}

export interface CostPassthrough {
  Produkt: string
  'REE materiál (kg)': string
  'Cena REE (USD)': string
  'Cena komponentu (USD)': string
  'Cena produktu (USD)': string
  'REE/komponent (%)': string
  'REE/produkt (%)': string
  'Dopad 3× zdražení': string
  'Klíč. insight': string
}

export interface ChinaBalance {
  Metrika: string
  '2018': string | number | null
  '2020': string | number | null
  '2022': string | number | null
  '2024e': string | number | null
  '2030p': string | number | null
  Poznámka: string | null
  [key: string]: string | number | null | undefined
}

export interface VulnerabilityItem {
  [key: string]: string | number | null
}

export interface CzExposure {
  [key: string]: string | number | null
}

export interface CostBreakdown {
  [key: string]: string | number | null
}

export interface EventItem {
  Datum: string
  Udalost: string
  'Dy USD/kg': number | null
  'Pr USD/kg': number | null
  'Tb USD/kg': number | null
  'Ce USD/kg': number | null
  Brent: number | null
  'Dy 3M chg%': number | null
  'Pr 3M chg%': number | null
}

export interface CorrelationData {
  labels: string[]
  matrix: number[][]
}

export interface SummaryStats {
  periods: {
    period: string
    stats: {
      Prvek: string
      Prumer: number
      Min: number
      Max: number
      Posledni: number
      'Vol 12M ann (%)': number
      'Max DD (%)': number
    }[]
  }[]
}

export interface DemandRow {
  [key: string]: string | number | null
}

export interface ProductionCountry {
  [key: string]: string | number | null
}

export interface ExportControl {
  [key: string]: string | number | null
}

export interface CrmaTarget {
  [key: string]: string | number | null
}

export interface PricesMeta {
  elements: { code: string; name: string; fullName: string }[]
  units: { USD: string; CNY: string }
  source: string
  period: { start: string; end: string }
}
