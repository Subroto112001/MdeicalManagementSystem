import type { Metadata } from "next";
import { Container } from "@/components/ui";
import { LoginForm } from "./LoginForm";
export const metadata: Metadata = { title: "Patient Sign In", description: "Patient sign-in interface preview for Healtho Medical Center." };
export default function LoginPage() { return <main className="grid flex-1 place-items-center bg-[#f8fafc] px-4 py-12"><Container className="max-w-md"><LoginForm/></Container></main>; }
