import { supabase } from "@/integrations/supabase/client";
import { getState, mergeStates, registerSync, resetState, setState, type AppState } from "@/lib/store";

let userId: string | null = null;
let timer: ReturnType<typeof setTimeout> | undefined;

async function push() {
  if (!userId) return;
  await supabase
    .from("user_state")
    .upsert({ user_id: userId, data: getState() as never, updated_at: new Date().toISOString() });
}

async function pullAndMerge(id: string) {
  const { data } = await supabase.from("user_state").select("data").eq("user_id", id).maybeSingle();
  const merged = mergeStates(getState(), (data?.data ?? {}) as Partial<AppState>);
  setState(() => merged, { sync: false });
  await push();
}

/** Call once from the root layout on the client. Returns an unsubscribe. */
export function startCloudSync() {
  registerSync(() => {
    if (!userId) return;
    clearTimeout(timer);
    timer = setTimeout(push, 800);
  });
  const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
    const id = session?.user.id ?? null;
    if (event === "SIGNED_OUT") {
      userId = null;
      resetState();
      return;
    }
    if (id && id !== userId) {
      userId = id;
      setTimeout(() => void pullAndMerge(id), 0);
    }
  });
  return () => {
    sub.subscription.unsubscribe();
    registerSync(null);
  };
}
