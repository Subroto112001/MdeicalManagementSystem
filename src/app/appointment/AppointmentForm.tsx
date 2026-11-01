"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { ReactNode } from "react";
import { FiArrowLeft, FiArrowRight, FiCheck, FiClock, FiDownload, FiPrinter } from "react-icons/fi";
import { useLocale } from "@/i18n/provider";
import { departments, doctors } from "@/data/medical-data";
import { packages } from "@/data/care-data";
import { useToast } from "@/components/ui/Toast";

type Props = { initialDoctor?: string; initialPackage?: string };
type Values = { department: string; doctor: string; date: string; slot: string; patientName: string; age: string; gender: string; phone: string; email: string; problem: string };
const emptyValues: Values = { department: "", doctor: "", date: "", slot: "", patientName: "", age: "", gender: "", phone: "", email: "", problem: "" };
const stepNames = ["Visit", "Schedule", "Patient", "Review", "Confirmed"];
const bengaliDigits = (value: string) => value.replace(/[\u09e6-\u09ef]/g, digit => String(digit.charCodeAt(0) - 0x09e6));

function makeSchema(bn: boolean) {
  const msg = bn ? { required: "\u098f\u0987 \u09a4\u09a5\u09cd\u09af\u099f\u09bf \u09aa\u09cd\u09b0\u09af\u09bc\u09cb\u099c\u09a8\u0964", phone: "\u09ac\u09c8\u09a7 \u09ac\u09be\u0982\u09b2\u09be\u09a6\u09c7\u09b6\u09bf \u09ae\u09cb\u09ac\u09be\u0987\u09b2 \u09a8\u09ae\u09cd\u09ac\u09b0 \u09a6\u09bf\u09a8\u0964", email: "\u09ac\u09c8\u09a7 \u0987\u09ae\u09c7\u0987\u09b2 \u09a0\u09bf\u0995\u09be\u09a8\u09be \u09a6\u09bf\u09a8\u0964", age: "\u09ac\u09af\u09bc\u09b8 \u09e7 \u09a5\u09c7\u0995\u09c7 \u09e7\u09e8\u09e6-\u098f\u09b0 \u09ae\u09a7\u09cd\u09af\u09c7 \u09b9\u09a4\u09c7 \u09b9\u09ac\u09c7\u0964" } : { required: "This field is required.", phone: "Enter a valid Bangladeshi mobile number.", email: "Enter a valid email address.", age: "Age must be between 1 and 120." };
  const requiredText = z.string().trim().min(1, msg.required);
  return z.object({
    department: requiredText,
    doctor: requiredText,
    date: requiredText,
    slot: requiredText,
    patientName: requiredText,
    age: z.string().min(1, msg.required).refine(value => { const age = Number(bengaliDigits(value)); return Number.isInteger(age) && age >= 1 && age <= 120; }, msg.age),
    gender: requiredText,
    phone: z.string().min(1, msg.required).refine(value => /^(?:\+?8801[3-9]\d{8}|01[3-9]\d{8})$/.test(bengaliDigits(value).replace(/[\s()-]/g, "")), msg.phone),
    email: z.union([z.literal(""), z.string().email(msg.email)]),
    problem: z.string().max(500, bn ? "সর্বোচ্চ ৫০০ অক্ষর লিখুন।" : "Use 500 characters or fewer."),
  });
}

function dateKey(date: Date) { const year = date.getFullYear(); const month = String(date.getMonth() + 1).padStart(2, "0"); const day = String(date.getDate()).padStart(2, "0"); return `${year}-${month}-${day}`; }
function dateOptions(availableDays: string[]) { const result: Date[] = []; const today = new Date(); for (let offset = 1; offset <= 30 && result.length < 8; offset++) { const date = new Date(today); date.setDate(today.getDate() + offset); if (availableDays.includes(date.toLocaleDateString("en-US", { weekday: "long" }))) result.push(date); } return result; }
const fallbackSlots = ["09:00", "10:30", "12:00", "15:00", "16:30", "18:00"];
function makeTimeSlots(range = "") {
  const matches = [...range.matchAll(/(\d{1,2}):(\d{2})\s*(AM|PM)/gi)];
  if (matches.length < 2) return fallbackSlots.map(value => ({ value, label: value }));
  const toMinutes = (match: RegExpMatchArray) => ((Number(match[1]) % 12) + (/PM/i.test(match[3]) ? 12 : 0)) * 60 + Number(match[2]);
  const start = toMinutes(matches[0]);
  const end = toMinutes(matches[1]);
  const result: Array<{ value: string; label: string }> = [];
  for (let minute = start; minute + 30 <= end; minute += 60) {
    const hour24 = Math.floor(minute / 60);
    const hour12 = hour24 % 12 || 12;
    const label = `${hour12}:${String(minute % 60).padStart(2, "0")} ${hour24 >= 12 ? "PM" : "AM"}`;
    result.push({ value: label, label });
  }
  return result;
}

