import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FiArrowRight, FiCheck, FiHeart, FiShield } from "react-icons/fi";
import { Breadcrumb, Container } from "@/components/ui";
import { DoctorCard } from "@/components/sections/DoctorCard";
import { departments, doctors } from "@/data/medical-data";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return departments.map(({ slug }) => ({ slug })); }
async function getDepartment(params: Props["params"]) { const { slug } = await params; return departments.find(department => department.slug === slug); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const department = await getDepartment(params);
  if (!department) return { title: "Department not found | Healtho Medical Center" };
  return { title: `${department.name} | Healtho Medical Center`, description: department.overview };
}

export default async function DepartmentPage({ params }: Props) {
  const department = await getDepartment(params);
  if (!department) notFound();
  const specialists = doctors.filter(doctor => doctor.department === department.slug);
  return <main className="bg-[#f8fafc] pb-14"><div className="border-b border-border bg-white py-5"><Container><Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Departments", href: "/departments" }, { label: department.name }]}/></Container></div><Container>
    <header className="relative mt-7 overflow-hidden rounded-[1.75rem] bg-[#10283a] px-6 py-10 text-white sm:px-10 sm:py-14"><div aria-hidden="true" className="absolute inset-y-0 right-0 w-2/3 bg-[radial-gradient(ellipse_at_85%_40%,rgba(50,104,245,.4),transparent_62%)]"/><div className="relative max-w-3xl"><span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold text-blue-100"><FiHeart/> Specialist department</span><h1 className="mt-4 text-3xl font-bold sm:text-4xl">{department.name}</h1><p className="mt-4 max-w-2xl leading-7 text-blue-100/80">{department.overview}</p><Link href="/appointment" className="mt-7 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white hover:bg-blue-500">Request an appointment <FiArrowRight/></Link></div></header>
    <div className="mt-7 grid gap-6 lg:grid-cols-2"><section className="rounded-2xl border border-border bg-white p-6 sm:p-8"><h2 className="text-xl font-bold">Services</h2><p className="mt-2 text-sm text-muted">Care and support available through {department.name.toLowerCase()}.</p><ul className="mt-5 grid gap-3 sm:grid-cols-2">{department.services.map(service => <li key={service} className="flex items-center gap-2 rounded-xl bg-slate-50 p-3 text-sm font-medium"><FiCheck className="shrink-0 text-emerald-600"/>{service}</li>)}</ul></section><section className="rounded-2xl border border-border bg-white p-6 sm:p-8"><h2 className="text-xl font-bold">Conditions we treat</h2><p className="mt-2 text-sm text-muted">Our specialists can assess and support a range of concerns.</p><ul className="mt-5 grid gap-3 sm:grid-cols-2">{department.conditions.map(condition => <li key={condition} className="flex items-center gap-2 rounded-xl bg-slate-50 p-3 text-sm font-medium"><FiShield className="shrink-0 text-primary"/>{condition}</li>)}</ul></section></div>
    <section className="mt-12"><div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-widest text-primary">Meet the team</p><h2 className="mt-2 text-2xl font-bold">{department.name} doctors</h2><p className="mt-2 text-sm text-muted">Choose a specialist and view their availability.</p></div><Link href={`/doctors?department=${department.slug}`} className="text-sm font-bold text-primary">All doctors <FiArrowRight className="inline"/></Link></div>{specialists.length ? <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{specialists.map(doctor => <DoctorCard key={doctor.slug} doctor={doctor}/>)}</div> : <p className="mt-5 rounded-xl border border-border bg-white p-5 text-sm text-muted">Please contact us for current {department.name.toLowerCase()} availability.</p>}</section>
  </Container></main>;
}
