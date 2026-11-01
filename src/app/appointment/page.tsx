import type { Metadata } from "next";
import { Breadcrumb, Container, SectionHeading } from "@/components/ui";
import { AppointmentForm } from "./AppointmentForm";
export const metadata: Metadata = { title: "Book an Appointment | Healtho Medical Center", description: "Choose a department, doctor, and visit time, then provide patient details to request an appointment." };
type Search = Record<string, string | string[] | undefined>;
function one(value: string | string[] | undefined) { return Array.isArray(value) ? value[0] : value; }
export default async function AppointmentPage({ searchParams }: { searchParams: Promise<Search> }) { const params = await searchParams; return <main className="bg-[#f8fafc] pb-24 pt-8 sm:pb-12 sm:pt-12"><Container><Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Appointment" }]}/><div className="my-7"><SectionHeading eyebrow="Book a visit" title="Let’s find a time that works" description="Choose a doctor and appointment time. Your details stay in this demo and are not submitted."/></div><AppointmentForm initialDoctor={one(params.doctor)} initialPackage={one(params.package)}/></Container></main>; }