export function AppointmentForm({ initialDoctor, initialPackage }: Props) {
  const { locale } = useLocale();
  const bn = locale === "bn";
  const { toast } = useToast();
  const initialDoc = doctors.find(item => item.slug === initialDoctor);
  const [step, setStep] = useState(0);
  const [bookingRef, setBookingRef] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const schema = useMemo(() => makeSchema(bn), [bn]);
  const { register, watch, setValue, trigger, getValues, formState: { errors } } = useForm<Values>({ resolver: zodResolver(schema), defaultValues: { ...emptyValues, ...(initialDoc ? { department: initialDoc.department, doctor: initialDoc.slug } : {}) }, mode: "onTouched" });
  const department = watch("department");
  const doctorSlug = watch("doctor");
  const selectedDoctor = doctors.find(item => item.slug === doctorSlug);
  const availableDates = useMemo(() => dateOptions(selectedDoctor?.availableDays ?? []), [selectedDoctor]);
  const date = watch("date");
  const slot = watch("slot");
  const activePackage = packages.find(item => item.slug === initialPackage);
  const tx = (en: string, _bangla: string) => bn ? (bnText[en] ?? en) : en;
  const doctorsForDepartment = doctors.filter(item => item.department === department);
  const hourSlots = selectedDoctor ? makeTimeSlots(selectedDoctor.schedule[0]?.time) : fallbackSlots.map(item => ({ value: item, label: item }));
  const fieldErrors = errors as Record<string, { message?: string } | undefined>;

  useEffect(() => { if (selectedDoctor && date && !availableDates.some(item => dateKey(item) === date)) setValue("date", ""); }, [selectedDoctor, date, availableDates, setValue]);

  const stepsFields: Array<(keyof Values)[]> = [["department", "doctor"], ["date", "slot"], ["patientName", "age", "gender", "phone", "email", "problem"], [], []];
  async function next() { const valid = await trigger(stepsFields[step]); if (valid) setStep(current => Math.min(current + 1, 3)); }
  function previous() { setStep(current => Math.max(current - 1, 0)); }
  async function confirm() {
    if (submitting) return;
    setSubmitting(true);
    await new Promise(resolve => window.setTimeout(resolve, 900));
    const reference = `HC-${new Date().getFullYear()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
    setBookingRef(reference);
    setSubmitting(false);
    setStep(4);
    toast(tx("Appointment confirmed in this demo.", "ডেমো অ্যাপয়েন্টমেন্ট নিশ্চিত হয়েছে।"));
  }
  function addCalendar() {
    const values = getValues();
    const startDate = values.date.replaceAll("-", "");
    const title = `Appointment with ${selectedDoctor?.name ?? "Healtho"}`;
    const content = ["BEGIN:VCALENDAR", "VERSION:2.0", "BEGIN:VEVENT", `DTSTART;VALUE=DATE:${startDate}`, `SUMMARY:${title}`, `DESCRIPTION:Booking reference ${bookingRef}`, "END:VEVENT", "END:VCALENDAR"].join("\r\n");
    const url = URL.createObjectURL(new Blob([content], { type: "text/calendar;charset=utf-8" }));
    const link = document.createElement("a"); link.href = url; link.download = `${bookingRef}.ics`; link.click(); URL.revokeObjectURL(url);
  }
  function localizedDate(value: string) { return value ? new Date(`${value}T12:00:00`).toLocaleDateString(bn ? "bn-BD" : "en-BD", { weekday: "long", day: "numeric", month: "long", year: "numeric" }) : "—"; }

  return <div className="mx-auto max-w-4xl">
    <div className="mb-6 grid grid-cols-5 gap-2" aria-label={tx(`Step ${Math.min(step + 1, 5)} of 5`, `ধাপ ${Math.min(step + 1, 5)} / ৫`)}>{stepNames.map((name, index) => <div key={name} className="min-w-0"><div className={`h-1.5 rounded-full ${index <= step ? "bg-primary" : "bg-slate-200"}`}/><span className={`mt-2 hidden truncate text-xs sm:block ${index === step ? "font-bold text-primary" : "text-muted"}`}>{tx(name, ["চিকিৎসক", "সময়", "রোগী", "পর্যালোচনা", "সম্পন্ন"][index])}</span></div>)}</div>
    {step < 4 ? <section className="rounded-2xl border border-border bg-white p-5 shadow-sm sm:p-8">
      <p className="text-xs font-bold uppercase tracking-widest text-primary">{tx(`Step ${step + 1} of 4`, `ধাপ ${step + 1} / ৪`)}</p>
      <h1 className="mt-2 text-2xl font-bold">{[tx("Choose your doctor", "চিকিৎসক নির্বাচন করুন"), tx("Pick a date and time", "তারিখ ও সময় বেছে নিন"), tx("Patient information", "রোগীর তথ্য"), tx("Review your appointment", "অ্যাপয়েন্টমেন্ট পর্যালোচনা")][step]}</h1>
      {activePackage && <p className="mt-3 rounded-xl bg-blue-50 p-3 text-sm text-blue-900">{tx("Package selected:", "নির্বাচিত প্যাকেজ:")} <strong>{activePackage.name}</strong> · ৳{activePackage.price.toLocaleString("en-BD")}</p>}
      {step === 0 && <div className="mt-6 grid gap-5 sm:grid-cols-2"><Field label={tx("Department", "বিভাগ")} error={fieldErrors.department?.message}><select {...register("department")} onChange={event => { setValue("department", event.target.value, { shouldValidate: true }); setValue("doctor", ""); setValue("date", ""); setValue("slot", ""); }} className={controlClass}><option value="">{tx("Select department", "বিভাগ নির্বাচন করুন")}</option>{departments.map(item => <option key={item.slug} value={item.slug}>{item.name}</option>)}</select></Field><Field label={tx("Doctor", "চিকিৎসক")} error={fieldErrors.doctor?.message}><select {...register("doctor")} disabled={!department} onChange={event => { setValue("doctor", event.target.value, { shouldValidate: true }); setValue("date", ""); setValue("slot", ""); }} className={controlClass}><option value="">{department ? tx("Select doctor", "চিকিৎসক নির্বাচন করুন") : tx("Choose a department first", "আগে বিভাগ নির্বাচন করুন")}</option>{doctorsForDepartment.map(item => <option key={item.slug} value={item.slug}>{item.name} · {item.specialty}</option>)}</select></Field>{selectedDoctor && <div className="sm:col-span-2 rounded-xl bg-slate-50 p-4 text-sm"><strong>{selectedDoctor.name}</strong><p className="mt-1 text-muted">{selectedDoctor.designation} · {selectedDoctor.experience} {tx("years experience", "বছরের অভিজ্ঞতা")}</p><p className="mt-2 font-semibold">{tx("Visit fee", "ভিজিট ফি")}: ৳{selectedDoctor.fee.toLocaleString("en-BD")}</p></div>}</div>}
      {step === 1 && <div className="mt-6 space-y-6"><Field label={tx("Available dates", "উপলভ্য তারিখ")} error={fieldErrors.date?.message}><input type="hidden" {...register("date")}/><div className="grid grid-cols-2 gap-2 sm:grid-cols-4">{availableDates.map(item => { const key = dateKey(item); const selected = key === date; return <button type="button" key={key} onClick={() => { setValue("date", key, { shouldValidate: true }); setValue("slot", ""); }} className={`min-h-16 rounded-xl border p-2 text-left ${selected ? "border-primary bg-blue-50 ring-1 ring-primary" : "border-border hover:border-blue-300"}`}><span className="block text-xs text-muted">{item.toLocaleDateString(bn ? "bn-BD" : "en-BD", { weekday: "short" })}</span><strong className="mt-1 block">{item.toLocaleDateString(bn ? "bn-BD" : "en-BD", { day: "numeric", month: "short" })}</strong></button>; })}</div></Field><Field label={tx("Available time slots", "উপলভ্য সময়")} error={fieldErrors.slot?.message}><input type="hidden" {...register("slot")}/><div className="grid grid-cols-2 gap-2 sm:grid-cols-3">{hourSlots.map(item => <button type="button" key={item.value} disabled={!date} onClick={() => setValue("slot", item.label, { shouldValidate: true })} className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border text-sm font-semibold disabled:opacity-40 ${slot === item.label ? "border-primary bg-primary text-white" : "border-border hover:border-primary hover:text-primary"}`}><FiClock/>{item.label}</button>)}</div></Field><p className="text-xs text-muted">{tx("Dates are generated from the selected doctor’s weekly chamber days.", "নির্বাচিত চিকিৎসকের সাপ্তাহিক চেম্বারের দিন অনুযায়ী তারিখ দেখানো হচ্ছে।")}</p></div>}
      {step === 2 && <div className="mt-6 grid gap-5 sm:grid-cols-2"><Field label={tx("Patient name", "রোগীর নাম")} error={fieldErrors.patientName?.message}><input {...register("patientName")} autoComplete="name" placeholder={tx("Full name", "পুরো নাম")} className={controlClass}/></Field><Field label={tx("Age", "বয়স")} error={fieldErrors.age?.message}><input {...register("age")} inputMode="numeric" placeholder={tx("Age in years", "বছরে বয়স")} className={controlClass}/></Field><Field label={tx("Gender", "লিঙ্গ")} error={fieldErrors.gender?.message}><select {...register("gender")} className={controlClass}><option value="">{tx("Select gender", "লিঙ্গ নির্বাচন করুন")}</option><option value="Female">{tx("Female", "নারী")}</option><option value="Male">{tx("Male", "পুরুষ")}</option><option value="Other">{tx("Other", "অন্যান্য")}</option></select></Field><Field label={tx("Mobile number", "মোবাইল নম্বর")} error={fieldErrors.phone?.message}><input {...register("phone")} autoComplete="tel" inputMode="tel" placeholder="01XXXXXXXXX" className={controlClass}/><span className="mt-1 block text-xs font-normal text-muted">{tx("Bangladeshi mobile number, e.g. 01XXXXXXXXX", "বাংলাদেশি মোবাইল নম্বর, যেমন 01XXXXXXXXX")}</span></Field><Field label={tx("Email (optional)", "ইমেইল (ঐচ্ছিক)")} error={fieldErrors.email?.message}><input {...register("email")} type="email" autoComplete="email" placeholder="name@example.com" className={controlClass}/></Field><Field label={tx("Problem summary (optional)", "সমস্যার সংক্ষিপ্ত বিবরণ (ঐচ্ছিক)")} error={fieldErrors.problem?.message} className="sm:col-span-2"><textarea {...register("problem")} rows={3} maxLength={500} placeholder={tx("Share anything that may help the doctor prepare.", "চিকিৎসকের প্রস্তুতিতে সহায়ক তথ্য লিখুন।")} className={controlClass}/></Field></div>}
      {step === 3 && <div className="mt-6 divide-y divide-border rounded-xl border border-border">{[[tx("Department", "বিভাগ"), departments.find(item => item.slug === getValues("department"))?.name], [tx("Doctor", "চিকিৎসক"), selectedDoctor?.name], [tx("Date", "তারিখ"), localizedDate(getValues("date"))], [tx("Time", "সময়"), getValues("slot")], [tx("Patient", "রোগী"), getValues("patientName")], [tx("Age and gender", "বয়স ও লিঙ্গ"), `${getValues("age")} · ${getValues("gender")}`], [tx("Mobile", "মোবাইল"), getValues("phone")], ...(activePackage ? [[tx("Package", "প্যাকেজ"), `${activePackage.name} · ৳${activePackage.price.toLocaleString("en-BD")}`]] : [])].map(([label, text]) => <div key={label} className="grid gap-1 p-4 sm:grid-cols-[160px_1fr] sm:gap-4"><dt className="text-xs font-semibold uppercase tracking-wide text-muted">{label}</dt><dd className="text-sm font-semibold">{text || "—"}</dd></div>)}</div>}
      <div className="mt-8 hidden justify-between border-t border-border pt-5 sm:flex">{step > 0 ? <button type="button" onClick={previous} className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-3 text-sm font-bold"><FiArrowLeft/>{tx("Back", "পেছনে")}</button> : <span/>}{step < 3 ? <button type="button" onClick={next} className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white">{tx("Continue", "এগিয়ে যান")}<FiArrowRight/></button> : <button type="button" onClick={confirm} disabled={submitting} className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white disabled:opacity-60">{submitting ? tx("Confirming…", "নিশ্চিত করা হচ্ছে…") : tx("Confirm appointment", "অ্যাপয়েন্টমেন্ট নিশ্চিত করুন")}<FiCheck/></button>}</div>
    </section> : <section className="rounded-2xl border border-border bg-white p-6 text-center shadow-sm sm:p-10"><span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-50 text-3xl text-emerald-600"><FiCheck/></span><h1 className="mt-5 text-2xl font-bold">{tx("Appointment confirmed", "অ্যাপয়েন্টমেন্ট নিশ্চিত হয়েছে")}</h1><p className="mt-2 text-sm text-muted">{tx("This is a demo booking. No information was submitted.", "এটি একটি ডেমো বুকিং। কোনো তথ্য জমা দেওয়া হয়নি।")}</p><div className="mx-auto mt-6 max-w-md rounded-xl bg-slate-50 p-4"><p className="text-xs font-bold uppercase tracking-widest text-muted">{tx("Booking reference", "বুকিং রেফারেন্স")}</p><p className="mt-2 text-2xl font-extrabold text-primary">{bookingRef}</p><p className="mt-3 text-sm font-semibold">{selectedDoctor?.name}</p><p className="mt-1 text-sm text-muted">{localizedDate(getValues("date"))} · {getValues("slot")}</p></div><div className="mt-6 flex flex-col justify-center gap-2 sm:flex-row"><button onClick={addCalendar} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-white"><FiDownload/>{tx("Add to calendar", "ক্যালেন্ডারে যোগ করুন")}</button><button onClick={() => window.print()} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-border px-4 py-3 text-sm font-bold"><FiPrinter/>{tx("Print confirmation", "নিশ্চিতকরণ প্রিন্ট করুন")}</button></div></section>}
    {step < 4 && <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-white/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-8px_24px_rgba(15,23,42,.08)] backdrop-blur sm:hidden"><div className="mx-auto flex max-w-4xl gap-2">{step > 0 && <button type="button" onClick={previous} className="grid min-h-12 w-12 shrink-0 place-items-center rounded-xl border border-border" aria-label={tx("Go back", "পেছনে যান")}><FiArrowLeft/></button>}{step < 3 ? <button type="button" onClick={next} className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-bold text-white">{tx("Continue", "এগিয়ে যান")}<FiArrowRight/></button> : <button type="button" onClick={confirm} disabled={submitting} className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-bold text-white disabled:opacity-60">{submitting ? tx("Confirming…", "নিশ্চিত করা হচ্ছে…") : tx("Confirm appointment", "অ্যাপয়েন্টমেন্ট নিশ্চিত করুন")}<FiCheck/></button>}</div></div>}
  </div>;
}

