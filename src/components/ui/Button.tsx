import type { ButtonHTMLAttributes } from "react";
import { twMerge } from "./utils";
type Props = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "outline" | "ghost" | "danger"; size?: "sm" | "md" | "lg" };
export function Button({ className, variant = "primary", size = "md", ...props }: Props) {
  const variants = { primary: "bg-primary text-primary-foreground hover:bg-blue-700", secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200", outline: "border border-border bg-white text-foreground hover:bg-slate-50", ghost: "text-foreground hover:bg-slate-100", danger: "bg-rose-600 text-white hover:bg-rose-700" };
  const sizes = { sm: "px-3 py-1.5 text-sm", md: "px-4 py-2.5 text-sm", lg: "px-5 py-3 text-base" };
  return <button className={twMerge("inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition disabled:pointer-events-none disabled:opacity-50", variants[variant], sizes[size], className)} {...props} />;
}
