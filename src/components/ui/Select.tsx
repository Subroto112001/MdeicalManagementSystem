import type { SelectHTMLAttributes } from "react";
import { twMerge } from "./utils";
export function Select({ className, children, ...props }: SelectHTMLAttributes<HTMLSelectElement>) { return <select className={twMerge("w-full rounded-xl border border-border bg-white px-3.5 py-2.5 text-sm", className)} {...props}>{children}</select>; }
