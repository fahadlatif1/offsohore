import { useEffect, useRef, useState, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  speed?: number; // px shift per 100px of scroll past center
  className?: string;
};

export function Parallax({ children, speed = 12, className = "" }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const center = rect.top + rect.height / 2 - vh / 2;
        setOffset((-center / 100) * speed);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [speed]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <div
        style={{ transform: `translate3d(0, ${offset}px, 0)` }}
        className="will-change-transform"
      >
        {children}
      </div>
    </div>
  );
}
