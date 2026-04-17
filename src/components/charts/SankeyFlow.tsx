'use client'

import { useRef, useEffect, useState } from 'react'
import * as d3 from 'd3'
import { sankey as d3Sankey, sankeyLinkHorizontal } from 'd3-sankey'
import type { Dictionary } from '@/i18n'
import SourceAttribution from '@/components/ui/SourceAttribution'

interface SankeyNode {
  name: string
  category: string
}

interface SankeyLink {
  source: number
  target: number
  value: number
}

interface Props {
  dict: Dictionary
}

function getNodes(dict: Dictionary): SankeyNode[] {
  const n = dict.charts.sankey.nodes
  return [
    // Stage 0: Mining (sources)
    { name: n.chinaMining, category: 'china' },
    { name: n.myanmar, category: 'other' },
    { name: n.usa, category: 'west' },
    { name: n.australia, category: 'west' },
    { name: n.other, category: 'other' },
    // Stage 1: Separation
    { name: n.separationChina, category: 'china' },
    { name: n.separationWest, category: 'west' },
    // Stage 2: Metal/Alloy
    { name: n.metalChina, category: 'china' },
    { name: n.metalWest, category: 'west' },
    // Stage 3: Magnets
    { name: n.magnetsChina, category: 'china' },
    { name: n.magnetsJpEu, category: 'west' },
    // Stage 4: Applications
    { name: n.evMotors, category: 'app' },
    { name: n.windTurbines, category: 'app' },
    { name: n.electronics, category: 'app' },
    { name: n.defense, category: 'app' },
    { name: n.otherApps, category: 'app' },
  ]
}

const LINKS: SankeyLink[] = [
  // Mining → Separation
  { source: 0, target: 5, value: 270 },  // China mining → China sep
  { source: 0, target: 6, value: 5 },    // China mining → West sep (small)
  { source: 1, target: 5, value: 45 },   // Myanmar → China sep
  { source: 2, target: 6, value: 43 },   // USA → West sep (MP Materials)
  { source: 3, target: 5, value: 10 },   // Australia → China sep (Lynas sends some)
  { source: 3, target: 6, value: 7 },    // Australia → West sep (Lynas Malaysia)
  { source: 4, target: 5, value: 10 },   // Other → China sep
  // Separation → Metal
  { source: 5, target: 7, value: 310 },  // China sep → China metal
  { source: 5, target: 8, value: 25 },   // China sep → West metal
  { source: 6, target: 8, value: 30 },   // West sep → West metal
  // Metal → Magnets
  { source: 7, target: 9, value: 280 },  // China metal → China magnets
  { source: 7, target: 10, value: 30 },  // China metal → JP/EU magnets
  { source: 8, target: 10, value: 25 },  // West metal → JP/EU magnets
  // Magnets → Applications
  { source: 9, target: 11, value: 100 }, // CN magnets → EV
  { source: 9, target: 12, value: 60 },  // CN magnets → Wind
  { source: 9, target: 13, value: 50 },  // CN magnets → Electronics
  { source: 9, target: 14, value: 20 },  // CN magnets → Defense
  { source: 9, target: 15, value: 50 },  // CN magnets → Other
  { source: 10, target: 11, value: 25 }, // JP/EU magnets → EV
  { source: 10, target: 12, value: 10 }, // JP/EU magnets → Wind
  { source: 10, target: 14, value: 15 }, // JP/EU magnets → Defense
  { source: 10, target: 15, value: 5 },  // JP/EU magnets → Other
]

const CATEGORY_COLORS: Record<string, string> = {
  china: '#9D174D',
  west: '#0E7490',
  other: '#64748B',
  app: '#1D4ED8',
}

