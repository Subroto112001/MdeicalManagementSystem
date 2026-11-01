import type { Metadata } from "next";
import { Breadcrumb, Container, SectionHeading } from "@/components/ui";
import { TestCatalog } from "./TestCatalog";
export const metadata: Metadata = { title: "Diagnostic Tests and Prices | Healtho", description: "Search diagnostic tests, preparation notes, sample types, report times, and prices at Healtho Medical Center." };
export default function TestsPage() { return <main className="bg-[#f8fafc] py-8 sm:py-12"><Container><Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Tests and prices" }]}/><div className="mt-7"><SectionHeading eyebrow="Diagnostics" title="Tests and transparent prices" description="Find test details, preparation guidance, and typical report times."/></div><TestCatalog/></Container></main>; }
