import {
  Bookmark,
  ChartColumnBig,
  ChartLine,
  FileText,
  Gem,
  MousePointerClick,
  Search,
  TrendingUp,
  type LucideIcon,
} from "lucide-react"

import { SectionEyebrow } from "@/components/section-eyebrow"

type Feature = {
  icon: LucideIcon
  title: string
  description: string
}

const features: Feature[] = [
  {
    icon: Search,
    title: "Smart Search",
    description: "Find your ideal job with advanced filters.",
  },
  {
    icon: ChartLine,
    title: "Salary Insights",
    description: "Get real salary data to negotiate confidently.",
  },
  {
    icon: ChartColumnBig,
    title: "Top Companies",
    description: "Apply to vetted companies that are hiring.",
  },
  {
    icon: Bookmark,
    title: "Saved Jobs",
    description: "Manage apps & favorites on your dashboard.",
  },
  {
    icon: MousePointerClick,
    title: "One-Click Apply",
    description: "Simplify your job applications for an easier process!",
  },
  {
    icon: FileText,
    title: "Resume Builder",
    description: "Create professional resumes with modern templates.",
  },
  {
    icon: Gem,
    title: "Skill-Based Matching",
    description: "Discover jobs that match your skills and experience.",
  },
  {
    icon: TrendingUp,
    title: "Career Growth Resources",
    description: "Boost your career with quick interview tips.",
  },
]

export function FeaturesSection() {
  return (
    <section className="bg-[#151516]">
      <div className="mx-auto w-full max-w-[1400px] px-5 py-16 sm:px-8 sm:py-20 lg:py-24 xl:py-28">
        <SectionEyebrow>Features job</SectionEyebrow>

        <h2 className="mx-auto mt-5 max-w-2xl text-center font-manrope text-2xl leading-[1.15] font-semibold text-white sm:mt-6 sm:text-4xl lg:text-[40px]">
          Everything you need
          <br className="hidden sm:block" /> to succeed
        </h2>

        <ul className="mt-12 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-y-12 xl:gap-x-10 xl:gap-y-14">
          {features.map(({ icon: Icon, title, description }) => (
            <li key={title} className="flex items-start gap-4 lg:gap-5 xl:gap-6">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-white/[0.07] bg-linear-to-br from-[#040405] to-[#1b1b1c] sm:size-14 lg:size-[60px] xl:size-[76px] xl:rounded-2xl">
                <Icon
                  aria-hidden
                  className="size-5 text-[#f7c2ff] sm:size-6 lg:size-7 xl:size-8"
                  strokeWidth={1.5}
                />
              </span>
              <div className="min-w-0">
                <h3 className="font-inter-tight text-[15px] font-medium leading-tight text-white sm:text-base lg:text-[17px] xl:text-xl">
                  {title}
                </h3>
                <p className="mt-2 font-inter-tight text-[13px] leading-snug text-[#aeaeb0] sm:text-sm lg:text-[15px] xl:text-[17px]">
                  {description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
