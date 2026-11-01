import type { Metadata } from "next";
import { Breadcrumb, Container, SectionHeading } from "@/components/ui";
import { PackageCatalog } from "./PackageCatalog";
export const metadata: Metadata = { title: "Health Packages | Healtho", description: "Compare preventive health packages, included tests, and prices at Healtho Medical Center." };
export default function PackagesPage() { return <main className="bg-[#f8fafc] py-8 sm:py-12"><Container><Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Health packages" }]}/><div className="mt-7"><SectionHeading eyebrow="Preventive health" title="Choose a package that fits" description="Clear package details and pricing to make preventive care easier."/></div><PackageCatalog/><p className="mt-6 text-xs leading-5 text-muted">Package details and prices are sample content for this prototype. Please confirm current availability with the clinic.</p></Container></main>; }
