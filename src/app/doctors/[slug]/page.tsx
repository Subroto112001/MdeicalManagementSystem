import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FiArrowRight, FiCalendar, FiCheck, FiClock, FiMapPin } from "react-icons/fi";
import { Breadcrumb, Container } from "@/components/ui";
import { DoctorCard } from "@/components/sections/DoctorCard";
import { doctors } from "@/data/medical-data";
import { clinic } from "@/lib/constants";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return doctors.map(({ slug }) => ({ slug })); }
async function getDoctor(params: Props["params"]) { const { slug } = await params; return doctors.find(doctor => doctor.slug === slug); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const doctor = await getDoctor(params);
  if (!doctor) return { title: "Doctor not found | Healtho Medical Center" };
  return { title: `${doctor.name} | ${doctor.specialty} | Healtho`, description: `${doctor.name}, ${doctor.designation}. ${doctor.experience} years of experience. View qualifications, chamber hours, and consultation details.` };
}

export default async function DoctorProfilePage({ params }: Props) {
  const doctor = await getDoctor(params);
  if (!doctor) notFound();
  const related = doctors.filter(other => other.department === doctor.department && other.slug !== doctor.slug).slice(0, 3);
  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Physician",
    name: doctor.name,
    image: `https://images.unsplash.com/${doctor.image}?auto=format&fit=crop&w=900&q=80`,
    description: doctor.about,
    medicalSpecialty: doctor.specialty,
    identifier: { "@type": "PropertyValue", propertyID: "BMDC", value: doctor.bmdc },
    alumniOf: doctor.degrees,
    worksFor: { "@type": "Hospital", name: clinic.name },
    address: { "@type": "PostalAddress", addressLocality: "Dhaka", addressCountry: "BD" },
  }).replace(/</g, "\\u003c");

  return <main className="bg-[#f8fafc] pb-12"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }}/><div className="border-b border-border bg-white py-5"><Container><Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Doctors", href: "/doctors" }, { label: doctor.name }]}/></Container></div><Container>
    <section className="mt-7 grid gap-6 lg:grid-cols-[1fr_330px]">
      <div className="min-w-0 space-y-6">
        <header className="overflow-hidden rounded-2xl border border-border bg-white"><div className="grid sm:grid-cols-[260px_1fr]"><div className="relative min-h-[300px] bg-[#e9f0f5] sm:min-h-[350px]"><Image src={`https://images.unsplash.com/${doctor.image}?auto=format&fit=crop&w=900&q=85`} alt={doctor.name} fill priority sizes="(max-width: 640px) 100vw, 260px" className="object-cover object-top"/></div><div className="flex flex-col justify-center p-6 sm:p-8"><span className="w-fit rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-primary">{doctor.specialty}</span><h1 className="mt-4 text-3xl font-bold tracking-tight">{doctor.name}</h1><p className="mt-2 text-muted">{doctor.designation}</p><div className="mt-5 flex flex-wrap gap-2">{doctor.degrees.map(degree => <span key={degree} className="rounded-lg border border-border px-3 py-1.5 text-xs font-semibold">{degree}</span>)}</div><p className="mt-5 flex items-center gap-2 text-sm text-muted"><FiCheck className="text-emerald-600"/> BMDC Registration: <strong className="text-foreground">{doctor.bmdc}</strong></p></div></div></header>
        <section className="rounded-2xl border border-border bg-white p-6 sm:p-8"><h2 className="text-xl font-bold">About {doctor.name}</h2><p className="mt-3 leading-7 text-muted">{doctor.about}</p><div className="mt-7 grid gap-7 sm:grid-cols-2"><div><h3 className="font-bold">Specialties</h3><ul className="mt-3 space-y-2.5">{doctor.specialties.map(item => <li key={item} className="flex items-start gap-2 text-sm text-muted"><FiCheck className="mt-0.5 shrink-0 text-emerald-600"/>{item}</li>)}</ul></div><div><h3 className="font-bold">Experience</h3><p className="mt-3 text-3xl font-bold text-primary">{doctor.experience}<span className="ml-2 text-sm font-medium text-muted">years</span></p><p className="mt-2 text-sm leading-6 text-muted">Supporting patients with evidence-informed care and a personal approach.</p></div></div></section>
        <section className="rounded-2xl border border-border bg-white p-6 sm:p-8"><div className="flex items-center gap-2"><FiCalendar className="text-primary"/><h2 className="text-xl font-bold">Weekly chamber schedule</h2></div><div className="mt-5 overflow-x-auto"><table className="w-full min-w-[520px] text-left text-sm"><thead><tr className="border-b border-border text-xs uppercase tracking-wide text-muted"><th className="pb-3 pr-4 font-semibold">Day</th><th className="pb-3 pr-4 font-semibold">Chamber hours</th><th className="pb-3 font-semibold">Location</th></tr></thead><tbody>{doctor.schedule.map(slot => <tr key={slot.day} className="border-b border-slate-100 last:border-0"><td className="py-4 pr-4 font-semibold">{slot.day}</td><td className="py-4 pr-4 text-muted"><span className="inline-flex items-center gap-2"><FiClock/>{slot.time}</span></td><td className="py-4 text-muted"><span className="inline-flex items-center gap-2"><FiMapPin/>{slot.location}</span></td></tr>)}</tbody></table></div></section>
      </div>
      <aside className="lg:sticky lg:top-6 lg:self-start"><div className="rounded-2xl border border-border bg-white p-6 shadow-card"><p className="text-sm font-semibold text-muted">Consultation fee</p><p className="mt-1 text-3xl font-extrabold">৳{doctor.fee.toLocaleString("en-BD")}<span className="ml-2 text-sm font-medium text-muted">per visit</span></p><div className="my-5 border-t border-border"/><p className="text-sm font-bold">Available days</p><div className="mt-3 flex flex-wrap gap-2">{doctor.availableDays.map(day => <span key={day} className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">{day}</span>)}</div><Link href={`/appointment?doctor=${doctor.slug}`} className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3.5 text-sm font-bold text-white transition hover:bg-blue-700">Book Appointment <FiArrowRight/></Link><p className="mt-3 text-center text-xs leading-5 text-muted">Your appointment form will be prefilled with {doctor.name}.</p></div></aside>
    </section>
    {related.length > 0 && <section className="mt-14"><div className="flex items-end justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-widest text-primary">Same department</p><h2 className="mt-2 text-2xl font-bold">Related doctors</h2></div><Link href={`/departments/${doctor.department}`} className="text-sm font-bold text-primary">View department</Link></div><div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{related.map(item => <DoctorCard key={item.slug} doctor={item}/>)}</div></section>}
  </Container></main>;
}
