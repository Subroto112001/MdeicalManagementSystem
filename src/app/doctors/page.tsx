import type { Metadata } from "next";
import Link from "next/link";
import { Container, Breadcrumb, SectionHeading } from "@/components/ui";
import { DoctorCard } from "@/components/sections/DoctorCard";
import { doctors, type DoctorProfile } from "@/data/medical-data";
import { DoctorFilters } from "./DoctorFilters";

export const metadata: Metadata = { title: "Find a Doctor | Healtho Medical Center", description: "Search Healtho Medical Center doctors by name, department, availability and consultation fee." };
type Search = Record<string, string | string[] | undefined>;
const value = (params: Search, key: string) => { const result = params[key]; return Array.isArray(result) ? result[0] ?? "" : result ?? ""; };
const fee = (raw: string) => { const number = Number(raw); return Number.isFinite(number) && number >= 0 ? number : undefined; };

export default async function DoctorsPage({ searchParams }: { searchParams: Promise<Search> }) {
  const params = await searchParams;
  const q = value(params, "q") || value(params, "doctor");
  const filters = { q, department: value(params, "department"), gender: value(params, "gender"), day: value(params, "day"), minFee: value(params, "minFee"), maxFee: value(params, "maxFee") };
  const minFee = fee(filters.minFee), maxFee = fee(filters.maxFee);
  const results = doctors.filter(doctor => {
    const matchesName = !q || `${doctor.name} ${doctor.specialty}`.toLowerCase().includes(q.toLowerCase());
    return matchesName && (!filters.department || doctor.department === filters.department) && (!filters.gender || doctor.gender.toLowerCase() === filters.gender.toLowerCase()) && (!filters.day || doctor.availableDays.includes(filters.day)) && (minFee === undefined || doctor.fee >= minFee) && (maxFee === undefined || doctor.fee <= maxFee);
  });
  const pageSize = 6;
  const totalPages = Math.max(1, Math.ceil(results.length / pageSize));
  const page = Math.min(Math.max(1, Number(value(params, "page")) || 1), totalPages);
  const visible = results.slice((page - 1) * pageSize, page * pageSize);
  const pageHref = (next: number) => { const query = new URLSearchParams(); for (const [key, item] of Object.entries(params)) if (key !== "page" && item) query.set(key, Array.isArray(item) ? item[0] : item); query.set("page", String(next)); return `/doctors?${query.toString()}`; };

  return <main className="bg-[#f8fafc] py-8 sm:py-12"><Container><Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Doctors" }]}/><div className="mt-7"><SectionHeading eyebrow="Our specialists" title="Find the right doctor for you" description="Search by name, specialty, availability, or consultation fee."/></div><div className="mt-8 grid gap-6 lg:grid-cols-[260px_1fr]"><DoctorFilters values={filters}/><section aria-label="Doctor search results"><div className="mb-5 flex items-center justify-between"><p className="text-sm text-muted"><strong className="text-foreground">{results.length}</strong> doctors found</p></div>{visible.length ? <><div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{visible.map((doctor: DoctorProfile) => <DoctorCard key={doctor.slug} doctor={doctor}/>)}</div>{totalPages > 1 && <nav aria-label="Doctor results pages" className="mt-8 flex items-center justify-center gap-3"><Link aria-disabled={page <= 1} className={`rounded-xl border border-border bg-white px-4 py-2 text-sm font-semibold ${page <= 1 ? "pointer-events-none opacity-40" : "hover:border-primary"}`} href={pageHref(page - 1)}>Previous</Link><span className="text-sm text-muted">Page {page} of {totalPages}</span><Link aria-disabled={page >= totalPages} className={`rounded-xl border border-border bg-white px-4 py-2 text-sm font-semibold ${page >= totalPages ? "pointer-events-none opacity-40" : "hover:border-primary"}`} href={pageHref(page + 1)}>Next</Link></nav>}</> : <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center"><span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-blue-50 text-2xl text-primary">⌕</span><h2 className="mt-4 text-lg font-bold">No doctors match those filters</h2><p className="mt-2 text-sm text-muted">Try another search or clear filters to see all available doctors.</p><Link href="/doctors" className="mt-5 inline-flex rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-white">Clear filters</Link></div>}</section></div></Container></main>;
}
