"use client";
import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui";
import { stats } from "./home-data";

export function StatsSection() {
  const ref = useRef<HTMLElement>(null);
  const [values, setValues] = useState(() => stats.map(() => 0));
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      if (reduceMotion) { setValues(stats.map(({ value }) => value)); return; }
      const start = performance.now();
      const duration = 1200;
      const animate = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - (1 - progress) ** 3;
        setValues(stats.map(({ value }) => Math.round(value * eased)));
        if (progress < 1) frame = requestAnimationFrame(animate);
      };
      frame = requestAnimationFrame(animate);
    }, { threshold: 0.25 });
    observer.observe(node);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, []);
  return <section ref={ref} className="border-y border-border bg-blue-50/60 py-10 sm:py-12"><Container><div className="grid grid-cols-2 gap-y-8 lg:grid-cols-4">{stats.map(({ suffix, label, icon: Icon }, index) => <div key={label} className="flex items-center justify-center gap-3 border-slate-200 px-3 sm:border-r last:sm:border-r-0"><span className="hidden h-12 w-12 place-items-center rounded-xl bg-white text-xl text-primary shadow-sm sm:grid"><Icon/></span><div><p className="text-2xl font-extrabold tracking-tight sm:text-3xl">{values[index]}{suffix}</p><p className="mt-1 text-xs font-medium text-muted sm:text-sm">{label}</p></div></div>)}</div></Container></section>;
}
