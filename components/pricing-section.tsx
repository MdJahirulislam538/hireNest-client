"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowRight,
  ChartNoAxesColumnIncreasing,
  Crown,
  Plus,
  Zap,
  type LucideIcon,
} from "lucide-react"

import { SectionEyebrow } from "@/components/section-eyebrow"
import { cn } from "@/lib/utils"

type Plan = {
  name: string
  icon: LucideIcon
  monthly: string
  yearly: string
  features: string[]
  featured?: boolean
}

const plans: Plan[] = [
  {
    name: "Starter",
    icon: Crown,
    monthly: "$0",
    yearly: "$0",
    features: [
      "Daily AI match brief (top 5)",
      "Verified salary bands",
      "Company insight dashboards",
      "1-click apply, unlimited",
    ],
  },
  {
    name: "Growth",
    icon: ChartNoAxesColumnIncreasing,
    monthly: "$17",
    yearly: "$13",
    featured: true,
    features: [
      "Daily AI match brief (top 5)",
      "Verified salary bands",
      "Company insight dashboards",
      "1-click apply, unlimited",
    ],
  },
  {
    name: "Premium",
    icon: Zap,
    monthly: "$99",
    yearly: "$74",
    features: [
      "Everything in Pro",
      "Multi-profile career portfolios",
      "Shared talent rooms",
      "Recruiter view (read-only)",
    ],
  },
]

function PlanCard({ plan, yearly }: { plan: Plan; yearly: boolean }) {
  const { icon: Icon, name, monthly, yearly: yearlyPrice, features, featured } = plan
  const price = yearly ? yearlyPrice : monthly

  return (
    <article
      className={cn(
        "@container flex rounded-[22px] border xl:rounded-[28px] lg:aspect-[430/456]",
        featured
          ? "border-white/10 bg-[#151516] shadow-[0_0_70px_-10px_rgba(255,255,255,0.16)]"
          : "border-white/15 bg-transparent"
      )}
    >
      <div className="flex w-full flex-col p-[max(18px,5.6cqw)]">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-[max(10px,3.5cqw)]">
          <span
            className={cn(
              "flex size-[max(28px,9.3cqw)] shrink-0 items-center justify-center rounded-[max(8px,2.2cqw)] border border-white/10",
              "bg-linear-[145deg] from-[#2b1d38] via-[#140d1d] to-[#0a0710]"
            )}
          >
            <Icon
              aria-hidden
              className="size-[52%] text-[#e9b4fb]"
              fill={name === "Growth" ? "none" : "currentColor"}
              strokeWidth={name === "Growth" ? 2.4 : 1.4}
            />
          </span>
          <h3 className="truncate font-plus-jakarta text-[length:max(19px,5.7cqw)] leading-none font-normal text-white">
            {name}
          </h3>
        </div>

        <div className="flex shrink-0 items-baseline gap-[max(2px,0.7cqw)]">
          <span className="font-plus-jakarta text-[length:max(30px,9.4cqw)] leading-none font-semibold text-white">
            {price}
          </span>
          <span className="font-inter-tight text-[length:max(10px,3cqw)] leading-none text-white/55">
            /month
          </span>
        </div>
      </div>

      <p className="mt-[max(22px,7.2cqw)] font-inter text-[length:max(13px,3.9cqw)] leading-snug font-medium text-white">
        Start building your insights hub:
      </p>

      <ul className="mt-[max(14px,4.2cqw)] flex flex-col gap-[max(9px,3.6cqw)]">
        {features.map((feature) => (
          <li
            key={feature}
            className="flex items-center gap-[max(10px,3.3cqw)]"
          >
            <span className="flex size-[max(17px,5.5cqw)] shrink-0 items-center justify-center rounded-[max(5px,1.55cqw)] bg-[#2b2b2d]">
              <Plus
                aria-hidden
                className="size-[62%] text-white"
                strokeWidth={2.2}
              />
            </span>
            <span className="font-inter text-[length:max(13px,3.8cqw)] leading-snug text-[#b0b0b2]">
              {feature}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-[max(24px,6cqw)]">
        <Link
          href="/sign-up"
          className={cn(
            "flex h-[max(40px,12.8cqw)] items-center justify-between rounded-xl px-[max(14px,4.2cqw)] font-manrope text-[length:max(14px,3.7cqw)] font-semibold transition-colors",
            featured
              ? "bg-white text-[#0b0b0d] hover:bg-white/90"
              : "bg-[#2d2d2e] text-white hover:bg-[#38383a]"
          )}
        >
          Choose This Plan
          <ArrowRight
            aria-hidden
            className="size-[max(16px,4.2cqw)]"
            strokeWidth={2}
          />
        </Link>
      </div>
      </div>
    </article>
  )
}

export function PricingSection() {
  const [yearly, setYearly] = useState(false)

  return (
    <section id="pricing" className="scroll-mt-20 bg-[#010103]">
      <div className="mx-auto w-full max-w-[1400px] px-5 py-16 sm:px-8 sm:py-20 lg:py-24 xl:py-28">
        <SectionEyebrow>Pricing</SectionEyebrow>

        <h2 className="mx-auto mt-5 max-w-2xl text-center font-manrope text-3xl leading-[1.15] font-semibold text-white sm:mt-6 sm:text-4xl xl:text-[44px]">
          Pay for the leverage,
          <br className="hidden sm:block" /> not the listings
        </h2>

        <div className="mt-10 flex justify-center sm:mt-12 lg:mt-10">
          <div
            role="group"
            aria-label="Billing period"
            className="flex items-center gap-0.5 rounded-full bg-[#252528] p-0.5 xl:gap-1 xl:p-1"
          >
            <button
              type="button"
              aria-pressed={!yearly}
              onClick={() => setYearly(false)}
              className={cn(
                "h-9 rounded-full px-3 font-inter text-sm font-medium transition-colors xl:h-11 xl:px-6 xl:text-base",
                !yearly
                  ? "bg-white text-[#0b0b0d] shadow-sm"
                  : "text-white/85 hover:text-white"
              )}
            >
              Monthly
            </button>
            <button
              type="button"
              aria-pressed={yearly}
              onClick={() => setYearly(true)}
              className={cn(
                "flex h-9 items-center gap-1.5 rounded-full px-3 font-inter text-sm font-medium transition-colors xl:h-11 xl:gap-2 xl:px-4 xl:text-base",
                yearly
                  ? "bg-white text-[#0b0b0d] shadow-sm"
                  : "text-white/85 hover:text-white"
              )}
            >
              Yearly
              <span className="rounded-full bg-[#dc02ce] px-1.5 py-0.5 text-[10px] leading-none font-medium text-white xl:px-2 xl:py-1 xl:text-[11px]">
                25%
              </span>
            </button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-5 sm:mt-8 sm:gap-6 lg:mt-6 lg:grid-cols-3 xl:mt-8">
          {plans.map((plan) => (
            <PlanCard key={plan.name} plan={plan} yearly={yearly} />
          ))}
        </div>
      </div>
    </section>
  )
}