const controlClass = "mt-2 min-h-12 w-full rounded-xl border border-border bg-white px-3.5 py-3 text-base outline-none focus:border-primary focus:ring-2 focus:ring-blue-100 disabled:bg-slate-50 sm:text-sm";
function Field({ label, error, className = "", children }: { label: string; error?: string; className?: string; children: ReactNode }) { return <label className={`block text-sm font-semibold ${className}`}>{label}{children}{error && <span role="alert" className="mt-1 block text-xs font-medium text-rose-600">{error}</span>}</label>; }

const bnText: Record<string, string> = {
  "Choose your doctor": "\u09a1\u09be\u0995\u09cd\u09a4\u09be\u09b0 \u09a8\u09bf\u09b0\u09cd\u09ac\u09be\u099a\u09a8 \u0995\u09b0\u09c1\u09a8",
  "Pick a date and time": "\u09a4\u09be\u09b0\u09bf\u0996 \u0993 \u09b8\u09ae\u09af\u09bc \u09ac\u09c7\u099b\u09c7 \u09a8\u09bf\u09a8",
  "Patient information": "\u09b0\u09cb\u0997\u09c0\u09b0 \u09a4\u09a5\u09cd\u09af",
  "Review your appointment": "\u0985\u09cd\u09af\u09be\u09aa\u09af\u09bc\u09c7\u09a8\u09cd\u099f\u09ae\u09c7\u09a8\u09cd\u099f \u09aa\u09b0\u09cd\u09af\u09be\u09b2\u09cb\u099a\u09a8\u09be \u0995\u09b0\u09c1\u09a8",
  "Department": "\u09ac\u09bf\u09ad\u09be\u0997", "Select department": "\u09ac\u09bf\u09ad\u09be\u0997 \u09a8\u09bf\u09b0\u09cd\u09ac\u09be\u099a\u09a8 \u0995\u09b0\u09c1\u09a8",
  "Doctor": "\u09a1\u09be\u0995\u09cd\u09a4\u09be\u09b0", "Select doctor": "\u09a1\u09be\u0995\u09cd\u09a4\u09be\u09b0 \u09a8\u09bf\u09b0\u09cd\u09ac\u09be\u099a\u09a8 \u0995\u09b0\u09c1\u09a8", "Choose a department first": "\u0986\u0997\u09c7 \u09ac\u09bf\u09ad\u09be\u0997 \u09a8\u09bf\u09b0\u09cd\u09ac\u09be\u099a\u09a8 \u0995\u09b0\u09c1\u09a8",
  "Visit fee": "\u09ad\u09bf\u099c\u09bf\u099f \u09ab\u09bf", "Available dates": "\u0989\u09aa\u09b2\u09ad\u09cd\u09af \u09a4\u09be\u09b0\u09bf\u0996", "Available time slots": "\u0989\u09aa\u09b2\u09ad\u09cd\u09af \u09b8\u09ae\u09af\u09bc",
  "Patient name": "\u09b0\u09cb\u0997\u09c0\u09b0 \u09a8\u09be\u09ae", "Full name": "\u09aa\u09c1\u09b0\u09cb \u09a8\u09be\u09ae", "Age": "\u09ac\u09af\u09bc\u09b8", "Age in years": "\u09ac\u09af\u09bc\u09b8", "Gender": "\u09b2\u09bf\u0999\u09cd\u0997", "Select gender": "\u09b2\u09bf\u0999\u09cd\u0997 \u09a8\u09bf\u09b0\u09cd\u09ac\u09be\u099a\u09a8 \u0995\u09b0\u09c1\u09a8",
  "Female": "\u09a8\u09be\u09b0\u09c0", "Male": "\u09aa\u09c1\u09b0\u09c1\u09b7", "Other": "\u0985\u09a8\u09cd\u09af\u09be\u09a8\u09cd\u09af", "Mobile number": "\u09ae\u09cb\u09ac\u09be\u0987\u09b2 \u09a8\u09ae\u09cd\u09ac\u09b0",
  "Bangladeshi mobile number, e.g. 01XXXXXXXXX": "\u09ac\u09be\u0982\u09b2\u09be\u09a6\u09c7\u09b6\u09bf \u09ae\u09cb\u09ac\u09be\u0987\u09b2 \u09a8\u09ae\u09cd\u09ac\u09b0, \u09af\u09c7\u09ae\u09a8 01XXXXXXXXX",
  "Email (optional)": "\u0987\u09ae\u09c7\u0987\u09b2 (\u0990\u099a\u09cd\u099b\u09bf\u0995)", "Problem summary (optional)": "\u09b8\u09ae\u09b8\u09cd\u09af\u09be\u09b0 \u09b8\u0982\u0995\u09cd\u09b7\u09bf\u09aa\u09cd\u09a4 \u09ac\u09bf\u09ac\u09b0\u09a3 (\u0990\u099a\u09cd\u099b\u09bf\u0995)",
  "Confirm appointment": "\u0985\u09cd\u09af\u09be\u09aa\u09af\u09bc\u09c7\u09a8\u09cd\u099f \u09a8\u09bf\u09b6\u09cd\u099a\u09bf\u09a4 \u0995\u09b0\u09c1\u09a8", "Continue": "\u098f\u0997\u09bf\u09af\u09bc\u09c7 \u09af\u09be\u09a8", "Back": "\u09aa\u09c7\u099b\u09a8\u09c7", "Appointment confirmed": "\u0985\u09cd\u09af\u09be\u09aa\u09af\u09bc\u09c7\u09a8\u09cd\u099f \u09a8\u09bf\u09b6\u09cd\u099a\u09bf\u09a4 \u09b9\u09af\u09bc\u09c7\u099b\u09c7",
  "Booking reference": "\u09ac\u09c1\u0995\u09bf\u0982 \u09b0\u09c7\u09ab\u09be\u09b0\u09c7\u09a8\u09cd\u09b8", "Add to calendar": "\u0995\u09cd\u09af\u09be\u09b2\u09c7\u09a8\u09cd\u09a1\u09be\u09b0\u09c7 \u09af\u09cb\u0997 \u0995\u09b0\u09c1\u09a8", "Print confirmation": "\u09a8\u09bf\u09b6\u09cd\u099a\u09bf\u09a4\u0995\u09b0\u09a3 \u09aa\u09cd\u09b0\u09bf\u09a8\u09cd\u099f \u0995\u09b0\u09c1\u09a8",
};
