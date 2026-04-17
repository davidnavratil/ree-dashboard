export default function BrandFooter({ lang }: { lang: string }) {
  const isEn = lang === 'en'
  return (
    <footer className="border-t border-[#E0DCD4] bg-[#EDE9E0]" style={{ fontFamily: 'var(--font-sans, Inter, system-ui, sans-serif)' }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-6 border-b border-[#E0DCD4]">
          <p className="text-[#111111] font-semibold max-w-[400px]" style={{ fontFamily: 'var(--font-serif, Fraunces, Georgia, serif)', lineHeight: 1.4 }}>
            {isEn ? "Don't just watch the world. Understand it." : 'Nechcete jen sledovat svět. Chcete mu rozumět.'}
          </p>
          <a
            href="https://davidnavratil.substack.com/subscribe"
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#1B7D8A] text-white text-sm font-semibold hover:bg-[#156A75] transition-colors"
          >
            {isEn ? 'Subscribe to newsletter' : 'Odebírat newsletter'}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <nav className="flex gap-3 flex-wrap">
            <a href="/analyses/qatar-infrastructure/" className="px-3 py-1 rounded-full border border-[#E0DCD4] text-xs font-medium text-[#736D64] hover:border-[#1B7D8A] hover:text-[#1B7D8A] transition-colors">{isEn ? 'Qatar Infrastructure' : 'Katarská infrastruktura'}</a>
            <a href={isEn ? '/analyses/hormuz/en/' : '/analyses/hormuz/'} className="px-3 py-1 rounded-full border border-[#E0DCD4] text-xs font-medium text-[#736D64] hover:border-[#1B7D8A] hover:text-[#1B7D8A] transition-colors">Hormuz</a>
            <a href={isEn ? '/analyses/ree-dashboard/en/' : '/analyses/ree-dashboard/'} className="px-3 py-1 rounded-full border border-[#1B7D8A] text-xs font-medium text-[#1B7D8A]">REE Dashboard</a>
            <a href={isEn ? '/analyses/uzka-hrdla/?lang=en' : '/analyses/uzka-hrdla/'} className="px-3 py-1 rounded-full border border-[#E0DCD4] text-xs font-medium text-[#736D64] hover:border-[#1B7D8A] hover:text-[#1B7D8A] transition-colors">{isEn ? 'Bottlenecks' : 'Úzká Hrdla'}</a>
            <a href="/analyses/energy-shock-2022-vs-2026/" className="px-3 py-1 rounded-full border border-[#E0DCD4] text-xs font-medium text-[#736D64] hover:border-[#1B7D8A] hover:text-[#1B7D8A] transition-colors">{isEn ? 'Two Shocks, Two Worlds' : 'Dva šoky, dva světy'}</a>
            <a href="/analyses/fertilizer-crisis/" className="px-3 py-1 rounded-full border border-[#E0DCD4] text-xs font-medium text-[#736D64] hover:border-[#1B7D8A] hover:text-[#1B7D8A] transition-colors">{isEn ? 'Fertilizer Crisis' : 'Krize hnojiv'}</a>
            <a href="/analyses/hormuz-energy-simulator/" className="px-3 py-1 rounded-full border border-[#E0DCD4] text-xs font-medium text-[#736D64] hover:border-[#1B7D8A] hover:text-[#1B7D8A] transition-colors">{isEn ? 'Hormuz Energy Simulator' : 'Hormuz — Energetický simulátor'}</a>
          </nav>
          <span className="text-[#736D64] text-xs">&copy; 2026 David Navrátil</span>
        </div>
      </div>
    </footer>
  )
}
