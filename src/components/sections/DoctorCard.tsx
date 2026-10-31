import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiStar } from "react-icons/fi";
import type { DoctorProfile } from "@/data/medical-data";

export function DoctorCard({ doctor }: { doctor: DoctorProfile }) {
  return <article className="group overflow-hidden rounded-2xl border border-border bg-white transition hover:-translate-y-1 hover:shadow-card">
    <Link href={`/doctors/${doctor.slug}`} className="block"><div className="relative h-64 overflow-hidden bg-[#e9f0f5]"><Image src={`https://images.unsplash.com/${doctor.image}?auto=format&fit=crop&w=750&q=80`} alt={doctor.name} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover object-top transition duration-500 group-hover:scale-[1.04]"/><span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1.5 text-xs font-bold text-slate-800"><FiStar className="fill-amber-400 text-amber-400"/>{doctor.rating}</span></div></Link>
    <div className="p-5"><p className="text-xs font-semibold uppercase tracking-wide text-primary">{doctor.specialty}</p><h3 className="mt-2 text-lg font-bold"><Link href={`/doctors/${doctor.slug}`} className="hover:text-primary">{doctor.name}</Link></h3><p className="mt-1 text-sm text-muted">{doctor.experience} years experience</p><Link href={`/appointment?doctor=${doctor.slug}`} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary">Book a visit <FiArrowRight className="transition group-hover:translate-x-1"/></Link></div>
  </article>;
}
