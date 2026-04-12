import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import {
  RiHtml5Fill, RiCss3Fill, RiJavascriptFill, RiNodejsFill, RiReactjsFill,
} from "@remixicon/react";
import { FaPython, FaGitAlt, FaFigma } from "react-icons/fa6";
import { SiTailwindcss, SiVite, SiMysql, SiNextdotjs, SiTypescript } from "react-icons/si";

gsap.registerPlugin(SplitText);

const SKILLS = [
  { name: "React",       Icon: RiReactjsFill,   color: "#61DAFB" },
  { name: "JavaScript",  Icon: RiJavascriptFill, color: "#F7DF1E" },
  { name: "TypeScript",  Icon: SiTypescript,     color: "#3178C6" },
  { name: "Python",      Icon: FaPython,         color: "#3776AB" },
  { name: "HTML5",       Icon: RiHtml5Fill,      color: "#E34F26" },
  { name: "CSS3",        Icon: RiCss3Fill,       color: "#1572B6" },
  { name: "Node.js",     Icon: RiNodejsFill,     color: "#339933" },
  { name: "Tailwind",    Icon: SiTailwindcss,    color: "#06B6D4" },
  { name: "Next.js",     Icon: SiNextdotjs,      color: "#ffffff" },
  { name: "Vite",        Icon: SiVite,           color: "#646CFF" },
  { name: "Git",         Icon: FaGitAlt,         color: "#F05032" },
  { name: "MySQL",       Icon: SiMysql,          color: "#4479A1" },
  { name: "Figma",       Icon: FaFigma,          color: "#F24E1E" },
];

const ROW_A = [...SKILLS, ...SKILLS, ...SKILLS]; // triple for seamless loop
const ROW_B = [...SKILLS.slice(5), ...SKILLS, ...SKILLS.slice(0, 5), ...SKILLS];

const Pill = ({ name, Icon, color }) => (
  <div className="skill-pill">
    <Icon size={28} style={{ color, flexShrink: 0 }} />
    <span style={{
      fontFamily: "'Audiowide',sans-serif",
      fontSize: 11, letterSpacing: "0.12em",
      textTransform: "uppercase",
      color: "var(--text)",
    }}>{name}</span>
  </div>
);

const MarqueeRow = ({ items, direction, onMouseEnter, onMouseLeave }) => (
  <div
    style={{
      width: "100%",
      overflow: "hidden",
      maskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
      WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
    }}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    <div className={`marquee-track ${direction === "left" ? "running-l" : "running-r"}`}
      style={{ display: "flex", alignItems: "center", padding: "6px 0" }}
    >
      {items.map((skill, i) => <Pill key={i} {...skill} />)}
    </div>
  </div>
);

