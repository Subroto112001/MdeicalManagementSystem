import type { HTMLAttributes } from "react";
export function Container(props: HTMLAttributes<HTMLDivElement>) { return <div {...props} className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${props.className ?? ""}`} />; }
