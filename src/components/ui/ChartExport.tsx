'use client'

import { useRef, useCallback, useState } from 'react'

interface Props {
  children: React.ReactNode
  filename?: string
  downloadTitle?: string
}

export default function ChartExport({ children, filename = 'graf', downloadTitle = 'Download as PNG' }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)

  const handleExport = useCallback(async () => {
    if (!ref.current) return
    const html2canvas = (await import('html2canvas')).default

    const el = ref.current

    // Measure full content size including overflow
    const rect = el.getBoundingClientRect()
    const fullWidth = Math.max(el.scrollWidth, el.offsetWidth)
    const fullHeight = Math.max(el.scrollHeight, el.offsetHeight)

    // Create a wrapper with padding for nice margins
    const wrapper = document.createElement('div')
    wrapper.style.cssText = `
      position: fixed;
      top: -9999px;
      left: -9999px;
      padding: 32px;
      background: #F8FAFC;
      width: ${fullWidth + 64}px;
    `
    const clone = el.cloneNode(true) as HTMLElement
    clone.style.width = `${fullWidth}px`
    wrapper.appendChild(clone)
    document.body.appendChild(wrapper)

    try {
      const canvas = await html2canvas(wrapper, {
        backgroundColor: '#F8FAFC',
        scale: 2,
        logging: false,
        useCORS: true,
        width: fullWidth + 64,
        height: wrapper.scrollHeight,
        scrollX: 0,
        scrollY: 0,
      })

      const link = document.createElement('a')
      link.download = `${filename}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    } finally {
      document.body.removeChild(wrapper)
    }
  }, [filename])

  return (
    <div
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <button
        onClick={handleExport}
        className="absolute z-10 rounded p-1 text-[#CBD5E1] transition-all hover:text-[#475569]"
        style={{ opacity: hovered ? 1 : 0, top: 0, right: 0 }}
        title={downloadTitle}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
          <path d="M10.75 2.75a.75.75 0 00-1.5 0v8.614L6.295 8.235a.75.75 0 10-1.09 1.03l4.25 4.5a.75.75 0 001.09 0l4.25-4.5a.75.75 0 00-1.09-1.03l-2.955 3.129V2.75z" />
          <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
        </svg>
      </button>
      <div ref={ref}>
        {children}
      </div>
    </div>
  )
}
