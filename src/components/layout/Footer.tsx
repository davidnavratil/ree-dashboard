export default function Footer() {
  return (
    <footer className="border-t border-[#E2E8F0] bg-[#F8FAFC] px-6 py-8">
      <div className="mx-auto max-w-7xl flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-bold text-[#0F172A]">
            <a
              href="https://www.linkedin.com/in/david-navratil/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#0E7490] transition-colors"
            >
              David Navrátil
            </a>
          </p>
          <p className="text-xs text-[#475569]">
            Hlavní ekonom České spořitelny
          </p>
          <p className="text-xs text-[#64748B]">
            <a
              href="https://davidnavratil.substack.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#0E7490] transition-colors underline decoration-dotted"
            >
              Peníze, procenta a prosperita
            </a>
          </p>
        </div>
        <div className="sm:text-right">
          <p className="text-xs text-[#475569]">
            Vzácné zeminy — Strategická analýza · Březen 2026
          </p>
          <p className="text-xs text-[#64748B]">
            Česká spořitelna · Strategic Research & Insight
          </p>
        </div>
      </div>
    </footer>
  )
}
