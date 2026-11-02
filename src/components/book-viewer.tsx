import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { BookOpen, ExternalLink, Loader2, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface Volume {
  id: string;
  title: string;
  authors: string;
  thumb?: string | undefined;
  embeddable: boolean;
  description?: string | undefined;
}

const cache = new Map<string, Volume[]>();

async function findVolumes(q: string): Promise<Volume[]> {
  const hit = cache.get(q);
  if (hit) return hit;
  const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(q)}&maxResults=6&printType=books`);
  if (!res.ok) throw new Error("Could not reach Google Books");
  const json = (await res.json()) as { items?: Array<{ id: string; volumeInfo?: { title?: string; authors?: string[]; description?: string; imageLinks?: { thumbnail?: string } }; accessInfo?: { embeddable?: boolean; viewability?: string } }> };
  const list = (json.items ?? []).map((it) => ({
    id: it.id,
    title: it.volumeInfo?.title ?? "Untitled",
    authors: (it.volumeInfo?.authors ?? []).join(", "),
    thumb: it.volumeInfo?.imageLinks?.thumbnail?.replace("http://", "https://"),
    description: it.volumeInfo?.description,
    embeddable: !!it.accessInfo?.embeddable && it.accessInfo?.viewability !== "NO_PAGES",
  }));
  list.sort((a, b) => Number(b.embeddable) - Number(a.embeddable));
  cache.set(q, list);
  return list;
}

/** Splits "Title — Author" into a cleaner search query. */
export function bookQuery(book: string) {
  return book.replace(/\s+[—-]\s+/, " ");
}

export function BookViewer({ book, onClose }: { book: string | null; onClose: () => void }) {
  const [vols, setVols] = useState<Volume[] | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [active, setActive] = useState<Volume | null>(null);

  useEffect(() => {
    if (!book) return;
    setVols(null); setErr(null); setActive(null);
    findVolumes(bookQuery(book))
      .then((v) => { setVols(v); setActive(v[0] ?? null); })
      .catch((e: Error) => setErr(e.message));
  }, [book]);

  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [onClose]);

  const q = book ? encodeURIComponent(bookQuery(book)) : "";

  return (
    <AnimatePresence>
      {book && (
        <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-2 backdrop-blur-md sm:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ y: 30, scale: 0.97, opacity: 0 }} animate={{ y: 0, scale: 1, opacity: 1 }} exit={{ y: 20, scale: 0.98, opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            className="glass flex h-full max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-3xl"
          >
            <div className="flex items-center gap-3 border-b px-4 py-3">
              <BookOpen className="size-4 text-primary" />
              <div className="min-w-0 flex-1">
                <div className="truncate font-display text-sm">{book}</div>
                <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Textbook reader</div>
              </div>
              <button onClick={onClose} aria-label="Close" className="grid size-8 place-items-center rounded-full hover:bg-accent"><X className="size-4" /></button>
            </div>

            <div className="flex min-h-0 flex-1 flex-col md:flex-row">
              <aside className="flex shrink-0 gap-2 overflow-x-auto border-b p-3 md:w-64 md:flex-col md:overflow-y-auto md:border-b-0 md:border-r">
                {!vols && !err && <div className="flex items-center gap-2 p-2 text-sm text-muted-foreground"><Loader2 className="size-4 animate-spin" /> Finding editions…</div>}
                {err && <p className="p-2 text-sm text-destructive">{err}</p>}
                {vols?.length === 0 && <p className="p-2 text-sm text-muted-foreground">No editions found.</p>}
                {vols?.map((v) => (
                  <button key={v.id} onClick={() => setActive(v)} className={cn("flex w-56 shrink-0 gap-3 rounded-xl p-2 text-left transition-colors md:w-auto", active?.id === v.id ? "bg-accent" : "hover:bg-accent/60")}>
                    {v.thumb ? <img src={v.thumb} alt="" className="h-16 w-11 shrink-0 rounded object-cover" /> : <div className="h-16 w-11 shrink-0 rounded bg-muted" />}
                    <div className="min-w-0">
                      <div className="line-clamp-2 text-xs font-medium">{v.title}</div>
                      <div className="truncate text-[11px] text-muted-foreground">{v.authors}</div>
                      <span className={cn("mt-1 inline-block rounded-full px-1.5 py-0.5 font-mono text-[9px] uppercase", v.embeddable ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground")}>
                        {v.embeddable ? "Preview" : "Info only"}
                      </span>
                    </div>
                  </button>
                ))}
                <div className="hidden space-y-1 pt-3 md:block">
                  <div className="px-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Find full copies</div>
                  {[
                    ["Open Library", `https://openlibrary.org/search?q=${q}`],
                    ["Internet Archive", `https://archive.org/search?query=${q}`],
                    ["Google Books", `https://www.google.com/search?tbm=bks&q=${q}`],
                  ].map(([l, h]) => (
                    <a key={l} href={h} target="_blank" rel="noreferrer" className="flex items-center justify-between rounded-lg px-2 py-1.5 text-xs text-muted-foreground hover:bg-accent hover:text-foreground">
                      {l} <ExternalLink className="size-3" />
                    </a>
                  ))}
                </div>
              </aside>

              <div className="relative min-h-0 flex-1 bg-card">
                {active?.embeddable ? (
                  <iframe key={active.id} title={active.title} src={`https://books.google.com/books?id=${active.id}&lpg=PP1&pg=PP1&output=embed`} className="absolute inset-0 h-full w-full border-0 bg-white" allowFullScreen />
                ) : active ? (
                  <div className="flex h-full flex-col items-center justify-center gap-4 overflow-y-auto p-8 text-center">
                    {active.thumb && <img src={active.thumb} alt="" className="h-40 rounded-lg shadow-lg" />}
                    <div className="font-display text-lg">{active.title}</div>
                    <p className="max-w-lg text-sm text-muted-foreground line-clamp-6">{active.description ?? "The publisher doesn't allow an in-app preview for this edition."}</p>
                    <p className="text-xs text-muted-foreground">Try another edition on the left, or open a full copy below.</p>
                    <a href={`https://openlibrary.org/search?q=${q}`} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm text-primary-foreground">Open Library <ExternalLink className="size-3.5" /></a>
                  </div>
                ) : null}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function BookList({ books, onOpen }: { books: string[]; onOpen: (b: string) => void }) {
  return (
    <ul className="space-y-1">
      {books.map((b) => (
        <li key={b}>
          <button onClick={() => onOpen(b)} className="flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left text-sm transition-colors hover:bg-accent">
            <BookOpen className="size-4 shrink-0 text-primary" />
            <span className="flex-1">{b}</span>
            <span className="font-mono text-[10px] uppercase text-muted-foreground">Read</span>
          </button>
        </li>
      ))}
    </ul>
  );
}