const Skills = () => {
  const containerRef = useRef();
  const row1Ref = useRef();
  const row2Ref = useRef();

  // ── Pause marquee on hover (Issue #11) ──
  const pauseRow = (ref) => () => ref.current?.querySelectorAll(".marquee-track").forEach(el => el.classList.add("paused"));
  const playRow  = (ref) => () => ref.current?.querySelectorAll(".marquee-track").forEach(el => el.classList.remove("paused"));

  // ── Section-enter animation (Issue #6) ──
  useEffect(() => {
    const handler = (e) => {
      if (e.detail.index !== 1) return;
      const dir = e.detail.direction;

      const split = SplitText.create(".skills-title", { type: "chars" });
      gsap.from(split.chars, {
        y: dir * 90, opacity: 0,
        rotation: () => gsap.utils.random(-18, 18),
        scale: 0.3,
        stagger: { each: 0.05, from: "center" },
        duration: 0.85,
        ease: "back.out(1.7)",
      });

      gsap.from(".skills-sub-text", { y: dir * 24, opacity: 0, duration: 0.5, delay: 0.3, ease: "power3.out" });
      gsap.from(".marquee-row-wrap", { y: dir * 40, opacity: 0, stagger: 0.12, duration: 1, delay: 0.6, ease: "power3.out" });
      gsap.from(".prof-bar-item", { y: dir * 30, opacity: 0, stagger: 0.06, duration: 1, delay: 0.9, ease: "power3.out" });
      
      // ── Percentage Counting Animation ──
      gsap.from(".pct-num", {
        textContent: 0,
        duration: 1.5,
        ease: "power2.out",
        snap: { textContent: 1 },
        stagger: 0.25, // Animates them one by one
        delay: 0.9, // Syncs with the prof-bar-item fade in
      });
    };
    window.addEventListener("section-enter", handler);
    return () => window.removeEventListener("section-enter", handler);
  }, []);

  const PROFS = [
    { label: "React / JS",     pct: 88 },
    { label: "Python",         pct: 70 },
    { label: "CSS / Tailwind", pct: 90 },
    { label: "Node.js",        pct: 70 },
    { label: "Java",           pct: 65 },
    { label: "My SQL",         pct: 75 },
  ];

  return (
    <section
      ref={containerRef}
      style={{
        width: "100%", height: "100%",
        background: "var(--bg)",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        position: "relative", overflow: "hidden",
        padding: "var(--nav-h) 0 24px",
        boxSizing: "border-box",
        gap: 0,
      }}
    >
      {/* Bg */}
      <div className="orb" style={{
        width: 450, height: 450, bottom: "-10%", right: "-10%",
        background: "radial-gradient(circle, var(--accent), transparent 70%)",
        opacity: 0.08,
      }} />
      <div className="grid-bg" />

      {/* Title */}
      <div style={{ textAlign: "center", zIndex: 10, padding: "0 20px", marginBottom: 8 }}>
        <p className="skills-sub-text" style={{
          fontFamily: "'Handlee',cursive", fontSize: 12,
          letterSpacing: "0.4em", textTransform: "uppercase",
          color: "var(--accent)", marginBottom: 10,
        }}>— What I work with —</p>
        <h2 className="skills-title" style={{
          fontFamily: "'Monoton',sans-serif",
          fontSize: "clamp(2rem,7vw,6rem)",
          color: "var(--text)",
          lineHeight: 1.1,
          letterSpacing: "0.04em",
        }}>SKILLS</h2>
        <p className="skills-sub-text" style={{
          fontFamily: "'Playfair Display',serif",
          fontSize: "clamp(0.85rem,1.5vw,1rem)",
          color: "var(--text-muted)",
          marginTop: 10, maxWidth: 500, margin: "10px auto 0",
          fontStyle: "italic",
        }}>Technologies I've mastered and tools I wield daily.</p>
      </div>

      {/* Marquees (Issue #11: pause on hover) */}
      <div ref={row1Ref} className="marquee-row-wrap" style={{ width: "100%", zIndex: 10, marginTop: 20 }}>
        <MarqueeRow
          items={ROW_A}
          direction="left"
          onMouseEnter={pauseRow(row1Ref)}
          onMouseLeave={playRow(row1Ref)}
        />
      </div>
      <div ref={row2Ref} className="marquee-row-wrap" style={{ width: "100%", zIndex: 10, marginTop: 12 }}>
        <MarqueeRow
          items={ROW_B}
          direction="right"
          onMouseEnter={pauseRow(row2Ref)}
          onMouseLeave={playRow(row2Ref)}
        />
      </div>

      {/* Proficiency grid */}
      <div style={{
        zIndex: 10, width: "100%", maxWidth: 720,
        padding: "0 24px", marginTop: 20,
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: "14px 24px",
      }}>
        {PROFS.map(({ label, pct }) => (
          <div key={label} className="prof-bar-item">
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
              <span style={{ fontFamily: "'Handlee'", fontSize: 12, color: "var(--text-muted)" }}>{label}</span>
              <span style={{ fontFamily: "'Roboto Slab'",letterSpacing:'1px', fontSize: 15, color: "var(--accent)" }}>
                {/* Separated the number into its own span to target it with GSAP */}
                <span className="pct-num">{pct}</span>%
              </span>
            </div>
            <div style={{ height: 3, borderRadius: 2, background: "var(--border)", overflow: "hidden" }}>
              <div style={{
                height: "100%", width: `${pct}%`, borderRadius: 2,
                background: `linear-gradient(90deg, var(--accent), var(--accent-dim))`,
                boxShadow: "0 0 8px var(--accent-dim)",
              }} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;