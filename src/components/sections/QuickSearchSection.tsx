"use client";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { FiSearch } from "react-icons/fi";
import { Container } from "@/components/ui";

const searchTypes = [{ key: "doctor", label: "Doctor", href: "/doctors", placeholder: "Doctor name or specialty" }, { key: "department", label: "Department", href: "/departments", placeholder: "Search a department" }, { key: "test", label: "Test", href: "/tests", placeholder: "Find a test or package" }] as const;

export function QuickSearchSection() {
  const [active, setActive] = useState<(typeof searchTypes)[number]["key"]>("doctor");
  const [query, setQuery] = useState("");
  const router = useRouter();
  const selected = searchTypes.find(({ key }) => key === active)!;
  function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); router.push(`${selected.href}?${active}=${encodeURIComponent(query.trim())}`); }
  return <section className="relative z-20 -mt-8"><Container><div className="rounded-2xl border border-slate-100 bg-white p-3 shadow-[0_18px_50px_rgba(16,40,58,.12)] sm:p-5"><div className="mb-3 flex gap-1">{searchTypes.map(({ key, label }) => <button key={key} type="button" onClick={() => setActive(key)} className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${active === key ? "bg-blue-50 text-primary" : "text-slate-500 hover:bg-slate-50"}`}>{label}</button>)}</div><form onSubmit={submit} className="flex flex-col gap-3 sm:flex-row"><label className="flex min-h-14 flex-1 items-center gap-3 rounded-xl border border-border px-4 text-slate-400"><FiSearch className="shrink-0 text-lg"/><span className="sr-only">Search {selected.label.toLowerCase()}</span><input value={query} onChange={e => setQuery(e.target.value)} placeholder={selected.placeholder} className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-slate-400"/></label><button className="inline-flex min-h-14 items-center justify-center rounded-xl bg-primary px-8 text-sm font-bold text-white transition hover:bg-blue-700">Search now</button></form></div></Container></section>;
}
