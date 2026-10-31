"use client";
import { useState } from "react";
import { FiFilter, FiX } from "react-icons/fi";
import { departments } from "@/data/medical-data";

type Values = { q: string; department: string; gender: string; day: string; minFee: string; maxFee: string };
function Fields({ values }: { values: Values }) { return <>
  <label className="block text-sm font-semibold">Doctor name<input name="q" defaultValue={values.q} placeholder="Search by name" className="mt-2 w-full rounded-xl border border-border bg-white px-3 py-2.5 text-sm font-normal"/></label>
  <label className="block text-sm font-semibold">Department<select name="department" defaultValue={values.department} className="mt-2 w-full rounded-xl border border-border bg-white px-3 py-2.5 text-sm font-normal"><option value="">All departments</option>{departments.map(d => <option key={d.slug} value={d.slug}>{d.name}</option>)}</select></label>
  <label className="block text-sm font-semibold">Gender<select name="gender" defaultValue={values.gender} className="mt-2 w-full rounded-xl border border-border bg-white px-3 py-2.5 text-sm font-normal"><option value="">Any</option><option>Female</option><option>Male</option></select></label>
  <label className="block text-sm font-semibold">Available day<select name="day" defaultValue={values.day} className="mt-2 w-full rounded-xl border border-border bg-white px-3 py-2.5 text-sm font-normal"><option value="">Any day</option>{["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map(day => <option key={day}>{day}</option>)}</select></label>
  <fieldset><legend className="text-sm font-semibold">Visit fee (৳)</legend><div className="mt-2 grid grid-cols-2 gap-2"><input name="minFee" defaultValue={values.minFee} inputMode="numeric" placeholder="Min" aria-label="Minimum fee" className="min-w-0 rounded-xl border border-border px-3 py-2.5 text-sm"/><input name="maxFee" defaultValue={values.maxFee} inputMode="numeric" placeholder="Max" aria-label="Maximum fee" className="min-w-0 rounded-xl border border-border px-3 py-2.5 text-sm"/></div></fieldset>
</>; }

function FilterForm({ values, onSubmit }: { values: Values; onSubmit?: () => void }) { return <form action="/doctors" method="get" onSubmit={onSubmit} className="space-y-4"><Fields values={values}/><div className="flex gap-2"><button className="flex-1 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-white hover:bg-blue-700">Apply filters</button><a href="/doctors" className="rounded-xl border border-border px-4 py-3 text-sm font-semibold">Reset</a></div></form>; }

export function DoctorFilters({ values }: { values: Values }) {
  const [open, setOpen] = useState(false);
  return <>
    <div className="mb-4 lg:hidden"><button type="button" onClick={() => setOpen(true)} className="inline-flex items-center gap-2 rounded-xl border border-border bg-white px-4 py-2.5 text-sm font-semibold"><FiFilter/> Filters</button></div>
    <aside className="hidden rounded-2xl border border-border bg-white p-5 lg:block"><h2 className="mb-5 text-lg font-bold">Filter doctors</h2><FilterForm values={values}/></aside>
    {open && <div className="fixed inset-0 z-50 lg:hidden"><button type="button" aria-label="Close filters" onClick={() => setOpen(false)} className="absolute inset-0 bg-slate-950/50"/><section role="dialog" aria-modal="true" aria-label="Filter doctors" className="absolute inset-y-0 right-0 w-full max-w-sm overflow-y-auto bg-white p-5 shadow-2xl"><div className="mb-6 flex items-center justify-between"><h2 className="text-lg font-bold">Filter doctors</h2><button type="button" aria-label="Close filters" onClick={() => setOpen(false)} className="rounded-lg p-2 hover:bg-slate-100"><FiX/></button></div><FilterForm values={values} onSubmit={() => setOpen(false)}/></section></div>}
  </>;
}
