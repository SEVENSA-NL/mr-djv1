'use client';

import { useEffect, useState } from 'react';

type Section = { id: string; label: string };

export default function CitySectionNav({ sections }: { sections: Section[] }) {
  const [activeId, setActiveId] = useState<string | null>(sections[0]?.id ?? null);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sections.forEach((section) => {
      const target = document.getElementById(section.id);
      if (!target) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveId(section.id);
          }
        },
        { rootMargin: '-45% 0px -40% 0px', threshold: [0.1, 0.25] }
      );

      observer.observe(target);
      observers.push(observer);
    });

    return () => observers.forEach((observer) => observer.disconnect());
  }, [sections]);

  if (!sections.length) return null;

  return (
    <nav className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Sections</p>
      <div className="mt-3 space-y-2">
        {sections.map((section) => {
          const isActive = activeId === section.id;
          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm transition ${
                isActive
                  ? 'bg-amber-50 text-amber-900 ring-1 ring-amber-200'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              <span>{section.label}</span>
              <span className={`h-2 w-2 rounded-full transition ${isActive ? 'bg-amber-500' : 'bg-slate-300'}`} />
            </a>
          );
        })}
      </div>
    </nav>
  );
}
