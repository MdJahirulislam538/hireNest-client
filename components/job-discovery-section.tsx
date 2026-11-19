import Link from "next/link"
import {
  ArrowRight,
  Briefcase,
  CircleDollarSign,
  MapPin,
  type LucideIcon,
} from "lucide-react"

import { SectionEyebrow } from "@/components/section-eyebrow"

type Job = {
  title: string
  description: string
  location: string
  type: string
  salary: string
}

const jobs: Job[] = Array.from({ length: 6 }, () => ({
  title: "Frontend Developer",
  description:
    "Showcase your commitment to diversity and inclusion by highlighting initiatives",
  location: "New York, USA",
  type: "Hybrid",
  salary: "€25-€40/hour",
}))

function Tag({
  icon: Icon,
  children,
}: {
  icon: LucideIcon
  children: React.ReactNode
}) {
  return (
    <span className="inline-flex items-center gap-[max(5px,1.5cqw)] rounded-full bg-[#1f1f1f] px-[max(10px,3cqw)] py-[max(5px,2.1cqw)] font-inter-tight text-[length:max(11px,3.7cqw)] leading-none font-medium whitespace-nowrap text-white">
      <Icon
        aria-hidden
        className="size-[max(12px,3.5cqw)] shrink-0 text-[#f7c2ff]"
        strokeWidth={1.8}
      />
      {children}
    </span>
  )
}

export function JobDiscoverySection() {
  return (
    <section className="bg-[#010103]">
      <div className="mx-auto w-full max-w-[1400px] px-5 py-16 sm:px-8 sm:py-20 lg:py-24 xl:py-28">
        <SectionEyebrow>Smart job discovery</SectionEyebrow>

        <h2 className="mx-auto mt-5 max-w-2xl text-center font-manrope text-2xl leading-[1.15] font-semibold text-white sm:mt-6 sm:text-4xl lg:text-[40px]">
          The roles you&apos;d never
          <br className="hidden sm:block" /> find by searching
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-5 lg:mt-14 lg:grid-cols-3 lg:gap-6">
          {jobs.map((job, index) => (
            <article
              key={index}
              className="@container rounded-3xl bg-[#151516] sm:aspect-[240/205] xl:rounded-[30px]"
            >
              <div className="flex h-full flex-col p-[max(18px,6cqw)]">
                <h3 className="font-inter text-[length:max(20px,5.8cqw)] leading-tight font-medium text-white">
                  {job.title}
                </h3>
                <p className="mt-[max(10px,4.4cqw)] font-inter text-[length:max(13px,4.3cqw)] leading-[1.5] text-[#98989b]">
                  {job.description}
                </p>

                <div className="mt-[max(18px,6.2cqw)] flex flex-col gap-[max(8px,2.4cqw)]">
                  <div className="flex flex-wrap gap-[max(6px,2.6cqw)]">
                    <Tag icon={MapPin}>{job.location}</Tag>
                    <Tag icon={Briefcase}>{job.type}</Tag>
                  </div>
                  <div className="flex">
                    <Tag icon={CircleDollarSign}>{job.salary}</Tag>
                  </div>
                </div>

                <div className="mt-auto pt-[max(22px,6.2cqw)]">
                  <Link
                    href="/jobs"
                    className="group inline-flex items-center gap-[max(6px,1.5cqw)] font-manrope text-[length:max(12px,3.7cqw)] font-semibold text-white"
                  >
                    Apply Now
                    <ArrowRight
                      aria-hidden
                      className="size-[max(14px,3.8cqw)] transition-transform group-hover:translate-x-0.5"
                      strokeWidth={2}
                    />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 flex justify-center sm:mt-12 lg:mt-14">
          <Link
            href="/jobs"
            className="inline-flex h-11 items-center justify-center rounded-full bg-white px-6 font-instrument text-sm font-medium text-[#0b0b0d] transition-colors hover:bg-white/90 sm:h-12 sm:px-8 sm:text-base"
          >
            View all job open
          </Link>
        </div>
      </div>
    </section>
  )
}
