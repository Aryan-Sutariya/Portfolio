import React, { useRef, useEffect, useState, useCallback } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { RiGithubFill, RiExternalLinkFill } from "@remixicon/react";

gsap.registerPlugin(SplitText);

/* ── 10 Projects ── */
const PROJECTS = [
  {
    id: "01", title: "Niramay Ayurvedic Clinic", subtitle: "Appointment Booking System",
    tags: ["React", "Node.js", "Neon DB", "Vercel"],
    desc: "Developed a full-stack appointment booking system for an Ayurvedic clinic, featuring real-time slot availability, WhatsApp-based booking confirmation, and an admin dashboard for appointment management.",
    img: "./niramay.png",
    github: "https://github.com/stationofdeveloper/Niramay",
    live: "https://niramay-clinic.vercel.app/",
  },
  {
    id: "02", title: "E-commerce App", subtitle: "Full-stack Storefront",
    tags: ["React", "Vite", "localStorage"],
    desc: "Modern React e-commerce front-end with authentication, admin panel, product browsing, and cart — built for a fashion retail experience.",
    img: "./ecommerce.png",
    github: "https://github.com/Aryan-Sutariya/Clone-Projects-for-Practice/tree/mono-clone",
    live: "https://monobyaryan.netlify.app/",
  },
  {
    id: "03", title: "Movie App", subtitle: "Discovery Platform",
    tags: ["React", "React Router", "TMDB API"],
    desc: "Responsive movie & TV show discovery app with trending content, dynamic detail pages, and trailer support powered by TMDB API.",
    img: "./movieapp.png",
    github: "https://github.com/Aryan-Sutariya/Movie-app",
    live: "https://movieappbyaryan.netlify.app/",
  },
  {
    id: "04", title: "Refokus Clone", subtitle: "Creative Agency Landing",
    tags: ["React", "Framer Motion", "Locomotive Scroll"],
    desc: "Animated creative agency landing page with motion-rich micro-interactions, smooth scroll effects, and bold visual hierarchy.",
    img: "./refokus.png",
    github: "https://github.com/Aryan-Sutariya/Clone-Projects-for-Practice/tree/refokus-clone",
    live: "https://refokusworkbyaryan.netlify.app/",
  },
  {
    id: "05", title: "InterVue AI", subtitle: "AI Interview Prep",
    tags: ["Next.js", "Vapi API", "Vercel"],
    desc: "AI-powered interview & viva preparation platform that simulates technical and HR interviews, evaluates answers, and provides instant feedback.",
    img: "./intervuee.png",
    github: "https://github.com/Aryan-Sutariya",
    live: "https://intervuee.vercel.app/",
  },
  {
    id: "06", title: "Ayubot", subtitle: "Medicine search Engine",
    tags: ["Java Script", "Netlify"],
    desc: "Clean weather dashboard with real-time data, 7-day forecast, location detection, and animated weather icons.",
    img: "./aayubot.png",
    github: "https://github.com/Aryan-Sutariya",
    live: "https://aayubotbyaryan.netlify.app/",
  },
];

