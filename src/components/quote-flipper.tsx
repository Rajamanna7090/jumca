import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const QUOTES: [string, string][] = [
  ["Master every unit.", "Ship your degree."],
  ["Talk is cheap.", "Show me the code."],
  ["First, solve the problem.", "Then, write the code."],
  ["Simplicity is", "prerequisite for reliability."],
  ["Invent the future,", "don't predict it."],
  ["Stay with problems", "a little longer."],
  ["One day, or day one.", "You decide."],
  ["Small daily wins.", "Stunning results."],
  ["Every expert was once", "a beginner who never quit."],
  ["Placements are earned", "in the quiet hours."],
];

const AUTHORS = ["JUMCA", "Linus Torvalds", "John Johnson", "Edsger W. Dijkstra", "Alan Kay", "Albert Einstein", "Paulo Coelho", "Robin Sharma", "Anonymous", "JUMCA"];

export function QuoteFlipper({ interval = 6000 }: { interval?: number }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % QUOTES.length), interval);
    return () => clearInterval(t);
  }, [interval]);
  const [a, b] = QUOTES[i]!;

  return (
    <div className="relative min-h-[2.3em] [perspective:1400px]">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={i}
          initial={{ rotateX: -90, opacity: 0, y: 20 }}
          animate={{ rotateX: 0, opacity: 1, y: 0 }}
          exit={{ rotateX: 90, opacity: 0, y: -20 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: "50% 50% -40px", backfaceVisibility: "hidden" }}
        >
          <span className="block">{a}</span>
          <span className="block text-muted-foreground">{b}</span>
          <span className="mt-4 block font-mono text-xs font-normal uppercase tracking-[0.3em] text-primary">— {AUTHORS[i]}</span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
