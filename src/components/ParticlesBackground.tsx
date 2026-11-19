"use client";

import type { Container, Engine, ISourceOptions } from "@tsparticles/engine";
import Particles, { ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

interface ParticlesBackgroundProps {
  id: string;
  density?: number;
}

async function initializeParticles(engine: Engine) {
  try {
    await loadSlim(engine);
  } catch (error) {
    console.error("Particles background could not be initialized.", error);
    throw error;
  }
}

export default function ParticlesBackground({ id, density = 1 }: ParticlesBackgroundProps) {
  const [particleCount, setParticleCount] = useState(70);
  const [reducedMotion, setReducedMotion] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<Container | null>(null);
  const isInViewRef = useRef(false);

  useEffect(() => {
    const updateParticleCount = () => {
      setParticleCount(window.innerWidth < 768 ? 30 : 70);
    };

    updateParticleCount();
    window.addEventListener("resize", updateParticleCount, { passive: true });
    return () => window.removeEventListener("resize", updateParticleCount);
  }, []);

  useEffect(() => {
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setReducedMotion(motionPreference.matches);

    updateMotionPreference();
    motionPreference.addEventListener("change", updateMotionPreference);
    return () => motionPreference.removeEventListener("change", updateMotionPreference);
  }, []);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return undefined;

    if (!("IntersectionObserver" in window)) {
      isInViewRef.current = true;
      return undefined;
    }

    const observer = new IntersectionObserver(([entry]) => {
      isInViewRef.current = entry.isIntersecting;
      if (entry.isIntersecting) containerRef.current?.play();
      else containerRef.current?.pause();
    });

    observer.observe(wrapper);
    return () => observer.disconnect();
  }, []);

  const options = useMemo<ISourceOptions>(() => ({
    fullScreen: { enable: false },
    fpsLimit: 60,
    detectRetina: true,
    particles: {
      number: { value: Math.round(particleCount * density) },
      color: {
        value: [
          "#38BDF8",
          "#38BDF8",
          "#38BDF8",
          "#38BDF8",
          "#E0F2FE",
          "#E0F2FE",
          "#F4C430",
          "#FEF08A",
        ],
      },
      links: {
        enable: true,
        color: "#38BDF8",
        opacity: 0.16,
        distance: 140,
        width: 1,
      },
      opacity: {
        value: { min: 0.4, max: 0.9 },
        animation: {
          enable: !reducedMotion,
          speed: 0.12,
          sync: false,
          mode: "auto",
          startValue: "random",
        },
      },
      size: { value: { min: 1.5, max: 3.5 } },
      shape: { type: "circle" },
      move: {
        enable: !reducedMotion,
        speed: 0.8,
        direction: "none",
        outModes: { default: "out" },
      },
    },
    interactivity: {
      events: {
        onHover: { enable: false },
        onClick: { enable: false },
      },
    },
  }), [density, particleCount, reducedMotion]);

  const particlesLoaded = useCallback((container?: Container) => {
    if (!container) return;

    containerRef.current = container;
    container.canvas.domElement?.classList.add("particles-js-canvas-el");
    if (!isInViewRef.current) container.pause();
  }, []);

  return (
    <div ref={wrapperRef} className="particles-background" aria-hidden="true">
      <ParticlesProvider init={initializeParticles}>
        <Particles
          id={id}
          className="particles-background__renderer"
          options={options}
          particlesLoaded={particlesLoaded}
        />
      </ParticlesProvider>
    </div>
  );
}
