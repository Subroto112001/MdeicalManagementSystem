import type { Metadata } from "next";
import { Breadcrumb, Container, SectionHeading } from "@/components/ui";
import { GalleryGrid } from "./GalleryGrid";
export const metadata: Metadata = { title: "Gallery", description: "A look at the people and spaces that make up Healtho Medical Center." };
export default function GalleryPage() { return <main className="bg-[#f8fafc] py-8 sm:py-12"><Container><Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Gallery" }]}/><div className="mt-7"><SectionHeading eyebrow="Inside Healtho" title="Care is a team effort" description="Explore moments from our care spaces and the people who support patients."/></div><GalleryGrid/></Container></main>; }
