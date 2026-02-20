"use client";

import { useScene } from "./SceneManager";

const SCENE_NAMES = [
  "Hero",
  "The Method",
  "How It Works",
  "Free Chapters",
  "Philosophy",
  "Pricing",
  "Stay Updated",
];

export function SceneNav() {
  const { activeScene, scrollToScene } = useScene();

  return (
    <nav
      className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-end gap-3"
      aria-label="Page sections"
    >
      {SCENE_NAMES.map((name, i) => (
        <button
          key={i}
          onClick={() => scrollToScene(i)}
          className="group flex items-center gap-3 py-1"
          aria-label={`Jump to ${name}`}
          aria-current={activeScene === i ? "true" : undefined}
        >
          {/* Label — appears on hover */}
          <span
            className={`
              font-[family-name:var(--font-sans)] text-[11px] font-medium tracking-wide
              opacity-0 group-hover:opacity-100 transition-opacity duration-200
              ${activeScene === i ? "text-[#E8694A]" : "text-[#A09890]"}
            `}
          >
            {name}
          </span>

          {/* Dash indicator */}
          <span
            className={`
              block rounded-full transition-all duration-300
              ${activeScene === i
                ? "w-6 h-[3px] bg-[#E8694A]"
                : "w-3 h-[2px] bg-[#A09890]/40 group-hover:bg-[#A09890] group-hover:w-4"
              }
            `}
          />
        </button>
      ))}
    </nav>
  );
}
