'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import ConcentrationCascade from '@/components/charts/ConcentrationCascade'
import GapChart from '@/components/charts/GapChart'
import ChinaBalanceChart from '@/components/charts/ChinaBalance'
import type { SupplyChainStage, GapDataPoint, ChinaBalance, CostPassthrough } from '@/lib/types'
import type { Dictionary } from '@/i18n'

interface Props {
  supplyChain: SupplyChainStage[]
  gapData: GapDataPoint[]
  chinaBalance: ChinaBalance[]
  costPass: CostPassthrough[]
  dict: Dictionary
  lang: string
}

/* -- building blocks -- */

function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function BigStat({ value, suffix = '%', label, delay = 0 }: { value: number; suffix?: string; label: string; delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      className="text-center"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay }}
    >
      <span className="font-mono text-5xl font-bold text-[#9D174D] sm:text-7xl">
        {value}{suffix}
      </span>
      <p className="mt-3 text-sm text-[#475569]">{label}</p>
    </motion.div>
  )
}

function Divider() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      className="flex items-center justify-center"
      style={{ paddingTop: '10rem', paddingBottom: '10rem' }}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="h-px w-16 bg-[#D97706]" />
      <div className="mx-3 h-1.5 w-1.5 rounded-full bg-[#D97706]" />
      <div className="h-px w-16 bg-[#D97706]" />
    </motion.div>
  )
}

/* spacing helper */
const BLOCK_GAP = 'mb-32 sm:mb-48'

