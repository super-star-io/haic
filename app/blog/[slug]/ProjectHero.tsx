"use client";

import { useEffect, useRef } from "react";
import ResponsiveImage from "../../ResponsiveImage";

export default function ProjectHero({ imageUrl, title }: { imageUrl: string; title: string }) {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const updateScroll = () => {
      frame = 0;
      const bounds = hero.getBoundingClientRect();
      if (bounds.bottom < 0 || bounds.top > window.innerHeight) return;
      const progress = Math.max(-1, Math.min(1, (window.innerHeight / 2 - (bounds.top + bounds.height / 2)) / window.innerHeight));
      hero.style.setProperty("--hero-scroll", progress.toFixed(3));
    };
    const requestScrollUpdate = () => {
      if (!frame) frame = requestAnimationFrame(updateScroll);
    };
    const updatePointer = (event: PointerEvent) => {
      const bounds = hero.getBoundingClientRect();
      const x = Math.max(-1, Math.min(1, ((event.clientX - bounds.left) / bounds.width - 0.5) * 2));
      const y = Math.max(-1, Math.min(1, ((event.clientY - bounds.top) / bounds.height - 0.5) * 2));
      hero.style.setProperty("--hero-x", x.toFixed(3));
      hero.style.setProperty("--hero-y", y.toFixed(3));
    };
    const resetPointer = () => {
      hero.style.setProperty("--hero-x", "0");
      hero.style.setProperty("--hero-y", "0");
    };

    updateScroll();
    window.addEventListener("scroll", requestScrollUpdate, { passive: true });
    window.addEventListener("resize", requestScrollUpdate, { passive: true });
    hero.addEventListener("pointermove", updatePointer, { passive: true });
    hero.addEventListener("pointerleave", resetPointer);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestScrollUpdate);
      window.removeEventListener("resize", requestScrollUpdate);
      hero.removeEventListener("pointermove", updatePointer);
      hero.removeEventListener("pointerleave", resetPointer);
    };
  }, []);

  return <figure className="article-hero depth-lens-hero" ref={heroRef}><ResponsiveImage src={imageUrl} alt={`Portada del proyecto ${title}`} loading="eager" sizes="100vw"/><span className="depth-lens" aria-hidden="true"/></figure>;
}
