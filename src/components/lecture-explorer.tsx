import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Loader2, Play, Search, X } from "lucide-react";
import { searchYouTube, type YTResult } from "@/lib/youtube.functions";
import { cn } from "@/lib/utils";

const CHANNELS = ["Gate Smashers", "Abdul Bari", "NPTEL", "freeCodeCamp", "Neso Academy"];

export function LectureExplorer({ topics, onPick, onClose }: { topics: string[]; onPick: (id: string) => void; onClose: () => void }) {
  const [q, setQ] = useState(topics[0] ? `${topics[0]} lecture` : "");
  const [query, setQuery] = useState(q);
  const [results, setResults] = useState<YTResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!query.trim()) return;
    let off = false;
    setLoading(true);
    setError(false);
    searchYouTube({ data: { q: query } })
      .then((r) => { if (!off) { setResults(r); setError(r.length === 0); } })
      .catch(() => !off && setError(true))
      .finally(() => !off && setLoading(false));
    return () => { off = true; };
  }, [query]);

  const run = (text: string) => { setQ(text); setQuery(text); };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      transition={{ type: "spring", stiffness: 320, damping: 30 }}
      className="absolute inset-0 z-20 flex flex-col bg-background/95 backdrop-blur-xl"
    >
      <div className="flex items-center gap-2 border-b p-3">
        <form onSubmit={(e) => { e.preventDefault(); run(q); }} className="flex flex-1 items-center gap-2 rounded-full border bg-card px-3 focus-within:border-primary">
          <Search className="size-4 text-muted-foreground" />
          <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search lectures…" className="min-w-0 flex-1 bg-transparent py-2 text-sm outline-none" />
        </form>
        <button onClick={onClose} aria-label="Close search" className="grid size-9 place-items-center rounded-full border text-muted-foreground hover:text-foreground">
          <X className="size-4" />
        </button>
      </div>
      <div className="flex gap-2 overflow-x-auto px-3 py-2 [scrollbar-width:none]">
        {topics.slice(1).map((t) => (
          <Chip key={t} onClick={() => run(`${t} ${topics[0]} lecture`)}>{t}</Chip>
        ))}
        {CHANNELS.map((c) => (
          <Chip key={c} accent onClick={() => run(`${topics[0]} ${c}`)}>{c}</Chip>
        ))}
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto p-3">
        {loading ? (
          <div className="grid h-full place-items-center text-muted-foreground"><Loader2 className="size-6 animate-spin" /></div>
        ) : error ? (
          <p className="pt-10 text-center text-sm text-muted-foreground">No videos found. Try another search or paste a link.</p>
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {results.map((v, i) => (
              <motion.button
                key={v.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                onClick={() => onPick(v.id)}
                className="group overflow-hidden rounded-xl border bg-card text-left transition-colors hover:border-primary"
              >
                <div className="relative aspect-video overflow-hidden bg-muted">
                  <img src={v.thumb} alt="" loading="lazy" className="size-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <span className="absolute inset-0 grid place-items-center bg-background/40 opacity-0 transition-opacity group-hover:opacity-100">
                    <Play className="size-8 text-primary" />
                  </span>
                  {v.duration && <span className="absolute bottom-1 right-1 rounded bg-background/80 px-1.5 text-[10px] font-mono">{v.duration}</span>}
                </div>
                <div className="p-2.5">
                  <p className="line-clamp-2 text-sm leading-snug">{v.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{v.channel}</p>
                </div>
              </motion.button>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

function Chip({ children, onClick, accent }: { children: React.ReactNode; onClick: () => void; accent?: boolean }) {
  return (
    <button onClick={onClick} className={cn("shrink-0 rounded-full border px-3 py-1 text-xs text-muted-foreground hover:border-primary hover:text-foreground", accent && "text-primary")}>
      {children}
    </button>
  );
}
