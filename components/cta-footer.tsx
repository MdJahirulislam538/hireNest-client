import Image from "next/image"
import Link from "next/link"

const footerColumns = [
  {
    title: "Product",
    links: [
      { label: "Job discovery", href: "/jobs" },
      { label: "Worker AI", href: "#" },
      { label: "Companies", href: "/companies" },
      { label: "Salary data", href: "#" },
    ],
  },
  {
    title: "Navigations",
    links: [
      { label: "Help center", href: "#" },
      { label: "Career library", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Brand Guideline", href: "#" },
      { label: "Newsroom", href: "#" },
    ],
  },
]

function FacebookIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="size-4 fill-current">
      <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5h1.65V3.6c-.29-.04-1.27-.12-2.41-.12-2.38 0-4.01 1.45-4.01 4.12v2.3H7.5V13h2.78v8h3.22Z" />
    </svg>
  )
}

function PeerlistIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      className="size-[18px]"
    >
      <circle cx="12.7" cy="8.6" r="3.6" strokeWidth="2.5" />
      <path d="M9.7 7.6v10.6" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="size-4 fill-current">
      <path d="M6.94 8.6H4.2V20h2.74V8.6ZM5.57 4.1a1.59 1.59 0 1 0 0 3.18 1.59 1.59 0 0 0 0-3.18ZM20 13.63c0-3.42-1.83-5.02-4.26-5.02a3.67 3.67 0 0 0-3.3 1.83h-.06V8.6h-2.63V20h2.74v-6.03c0-1.59.3-3.13 2.27-3.13 1.94 0 1.97 1.82 1.97 3.23V20H20v-6.37Z" />
    </svg>
  )
}

const socials = [
  {
    label: "Facebook",
    href: "#",
    className: "bg-[#1f1f20]",
    icon: <FacebookIcon />,
  },
  {
    label: "Peerlist",
    href: "#",
    className: "bg-[#5c53fe]",
    icon: <PeerlistIcon />,
  },
  {
    label: "LinkedIn",
    href: "#",
    className: "bg-[#1f1f20]",
    icon: <LinkedInIcon />,
  },
]

export function CtaFooter() {
  return (
    <section
      id="get-started"
      className="relative isolate overflow-hidden bg-[#010103]"
    >
      {/* Dome grid + clipped blue horizon glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-[max(32px,5.3vw)] -z-10"
      >
        <div className="relative left-1/2 w-[150vw] -translate-x-1/2 sm:w-[135vw] lg:w-[120vw] xl:w-[118vw]">
          <div className="relative aspect-[0.685] w-full">
            <Image
              src="/cta-bg.png"
              alt=""
              fill
              sizes="150vw"
              className="object-fill"
            />
            <div
              className="absolute inset-0 mix-blend-screen"
              style={{
                clipPath: "ellipse(50% 17.94% at 50% 17.94%)",
                backgroundImage:
                  "radial-gradient(ellipse 37% 17% at 50% 0%, rgba(80,73,190,1) 0%, rgba(78,70,192,1) 18%, rgba(58,52,157,0.98) 30%, rgba(47,41,127,0.96) 43%, rgba(39,33,105,0.95) 55%, rgba(27,23,73,0.93) 68%, rgba(18,15,48,0.9) 80%, rgba(0,0,0,0) 100%)",
              }}
            />
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-5 pt-24 pb-[clamp(80px,11.25vw,162px)] text-center sm:px-8 sm:pt-32 lg:pt-[clamp(128px,16.3vw,235px)]">
        <h2 className="mx-auto max-w-4xl font-rethink text-[clamp(30px,4.22vw,60px)] leading-[1.2] font-medium text-white">
          Your next role is
          <br />
          already looking for you
        </h2>

        <p className="mx-auto mt-[clamp(14px,1.7vw,24px)] max-w-2xl font-manrope text-[clamp(14px,1.39vw,20px)] leading-relaxed text-white/60">
          Build a profile in three minutes. The matches start arriving tomorrow
          morning.
        </p>

        <div className="mt-[clamp(24px,3.1vw,45px)] flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <Link
            href="/sign-up"
            className="inline-flex h-[clamp(44px,4.17vw,60px)] items-center justify-center rounded-full bg-white px-[clamp(20px,2.22vw,32px)] font-manrope text-[clamp(12px,1.11vw,16px)] font-semibold text-[#0b0b0d] transition-colors hover:bg-white/90"
          >
            Create a free account
          </Link>
          <Link
            href="/#pricing"
            className="inline-flex h-[clamp(44px,4.17vw,60px)] items-center justify-center rounded-full border border-white/10 bg-[#0e0b16]/70 px-[clamp(20px,2.22vw,32px)] font-manrope text-[clamp(12px,1.11vw,16px)] font-medium text-white backdrop-blur-sm transition-colors hover:bg-[#17131f]"
          >
            View pricing
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10">
        <div className="mx-auto w-full max-w-[1400px] px-5 pb-[clamp(24px,2.5vw,36px)] sm:px-8 lg:px-12 xl:px-16">
          <div className="opacity-50">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
              <div>
                <Image
                  src="/logo.png"
                  alt="HireLoop"
                  width={154}
                  height={44}
                  className="h-[clamp(28px,3.06vw,44px)] w-auto"
                />
                <p className="mt-6 max-w-[280px] font-manrope text-[clamp(13px,1.11vw,16px)] leading-relaxed text-white/55">
                  The AI-native career platform. Built for people who take their
                  work seriously.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 sm:gap-x-10 xl:gap-x-14">
                {footerColumns.map((column) => (
                  <div key={column.title}>
                    <h3 className="font-inter-tight text-[clamp(14px,1.25vw,18px)] font-medium text-[#5c53fe]">
                      {column.title}
                    </h3>
                    <ul className="mt-[clamp(16px,2vw,29px)] space-y-[clamp(8px,0.97vw,14px)]">
                      {column.links.map((link) =>
                        link.href.startsWith("/") ? (
                          <li key={link.label}>
                            <Link
                              href={link.href}
                              className="font-manrope text-[clamp(13px,1.11vw,16px)] text-white/60 transition-colors hover:text-white"
                            >
                              {link.label}
                            </Link>
                          </li>
                        ) : (
                          <li key={link.label}>
                            <a
                              href={link.href}
                              className="font-manrope text-[clamp(13px,1.11vw,16px)] text-white/60 transition-colors hover:text-white"
                            >
                              {link.label}
                            </a>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-[clamp(32px,4.4vw,63px)] flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
              <div className="flex items-center gap-[clamp(4px,0.42vw,6px)]">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className={`flex size-[clamp(28px,2.78vw,40px)] items-center justify-center rounded-[clamp(8px,0.9vw,13px)] text-white transition-opacity hover:opacity-80 ${social.className}`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>

              <div className="flex flex-col gap-2 text-[clamp(11px,0.97vw,14px)] text-white/65 sm:flex-row sm:items-center sm:gap-[clamp(12px,1.4vw,20px)]">
                <p>Copyright 2024 &mdash; Programming Hero</p>
                <a
                  href="#"
                  className="transition-colors hover:text-white sm:whitespace-nowrap"
                >
                  Terms &amp; Policy - Privacy Guideline
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </section>
  )
}
