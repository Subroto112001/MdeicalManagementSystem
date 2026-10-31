"use client";
import { Button } from "./Button";
export function Pagination({ page, totalPages, onPageChange }: { page: number; totalPages: number; onPageChange: (page: number) => void }) { return <nav aria-label="Pagination" className="flex items-center gap-2"><Button variant="outline" size="sm" disabled={page <= 1} onClick={() => onPageChange(page - 1)}>Previous</Button><span className="px-2 text-sm text-muted">Page {page} of {totalPages}</span><Button variant="outline" size="sm" disabled={page >= totalPages} onClick={() => onPageChange(page + 1)}>Next</Button></nav>; }
