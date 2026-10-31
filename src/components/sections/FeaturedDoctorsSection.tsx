import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { Container, SectionHeading } from "@/components/ui";
import { doctors } from "./home-data";
import { DoctorCard } from "./DoctorCard";
export function FeaturedDoctorsSection() { return <section className="py-16 sm:py-20"><Container><SectionHeading eyebrow="Meet our specialists" title="Care from people who care" description="Find a trusted specialist with the experience you need." action={<Link href="/doctors" className="inline-flex items-center gap-2 text-sm font-bold text-primary">Meet all doctors <FiArrowRight/></Link>}/><div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{doctors.slice(0, 3).map(doctor => <DoctorCard key={doctor.name} doctor={doctor}/>)}</div></Container></section>; }
