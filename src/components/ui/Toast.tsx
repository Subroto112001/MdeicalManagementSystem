"use client";
import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { Button } from "./Button";
type ToastApi = { toast: (message: string) => void };
const ToastContext = createContext<ToastApi>({ toast: () => undefined });
export function ToastProvider({ children }: { children: ReactNode }) { const [message, setMessage] = useState(""); const toast = useCallback((text: string) => { setMessage(text); window.setTimeout(() => setMessage(""), 3000); }, []); const api = useMemo(() => ({ toast }), [toast]); return <ToastContext.Provider value={api}>{children}{message && <div role="status" className="fixed bottom-5 right-5 z-50 rounded-xl bg-slate-900 px-4 py-3 text-sm text-white shadow-xl">{message}</div>}</ToastContext.Provider>; }
export function useToast() { return useContext(ToastContext); }
export function ToastDemo() { const { toast } = useToast(); return <Button variant="secondary" onClick={() => toast("Your changes have been saved.")}>Show toast</Button>; }
