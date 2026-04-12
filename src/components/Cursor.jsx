import React, { useRef, useEffect } from "react";
import gsap from "gsap";

const Cursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const fillRef = useRef(null);

  useEffect(() => {
    // 1. Check if we are on a mobile device
    const isMobile = window.innerWidth < 768;
    if (isMobile) return; // Exit early: don't run GSAP or listeners

    const dot = dotRef.current;
    const ring = ringRef.current;
    const fill = fillRef.current;
    if (!dot || !ring || !fill) return;

    const setDot = gsap.quickSetter(dot, "css");
    const setRing = gsap.quickSetter(ring, "css");
    const setFill = gsap.quickSetter(fill, "css");

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx, ry = my;
    let isHovering = false;
    let ringScale = 1;

    // 2. Constants for boundaries
    const RING_NATURAL_R = 19; // 38px / 2
    const DOT_NATURAL_R = 4;   // 8px / 2

    const loop = () => {
      rx += (mx - rx) * 0.15;
      ry += (my - ry) * 0.15;

      const maxDist = (RING_NATURAL_R * ringScale) - DOT_NATURAL_R;
      let constrainedX, constrainedY;

      if (isHovering) {
        constrainedX = rx;
        constrainedY = ry;
      } else {
        const dx = mx - rx;
        const dy = my - ry;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > maxDist) {
          const angle = Math.atan2(dy, dx);
          constrainedX = rx + Math.cos(angle) * maxDist;
          constrainedY = ry + Math.sin(angle) * maxDist;
        } else {
          constrainedX = mx;
          constrainedY = my;
        }
      }

      setDot({ x: constrainedX, y: constrainedY });
      setRing({ x: rx, y: ry });
      setFill({ x: rx, y: ry });

      raf = requestAnimationFrame(loop);
    };

    let raf = requestAnimationFrame(loop);

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
    };

    const onEnter = () => {
      isHovering = true;
      ringScale = 2;
      gsap.to([ring,fill], { scale: ringScale, opacity: 1, duration: 0.3,pointerEvents: "none"  });
      gsap.to(dot, { opacity: 0, duration: 0.2 });
      gsap.to([ring], {opacity:0, pointerEvents: "none" });
    };

    const onLeave = () => {
      isHovering = false;
      ringScale = 1;
      gsap.to(ring, { scale: 1, opacity: 0.5, duration: 0.3 });
      gsap.to(fill, { scale: 0, opacity: 0, duration: 0.3 });
      gsap.to(dot, { opacity: 1, duration: 0.2 });
    };

    window.addEventListener("mousemove", onMove);
    const handleHover = (e) => {
      if (e.target.closest("a, button, [role='button'], input, textarea, select, label")) onEnter();
      else onLeave();
    };
    document.addEventListener("mouseover", handleHover);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", handleHover);
    };
  }, []);

  return (
    <>
      <div ref={fillRef} className="cursor-fill" />
      <div ref={ringRef} className="cursor-ring" />
      <div ref={dotRef} className="cursor-dot" />
    </>
  );
};

export default Cursor;