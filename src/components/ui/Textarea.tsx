import type { TextareaHTMLAttributes } from "react";
import { twMerge } from "./utils";
export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) { return <textarea className={twMerge("w-full min-h-28 rounded-xl border border-border bg-white px-3.5 py-2.5 text-sm placeholder:text-slate-400", className)} {...props} />; }