export default function PribehClient({ supplyChain, gapData, chinaBalance, costPass, dict, lang }: Props) {
  const t = dict.story
  const CTA_HREFS = ['/', '/elements', '/prices', '/supply-chain', '/geopolitics', '/scenarios']

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">

      {/* HERO */}
      <section className="pt-16 pb-8 text-center sm:pt-32 sm:pb-16">
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-block text-xs font-semibold uppercase tracking-[0.25em] text-[#D97706]"
        >
          {t.heroLabel}
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="mt-6 font-serif text-4xl font-bold leading-[1.15] text-[#0F172A] sm:text-5xl lg:text-6xl"
        >
          {t.heroTitle}
          <br />
          <span className="text-[#64748B]">{t.heroSubtitle}</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mx-auto mt-8 max-w-xl font-serif text-lg leading-relaxed text-[#94A3B8] sm:text-xl"
        >
          {t.heroDesc}
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mt-6 text-sm text-[#64748B]"
        >
          David Navrátil · {' '}
          <a
            href="https://davidnavratil.substack.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#D97706] hover:underline"
          >
            {dict.home.newsletter}
          </a>
          {' '} · {t.authorLine}
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="mt-16"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="text-[#CBD5E1]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mx-auto h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
            </svg>
          </motion.div>
        </motion.div>
      </section>

      <Divider />

      {/* CH1: CO JSOU VZACNE ZEMINY */}
      <Reveal className={BLOCK_GAP}>
        <h2 className="font-serif text-4xl font-bold leading-tight text-[#0F172A] sm:text-5xl">
          {t.ch1Title}
        </h2>
      </Reveal>

      <Reveal className={BLOCK_GAP}>
        <p className="text-lg leading-relaxed text-[#334155]">
          {t.ch1P1}
        </p>
        <p className="mt-6 text-lg leading-relaxed text-[#334155]">
          {t.ch1P2}
        </p>
      </Reveal>

      <Reveal className={BLOCK_GAP} delay={0.15}>
        <div className="grid gap-5 sm:grid-cols-2">
          {t.ch1Elements.map((item) => (
            <div key={item.element} className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-5">
              <p className="font-serif text-lg font-bold text-[#0F172A]">{item.element}</p>
              <p className="mt-1 text-sm text-[#64748B]">{item.use}</p>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal>
        <div className="rounded-xl border border-[#D97706]/20 bg-[#D97706]/5 p-6">
          <p className="font-serif text-base italic leading-relaxed text-[#92400E]">
            {t.ch1Quote.split('\n').map((line, i) => (
              <span key={i}>{line}{i === 0 && <br />}</span>
            ))}
          </p>
        </div>
      </Reveal>

      <Divider />

      {/* CH2: DOMINANCE CINY */}
      <Reveal className={BLOCK_GAP}>
        <h2 className="font-serif text-4xl font-bold leading-tight text-[#0F172A] sm:text-5xl">
          {t.ch2Title.split('\n').map((line, i) => (
            <span key={i}>{line}{i === 0 && <br />}</span>
          ))}
        </h2>
      </Reveal>

      <Reveal className={BLOCK_GAP}>
        <p className="text-lg leading-relaxed text-[#334155]">
          {t.ch2P1}
        </p>
      </Reveal>

      <Reveal className={BLOCK_GAP}>
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
          <BigStat value={69} label={t.ch2Stats[0].label} delay={0} />
          <BigStat value={91} label={t.ch2Stats[1].label} delay={0.15} />
          <BigStat value={92} label={t.ch2Stats[2].label} delay={0.3} />
          <BigStat value={99} label={t.ch2Stats[3].label} delay={0.45} />
        </div>
      </Reveal>

      <Reveal>
        <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-6">
          <ConcentrationCascade data={supplyChain} dict={dict} />
        </div>
        <p className="mt-6 text-sm leading-relaxed text-[#64748B]">
          {t.ch2Note}
        </p>
      </Reveal>

      <Divider />

      {/* CH3: NUZKY SE OTEVIRAJI */}
      <Reveal className={BLOCK_GAP}>
        <h2 className="font-serif text-4xl font-bold leading-tight text-[#0F172A] sm:text-5xl">
          {t.ch3Title}
        </h2>
      </Reveal>

      <Reveal className={BLOCK_GAP}>
        <p className="text-lg leading-relaxed text-[#334155]">
          {t.ch3P1}
        </p>
      </Reveal>

      <Reveal>
        <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-6">
          <GapChart data={gapData} dict={dict} />
        </div>
        <p className="mt-6 text-sm leading-relaxed text-[#64748B]">
          {t.ch3Note}
        </p>
      </Reveal>

      <Divider />

      {/* CH4: CINSKA BILANCE */}
      <Reveal className={BLOCK_GAP}>
        <h2 className="font-serif text-4xl font-bold leading-tight text-[#0F172A] sm:text-5xl">
          {t.ch4Title.split('\n').map((line, i) => (
            <span key={i}>{line}{i === 0 && <br />}</span>
          ))}
        </h2>
      </Reveal>

      <Reveal className={BLOCK_GAP}>
        <p className="text-lg leading-relaxed text-[#334155]">
          {t.ch4P1}
        </p>
      </Reveal>

      <Reveal>
        <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-6">
          <ChinaBalanceChart data={chinaBalance} dict={dict} />
        </div>
      </Reveal>

      <Divider />

      {/* CH5: NE CENA. DOSTUPNOST. */}
      <Reveal className={BLOCK_GAP}>
        <h2 className="font-serif text-4xl font-bold leading-tight text-[#0F172A] sm:text-5xl">
          {t.ch5Title.split('\n').map((line, i) => (
            <span key={i}>{line}{i === 0 && <br />}</span>
          ))}
        </h2>
      </Reveal>

      <Reveal className={BLOCK_GAP}>
        <blockquote className="border-l-4 border-[#D97706] pl-5">
          <p className="font-serif text-2xl font-bold italic leading-snug text-[#0F172A] sm:text-3xl">
            {t.ch5Quote}
          </p>
        </blockquote>
      </Reveal>

      <Reveal className={BLOCK_GAP}>
        <div className="overflow-x-auto rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E2E8F0]">
                <th className="px-3 py-2 text-left text-xs font-medium text-[#64748B]">{t.ch5TableHeaders.product}</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-[#64748B]">{t.ch5TableHeaders.reeShare}</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-[#64748B]">{t.ch5TableHeaders.tripleImpact}</th>
              </tr>
            </thead>
            <tbody>
              {costPass.slice(0, 5).map((row, i) => (
                <tr key={i} className="border-b border-[#E2E8F0]/50">
                  <td className="px-3 py-2 font-medium text-[#0F172A]">{(dict.home.costPassProducts as Record<string, string>)?.[row.Produkt] ?? row.Produkt}</td>
                  <td className="px-3 py-2 font-mono text-xs text-[#0E7490]">{row['REE/produkt (%)']}</td>
                  <td className="px-3 py-2 font-mono text-xs text-[#D97706]">{(dict.home.costPassImpact as Record<string, string>)?.[row['Dopad 3× zdražení']] ?? row['Dopad 3× zdražení']}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Reveal>

      <Reveal>
        <p className="text-lg leading-relaxed text-[#334155]">
          {t.ch5P1}
        </p>
      </Reveal>

      <Divider />

      {/* CH6: CESTA VEN */}
      <Reveal className={BLOCK_GAP}>
        <h2 className="font-serif text-4xl font-bold leading-tight text-[#0F172A] sm:text-5xl">
          {t.ch6Title}
        </h2>
      </Reveal>

      <Reveal className={BLOCK_GAP}>
        <p className="text-lg leading-relaxed text-[#334155]">
          {t.ch6P1}
        </p>
      </Reveal>

      <div className="space-y-6">
        {t.ch6Items.map((item, i) => {
          const icons = ['\u{1F3ED}', '\u267B\u{FE0F}', '\u{1F52C}', '\u{1F1EA}\u{1F1FA}']
          return (
            <Reveal key={i} delay={i * 0.1}>
              <div className="flex gap-4 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-5">
                <span className="shrink-0 text-2xl">{icons[i] ?? ''}</span>
                <div>
                  <p className="font-semibold text-[#0F172A]">{item.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-[#475569]">{item.text}</p>
                </div>
              </div>
            </Reveal>
          )
        })}
      </div>

      <Divider />

      {/* CTA */}
      <Reveal className="pb-32 text-center sm:pb-48">
        <h2 className="mb-8 font-serif text-4xl font-bold text-[#0F172A] sm:text-5xl">
          {t.ctaTitle}
        </h2>
        <p className="mb-12 text-lg text-[#64748B]">
          {t.ctaDesc}
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {t.ctaLinks.map((link, i) => (
            <Link
              key={CTA_HREFS[i]}
              href={`/${lang}${CTA_HREFS[i]}`}
              className="rounded-full border border-[#E2E8F0] px-5 py-2.5 text-sm font-medium text-[#0E7490] transition-all hover:border-[#0E7490] hover:bg-[#0E7490]/5 hover:shadow-sm"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <p className="mt-16 text-xs text-[#94A3B8]">
          {t.ctaFooter}
        </p>
      </Reveal>
    </div>
  )
}
