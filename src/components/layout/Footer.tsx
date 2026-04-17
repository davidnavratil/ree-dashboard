import type { Dictionary } from '@/i18n'

interface FooterProps {
  dict: Dictionary
}

export default function Footer({ dict }: FooterProps) {
  return (
    <footer className="border-t border-[#E2E8F0] bg-[#F8FAFC] px-6 py-8">
      <div className="mx-auto max-w-7xl">
        {/* Newsletter CTA */}
        <div className="mb-6 rounded-lg border border-[#0E7490]/20 bg-[#0E7490]/5 p-6 text-center">
          <p className="text-sm font-semibold text-[#0F172A] mb-1">{dict.footer.newsletterTitle}</p>
          <p className="text-sm text-[#64748B] mb-3">{dict.footer.newsletterDesc}</p>
          <a
            href="https://davidnavratil.substack.com/subscribe"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-[#0E7490] px-5 py-2 text-sm font-semibold text-white hover:bg-[#0C6379] transition-colors"
          >
            {dict.footer.newsletterCta}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>

        {/* Disclaimer */}
        <div className="mb-6 rounded-lg border border-[#E2E8F0] bg-white p-4">
          <p className="text-xs leading-relaxed text-[#64748B]">
            <span className="font-semibold text-[#475569]">{dict.footer.disclaimerLabel}</span>{' '}
            {dict.footer.disclaimer}
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
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
              {dict.footer.authorRole}
            </p>
            <p className="text-xs text-[#64748B]">
              <a
                href="https://davidnavratil.substack.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#0E7490] transition-colors underline decoration-dotted"
              >
                {dict.home.newsletter}
              </a>
            </p>
          </div>
          <div className="sm:text-right">
            <p className="text-xs text-[#475569]">
              {dict.footer.projectLine}
            </p>
            <p className="text-xs text-[#64748B]">
              {dict.footer.orgLine}
            </p>
            <p className="mt-1 text-xs text-[#94A3B8]">
              {dict.footer.lastUpdate}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
