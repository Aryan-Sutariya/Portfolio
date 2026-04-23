import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {
  RiMenu3Line, RiCloseLine,
  RiHome4Fill, RiBrain2Fill, RiFileList3Fill, RiMailFill,
  RiSunLine, RiMoonLine,
} from "@remixicon/react";

const NAV_ITEMS = [
  { label: "Home", icon: RiHome4Fill, index: 0 },
  { label: "Skills", icon: RiBrain2Fill, index: 1 },
  { label: "Projects", icon: RiFileList3Fill, index: 2 },
  { label: "Contact", icon: RiMailFill, index: 3 },
];

/* ── Optimized Nav Button with Timeline (Issue #5 Fix) ── */
const NavBtn = ({ label, isActive, onClick }) => {
  const container = useRef();
  const tl = useRef();

  useGSAP(() => {
    // Create the timeline
    tl.current = gsap.timeline({ paused: true })
      // Top row slides up and out
      .to(".nav-char.top", {
        yPercent: -100,
        stagger: 0.03,
        duration: 0.3,
        ease: "power2.inOut"
      })
      // Bottom row starts at -30 and slides up to -100 (visible)
      .fromTo(".nav-char.bot",
        { yPercent: 50 }, // Starting state
        {
          yPercent: -100,   // Ending state (fully visible)
          stagger: 0.03,
          duration: 0.3,
          ease: "power2.inOut"
        },
        0 // "0" ensures it starts at the exact same time as the top row
      );
  }, { scope: container });

  const chars = label.split("");

  return (
    <button
      ref={container}
      onClick={onClick}
      onMouseEnter={() => tl.current.play()}
      onMouseLeave={() => tl.current.reverse()}
      className={`nav-btn group ${isActive ? "active" : ""}`}
      style={{
        position: "relative",
        overflow: "hidden",
        height: "24px", // Height must be fixed for the flip effect
        display: "flex",
        flexDirection: "column"
      }}
    >
      {/* Container for both rows */}
      <div style={{ position: "relative" }}>
        {/* Row A — Original */}
        <div className="flex">
          {chars.map((c, i) => (
            <span key={i} className="nav-char top" style={{ display: "inline-block", whiteSpace: "pre" }}>{c}</span>
          ))}
        </div>
        {/* Row B — Hover State (positioned absolutely below Row A) */}
        <div className="flex" style={{ position: "absolute", top: "100%", left: 0, color: "var(--accent)" }}>
          {chars.map((c, i) => (
            <span key={i} className="nav-char bot" style={{ display: "inline-block", whiteSpace: "pre" }}>{c}</span>
          ))}
        </div>
      </div>
    </button>
  );
};

/* ── Mobile Nav Button ── */
const MobileNavBtn = ({ label, icon: Icon, isActive, onClick }) => {
  const container = useRef();
  const tl = useRef();

  useGSAP(() => {
    tl.current = gsap.timeline({ paused: true })
      .to(".nav-char.top", { yPercent: -100, stagger: 0.02, duration: 0.25, ease: "power2.inOut" })
      .to(".nav-char.bot", { yPercent: -100, stagger: 0.02, duration: 0.25, ease: "power2.inOut" }, 0);
  }, { scope: container });

  const chars = label.split("");

  return (
    <button
      ref={container}
      onClick={onClick}
      onMouseEnter={() => tl.current.play()}
      onMouseLeave={() => tl.current.reverse()}
      className="flex items-center gap-4 w-full"
      style={{ background: "none", border: "none" }}
    >
      <div style={{
        width: 40, height: 40, borderRadius: 12,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: isActive ? "var(--accent-dim)" : "var(--accent-glow)",
        border: "1px solid var(--accent-dim)", flexShrink: 0,
      }}>
        <Icon style={{ color: "var(--accent)", width: 18, height: 18 }} />
      </div>
      <div style={{ position: "relative", overflow: "hidden", height: "1.4em" }}>
        <div className="flex">
          {chars.map((c, i) => (
            <span key={i} className="nav-char top" style={{ display: "inline-block", whiteSpace: "pre", color: isActive ? "var(--accent)" : "var(--text)" }}>{c}</span>
          ))}
        </div>
        <div className="flex" style={{ position: "absolute", top: "100%", left: 0 }}>
          {chars.map((c, i) => (
            <span key={i} className="nav-char bot" style={{ display: "inline-block", whiteSpace: "pre", color: "var(--accent)" }}>{c}</span>
          ))}
        </div>
      </div>
    </button>
  );
};

