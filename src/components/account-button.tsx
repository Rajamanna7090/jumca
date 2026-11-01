import { useEffect, useState } from "react";
import { LogOut } from "lucide-react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";

export function AccountButton() {
  const [user, setUser] = useState<User | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data } = supabase.auth.onAuthStateChange((_e, s) => setUser(s?.user ?? null));
    return () => data.subscription.unsubscribe();
  }, []);

  async function signIn() {
    setBusy(true);
    const res = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin });
    if (res.error) console.error(res.error);
    setBusy(false);
  }

  if (!user) {
    return (
      <button
        onClick={signIn}
        disabled={busy}
        className="rounded-full border border-border bg-card/60 px-4 py-1.5 text-xs font-medium backdrop-blur transition hover:border-primary hover:text-primary disabled:opacity-50"
      >
        {busy ? "Connecting…" : "Sign in with Google"}
      </button>
    );
  }

  const avatar = user.user_metadata?.['avatar_url'] as string | undefined;
  const name = (user.user_metadata?.['full_name'] as string | undefined) ?? user.email;
  return (
    <div className="flex items-center gap-2 rounded-full border border-border bg-card/60 py-1 pl-1 pr-3 backdrop-blur">
      {avatar ? (
        <img src={avatar} alt="" className="size-6 rounded-full" referrerPolicy="no-referrer" />
      ) : (
        <span className="grid size-6 place-items-center rounded-full bg-primary text-[10px] text-primary-foreground">
          {name?.[0]?.toUpperCase()}
        </span>
      )}
      <span className="hidden max-w-[140px] truncate text-xs sm:inline">{name}</span>
      <span className="size-1.5 rounded-full bg-primary" title="Synced" />
      <button onClick={() => supabase.auth.signOut()} aria-label="Sign out" className="text-muted-foreground transition hover:text-foreground">
        <LogOut className="size-3.5" />
      </button>
    </div>
  );
}
