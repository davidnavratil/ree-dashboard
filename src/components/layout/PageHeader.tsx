interface PageHeaderProps {
  title: string
  subtitle?: string
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div className="mb-8">
      <h1 className="text-2xl font-bold text-[#0F172A] sm:text-3xl">{title}</h1>
      {subtitle && (
        <p className="mt-2 text-sm text-[#475569]">{subtitle}</p>
      )}
    </div>
  )
}
