import type { Metadata } from "next";
import { clinic } from "@/lib/constants";
import { HeroSection } from "@/components/sections/HeroSection";
import { QuickSearchSection } from "@/components/sections/QuickSearchSection";
import { QuickActionsSection } from "@/components/sections/QuickActionsSection";
import { DepartmentsSection } from "@/components/sections/DepartmentsSection";
import { FeaturedDoctorsSection } from "@/components/sections/FeaturedDoctorsSection";
import { WhyChooseUsSection } from "@/components/sections/WhyChooseUsSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { PackagesSection } from "@/components/sections/PackagesSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { HealthTipsSection } from "@/components/sections/HealthTipsSection";
import { EmergencyBannerSection } from "@/components/sections/EmergencyBannerSection";

export const metadata: Metadata = {
  title: "Healtho Medical Center | Expert Care, Human Touch",
  description: "Find trusted doctors, specialist departments, diagnostic services and compassionate 24/7 emergency care at Healtho Medical Center in Dhaka.",
  keywords: ["medical center Dhaka", "doctors in Dhaka", "diagnostic tests", "healthcare Bangladesh"],
  openGraph: {
    title: "Healtho Medical Center | Expert Care, Human Touch",
    description: "Thoughtful care, trusted expertise and modern diagnostics for your whole family.",
    type: "website",
    locale: "en_BD",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": ["Hospital", "MedicalClinic"],
  name: clinic.name,
  description: "A multi-specialty medical center providing consultations, diagnostics and emergency care.",
  telephone: clinic.phone,
  email: clinic.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dhaka",
    addressCountry: "BD",
  },
  openingHours: "Sa-Th 09:00-20:00",
  medicalSpecialty: ["Cardiology", "Neurology", "Ophthalmology", "Dentistry", "Pulmonology"],
};

export default function HomePage() {
  const jsonLd = JSON.stringify(structuredData).replace(/</g, "\\u003c");
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
    <main>
      <HeroSection />
      <QuickSearchSection />
      <QuickActionsSection />
      <DepartmentsSection />
      <FeaturedDoctorsSection />
      <WhyChooseUsSection />
      <StatsSection />
      <PackagesSection />
      <TestimonialsSection />
      <HealthTipsSection />
      <EmergencyBannerSection />
    </main>
  </>;
}