export default function SankeyFlow({ dict }: Props) {
  const svgRef = useRef<SVGSVGElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [tooltip, setTooltip] = useState<{ x: number; y: number; text: string } | null>(null)
  const [dimensions, setDimensions] = useState({ width: 900, height: 500 })

  const NODES = getNodes(dict)

  useEffect(() => {
    const observer = new ResizeObserver(entries => {
      for (const entry of entries) {
        const w = entry.contentRect.width
        setDimensions({ width: Math.max(w, 400), height: Math.max(w * 0.5, 350) })
      }
    })
    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!svgRef.current) return

    const { width, height } = dimensions
    const margin = { top: 10, right: 10, bottom: 10, left: 10 }

    const svg = d3.select(svgRef.current)
    svg.selectAll('*').remove()

    const indexedNodes = NODES.map((d, i) => ({ ...d, id: String(i) }))
    const indexedLinks = LINKS.map(d => ({ source: String(d.source), target: String(d.target), value: d.value }))

    const sankeyGenerator = (d3Sankey as any)()
      .nodeId((d: any) => d.id)
      .nodeWidth(18)
      .nodePadding(12)
      .nodeSort(null)
      .extent([[margin.left, margin.top], [width - margin.right, height - margin.bottom]])

    const graph = sankeyGenerator({
      nodes: indexedNodes,
      links: indexedLinks,
    })

    // Links
    svg.append('g')
      .selectAll('path')
      .data(graph.links)
      .join('path')
      .attr('d', sankeyLinkHorizontal() as any)
      .attr('fill', 'none')
      .attr('stroke', (d: any) => {
        const sourceNode = d.source
        return CATEGORY_COLORS[sourceNode.category] ?? '#94A3B8'
      })
      .attr('stroke-opacity', 0.3)
      .attr('stroke-width', (d: any) => Math.max(1, d.width))
      .on('mouseenter', function(event: any, d: any) {
        d3.select(this).attr('stroke-opacity', 0.6)
        const src = d.source.name
        const tgt = d.target.name
        setTooltip({
          x: event.offsetX,
          y: event.offsetY,
          text: `${src} → ${tgt}: ${d.value} kt`
        })
      })
      .on('mouseleave', function() {
        d3.select(this).attr('stroke-opacity', 0.3)
        setTooltip(null)
      })

    // Nodes
    svg.append('g')
      .selectAll('rect')
      .data(graph.nodes)
      .join('rect')
      .attr('x', (d: any) => d.x0)
      .attr('y', (d: any) => d.y0)
      .attr('width', (d: any) => d.x1 - d.x0)
      .attr('height', (d: any) => Math.max(1, d.y1 - d.y0))
      .attr('fill', (d: any) => CATEGORY_COLORS[d.category] ?? '#94A3B8')
      .attr('rx', 2)
      .on('mouseenter', function(event: any, d: any) {
        setTooltip({ x: event.offsetX, y: event.offsetY, text: d.name })
      })
      .on('mouseleave', () => setTooltip(null))

    // Labels
    svg.append('g')
      .selectAll('text')
      .data(graph.nodes)
      .join('text')
      .attr('x', (d: any) => d.x0 < width / 2 ? d.x1 + 6 : d.x0 - 6)
      .attr('y', (d: any) => (d.y0 + d.y1) / 2)
      .attr('dy', '0.35em')
      .attr('text-anchor', (d: any) => d.x0 < width / 2 ? 'start' : 'end')
      .attr('font-size', '10px')
      .attr('fill', '#475569')
      .text((d: any) => d.name)

  }, [dimensions, NODES])

  return (
    <div>
      <h3 className="mb-2 text-lg font-bold text-[#0F172A]">
        {dict.charts.sankey.title}
      </h3>
      <p className="mb-4 text-xs text-[#64748B]">
        {dict.charts.sankey.description}
        <span className="ml-1 font-medium text-[#9D174D]">{dict.charts.sankey.legendChina}</span>,{' '}
        <span className="font-medium text-[#0E7490]">{dict.charts.sankey.legendWest}</span>,{' '}
        <span className="font-medium text-[#1D4ED8]">{dict.charts.sankey.legendApps}</span>.
      </p>
      <div ref={containerRef} className="relative">
        <svg
          ref={svgRef}
          width={dimensions.width}
          height={dimensions.height}
          className="w-full"
          style={{ maxHeight: 500 }}
        />
        {tooltip && (
          <div
            className="pointer-events-none absolute rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-xs shadow-lg"
            style={{ left: tooltip.x + 10, top: tooltip.y - 30 }}
          >
            {tooltip.text}
          </div>
        )}
      </div>
      <SourceAttribution source={dict.charts.sankey.source} dict={dict} />
    </div>
  )
}
