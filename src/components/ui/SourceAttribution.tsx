import type { Dictionary } from '@/i18n'

interface SourceAttributionProps {
  source: string
  dict?: Dictionary
  sourceLabel?: string
  analysisLabel?: string
}

export default function SourceAttribution({
  source,
  dict,
  sourceLabel,
  analysisLabel,
}: SourceAttributionProps) {
  const resolvedSourceLabel = sourceLabel ?? dict?.common?.source ?? 'Source:'
  const resolvedAnalysisLabel = analysisLabel ?? dict?.common?.analysis ?? 'Analysis:'
  const analysisAuthor = dict?.common?.analysisAuthor ?? 'David Navrátil / PPP'

  return (
    <p className="mt-2 text-xs text-[#64748B]">
      {resolvedSourceLabel} {source} · {resolvedAnalysisLabel}{' '}
      <a
        href="https://davidnavratil.substack.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#D97706] hover:underline"
      >
        {analysisAuthor}
      </a>
    </p>
  )
}
