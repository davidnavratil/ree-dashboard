import { notFound } from 'next/navigation'
import { getDictionary, hasLocale } from '@/i18n'
import PageHeader from '@/components/layout/PageHeader'

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = await getDictionary(lang)

  return (
    <div className="space-y-8">
      <PageHeader
        title={dict.about.title}
        subtitle={dict.about.subtitle}
      />

      {/* Author Card */}
      <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-6 sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-[#0E7490] text-2xl font-bold text-white">
            DN
          </div>
          <div>
            <a
              href="https://www.linkedin.com/in/david-navratil/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl font-bold text-[#0F172A] transition-colors hover:text-[#0E7490]"
            >
              David Navrátil
            </a>
            <p className="mt-1 text-sm font-medium text-[#475569]">
              {dict.about.authorRole}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[#334155]">
              {dict.about.authorBio}
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href="https://davidnavratil.substack.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-[#FF6719]/10 px-4 py-2 text-sm font-semibold text-[#FF6719] transition-colors hover:bg-[#FF6719]/20"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current"><path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z"/></svg>
                {dict.home.newsletter}
              </a>
              <a
                href="https://www.linkedin.com/in/david-navratil/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-[#0A66C2]/10 px-4 py-2 text-sm font-semibold text-[#0A66C2] transition-colors hover:bg-[#0A66C2]/20"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Elements Table */}
      <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-6">
        <h3 className="mb-4 text-lg font-bold text-[#0F172A]">{dict.about.elementsTitle}</h3>
        <p className="mb-4 text-sm text-[#64748B]">
          {dict.about.elementsDesc}
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E2E8F0]">
                <th className="px-2 py-2 text-left text-xs font-medium text-[#64748B]">{dict.about.elementsHeaders.symbol}</th>
                <th className="px-2 py-2 text-left text-xs font-medium text-[#64748B]">{dict.about.elementsHeaders.czechName}</th>
                <th className="px-2 py-2 text-left text-xs font-medium text-[#64748B]">{dict.about.elementsHeaders.atomicNumber}</th>
                <th className="px-2 py-2 text-left text-xs font-medium text-[#64748B]">{dict.about.elementsHeaders.group}</th>
              </tr>
            </thead>
            <tbody>
              {dict.about.elementsList.map((el) => (
                <tr key={el.sym} className="border-b border-[#E2E8F0]/50">
                  <td className="px-2 py-1.5 font-mono font-bold text-[#0E7490]">{el.sym}</td>
                  <td className="px-2 py-1.5 text-[#0F172A]">{el.name}</td>
                  <td className="px-2 py-1.5 font-mono text-[#64748B]">{el.num}</td>
                  <td className="px-2 py-1.5 text-[#64748B]">{el.group}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Abbreviations */}
      <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-6">
        <h3 className="mb-4 text-lg font-bold text-[#0F172A]">{dict.about.abbreviationsTitle}</h3>
        <div className="grid gap-x-8 gap-y-2 text-sm sm:grid-cols-2">
          {dict.about.abbreviations.map((item) => (
            <div key={item.abbr} className="flex gap-2">
              <span className="shrink-0 font-bold text-[#0E7490]">{item.abbr}</span>
              <span className="text-[#334155]">{item.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Methodology + Data Sources */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-6">
          <h3 className="mb-4 text-lg font-bold text-[#0F172A]">{dict.about.methodologyTitle}</h3>
          <div className="space-y-3 text-sm leading-relaxed text-[#334155]">
            <p>{dict.about.methodologyP1}</p>
            <p>{dict.about.methodologyP2}</p>
            <p>{dict.about.methodologyP3}</p>
            <ul className="ml-4 list-disc space-y-1 text-sm text-[#334155]">
              {dict.about.methodologyDimensions.map((dim, i) => (
                <li key={i}><strong>{dim.bold}</strong>{dim.desc}</li>
              ))}
            </ul>
            <p className="mt-2">{dict.about.methodologyP4}</p>
          </div>
        </div>

        <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-6">
          <h3 className="mb-4 text-lg font-bold text-[#0F172A]">{dict.about.dataSourcesTitle}</h3>
          <ul className="space-y-3 text-sm text-[#334155]">
            {dict.about.dataSources.map((item, i) => (
              <li key={i} className="flex gap-2">
                <span className="shrink-0 font-bold text-[#64748B]">{item.source}</span>
                <span>{item.desc}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-6">
        <h3 className="mb-2 text-sm font-bold text-[#0E7490]">{dict.about.disclaimerTitle}</h3>
        <p className="text-sm text-[#64748B]">
          {dict.about.disclaimerText}
        </p>
      </div>
    </div>
  )
}
