"use client";
import { useEffect, type ReactNode } from "react";
export function Modal({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: ReactNode }) {
  useEffect(() => { if (!open) return; const close = (event: KeyboardEvent) => event.key === "Escape" && onClose(); window.addEventListener("keydown", close); return () => window.removeEventListener("keydown", close); }, [open, onClose]);
  if (!open) return null;
  return <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/50 p-4" onMouseDown={(event) => event.target === event.currentTarget && onClose()}><section role="dialog" aria-modal="true" aria-label={title} className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl"><header className="mb-4 flex items-center justify-between"><h2 className="text-lg font-bold">{title}</h2><button type="button" onClick={onClose} aria-label="Close dialog" className="rounded-lg px-2 py-1 text-slate-500 hover:bg-slate-100">✕</button></header>{children}</section></div>;
}