/* ── FlipLink ── */
const FlipLink = ({ label, href, icon: Icon }) => {
  const ref = useRef();
  const tlRef = useRef();
  const chars = label.split("");

  useEffect(() => {
    if (!ref.current) return;
    const tops = ref.current.querySelectorAll(".fl-top");
    const bots = ref.current.querySelectorAll(".fl-bot");

    tlRef.current = gsap.timeline({ paused: true })
      .to(tops, { yPercent: -100, stagger: 0.03, duration: 0.3, ease: "power2.inOut" })
      .fromTo(bots, { yPercent: 100 }, { yPercent: -90, stagger: 0.03, duration: 0.3, ease: "power2.inOut" }, 0);

    return () => { tlRef.current?.kill(); };
  }, []);

  return (
    <a
      ref={ref} href={href} target="_blank" rel="noopener noreferrer"
      onMouseEnter={() => tlRef.current?.play()}
      onMouseLeave={() => tlRef.current?.reverse()}
      onClick={(e) => e.stopPropagation()}
      style={{
        display: "inline-flex", alignItems: "center", gap: 5, textDecoration: "none",
        padding: "6px 13px", borderRadius: 8, background: "rgba(255,255,255,0.07)",
        border: "1px solid rgba(255,255,255,0.15)", backdropFilter: "blur(6px)",
        transition: "background 0.2s, border-color 0.2s",
      }}
    >
      <span style={{ position: "relative", overflow: "hidden", height: "1.2em", display: "flex", alignItems: "center" }}>
        <span style={{ display: "flex" }}>
          {chars.map((c, i) => <span key={i} className="fl-top" style={{ display: "inline-block", whiteSpace: "pre", fontFamily: "'Inter', sans-serif", fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--accent)" }}>{c}</span>)}
        </span>
        <span style={{ position: "absolute", top: 0, left: 0, display: "flex" }}>
          {chars.map((c, i) => <span key={i} className="fl-bot" style={{ display: "inline-block", whiteSpace: "pre", transform: "translateY(100%)", fontFamily: "'Inter', sans-serif", fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--accent)" }}>{c}</span>)}
        </span>
      </span>
      <Icon style={{ width: 11, height: 11, color: "var(--accent)", flexShrink: 0 }} />
    </a>
  );
};

/* ── Arrow Button ── */
const ArrowBtn = ({ dir, onClick, disabled }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick} disabled={disabled}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        width: 44, height: 44, borderRadius: "50%",
        border: `1.5px solid ${hovered && !disabled ? "var(--accent)" : "rgba(255,255,255,0.2)"}`,
        background: hovered && !disabled ? "var(--accent-glow)" : "rgba(255,255,255,0.04)",
        color: disabled ? "rgba(255,255,255,0.2)" : hovered ? "var(--accent)" : "rgba(255,255,255,0.65)",
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: disabled ? "not-allowed" : "pointer", transition: "all 0.25s ease",
        backdropFilter: "blur(8px)", outline: "none", flexShrink: 0,
      }}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        {dir === "left"
          ? <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          : <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        }
      </svg>
    </button>
  );
};

/* ── Single Project Card ── */
const ProjectCard = ({ project, offset, isCenter, onCardClick }) => {
  const absOffset = Math.abs(offset);
  const CARD_STEP = 102; 
  const translateX = offset * CARD_STEP;
  const rotateY = offset * -18;
  const scale = isCenter ? 1 : 1 - absOffset * 0.15;
  const translateZ = isCenter ? 0 : -absOffset * 0;
  const opacity = absOffset > 3 ? 0 : absOffset > 2 ? 0.4 : 1;
  const zIndex = isCenter ? 20 : 10 - absOffset;

  return (
    <div
      onClick={() => !isCenter && absOffset <= 2 && onCardClick(offset)}
      style={{
        position: "absolute", left: "50%", top: "50%",
        width: "var(--card-w, min(300px,76vw))", height: "var(--card-h, min(430px,68vh))",
        transform: `translate(-50%, -50%) translateX(${translateX}%) perspective(1100px) rotateY(${rotateY}deg) scale(${scale}) translateZ(${translateZ}px)`,
        opacity, zIndex,
        transition: "transform 0.55s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.55s ease",
        pointerEvents: opacity > 0 ? "all" : "none",
        cursor: isCenter ? "default" : absOffset <= 2 ? "pointer" : "default",
        borderRadius: 10, boxSizing: "border-box",
      }}
    >
      {isCenter && (
        <>
          <div style={{
            position: "absolute", inset: -2, borderRadius: 18, zIndex: 30, pointerEvents: "none",
            background: "conic-gradient(from var(--spin-angle,0deg), transparent 0%, var(--accent) 18%, transparent 36%)",
            animation: "spinBorder 2.8s linear infinite", WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor", maskComposite: "exclude", padding: 2,
          }} />
          <div style={{ position: "absolute", inset: 0, borderRadius: 16, boxShadow: "0 0 32px 4px var(--accent-glow), 0 0 70px 10px var(--accent-glow)", zIndex: 25, pointerEvents: "none", border: "1.5px solid var(--accent-dim)" }} />
        </>
      )}

      <div className="relative w-full h-1/2" >
        <div className="absolute h-full w-full" style={{ zIndex: 1, background: "linear-gradient(to top, rgba(0, 0, 0, 0.8) 20%, rgba(255, 255, 255, 0) 40%, transparent 100%)" }}></div>
        <img
          src={project.img} alt={project.title}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", borderRadius: 16, transition: "transform 0.55s ease", zIndex: -1 }}
          loading="lazy" onError={(e) => { e.target.src = `https://picsum.photos/seed/${project.id}/800/600`; }}
        />
      </div>

      <div
        className={`project-info ${isCenter ? 'active' : 'inactive'}`}
        style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "60%",
          background: "linear-gradient(to top, rgba(0,0,0,0.97) 0%, rgba(0,0,0,0.72) 45%, transparent 100%)",
          borderRadius: "0 0 16px 16px", display: "flex", flexDirection: "column",
          justifyContent: "flex-end", padding: "20px 18px", gap: 8, zIndex: 5,
        }}
      >
        <span style={{ fontFamily: "Tourney", fontSize: 48, fontWeight: 700, color: "var(--accent)", opacity: 0.3, lineHeight: 1, position: "absolute", top: 0, right: 14, userSelect: "none" }}>{project.id}</span>
        <div>
          <h3 style={{ fontFamily: "'Roboto Slab'", fontSize: "clamp(11px, 1.3vw, 14px)", color: "#fff", letterSpacing: "0.04em", marginBottom: 3 }}>{project.title}</h3>
          <p style={{ fontFamily: "'Handlee'", fontSize: 11, color: "var(--accent)", letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.85 }}>{project.subtitle}</p>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
          {project.tags.map((tag) => <span key={tag} style={{ padding: "2px 9px", borderRadius: 999, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.14)", fontFamily: "'Handlee'", fontSize: 10, color: "rgba(255,255,255,0.65)", letterSpacing: '1px' }}>{tag}</span>)}
        </div>
        <p style={{ fontFamily: "'Roboto Slab'", fontSize: "clamp(13px, 0.95vw, 12px)", color: "rgba(255, 255, 255, 0.8)", lineHeight: 1.6, letterSpacing: '1px' }}>{project.desc}</p>
        <div style={{ display: "flex", gap: 8, fontFamily: "'Eater'" }}>
          <FlipLink label="GitHub" href={project.github} icon={RiGithubFill} />
          <FlipLink label="Live" href={project.live} icon={RiExternalLinkFill} />
        </div>
      </div>
    </div>
  );
};

/* ── Main Projects Section ── */
const Projects = () => {
  const containerRef = useRef();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isActiveSection, setIsActiveSection] = useState(false); // Tracks if user is on this section

  // Swipe Trackers
  const dragStartX = useRef(null);
  const dragStartY = useRef(null);
  const isDraggingRef = useRef(false);

  const navigate = useCallback((dir) => {
    setActiveIndex((prev) => Math.max(0, Math.min(PROJECTS.length - 1, prev + dir)));
  }, []);

  /* ── UPDATED: Manual Gesture Routing ── */
  const handlePointerDown = (e) => {
    dragStartX.current = e.touches ? e.touches[0].clientX : e.clientX;
    dragStartY.current = e.touches ? e.touches[0].clientY : e.clientY;
    isDraggingRef.current = true;
    
    // Disable App.jsx Observer so it doesn't fight us
    if (window.__observerDisable) window.__observerDisable();
  };

  const handlePointerUp = useCallback((e) => {
    // ALWAYS re-enable the App.jsx Observer immediately on release
    if (window.__observerEnable) window.__observerEnable();

    if (!isDraggingRef.current || dragStartX.current === null) return;
    
    const endX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
    const endY = e.changedTouches ? e.changedTouches[0].clientY : e.clientY;
    
    const diffX = dragStartX.current - endX;
    const diffY = dragStartY.current - endY;
    
    const absX = Math.abs(diffX);
    const absY = Math.abs(diffY);
    
    // Determine gesture direction
    if (absX > absY && absX > 40) {
      // It's a horizontal swipe -> spin carousel
      navigate(diffX > 0 ? 1 : -1);
    } else if (absY > absX && absY > 40) {
      // It's a vertical swipe -> change sections
      // diffY > 0 means swiped UP (go down to Contact, which is index 3)
      // diffY < 0 means swiped DOWN (go up to Skills, which is index 1)
      if (diffY > 0) {
        if (window.__gotoSection) window.__gotoSection(3); 
      } else {
        if (window.__gotoSection) window.__gotoSection(1); 
      }
    }
    
    dragStartX.current = null;
    dragStartY.current = null;
    isDraggingRef.current = false;
  }, [navigate]);


  /* Section-enter animation & Active State Tracking */
  useEffect(() => {
    const handler = (e) => {
      if (e.detail.index === 2) {
        setIsActiveSection(true); // Enable Keyboard support
        
        const dir = e.detail.direction;
        const split = SplitText.create(".projects-title", { type: "chars" });
        gsap.from(split.chars, {
          y: dir * 80, opacity: 0, rotation: () => gsap.utils.random(-25, 25), scale: 0.3,
          stagger: { each: 0.05, from: "random" }, duration: 1, ease: "back.out(1.7)", delay: 0.5
        });
        gsap.from(".proj-label", { y: dir * 20, opacity: 0, duration: 1, delay: 1.3, ease: "power3.out" });
        gsap.from(".proj-carousel", { y: dir * 60, opacity: 0, duration: 1, delay: 1, ease: "power3.out" });
        gsap.from(".proj-arrows", { y: dir * 20, opacity: 0, duration: 1, delay: 1, ease: "power3.out" });
      } else {
        setIsActiveSection(false); // Disable Keyboard support if scrolled away
      }
    };
    window.addEventListener("section-enter", handler);
    return () => window.removeEventListener("section-enter", handler);
  }, []);

  /* ── ADDED: Keyboard Arrow Navigation ── */
  useEffect(() => {
    if (!isActiveSection) return;

    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        navigate(-1);
      } else if (e.key === "ArrowRight") {
        navigate(1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isActiveSection, navigate]);

  return (
    <section
      ref={containerRef}
      style={{
        width: "100%", height: "100%", background: "var(--bg)", display: "flex", flexDirection: "column",
        alignItems: "center", position: "relative", overflow: "hidden", boxSizing: "border-box",
      }}
    >
      <style>{`
        @property --spin-angle { syntax: '<angle>'; initial-value: 0deg; inherits: false; }
        @keyframes spinBorder { from { --spin-angle: 0deg; } to { --spin-angle: 360deg; } }
        :root { --card-w: min(300px, 74vw); --card-h: min(430px, 60vh); }
        
        @media (max-width: 600px) {
          :root { --card-w: min(75vw, 82vw); --card-h: min(58vh, 75vh); }
          
          /* Container blurs and fades */
          .project-info.inactive { filter: blur(5px); opacity: 0.4; pointer-events: none; }
          .project-info.active { filter: blur(0px); opacity: 1; pointer-events: all; }
          
          /* Target direct children of inactive card */
          .project-info.inactive > * {
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.3s ease; 
          }
          
          /* Bring children up when active */
          .project-info.active > * {
            opacity: 1;
            transform: translateY(0);
          }
          
          /* CSS Stagger Effect */
          .project-info.active > *:nth-child(1) { transition: transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94) 0.05s, opacity 0.5s ease 0.05s; }
          .project-info.active > *:nth-child(2) { transition: transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94) 0.15s, opacity 0.5s ease 0.15s; }
          .project-info.active > *:nth-child(3) { transition: transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94) 0.25s, opacity 0.5s ease 0.25s; }
          .project-info.active > *:nth-child(4) { transition: transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94) 0.35s, opacity 0.5s ease 0.35s; }
          .project-info.active > *:nth-child(5) { transition: transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94) 0.45s, opacity 0.5s ease 0.45s; }
        }
        
        .project-info { transition: filter 0.5s ease, opacity 0.5s ease; }
        
        @media (min-width: 1024px) { :root { --card-w: 360px; --card-h: 440px; } }
        .proj-carousel:hover .center-card img { transform: scale(1.04); }
        a[data-fliplink]:hover { background: var(--accent-glow) !important; border-color: var(--accent-dim) !important; }
      `}</style>

      <div style={{ position: "absolute", width: 500, height: 500, top: "15%", right: "3%", background: "radial-gradient(circle, var(--accent), transparent 70%)", opacity: 0.05, borderRadius: "50%", pointerEvents: "none" }} />
      <div className="grid-bg" style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />

      <div style={{ width: "100%", zIndex: 10, padding: "calc(var(--nav-h) + 16px) 24px 12px", textAlign: "center", background: "var(--bg)", flexShrink: 0 }}>
        <p className="proj-label" style={{ fontFamily: "'Handlee', cursive", fontSize: 12, letterSpacing: "0.4em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 8 }}>— Selected Work —</p>
        <h2 className="projects-title" style={{ fontFamily: "'Monoton', sans-serif", fontSize: "clamp(1.8rem, 6vw, 5rem)", color: "var(--text)", lineHeight: 1.1 }}>PROJECTS</h2>
      </div>

      <div
        className="proj-carousel"
        onMouseDown={handlePointerDown}
        onMouseUp={handlePointerUp}
        onMouseLeave={handlePointerUp}
        onTouchStart={handlePointerDown}
        onTouchEnd={handlePointerUp}
        style={{
          flex: 1, width: "100%", minHeight: 0, position: "relative",
          zIndex: 10, cursor: "grab", userSelect: "none", 
          touchAction: "none", 
        }}
      >
        {PROJECTS.map((project, i) => {
          const offset = i - activeIndex;
          return (
            <ProjectCard key={project.id} project={project} offset={offset} isCenter={offset === 0} onCardClick={(off) => navigate(off > 0 ? 1 : -1)} />
          );
        })}
      </div>

      <div className="proj-arrows" style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 24px 16px", zIndex: 10, flexShrink: 0 }}>
        <ArrowBtn dir="left" onClick={() => navigate(-1)} disabled={activeIndex === 0} />
        <ArrowBtn dir="right" onClick={() => navigate(1)} disabled={activeIndex === PROJECTS.length - 1} />
      </div>
    </section>
  );
};

export default Projects;