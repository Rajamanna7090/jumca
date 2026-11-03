import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { ArrowLeft, Download, Eye, FileText, Trash2, Upload, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { AccountButton } from "@/components/account-button";
import { SEMESTERS } from "@/data/syllabus";

export const Route = createFileRoute("/pyq")({
  head: () => ({
    meta: [
      { title: "Previous Year Questions — Orbit MCA" },
      { name: "description", content: "Preview and download previous year question papers for the JU MCA 2-year program." },
      { property: "og:title", content: "Previous Year Questions — Orbit MCA" },
      { property: "og:description", content: "Past MCA exam papers, ready to preview and download." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: PyqPage,
});

type Pyq = { id: string; title: string; course_code: string | null; semester: string | null; year: number | null; file_path: string; file_name: string; created_at: string };

function PyqPage() {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [items, setItems] = useState<Pyq[]>([]);
  const [semFilter, setSemFilter] = useState("all");
  const [preview, setPreview] = useState<{ url: string; title: string; isPdf: boolean } | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => { setUser(data.user); setReady(true); });
    const { data } = supabase.auth.onAuthStateChange((_e, s) => setUser(s?.user ?? null));
    return () => data.subscription.unsubscribe();
  }, []);

  async function load() {
    const { data } = await supabase.from("pyqs").select("*").order("year", { ascending: false });
    setItems((data as Pyq[]) ?? []);
  }

  useEffect(() => {
    if (!user) { setItems([]); setIsAdmin(false); return; }
    load();
    supabase.rpc("has_role", { _user_id: user.id, _role: "admin" }).then(({ data }) => setIsAdmin(!!data));
  }, [user]);

  async function open(p: Pyq) {
    const { data } = await supabase.storage.from("pyqs").download(p.file_path);
    if (!data) return;
    setPreview({ url: URL.createObjectURL(data), title: p.title, isPdf: data.type.includes("pdf") || p.file_name.toLowerCase().endsWith(".pdf") });
  }

  async function download(p: Pyq) {
    const { data } = await supabase.storage.from("pyqs").createSignedUrl(p.file_path, 60, { download: p.file_name });
    if (data?.signedUrl) window.location.href = data.signedUrl;
  }

  async function remove(p: Pyq) {
    if (!confirm(`Delete "${p.title}"?`)) return;
    await supabase.storage.from("pyqs").remove([p.file_path]);
    await supabase.from("pyqs").delete().eq("id", p.id);
    load();
  }

  const shown = items.filter((p) => semFilter === "all" || p.semester === semFilter);

  return (
    <div className="grain relative min-h-screen">
      <div className="bg-aura pointer-events-none absolute inset-x-0 top-0 h-[500px]" />
      <div className="relative mx-auto max-w-5xl px-5 pb-24 pt-10 md:px-8">
        <header className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="size-4" /> Dashboard
          </Link>
          <AccountButton />
        </header>

        <p className="mt-14 font-mono text-xs uppercase tracking-[0.3em] text-primary">Exam archive</p>
        <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight md:text-6xl">Previous Year Questions</h1>

        {!ready ? null : !user ? (
          <div className="glass mt-10 rounded-3xl p-10 text-center">
            <FileText className="mx-auto size-10 text-primary" />
            <p className="mt-4 text-lg">Sign in to preview and download question papers.</p>
            <button
              onClick={() => lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.href })}
              className="mt-6 rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground"
            >
              Sign in with Google
            </button>
          </div>
        ) : (
          <>
            {isAdmin && <UploadForm onDone={load} />}
            <div className="mt-10 flex flex-wrap gap-2">
              {[{ id: "all", label: "All" }, ...SEMESTERS.map((s) => ({ id: s.id, label: s.label }))].map((s) => (
                <button key={s.id} onClick={() => setSemFilter(s.id)}
                  className={`rounded-full border px-4 py-1.5 text-xs transition ${semFilter === s.id ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:text-foreground"}`}>
                  {s.label}
                </button>
              ))}
            </div>
            {shown.length === 0 ? (
              <p className="mt-10 text-muted-foreground">No papers uploaded yet.</p>
            ) : (
              <div className="mt-6 grid gap-3 md:grid-cols-2">
                {shown.map((p) => (
                  <div key={p.id} className="glass flex items-center gap-4 rounded-2xl p-4">
                    <FileText className="size-8 shrink-0 text-primary" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium">{p.title}</p>
                      <p className="font-mono text-xs text-muted-foreground">
                        {[p.course_code, SEMESTERS.find((s) => s.id === p.semester)?.label, p.year].filter(Boolean).join(" · ")}
                      </p>
                    </div>
                    <button onClick={() => open(p)} aria-label="Preview" className="rounded-full border border-border p-2 hover:border-primary hover:text-primary"><Eye className="size-4" /></button>
                    <button onClick={() => download(p)} aria-label="Download" className="rounded-full border border-border p-2 hover:border-primary hover:text-primary"><Download className="size-4" /></button>
                    {isAdmin && <button onClick={() => remove(p)} aria-label="Delete" className="rounded-full border border-border p-2 hover:border-destructive hover:text-destructive"><Trash2 className="size-4" /></button>}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {preview && (
        <div className="fixed inset-0 z-50 flex flex-col bg-background/95 backdrop-blur">
          <div className="flex items-center justify-between border-b border-border px-5 py-3">
            <p className="truncate font-medium">{preview.title}</p>
            <button onClick={() => { URL.revokeObjectURL(preview.url); setPreview(null); }} aria-label="Close"><X className="size-5" /></button>
          </div>
          {preview.isPdf ? (
            <iframe src={preview.url} title={preview.title} className="flex-1" />
          ) : (
            <div className="flex-1 overflow-auto p-4"><img src={preview.url} alt={preview.title} className="mx-auto max-w-full" /></div>
          )}
        </div>
      )}
    </div>
  );
}

function UploadForm({ onDone }: { onDone: () => void }) {
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [sem, setSem] = useState("s1");
  const [year, setYear] = useState(String(new Date().getFullYear() - 1));
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!file || !title) return;
    setBusy(true); setMsg("");
    const path = `${crypto.randomUUID()}-${file.name.replace(/[^\w.-]/g, "_")}`;
    const up = await supabase.storage.from("pyqs").upload(path, file, { contentType: file.type });
    if (up.error) { setMsg(up.error.message); setBusy(false); return; }
    const { error } = await supabase.from("pyqs").insert({ title, course_code: code || null, semester: sem, year: Number(year) || null, file_path: path, file_name: file.name });
    setBusy(false);
    if (error) { setMsg(error.message); return; }
    setTitle(""); setCode(""); setFile(null); setMsg("Uploaded ✓");
    (e.target as HTMLFormElement).reset();
    onDone();
  }

  const input = "rounded-xl border border-border bg-card/60 px-3 py-2 text-sm outline-none focus:border-primary";
  return (
    <form onSubmit={submit} className="glass mt-10 grid gap-3 rounded-3xl p-5 md:grid-cols-2">
      <p className="font-mono text-xs uppercase tracking-widest text-primary md:col-span-2">Admin · Upload paper</p>
      <input className={input} placeholder="Title (e.g. DBMS End Sem 2024)" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <input className={input} placeholder="Course code (e.g. 125A)" value={code} onChange={(e) => setCode(e.target.value)} />
      <select className={input} value={sem} onChange={(e) => setSem(e.target.value)}>
        {SEMESTERS.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
      </select>
      <input className={input} type="number" placeholder="Year" value={year} onChange={(e) => setYear(e.target.value)} />
      <input className={`${input} md:col-span-2`} type="file" accept="application/pdf,image/*" onChange={(e) => setFile(e.target.files?.[0] ?? null)} required />
      <div className="flex items-center gap-3 md:col-span-2">
        <button disabled={busy} className="flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50">
          <Upload className="size-4" /> {busy ? "Uploading…" : "Upload"}
        </button>
        {msg && <span className="text-xs text-muted-foreground">{msg}</span>}
      </div>
    </form>
  );
}
