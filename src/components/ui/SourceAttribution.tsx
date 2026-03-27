interface SourceAttributionProps {
  source: string
}

export default function SourceAttribution({ source }: SourceAttributionProps) {
  return (
    <p className="mt-2 text-xs text-[#64748B]">
      Zdroj: {source} · Analýza:{' '}
      <a
        href="https://davidnavratil.substack.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#D97706] hover:underline"
      >
        David Navrátil / PPP
      </a>
    </p>
  )
}
