'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import ConcentrationCascade from '@/components/charts/ConcentrationCascade'
import GapChart from '@/components/charts/GapChart'
import ChinaBalanceChart from '@/components/charts/ChinaBalance'
import type { SupplyChainStage, GapDataPoint, ChinaBalance, CostPassthrough } from '@/lib/types'

interface Props {
  supplyChain: SupplyChainStage[]
  gapData: GapDataPoint[]
  chinaBalance: ChinaBalance[]
  costPass: CostPassthrough[]
}

/* ── building blocks ── */

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

/* spacing helper — consistent giant gap between content blocks within a chapter */
const BLOCK_GAP = 'mb-32 sm:mb-48' // 128px / 192px

export default function PribehClient({ supplyChain, gapData, chinaBalance, costPass }: Props) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">

      {/* ═══════════════ HERO ═══════════════ */}
      <section className="pt-16 pb-8 text-center sm:pt-32 sm:pb-16">
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-block text-xs font-semibold uppercase tracking-[0.25em] text-[#D97706]"
        >
          Příběh v datech
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="mt-6 font-serif text-4xl font-bold leading-[1.15] text-[#0F172A] sm:text-5xl lg:text-6xl"
        >
          Vzácné zeminy
          <br />
          <span className="text-[#64748B]">Proč na nich závisí budoucnost</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mx-auto mt-8 max-w-xl font-serif text-lg leading-relaxed text-[#94A3B8] sm:text-xl"
        >
          Sedm kapitol o 17 prvcích, které pohání elektromobily, větrné turbíny
          i řízené střely — a o zemi, která je téměř výhradně kontroluje.
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
            Peníze, procenta a prosperita
          </a>
          {' '} · hlavní ekonom České spořitelny
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

      {/* ═══════════════ CO JSOU VZÁCNÉ ZEMINY ═══════════════ */}
      <Reveal className={BLOCK_GAP}>
        <h2 className="font-serif text-4xl font-bold leading-tight text-[#0F172A] sm:text-5xl">
          Co jsou vzácné zeminy?
        </h2>
      </Reveal>

      <Reveal className={BLOCK_GAP}>
        <p className="text-lg leading-relaxed text-[#334155]">
          Skupina 17 kovových prvků — lanthanoidů plus skandia a yttria.
          Paradoxně nejsou geologicky vzácné. Cerium je v zemské kůře běžnější než měď.
        </p>
        <p className="mt-6 text-lg leading-relaxed text-[#334155]">
          „Vzácná" je schopnost je ekonomicky těžit, chemicky separovat a zpracovat
          na průmyslově využitelné materiály.
        </p>
      </Reveal>

      <Reveal className={BLOCK_GAP} delay={0.15}>
        <div className="grid gap-5 sm:grid-cols-2">
          {[
            { element: 'Neodym', use: 'Motor elektromobilu' },
            { element: 'Dysprosium', use: 'Tepelná odolnost magnetů' },
            { element: 'Terbium', use: 'Naváděcí systémy' },
            { element: 'Samarium', use: 'Družice na oběžné dráze' },
          ].map((item) => (
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
            Geologicky běžné, strategicky kritické.
            <br />
            Problém není najít rudu — problém je zpracovat ji na magnet.
          </p>
        </div>
      </Reveal>

      <Divider />

      {/* ═══════════════ DOMINANCE ČÍNY ═══════════════ */}
      <Reveal className={BLOCK_GAP}>
        <h2 className="font-serif text-4xl font-bold leading-tight text-[#0F172A] sm:text-5xl">
          Jedna země,<br />totální kontrola
        </h2>
      </Reveal>

      <Reveal className={BLOCK_GAP}>
        <p className="text-lg leading-relaxed text-[#334155]">
          Čína nevládne jen těžbě — její dominance roste s každým krokem zpracování.
          Od rudy k hotovému magnetu se její podíl zvyšuje ze 69 % na více než 90 %.
        </p>
      </Reveal>

      <Reveal className={BLOCK_GAP}>
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
          <BigStat value={69} label="Těžba" delay={0} />
          <BigStat value={91} label="Rafinace" delay={0.15} />
          <BigStat value={92} label="Magnety" delay={0.3} />
          <BigStat value={99} label="Terbium" delay={0.45} />
        </div>
      </Reveal>

      <Reveal>
        <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-6">
          <ConcentrationCascade data={supplyChain} />
        </div>
        <p className="mt-6 text-sm leading-relaxed text-[#64748B]">
          Skutečná závislost není v dolech, ale v rafinériích a továrnách na magnety.
        </p>
      </Reveal>

      <Divider />

      {/* ═══════════════ NABÍDKA VS. POPTÁVKA ═══════════════ */}
      <Reveal className={BLOCK_GAP}>
        <h2 className="font-serif text-4xl font-bold leading-tight text-[#0F172A] sm:text-5xl">
          Nůžky se otevírají
        </h2>
      </Reveal>

      <Reveal className={BLOCK_GAP}>
        <p className="text-lg leading-relaxed text-[#334155]">
          Elektromobilita a větrná energetika ženou poptávku po magnetických vzácných
          zeminách nahoru tempem 7–13 % ročně. Nabídka mimo Čínu ale nestíhá.
        </p>
      </Reveal>

      <Reveal>
        <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-6">
          <GapChart data={gapData} />
        </div>
        <p className="mt-6 text-sm leading-relaxed text-[#64748B]">
          Od roku 2026 se očekává strukturální deficit.
          Nové mimočínské projekty budou trvat 5–10 let, než dosáhnou plné kapacity.
        </p>
      </Reveal>

      <Divider />

      {/* ═══════════════ ČÍNSKÁ BILANCE ═══════════════ */}
      <Reveal className={BLOCK_GAP}>
        <h2 className="font-serif text-4xl font-bold leading-tight text-[#0F172A] sm:text-5xl">
          Čína potřebuje<br />stále víc sama
        </h2>
      </Reveal>

      <Reveal className={BLOCK_GAP}>
        <p className="text-lg leading-relaxed text-[#334155]">
          Čína není jen největší producent — je i největší spotřebitel. Její domácí
          poptávka roste tak rychle, že objem volný pro export klesá.
          Méně vzácných zemin pro zbytek světa, i bez jakýchkoli exportních omezení.
        </p>
      </Reveal>

      <Reveal>
        <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-6">
          <ChinaBalanceChart data={chinaBalance} />
        </div>
      </Reveal>

      <Divider />

      {/* ═══════════════ CENA NENÍ PROBLÉM ═══════════════ */}
      <Reveal className={BLOCK_GAP}>
        <h2 className="font-serif text-4xl font-bold leading-tight text-[#0F172A] sm:text-5xl">
          Ne cena.<br />Dostupnost.
        </h2>
      </Reveal>

      <Reveal className={BLOCK_GAP}>
        <blockquote className="border-l-4 border-[#D97706] pl-5">
          <p className="font-serif text-2xl font-bold italic leading-snug text-[#0F172A] sm:text-3xl">
            I trojnásobné zdražení přidá méně než 1 %
            k ceně elektromobilu.
          </p>
        </blockquote>
      </Reveal>

      <Reveal className={BLOCK_GAP}>
        <div className="overflow-x-auto rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E2E8F0]">
                <th className="px-3 py-2 text-left text-xs font-medium text-[#64748B]">Produkt</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-[#64748B]">Podíl vzácných zemin</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-[#64748B]">Dopad 3x zdražení</th>
              </tr>
            </thead>
            <tbody>
              {costPass.slice(0, 5).map((row, i) => (
                <tr key={i} className="border-b border-[#E2E8F0]/50">
                  <td className="px-3 py-2 font-medium text-[#0F172A]">{row.Produkt}</td>
                  <td className="px-3 py-2 font-mono text-xs text-[#0E7490]">{row['REE/produkt (%)']}</td>
                  <td className="px-3 py-2 font-mono text-xs text-[#D97706]">{row['Dopad 3× zdražení']}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Reveal>

      <Reveal>
        <p className="text-lg leading-relaxed text-[#334155]">
          Skutečné riziko je, že dodávky prostě přestanou proudit — kvůli exportním
          kontrolám, geopolitickému napětí nebo přírodní katastrofě v jediné provincii.
        </p>
      </Reveal>

      <Divider />

      {/* ═══════════════ CESTA VEN ═══════════════ */}
      <Reveal className={BLOCK_GAP}>
        <h2 className="font-serif text-4xl font-bold leading-tight text-[#0F172A] sm:text-5xl">
          Cesta ven existuje
        </h2>
      </Reveal>

      <Reveal className={BLOCK_GAP}>
        <p className="text-lg leading-relaxed text-[#334155]">
          Neexistuje rychlé řešení. Vybudování alternativního dodavatelského řetězce
          zabere minimálně desetiletí. Ale kroky se dějí:
        </p>
      </Reveal>

      <div className="space-y-6">
        {[
          { icon: '🏭', title: 'Nové doly a rafinérie', text: 'Austrálie, Kanada, Švédsko i USA budují kapacity. Většina projektů ale nedosáhne plného provozu před rokem 2030.' },
          { icon: '♻️', title: 'Recyklace', text: 'Z magnetů v elektronice a autovracích lze získat neodym i dysprosium. Zatím pokrývá pod 1 % poptávky, ale roste.' },
          { icon: '🔬', title: 'Substituce', text: 'Feritové magnety nebo motory bez magnetů mohou snížit závislost, ale za cenu nižšího výkonu a vyšší hmotnosti.' },
          { icon: '🇪🇺', title: 'Nařízení EU o kritických surovinách', text: 'Evropa stanovila cíle: 10 % těžby, 40 % zpracování a 25 % recyklace z domácí spotřeby do roku 2030.' },
        ].map((item, i) => (
          <Reveal key={i} delay={i * 0.1}>
            <div className="flex gap-4 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-5">
              <span className="shrink-0 text-2xl">{item.icon}</span>
              <div>
                <p className="font-semibold text-[#0F172A]">{item.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-[#475569]">{item.text}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Divider />

      {/* ═══════════════ CTA ═══════════════ */}
      <Reveal className="pb-32 text-center sm:pb-48">
        <h2 className="mb-8 font-serif text-4xl font-bold text-[#0F172A] sm:text-5xl">
          Chcete vědět víc?
        </h2>
        <p className="mb-12 text-lg text-[#64748B]">
          Prozkoumejte detailní data a analýzy v interaktivním dashboardu.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {[
            { href: '/', label: 'Přehled' },
            { href: '/elements', label: 'Prvky' },
            { href: '/prices', label: 'Ceny' },
            { href: '/supply-chain', label: 'Hodnotový řetězec' },
            { href: '/geopolitics', label: 'Geopolitika' },
            { href: '/scenarios', label: 'Scénáře' },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full border border-[#E2E8F0] px-5 py-2.5 text-sm font-medium text-[#0E7490] transition-all hover:border-[#0E7490] hover:bg-[#0E7490]/5 hover:shadow-sm"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <p className="mt-16 text-xs text-[#94A3B8]">
          David Navrátil · Česká spořitelna · Strategic Research & Insight · 2025
        </p>
      </Reveal>
    </div>
  )
}
