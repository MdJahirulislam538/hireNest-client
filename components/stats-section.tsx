import Image from "next/image"
import { Briefcase, ChartColumn, Star, UserSearch, type LucideIcon } from "lucide-react"

type Stat = { icon: LucideIcon; value: string; label: string }

const stats: Stat[] = [
  { icon: Briefcase, value: "50K", label: "Active Jobs" },
  { icon: ChartColumn, value: "12K", label: "Companies" },
  { icon: UserSearch, value: "2M", label: "Job Seekers" },
  { icon: Star, value: "97%", label: "Satisfaction Rate" },
]

// Deterministic star field — same values on server and client (no hydration mismatch).
const stars = (() => {
  let seed = 7
  const next = () => {
    seed = (seed * 16807) % 2147483647
    return (seed - 1) / 2147483646
  }
  return Array.from({ length: 24 }, () => ({
    x: next() * 100,
    y: next() * 30,
    size: next() < 0.7 ? 2 : 3,
    opacity: 0.25 + next() * 0.55,
  }))
})()

export function StatsSection() {
  return (
    <section className="relative isolate overflow-hidden bg-[#010103]">
      {/* Globe + headline zone. Its overflow-hidden clips the globe exactly at the
          top edge of the stats row, like in the design. */}
      <div className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <Image
            src="/globe.png"
            alt=""
            width={1440}
            height={1632}
            sizes="(min-width: 1024px) 103vw, (min-width: 640px) 120vw, 160vw"
            className="absolute top-[-39vw] left-1/2 w-[160vw] max-w-none -translate-x-1/2 sm:top-[-33vw] sm:w-[120vw] lg:top-[-29vw] lg:w-[103vw]"
          />
          {/* Melt the globe into the background right above the cards */}
          <div className="absolute inset-x-0 bottom-0 h-[18%] bg-linear-to-b from-transparent to-[#010103]" />
        </div>

        {/* Stars */}
        {stars.map((star, index) => (
          <span
            key={index}
            aria-hidden
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size,
              opacity: star.opacity,
            }}
          />
        ))}

        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-5 pt-32 pb-10 sm:px-8 sm:pt-44 sm:pb-12 lg:pt-[288px] lg:pb-14">
          <h2 className="mx-auto max-w-2xl text-center font-manrope text-2xl font-medium leading-snug text-white sm:text-4xl lg:text-[40px]">
            Assisting over 15,000 job seekers{" "}
            <br className="hidden sm:block" />
            find their dream positions.
          </h2>
        </div>
      </div>

      {/* Soft blue glow behind the stats row */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-[45%] h-[50%]"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 60% 75% at 50% 45%, rgba(94, 84, 220, 0.16), transparent 72%)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-5 pb-24 sm:px-8 sm:pb-32 lg:pb-40">
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
          {stats.map(({ icon: Icon, value, label }) => (
            <div
              key={label}
              className="@container flex rounded-2xl border border-white/10 bg-linear-to-b from-transparent to-white/10 sm:aspect-[1.23]"
            >
              <div className="flex h-full w-full flex-col p-[max(16px,7.8cqw)]">
                <Icon
                  aria-hidden
                  className="size-[max(16px,7.2cqw)] text-white"
                />
                <div className="mt-auto pt-[max(32px,26cqw)]">
                  <div className="font-plus-jakarta text-[length:max(30px,17.8cqw)] leading-none font-semibold text-white">
                    {value}
                  </div>
                  <div className="mt-[max(12px,5cqw)] font-inter-tight text-[length:max(12px,6.25cqw)] leading-snug text-white/85">
                    {label}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
