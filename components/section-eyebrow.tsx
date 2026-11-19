export function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-center justify-center gap-3">
      <span
        aria-hidden
        className="size-1.5 shrink-0 rounded-[2px] bg-[#5c53fe] sm:size-2"
      />
      <span className="font-space-mono text-[11px] tracking-[0.22em] text-[#d0d0d0] uppercase sm:text-xs lg:text-sm xl:text-[17px]">
        {children}
      </span>
      <span
        aria-hidden
        className="size-1.5 shrink-0 rounded-[2px] bg-[#5c53fe] sm:size-2"
      />
    </p>
  )
}
