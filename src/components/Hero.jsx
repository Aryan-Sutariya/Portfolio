import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { SplitText, TextPlugin } from "gsap/all";
import { RiDownloadLine, RiArrowRightLine, RiGithubFill, RiLinkedinFill } from "@remixicon/react";

gsap.registerPlugin(SplitText, TextPlugin);

const ROLES = ["Frontend Developer", "Computer Engineer", "UI/UX Enthusiast", "React Specialist", "Problem Solver"];

// All selectors that section-enter animates — kept in one place
const HERO_SELECTORS = [
  ".hero-greeting",
  ".hero-name",
  ".hero-name-glow",
  ".hero-subtitle-row",
  ".hero-bio",
  ".hero-btn",
  ".hero-social",
  ".hero-img-wrap",
  ".scroll-hint",
  ".hero-tag",
  ".cursor-blink",
];

const Hero = ({ onNavigateProjects }) => {
  const containerRef = useRef(null);
  const roleRef      = useRef(null);
  const masterTlRef  = useRef(null);
  const typeTlRef    = useRef(null);

  // ── Hide everything immediately on mount — prevents flash after loader ──
  useEffect(() => {
    gsap.set(HERO_SELECTORS, { autoAlpha: 0 });
  }, []);

  // ── Section-enter ──
  useEffect(() => {
    const handler = (e) => {
      if (e.detail.index !== 0) return;
      const dir = e.detail.direction;

      if (masterTlRef.current) masterTlRef.current.kill();
      const tl = gsap.timeline();
      masterTlRef.current = tl;

      // greeting
      tl.fromTo(".hero-greeting",
        { y: dir * 40, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.55, ease: "power3.out" }
      );

      // tags & cursor blink
      tl.fromTo(".hero-tag, .cursor-blink",
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.3, ease: "power2.out" },
        "-=0.1"
      );

      // name chars
      gsap.set(".hero-name", { autoAlpha: 1 });
      const nameSplit = SplitText.create(".hero-name", { type: "chars" });
      tl.fromTo(nameSplit.chars,
        { y: dir * 100, autoAlpha: 0, rotation: () => gsap.utils.random(-20, 20), scale: 0.4 },
        {
          y: 0, autoAlpha: 1, rotation: 0, scale: 1,
          stagger: { each: 0.045, from: "center" },
          duration: 0.85, ease: "back.out(1.8)",
        },
        "-=0.25"
      );

      // glow
      tl.fromTo(".hero-name-glow",
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.5 },
        "-=0.3"
      );

      // subtitle row (wrapper — makes tag + role ref + blink visible together)
      tl.fromTo(".hero-subtitle-row",
        { y: dir * 25, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.5, ease: "power3.out" },
        "-=0.3"
      );

      // bio words
      gsap.set(".hero-bio", { autoAlpha: 1 });
      const bioSplit = SplitText.create(".hero-bio", { type: "words" });
      tl.fromTo(bioSplit.words,
        { y: dir * 20, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, stagger: 0.025, duration: 0.45, ease: "power2.out" },
        "-=0.3"
      );

      // buttons
      tl.fromTo(".hero-btn",
        { y: dir * 30, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, stagger: 0.12, duration: 0.45, ease: "power3.out" },
        "-=0.3"
      );

      // socials
      tl.fromTo(".hero-social",

        { scale: 0, autoAlpha: 0 },
        { scale: 1, autoAlpha: 1, stagger: 0.07, duration: 0.4, ease: "back.out(2)" },
        "-=0.25"
      );

      // image
      tl.fromTo(".hero-img-wrap",
        { scale: 0.55, autoAlpha: 0 },
        { scale: 1, autoAlpha: 1, duration: 1, ease: "elastic.out(1,0.55)" },
        "-=1"
      );

      // scroll hint
      tl.fromTo(".scroll-hint",
        { autoAlpha: 0, y: -12 },
        { autoAlpha: 1, y: 0, duration: 0.4 },
        "-=0.4"
      );
    };

    window.addEventListener("section-enter", handler);
    return () => window.removeEventListener("section-enter", handler);
  }, []);

  // ── Continuous animations + typewriter (run once) ──
  useEffect(() => {
    gsap.to(".hero-img-float", { y: -16, duration: 3, repeat: -1, yoyo: true, ease: "sine.inOut" });
    gsap.to(".ring-a", { rotation: 360,  duration: 18, ease: "none", repeat: -1 });
    gsap.to(".ring-b", { rotation: -360, duration: 26, ease: "none", repeat: -1 });
    gsap.to(".cursor-blink", { opacity: 0, repeat: -1, yoyo: true, duration: 0.5, ease: "steps(1)" });

    if (!roleRef.current) return;
    if (typeTlRef.current) typeTlRef.current.kill();

    const tl = gsap.timeline({ repeat: -1, delay: 1.5 });
    typeTlRef.current = tl;

    ROLES.forEach((role) => {
      tl.to(roleRef.current, { text: { value: role, delimiter: "" }, duration: role.length * 0.06, ease: "none" })
        .to(roleRef.current, { duration: 1.6 })
        .to(roleRef.current, { text: { value: "", delimiter: "" }, duration: role.length * 0.03, ease: "none" })
        .to(roleRef.current, { duration: 0.3 });
    });

    const moveOrb = (e) => {
      const x = (e.clientX / window.innerWidth  - 0.5) * 28;
      const y = (e.clientY / window.innerHeight - 0.5) * 28;
      gsap.to(".hero-orb", { x, y, duration: 1.6, ease: "power1.out" });
    };
    window.addEventListener("mousemove", moveOrb);
    return () => {
      window.removeEventListener("mousemove", moveOrb);
      typeTlRef.current?.kill();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      style={{
        width: "100%", height: "100%",
        background: "var(--bg)",
        display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative", overflow: "hidden",
      }}
    >
      {/* Bg */}
      <div
        className="hero-orb orb"
        style={{
          width: 500, height: 500,
          top: "15%", left: "10%",
          background: "radial-gradient(circle, var(--accent), transparent 70%)",
          opacity: 0.1,
        }}
      />
      <div className="grid-bg" />

      <div
        style={{
          width: "100%", maxWidth: 1280, margin: "0 auto",
          padding: "var(--nav-h) 40px 40px",
          display: "flex", flexDirection: "row",
          alignItems: "center", justifyContent: "space-between",
          gap: 48, height: "100%", boxSizing: "border-box",
        }}
        className="flex-col-mobile"
      >
        {/* ── LEFT TEXT ── */}
        <div style={{ flex: 1, maxWidth: 600, zIndex: 10, display: "flex", flexDirection: "column", gap: 0 }}>

          <div
            className="hero-greeting"
            style={{
              display: "flex", alignItems: "center", gap: 10,
              fontFamily: "'Handlee',cursive",
              fontSize: 13, letterSpacing: "0.35em", textTransform: "uppercase",
              color: "var(--accent)", marginBottom: 16,
              visibility: "hidden", // pre-hidden (gsap.set will handle via autoAlpha)
            }}
          >
            <span style={{ width: 40, height: 1, background: "var(--accent)", display: "inline-block" }} />
            Hello, I'm
          </div>

          <div style={{ position: "relative", marginBottom: 16 }}>
            <h1
              className="hero-name"
              style={{
                fontFamily: "'Tourney',sans-serif",
                fontSize: "clamp(3.5rem,9vw,8rem)",
                letterSpacing: "-0.02em",
                color: "var(--text)", lineHeight: 1,
                textTransform: "uppercase",
                visibility: "hidden",
              }}
            >
              ARYAN
            </h1>
            <div
              className="hero-name-glow"
              style={{
                position: "absolute", inset: "-20px -30px",
                background: "radial-gradient(ellipse, var(--accent-glow) 0%, transparent 70%)",
                pointerEvents: "none", opacity: 0,
              }}
            />
          </div>

          <div
            className="hero-subtitle-row"
            style={{
              display: "flex", alignItems: "center", gap: 6,
              height: 36, marginBottom: 20,
              visibility: "hidden",
            }}
          >
            <span className="hero-tag" style={{ fontFamily: "'Audiowide',monospace", color: "var(--accent)", opacity: 0.45, fontSize: 14 }}>&lt;</span>
            <span
              ref={roleRef}
              style={{
                fontFamily: "'Kaushan Script',cursive",
                fontSize: "clamp(1rem,2vw,1.3rem)",
                color: "var(--accent)", minWidth: 4,
              }}
            />
            <span className="cursor-blink" style={{ fontFamily: "'Audiowide',monospace", color: "var(--accent)", fontSize: 20, lineHeight: 1 }}>|</span>
            <span className="hero-tag" style={{ fontFamily: "'Audiowide',monospace", color: "var(--accent)", opacity: 0.45, fontSize: 14 }}>/&gt;</span>
          </div>

          <p
            className="hero-bio"
            style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: "clamp(0.85rem,1.5vw,1rem)",
              lineHeight: 1.8, color: "var(--text-muted)",
              marginBottom: 28, maxWidth: 500,
              visibility: "hidden",
            }}
          >
            A passionate Computer Engineering student who loves building beautiful, performant
            web experiences. Skilled in React, JavaScript &amp; modern frontend technologies —
            always learning, always shipping.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 24 }}>
            <button
              className="hero-btn"
              onClick={onNavigateProjects}
              style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "12px 24px", borderRadius: 12,
                background: "var(--accent)", color: "#030712",
                fontFamily: "'Audiowide',sans-serif", fontSize: 11,
                letterSpacing: "0.2em", textTransform: "uppercase",
                border: "none", transition: "transform 0.2s, box-shadow 0.3s",
                visibility: "hidden",
              }}
              onMouseEnter={(e) => gsap.to(e.currentTarget, { scale: 1.06, boxShadow: "0 0 28px var(--accent-dim)", duration: 0.25 })}
              onMouseLeave={(e) => gsap.to(e.currentTarget, { scale: 1, boxShadow: "none", duration: 0.25 })}
            >
              View Projects <RiArrowRightLine style={{ width: 15, height: 15 }} />
            </button>

            <a
              href="/Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-btn"
              style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "12px 24px", borderRadius: 12,
                background: "var(--accent-glow)",
                border: "1px solid var(--accent-dim)",
                color: "var(--text)",
                fontFamily: "'Audiowide',sans-serif", fontSize: 11,
                letterSpacing: "0.2em", textTransform: "uppercase",
                textDecoration: "none", transition: "transform 0.2s",
                visibility: "hidden",
              }}
              onMouseEnter={(e) => gsap.to(e.currentTarget, { scale: 1.06, duration: 0.25 })}
              onMouseLeave={(e) => gsap.to(e.currentTarget, { scale: 1,    duration: 0.25 })}
            >
              Resume <RiDownloadLine style={{ width: 15, height: 15 }} />
            </a>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {[
              { Icon: RiGithubFill,   href: "https://github.com/Aryan-Sutariya",     label: "GitHub" },
              { Icon: RiLinkedinFill, href: "https://www.linkedin.com/in/aryan-sutariya-139227337/", label: "LinkedIn" },
            ].map(({ Icon, href, label }) => (
              <a
                key={label} href={href} target="_blank" rel="noopener noreferrer"
                aria-label={label}
                className="hero-social"
                style={{
                  width: 40, height: 40, borderRadius: 10,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: "var(--accent-glow)", border: "1px solid var(--accent-dim)",
                  color: "var(--text-muted)", textDecoration: "none",
                  transition: "transform 0.2s, color 0.2s",
                  visibility: "hidden",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "var(--accent)"; gsap.to(e.currentTarget, { scale: 1.12, duration: 0.2 }); }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-muted)"; gsap.to(e.currentTarget, { scale: 1, duration: 0.2 }); }}
              >
                <Icon style={{ width: 16, height: 16 }} />
              </a>
            ))}
            <div className="hero-social" style={{ width: 50, height: 1, background: "var(--accent-dim)", marginLeft: 6 }} />
            <span className="hero-social" style={{ fontFamily: "'Handlee',cursive", fontSize: 11, letterSpacing: "0.3em", color: "var(--text-muted)", textTransform: "uppercase" }}>
              Open to work
            </span>
            <div className="hero-social animate-pulse" style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--accent)" }} />
          </div>
        </div>

        {/* ── RIGHT IMAGE ── */}
        <div
          className="hero-img-wrap"
          style={{
            flexShrink: 0, zIndex: 10,
            display: "flex", alignItems: "center", justifyContent: "center",
            visibility: "hidden",
          }}
        >
          <div className="hero-img-float" style={{ position: "relative" }}>
            <div className="ring-a" style={{
              position: "absolute", inset: -40, borderRadius: "50%",
              border: "1px dashed var(--accent)", opacity: 0.3,
            }} />
            <div className="ring-b" style={{
              position: "absolute", inset: -70, borderRadius: "50%",
              border: "1px solid var(--accent)", opacity: 0.12,
            }} />
            <div style={{
              position: "absolute", inset: 0, borderRadius: "50%",
              background: "radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)",
              filter: "blur(30px)", transform: "scale(1.2)",
            }} />
            <div style={{
              width: "clamp(160px,20vw,280px)", height: "clamp(160px,20vw,280px)",
              borderRadius: "50%", overflow: "hidden",
              border: "2px solid var(--accent-dim)",
              boxShadow: "0 0 50px var(--accent-glow)",
              position: "relative",
            }}>
              <img
                src="/heroimage-removebg.png"
                alt="Aryan Sutariya"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <div style={{
              position: "absolute", bottom: -10, left: "50%", transform: "translateX(-50%)",
              display: "flex", alignItems: "center", gap: 7,
              padding: "6px 16px", borderRadius: 999,
              background: "var(--bg-card)", border: "1px solid var(--accent-dim)",
              whiteSpace: "nowrap",
            }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--accent)" }} className="animate-pulse" />
              <span style={{ fontFamily: "'Handlee',cursive", fontSize: 10, letterSpacing: "0.3em", color: "var(--accent)", textTransform: "uppercase" }}>
                Available
              </span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .flex-col-mobile {
            flex-direction: column !important;
            justify-content: center !important;
            padding-top: calc(var(--nav-h) + 16px) !important;
            padding-left: 20px !important;
            padding-right: 20px !important;
            overflow: hidden;
            gap: 24px !important;
          }
          .flex-col-mobile > div:first-child { align-items: center; text-align: center; }
          .flex-col-mobile > div:first-child .hero-bio { text-align: center; }
          .flex-col-mobile > div:first-child > div:nth-child(5) { justify-content: center; }
          .flex-col-mobile > div:first-child > div:last-child  { justify-content: center; }
        }
      `}</style>
    </section>
  );
};

export default Hero;