"use client"

import { useRouter } from "next/navigation"
import { useState, type FormEvent } from "react"
import { MapPinIcon, SearchIcon } from "lucide-react"

const trendingPositions = ["Product Designer", "AI Engineering", "Dev-ops Engineer"]

// Deterministic star field — same values on server and client (no hydration mismatch).
const stars = (() => {
  let seed = 42
  const next = () => {
    seed = (seed * 16807) % 2147483647
    return (seed - 1) / 2147483646
  }
  return Array.from({ length: 46 }, () => ({
    x: next() * 100,
    y: next() * 100,
    size: next() < 0.75 ? 2 : 3,
    opacity: 0.18 + next() * 0.5,
  }))
})()

export function Hero() {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [location, setLocation] = useState("")

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const params = new URLSearchParams()
    if (query.trim()) params.set("q", query.trim())
    if (location.trim()) params.set("location", location.trim())
    const qs = params.toString()
    router.push(qs ? `/jobs?${qs}` : "/jobs")
  }

  return (
    <section className="relative isolate overflow-hidden bg-[#0a0a0c]">
      {/* Purple glow at the bottom */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 70% 100% at 50% 100%, rgba(109, 92, 231, 0.32), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 45% 100% at 22% 100%, rgba(76, 60, 190, 0.3), transparent 70%)",
        }}
      />
      {/* Subtle light at the top edge */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-40"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 80% 100% at 50% 0%, rgba(255, 255, 255, 0.05), transparent 70%)",
        }}
      />
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

      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-4rem)] w-full max-w-3xl flex-col items-center justify-center px-4 py-16 text-center sm:py-24">
        {/* Badge */}
        <div className="flex w-full max-w-xl items-center justify-center gap-3 sm:gap-4">
          <span
            aria-hidden
            className="hidden h-px flex-1 bg-gradient-to-r from-transparent to-white/20 sm:block"
          />
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 font-space-mono text-[11px] tracking-[0.14em] text-white/70 uppercase sm:text-xs">
            <span aria-hidden>💼</span>
            <span className="font-bold text-white">50,000+</span>
            New jobs this month
          </span>
          <span
            aria-hidden
            className="hidden h-px flex-1 bg-gradient-to-l from-transparent to-white/20 sm:block"
          />
        </div>

        {/* Headline */}
        <h1 className="mt-6 font-manrope text-4xl font-bold tracking-tight text-white sm:mt-7 sm:text-5xl">
          Find Your Dream Job Today
        </h1>

        {/* Subheadline */}
        <p className="mt-4 max-w-xl font-manrope text-sm leading-relaxed text-white/60 sm:mt-5 sm:text-base">
          HireLoop connects top talent with world-class companies. Browse thousands of
          curated opportunities and land your next role — faster.
        </p>

        {/* Search bar */}
        <form
          onSubmit={onSubmit}
          className="mt-8 w-full max-w-2xl rounded-2xl border border-white/10 bg-white/[0.03] p-2 shadow-[0_16px_60px_-20px_rgba(0,0,0,0.8)] backdrop-blur-sm sm:mt-10"
        >
          <div className="flex flex-col gap-2 sm:flex-row sm:items-stretch">
            <div className="flex h-11 flex-1 items-center gap-2.5 rounded-lg px-3">
              <SearchIcon aria-hidden className="size-4 shrink-0 text-white/40" />
              <input
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Job title, skill or company"
                aria-label="Job title, skill or company"
                className="w-full min-w-0 bg-transparent text-sm text-white outline-none placeholder:text-white/40"
              />
            </div>
            <span aria-hidden className="hidden w-px self-stretch bg-white/10 sm:block" />
            <span aria-hidden className="h-px w-full bg-white/10 sm:hidden" />
            <div className="flex h-11 flex-1 items-center gap-2.5 rounded-lg px-3">
              <MapPinIcon aria-hidden className="size-4 shrink-0 text-white/40" />
              <input
                type="text"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                placeholder="Location or Remote"
                aria-label="Location or Remote"
                className="w-full min-w-0 bg-transparent text-sm text-white outline-none placeholder:text-white/40"
              />
            </div>
            <button
              type="submit"
              aria-label="Search jobs"
              className="flex h-11 w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-[#6c5ce7] px-5 text-sm font-medium text-white transition-colors hover:bg-[#5b4bd6] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[#6c5ce7]/50 sm:w-11"
            >
              <SearchIcon aria-hidden className="size-4.5" />
              <span className="sm:hidden">Search</span>
            </button>
          </div>
        </form>

        {/* Trending positions */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2 sm:mt-6 sm:gap-2.5">
          <span className="mr-1 font-manrope text-sm text-white/50">
            Trending Position
          </span>
          {trendingPositions.map((position) => (
            <button
              key={position}
              type="button"
              onClick={() => setQuery(position)}
              className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 font-manrope text-xs text-white/70 transition-colors hover:border-white/20 hover:bg-white/10 hover:text-white sm:text-sm"
            >
              {position}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
