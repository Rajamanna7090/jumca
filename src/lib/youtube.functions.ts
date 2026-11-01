import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export type YTResult = { id: string; title: string; channel: string; duration: string; thumb: string };

export const searchYouTube = createServerFn({ method: "GET" })
  .inputValidator((d: unknown) => z.object({ q: z.string().min(1).max(200) }).parse(d))
  .handler(async ({ data }): Promise<YTResult[]> => {
    const res = await fetch(
      `https://www.youtube.com/results?search_query=${encodeURIComponent(data.q)}&hl=en`,
      { headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36", "Accept-Language": "en-US,en;q=0.9" } },
    );
    if (!res.ok) return [];
    const html = await res.text();
    const m = html.match(/var ytInitialData = (\{.*?\});<\/script>/s);
    if (!m) return [];
    let json: any;
    try { json = JSON.parse(m[1] ?? ""); } catch { return []; }
    const out: YTResult[] = [];
    const walk = (n: any) => {
      if (!n || typeof n !== "object" || out.length >= 20) return;
      if (n.videoRenderer?.videoId) {
        const v = n.videoRenderer;
        out.push({
          id: v.videoId,
          title: v.title?.runs?.map((r: any) => r.text).join("") ?? "",
          channel: v.ownerText?.runs?.[0]?.text ?? "",
          duration: v.lengthText?.simpleText ?? "",
          thumb: `https://i.ytimg.com/vi/${v.videoId}/mqdefault.jpg`,
        });
        return;
      }
      for (const k in n) walk(n[k]);
    };
    walk(json);
    return out;
  });
