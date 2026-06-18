"use client";

import Image from "next/image";
import { useRef, useCallback } from "react";

export default function HeroLogo() {
  const floatRef = useRef<HTMLDivElement>(null);
  const tiltRef  = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!tiltRef.current) return;
    const rect = tiltRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    tiltRef.current.style.transform = `rotateX(${y * -60}deg) rotateY(${x * 60}deg) scale(1.08)`;
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (!tiltRef.current || !floatRef.current) return;
    tiltRef.current.style.transition = "transform 0.08s ease-out, filter 0.3s ease";
    tiltRef.current.style.filter = "drop-shadow(0 30px 55px rgba(74, 144, 196, 0.9)) drop-shadow(0 0 60px rgba(122, 179, 212, 0.55))";
    floatRef.current.style.animationPlayState = "paused";
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!tiltRef.current || !floatRef.current) return;
    tiltRef.current.style.transition = "transform 0.55s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.4s ease";
    tiltRef.current.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
    tiltRef.current.style.filter = "drop-shadow(0 20px 40px rgba(0, 0, 0, 0.6))";
    floatRef.current.style.animationPlayState = "running";
  }, []);

  return (
    <div className="flex items-center justify-center">
      <div ref={floatRef} className="logo-float">
        <div className="logo-perspective">
          <div
            ref={tiltRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="cursor-pointer"
            style={{ transformStyle: "preserve-3d", willChange: "transform", filter: "drop-shadow(0 20px 40px rgba(0, 0, 0, 0.6))" }}
          >
            <div className="flex items-center justify-center" style={{ width: 500, height: 500 }}>
              <Image
                src="/images/home/STITCH_DEPOT_LOGO.png"
                alt="Stitch Depot"
                width={440}
                height={440}
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
