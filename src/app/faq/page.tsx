import type { Metadata } from "next";
import { Breadcrumb, Container, SectionHeading, Accordion } from "@/components/ui";
import { faqItems } from "@/data/content-data";
export const metadata: Metadata = { title: "Frequently Asked Questions", description: "Answers to common questions about appointments, clinic visits, tests, and services." };
export default function FAQPage() { return <main className="bg-[#f8fafc] py-8 sm:py-12"><Container><Breadcrumb items={[{ label: "Home", href: "/" }, { label: "FAQs" }]}/><div className="mx-auto mt-7 max-w-3xl"><SectionHeading eyebrow="Patient help" title="Frequently asked questions" description="Quick answers to common questions about your care and visit."/><div className="mt-7"><Accordion items={faqItems.map(item => ({ title: item.title, content: item.content }))}/></div></div></Container></main>; }
