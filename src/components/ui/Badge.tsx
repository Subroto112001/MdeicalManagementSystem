import type { HTMLAttributes } from "react";
import { twMerge } from "./utils";
export function Badge({ className, variant = "default", ...props }: HTMLAttributes<HTMLSpanElement> & { variant?: "default" | "success" | "warning" | "danger" }) { const styles = { default: "bg-blue-50 text-blue-700", success: "bg-emerald-50 text-emerald-700", warning: "bg-amber-50 text-amber-800", danger: "bg-rose-50 text-rose-700" }; return <span className={twMerge("inline-flex rounded-full px-2.5 py-1 text-xs font-semibold", styles[variant], className)} {...props} />; }
