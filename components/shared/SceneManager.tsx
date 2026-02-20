"use client";

import { createContext, useContext, useEffect, useRef, useState, useCallback } from "react";

interface SceneContextType {
  activeScene: number;
  totalScenes: number;
  scrollToScene: (index: number) => void;
  progress: number;
}

const SceneContext = createContext<SceneContextType>({
  activeScene: 0,
  totalScenes: 0,
  scrollToScene: () => {},
  progress: 0,
});

export function useScene() {
  return useContext(SceneContext);
}

interface SceneManagerProps {
  children: React.ReactNode;
  sceneNames?: string[];
}

export function SceneManager({ children, sceneNames = [] }: SceneManagerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeScene, setActiveScene] = useState(0);
  const [progress, setProgress] = useState(0);
  const totalScenes = sceneNames.length;

  const scrollToScene = useCallback((index: number) => {
    const container = containerRef.current;
    if (!container) return;
    const scenes = container.querySelectorAll<HTMLElement>("[data-scene]");
    if (scenes[index]) {
      scenes[index].scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scenes = container.querySelectorAll<HTMLElement>("[data-scene]");
    if (scenes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-scene"));
            if (!isNaN(index)) {
              setActiveScene(index);
            }
          }
        });
      },
      {
        root: null,
        threshold: 0.5,
      }
    );

    scenes.forEach((scene) => observer.observe(scene));

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        setProgress(Math.min(1, scrollTop / scrollHeight));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <SceneContext.Provider value={{ activeScene, totalScenes, scrollToScene, progress }}>
      {/* Progress bar — 2px coral line at top */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-transparent">
        <div
          className="h-full bg-[#E8694A] transition-all duration-300 ease-out"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
      <div ref={containerRef}>
        {children}
      </div>
    </SceneContext.Provider>
  );
}

interface SceneProps {
  index: number;
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function Scene({ index, children, className = "", id }: SceneProps) {
  return (
    <section
      data-scene={index}
      id={id}
      className={`min-h-screen ${className}`}
    >
      {children}
    </section>
  );
}
