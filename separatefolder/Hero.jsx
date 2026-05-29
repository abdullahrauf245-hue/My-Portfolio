import { useEffect, useRef, useState } from "react";

const stats = [
  { label: "Projects", value: 5 },
  { label: "Experience", value: 6 },
  { label: "Clients", value: 20 },
];

const SocialIcon = ({ href, label, children }) => (
  <a
    href={href}
    aria-label={label}
    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white transition hover:border-white/40"
  >
    {children}
  </a>
);

export default function Hero() {
  const [counts, setCounts] = useState(stats.map(() => 0));
  const statsRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const target = statsRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry.isIntersecting || hasAnimated.current) return;
        hasAnimated.current = true;

        const duration = 1200;
        const start = performance.now();

        const tick = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          setCounts(stats.map((stat) => Math.floor(stat.value * progress)));
          if (progress < 1) requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="mx-auto grid min-h-screen w-[min(1100px,92vw)] items-center gap-12 py-16 md:grid-cols-[1.1fr_1fr]">
        <div className="order-2 md:order-1">
          <div className="h-[40vh] w-full overflow-hidden rounded-2xl bg-white/5">
            <img
              src="/profile.jpg"
              alt="Muhammad Abdullah"
              className="h-full w-full object-cover grayscale"
            />
          </div>
        </div>

        <div className="order-1 md:order-2">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-white/60">
            Data Science Student
          </p>
          <h1 className="text-4xl font-semibold uppercase tracking-tight md:text-6xl lg:text-7xl font-serif">
            Muhammad Abdullah
          </h1>
          <p className="mt-4 text-lg text-white/70">
            Building minimal, high-impact products for campus and community.
          </p>

          <div className="mt-6 flex items-center gap-4">
            <SocialIcon href="https://github.com/abdullahrauf245-hue" label="GitHub">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.5 2.87 8.31 6.84 9.66.5.1.68-.22.68-.49 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.37-3.37-1.37-.46-1.19-1.12-1.5-1.12-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.05 1.53 1.05.9 1.57 2.36 1.11 2.94.85.09-.67.35-1.11.64-1.37-2.22-.26-4.56-1.15-4.56-5.1 0-1.13.39-2.05 1.03-2.77-.1-.26-.45-1.32.1-2.75 0 0 .84-.27 2.75 1.05.8-.23 1.66-.34 2.51-.34.85 0 1.71.11 2.51.34 1.9-1.32 2.75-1.05 2.75-1.05.55 1.43.2 2.49.1 2.75.64.72 1.03 1.64 1.03 2.77 0 3.96-2.35 4.84-4.59 5.1.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.49 3.96-1.35 6.83-5.16 6.83-9.66C22 6.58 17.52 2 12 2z" />
              </svg>
            </SocialIcon>
            <SocialIcon href="https://www.linkedin.com/in/muhammad-abdullahrauf/" label="LinkedIn">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path d="M4.98 3.5c0 1.38-1.11 2.5-2.48 2.5A2.49 2.49 0 0 1 0 3.5C0 2.12 1.11 1 2.5 1c1.37 0 2.48 1.12 2.48 2.5zM.5 23.5h4V7.98h-4V23.5zM8.5 7.98h3.83v2.12h.05c.53-1 1.82-2.12 3.75-2.12 4.01 0 4.75 2.63 4.75 6.04v9.48h-4v-8.4c0-2-.03-4.57-2.79-4.57-2.79 0-3.22 2.18-3.22 4.43v8.54h-4V7.98z" />
              </svg>
            </SocialIcon>
            <SocialIcon href="mailto:abdullahrauf245@gmail.com" label="Email">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
            </SocialIcon>
          </div>

          <div ref={statsRef} className="mt-10 grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
            {stats.map((stat, index) => (
              <div key={stat.label}>
                <p className="text-3xl font-semibold">+{counts[index]}</p>
                <p className="text-xs uppercase tracking-[0.2em] text-white/50">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
