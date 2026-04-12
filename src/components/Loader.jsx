import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/all";

gsap.registerPlugin(SplitText);

const Loader = ({ onComplete }) => {
  const screenRef = useRef(null);
  const barRef    = useRef(null);
  const logoRef   = useRef(null);
  const pctRef    = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Logo entrance
    tl.from(logoRef.current, {
      y: 30, opacity: 0, duration: 0.6, ease: "power3.out",
    });

    // Bar fill
    tl.to(barRef.current, {
      width: "100%",
      duration: 1.8,
      ease: "power2.inOut",
    }, "-=0.2");

    // Percent counter
    const obj = { val: 0 };
    tl.to(obj, {
      val: 100,
      duration: 1.8,
      ease: "power2.inOut",
      onUpdate: () => {
        if (pctRef.current) pctRef.current.textContent = `${Math.round(obj.val)}%`;
      },
    }, "<");

    // Exit
    tl.to(screenRef.current, {
      yPercent: -100,
      duration: 0.8,
      ease: "expo.inOut",
      delay: 0.2,
      onComplete,
    });

    return () => tl.kill();
  }, [onComplete]);

  return (
    <div ref={screenRef} className="loader-screen">
      {/* Logo */}
      <div ref={logoRef} style={{ textAlign: "center" }}>
        <div
          style={{
            fontFamily: "'Tourney', sans-serif",
            fontSize: "clamp(2rem, 6vw, 4rem)",
            letterSpacing: "0.3em",
            color: "var(--accent)",
            textTransform: "uppercase",
          }}
        >
          ARYAN
        </div>
        <div
          style={{
            fontFamily: "'Handlee', cursive",
            fontSize: "11px",
            letterSpacing: "0.4em",
            color: "var(--text-muted)",
            textTransform: "uppercase",
            marginTop: "6px",
          }}
        >
          Portfolio
        </div>
      </div>

      {/* Bar */}
      <div className="loader-bar-wrap">
        <div ref={barRef} className="loader-bar" />
      </div>

      {/* Percent */}
      <div
        ref={pctRef}
        style={{
          fontFamily: "'Lobster'",
          fontSize: "12px",
          letterSpacing: "0.2em",
          color: "var(--text-muted)",
        }}
      >
        0%
      </div>
    </div>
  );
};

export default Loader;
