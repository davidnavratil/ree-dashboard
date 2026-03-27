'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

interface BigNumberProps {
  value: number
  suffix?: string
  label: string
  color?: string
  href?: string
  delay?: number
}

export default function BigNumber({ value, suffix = '%', label, color = '#9D174D', href, delay = 0 }: BigNumberProps) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const timeout = setTimeout(() => {
      const duration = 1500
      const steps = 60
      const increment = value / steps
      let current = 0
      const interval = setInterval(() => {
        current += increment
        if (current >= value) {
          setCount(value)
          clearInterval(interval)
        } else {
          setCount(Math.round(current))
        }
      }, duration / steps)
      return () => clearInterval(interval)
    }, delay)

    return () => clearTimeout(timeout)
  }, [isVisible, value, delay])

  const content = (
    <div
      ref={ref}
      className="group flex flex-col items-center rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-6 transition-all hover:border-[#CBD5E1] hover:bg-[#F1F5F9] hover:shadow-md"
      style={{ cursor: href ? 'pointer' : 'default' }}
    >
      <span
        className="font-mono text-4xl font-bold sm:text-5xl"
        style={{ color }}
      >
        {count}{suffix}
      </span>
      <span className="mt-2 text-center text-sm text-[#475569]">{label}</span>
    </div>
  )

  if (href) {
    return <Link href={href}>{content}</Link>
  }
  return content
}
