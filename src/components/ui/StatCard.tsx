interface StatCardProps {
  label: string
  value: string
  delta?: string
  deltaType?: 'positive' | 'negative' | 'neutral'
}

export default function StatCard({ label, value, delta, deltaType = 'neutral' }: StatCardProps) {
  const deltaColor = deltaType === 'positive' ? 'text-[#0E7490]' : deltaType === 'negative' ? 'text-[#9D174D]' : 'text-[#64748B]'

  return (
    <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4">
      <p className="text-xs text-[#64748B]">{label}</p>
      <p className="mt-1 font-mono text-2xl font-bold text-[#0F172A]">{value}</p>
      {delta && (
        <p className={`mt-1 text-xs ${deltaColor}`}>{delta}</p>
      )}
    </div>
  )
}
