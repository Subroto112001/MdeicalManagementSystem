import type { InputHTMLAttributes } from "react";
import { twMerge } from "./utils";
export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) { return <input className={twMerge("w-full rounded-xl border border-border bg-white px-3.5 py-2.5 text-sm placeholder:text-slate-400", className)} {...props} />; }
