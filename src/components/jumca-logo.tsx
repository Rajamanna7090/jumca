import { cn } from "@/lib/utils";

/** Animated JUMCA emblem: Jadavpur University torch of knowledge framed by code braces. */
export function JumcaMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={cn("jumca-mark", className)} aria-hidden="true">
      <defs>
        <linearGradient id="jm-flame" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="var(--sem4)" />
          <stop offset="100%" stopColor="var(--primary)" />
        </linearGradient>
        <radialGradient id="jm-glow">
          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.55" />
          <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="24" cy="20" r="16" fill="url(#jm-glow)" className="jm-aura" />
      {/* code braces */}
      <path className="jm-brace-l" d="M12 8c-3 0-4 1.5-4 4v6c0 2-1 3-3 3v0c2 0 3 1 3 3v8c0 2.5 1 4 4 4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path className="jm-brace-r" d="M36 8c3 0 4 1.5 4 4v6c0 2 1 3 3 3v0c-2 0-3 1-3 3v8c0 2.5-1 4-4 4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      {/* flame */}
      <g className="jm-flame">
        <path d="M24 6c4 5 7 8.5 7 13a7 7 0 0 1-14 0c0-3 1.5-5 3-6.5 0 2.5 1 4 2.5 4.5C22 13 22.5 9.5 24 6z" fill="url(#jm-flame)" />
        <path className="jm-core" d="M24 15c2 2.5 3 4 3 5.5a3 3 0 0 1-6 0c0-1.5 1.2-3.2 3-5.5z" fill="var(--foreground)" opacity="0.9" />
      </g>
      {/* torch cup + FET collar */}
      <path d="M17.5 28h13l-2.5 5h-8z" fill="currentColor" opacity="0.9" />
      <rect x="21.5" y="33.5" width="5" height="7" rx="1" fill="currentColor" opacity="0.75" />
      <path d="M19 42h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}

export function JumcaLogo({ size = "md", tagline = true, className }: { size?: "sm" | "md"; tagline?: boolean; className?: string }) {
  return (
    <div className={cn("jumca-logo group flex items-center gap-2.5", className)}>
      <JumcaMark className={cn("text-foreground", size === "sm" ? "size-8" : "size-10")} />
      <div className="leading-none">
        <div className={cn("jm-word font-display font-semibold tracking-tight", size === "sm" ? "text-sm" : "text-base")}>
          <span className="jm-ju">JU</span>
          <span className="font-mono tracking-[0.18em]">MCA</span>
        </div>
        {tagline && (
          <div className="mt-1 hidden font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground sm:block">
            Jadavpur University · MCA
          </div>
        )}
      </div>
    </div>
  );
}
