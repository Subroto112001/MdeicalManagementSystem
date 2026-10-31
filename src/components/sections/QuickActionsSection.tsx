import Link from "next/link";
import { FiCalendar, FiFileText, FiTag, FiPhoneCall, FiArrowUpRight } from "react-icons/fi";
import { Container, SectionHeading } from "@/components/ui";
const actions = [
  { title: "Book an appointment", description: "Choose a doctor and visit time.", href: "/appointments", icon: FiCalendar, color: "blue" },
  { title: "Download a report", description: "Access your diagnostic results.", href: "/reports", icon: FiFileText, color: "teal" },
  { title: "Explore test prices", description: "Find the right test for you.", href: "/tests", icon: FiTag, color: "violet" },
  { title: "Emergency support", description: "Get help whenever you need it.", href: "tel:+8801700000000", icon: FiPhoneCall, color: "rose" },
];
const iconStyle: Record<string, string> = { blue: "bg-blue-50 text-blue-600", teal: "bg-teal-50 text-teal-600", violet: "bg-violet-50 text-violet-600", rose: "bg-rose-50 text-rose-600" };
export function QuickActionsSection() { return <section className="py-16 sm:py-20"><Container><SectionHeading eyebrow="How can we help?" title="Care is just a click away" description="Start with the service you need and we’ll guide you from there."/><div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{actions.map(({ title, description, href, icon: Icon, color }) => <Link key={title} href={href} className="group rounded-2xl border border-border bg-white p-5 transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-card"><div className="flex items-start justify-between"><span className={`grid h-12 w-12 place-items-center rounded-xl ${iconStyle[color]}`}><Icon className="text-xl"/></span><FiArrowUpRight className="text-slate-300 transition group-hover:text-primary"/></div><h3 className="mt-5 font-bold">{title}</h3><p className="mt-1 text-sm leading-6 text-muted">{description}</p></Link>)}</div></Container></section>; }
