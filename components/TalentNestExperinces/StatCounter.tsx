import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 1500, label: "Clients" },
  { value: 3350, label: "Talents" },
  { value: 2000, label: "Matches" },
];

export default function StatCounter() {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [counts, setCounts] = useState(stats.map(() => 0));

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000; // in ms
    const frameDuration = 1000 / 60;
    const totalFrames = Math.round(duration / frameDuration);

    const counters = stats.map((stat) => {
      const easeOutQuad = (t: number) => t * (2 - t);
      let frame = 0;
      return new Promise<number>((resolve) => {
        const counter = setInterval(() => {
          frame++;
          const progress = easeOutQuad(frame / totalFrames);
          const current = Math.round(stat.value * progress);

          setCounts((prev) => {
            const updated = [...prev];
            updated[stats.indexOf(stat)] = current;
            return updated;
          });

          if (frame === totalFrames) {
            clearInterval(counter);
            resolve(stat.value);
          }
        }, frameDuration);
      });
    });

    Promise.all(counters);
  }, [isVisible]);

  return (
    <div
      ref={containerRef}
      className="flex flex-col sm:flex-row justify-center items-center gap-10 py-10  font-bold text-5xl text-transparent bg-clip-text"
      style={{
        WebkitTextStroke: "2px #010D3E",
        textShadow: "2px 4px 6px rgba(0, 0, 0, 0.4)",
      }}
    >
      {stats.map((stat, index) => (
        <div key={index} className="text-center">
          {counts[index]}+<div>{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