/* ── Navbar ── */
const Navbar = ({ currentIndex, onNavigate, theme, toggleTheme }) => {
  const container = useRef();
  const menuRef = useRef();
  const tlMenu = useRef();
  const [open, setOpen] = useState(false);

  const { contextSafe } = useGSAP(() => {
    // Initial entrance
    gsap.from(".logo-nav", { y: -30, opacity: 0, duration: 0.7, ease: "back.out(1.7)", delay: 0.2 });
    gsap.from(".nav-btn", { y: -24, opacity: 0, stagger: 0.08, duration: 0.55, delay: 0.35 });
    gsap.from(".nav-right-item", { y: -24, opacity: 0, stagger: 0.08, duration: 0.55, delay: 0.55 });

    // Drawer Timeline
    tlMenu.current = gsap.timeline({ paused: true })
      .set(menuRef.current, { display: "flex" })
      .to(menuRef.current, { x: 0, duration: 0.5, ease: "power3.inOut" })
      .from(".mob-link", { x: 30, opacity: 0, stagger: 0.15, duration: 0.3 }, "-=0.2");
  }, { scope: container });

  const toggleMenu = contextSafe((state) => {
    setOpen(state);
    state ? tlMenu.current.play() : tlMenu.current.reverse();
  });

  return (
    <nav
      ref={container}
      className="nav-glass"
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        height: "var(--nav-h)", display: "flex", alignItems: "center",
        justifyContent: "space-between", padding: "0 24px",
      }}
    >
      {/* Logo */}
      <div className="logo-nav" style={{ fontFamily: "'Audiowide'", fontSize: "clamp(1.1rem,2.5vw,1.5rem)", letterSpacing: "0.3em", color: "var(--accent)", textTransform: "uppercase" }}>
        <b><i>𝔸𝕊</i></b>
        {/* <span style={{ fontFamily: "'Handlee',cursive", fontSize: "10px", color: "var(--text-muted)", marginLeft: "6px" }}>.dev</span> */}
      </div>

      {/* ── Laptop/Tablet Links: Hidden on Mobile (md:flex) ── */}
      <div className="hidden md:flex items-center gap-8 font-['Audiowide'] ">
        {NAV_ITEMS.map(({ label, index }) => (
          <NavBtn 
            key={label} 
            label={label} 
            isActive={currentIndex === index} 
            onClick={() => {
              // FIX: Only trigger navigation if the link isn't already active
              if (currentIndex !== index) {
                onNavigate(index);
              }
            }} 
          />
        ))}
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3">
        {/* Theme toggle - Always visible */}
        {/* <button
          className="nav-right-item"
          onClick={toggleTheme}
          style={{
            width: 38, height: 38, borderRadius: 10,
            display: "flex", alignItems: "center", justifyContent: "center",
            // background: "var(--accent-glow)", border: "1px solid var(--accent-dim)",
          }}
        >
          {theme === "dark" ? <RiSunLine style={{ color: "var(--accent)" }} /> : <RiMoonLine style={{ color: "var(--accent)" }} />}
        </button> */}

        {/* Hamburger: Hidden on desktop (md), Flex on mobile */}
        <button
          className="nav-right-item md:hidden flex" // Added md:hidden and flex
          onClick={() => toggleMenu(true)}
          style={{
            width: 38, height: 38, borderRadius: 10,
            alignItems: "center", justifyContent: "center",
            // background: "var(--accent-glow)", border: "1px solid var(--accent-dim)",
            // Removed display: "flex" from here so Tailwind classes can control it
          }}
        >
          <RiMenu3Line style={{ color: "var(--accent)" }} />
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        className="mobile-menu"
        ref={menuRef}
        style={{
          position: "fixed", top: 0, right: 0, transform: "translateX(100%)",
          width: "300px", height: "100vh", zIndex: 100,
          background: "var(--bg-card)", display: "none", flexDirection: "column",
          padding: "80px 32px", gap: "24px", borderLeft: "1px solid var(--border)"
        }}
      >
        <button onClick={() => toggleMenu(false)} style={{ position: "absolute", top: 20, right: 20 }}>
          <RiCloseLine style={{ color: "var(--accent)" }} />
        </button>
        {NAV_ITEMS.map((item) => (
          <div key={item.label} className="mob-link">
            <MobileNavBtn 
              {...item} 
              isActive={currentIndex === item.index} 
              onClick={() => { 
                // FIX: Only trigger navigation if the link isn't already active
                if (currentIndex !== item.index) {
                  onNavigate(item.index); 
                }
                toggleMenu(false); // We still want the drawer to close regardless
              }} 
            />
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;