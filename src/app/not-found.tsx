import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import { Container } from "@/components/ui";
export default function NotFound() { return <main className="grid flex-1 place-items-center px-4 py-20 text-center"><Container className="max-w-xl"><p className="text-sm font-bold uppercase tracking-[.2em] text-primary">404 · Page not found</p><h1 className="mt-4 text-4xl font-extrabold">We couldn’t find that page.</h1><p className="mt-3 leading-7 text-muted">The link may be out of date, or the page may have moved.</p><Link href="/" className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-xl bg-primary px-5 py-3 font-bold text-white"><FiArrowLeft/> Back to home</Link></Container></main>; }
