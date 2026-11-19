import { CtaFooter } from "@/components/cta-footer"
import { FeaturesSection } from "@/components/features-section"
import { Hero } from "@/components/hero"
import { JobDiscoverySection } from "@/components/job-discovery-section"
import { PricingSection } from "@/components/pricing-section"
import { StatsSection } from "@/components/stats-section"

export default function Page() {
  return (
    <>
      <Hero />
      <StatsSection />
      <FeaturesSection />
      <JobDiscoverySection />
      <PricingSection />
      <CtaFooter />
    </>
  )
}
