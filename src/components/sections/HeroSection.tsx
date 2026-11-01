import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiCheck, FiClock, FiShield, FiTool } from "react-icons/fi";
import { Container } from "@/components/ui";

const proof = [
  { icon: FiClock, title: "24/7", caption: "emergency care" },
  { icon: FiShield, title: "Expert", caption: "doctors" },
  { icon: FiTool, title: "Modern", caption: "equipment" },
];

export function HeroSection() {
  return <section className="relative isolate overflow-hidden bg-[#10283a] text-white">
    <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_78%_40%,rgba(50,104,245,.28),transparent_38%),linear-gradient(125deg,#10283a_18%,#163b54_100%)]" />
    <Container className="grid min-h-[620px] items-center gap-10 py-14 lg:grid-cols-[1.05fr_.95fr] lg:py-16">
      <div className="relative z-10 max-w-2xl">
        <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[.07] px-4 py-2 text-xs font-semibold tracking-wide text-blue-100"><span className="h-2 w-2 rounded-full bg-emerald-400"/> Trusted care for every generation</span>
        <h1 className="max-w-xl text-3xl font-bold leading-[1.12] tracking-tight sm:text-5xl lg:text-[3.65rem]">Better health begins with <span className="text-[#8cb2ff]">better care.</span></h1>
        <p className="mt-5 max-w-lg text-base leading-7 text-blue-100/80 sm:text-lg">From your first check-up to specialist treatment, find thoughtful care and trusted expertise all in one place.</p>
        <div className="mt-8 flex flex-wrap gap-3"><Link href="/appointment" className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-950/20 transition hover:bg-blue-500">Book Appointment <FiArrowRight/></Link><Link href="/doctors" className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/[.06] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-white/[.12]">Find a Doctor</Link></div>
        <div className="mt-10 flex flex-wrap gap-3">{proof.map(({ icon: Icon, title, caption }) => <div key={title} className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[.06] px-3 py-2.5"><span className="grid h-8 w-8 place-items-center rounded-lg bg-blue-400/15 text-blue-200"><Icon/></span><span><strong className="block text-xs">{title}</strong><span className="block text-[11px] text-blue-100/65">{caption}</span></span><FiCheck className="ml-1 text-emerald-300"/></div>)}</div>
      </div>
      <div className="relative mx-auto w-full max-w-[530px] lg:ml-auto">
        <div className="absolute -inset-4 rounded-[2.5rem] bg-blue-400/10 blur-2xl"/>
        <div className="relative h-[380px] overflow-hidden rounded-[2rem] border border-white/15 bg-[#dce8ee] sm:h-[475px]">
          <Image src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=1100&q=85" alt="Doctor ready to provide compassionate care" fill priority sizes="(max-width: 768px) 100vw, 48vw" className="object-cover object-center" />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#10283a]/85 via-[#10283a]/20 to-transparent p-6 pt-24"><p className="text-xs font-semibold uppercase tracking-[.18em] text-blue-100">Here for your health</p><p className="mt-1 text-xl font-bold">Expert care. Human touch.</p></div>
        </div>
        <div className="absolute -left-3 top-8 flex items-center gap-3 rounded-2xl bg-white p-3.5 text-slate-900 shadow-xl sm:-left-8"><span className="grid h-11 w-11 place-items-center rounded-xl bg-emerald-50 text-emerald-600"><FiCheck className="text-xl"/></span><span><strong className="block text-sm">Trusted healthcare</strong><span className="text-xs text-slate-500">Care you can count on</span></span></div>
        <div className="absolute -bottom-4 right-2 rounded-2xl bg-white px-4 py-3 text-slate-900 shadow-xl sm:right-3 sm:px-5 sm:py-4 lg:-right-5"><p className="text-2xl font-bold">4.9<span className="ml-1 text-amber-400">★</span></p><p className="text-xs text-slate-500">Patient satisfaction</p></div>
      </div>
    </Container>
  </section>;
}
