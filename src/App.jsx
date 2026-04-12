import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { Observer, SplitText, TextPlugin, MotionPathPlugin, ScrollTrigger } from "gsap/all";

gsap.registerPlugin(Observer, SplitText, TextPlugin, MotionPathPlugin, ScrollTrigger);

import Navbar    from "./components/Navbar";
import Hero      from "./components/Hero";
import Skills    from "./components/Skills";
import Projects  from "./components/Projects";
import ContactUs from "./components/ContactUs";
import Cursor    from "./components/Cursor";
import Loader    from "./components/Loader";

const LABELS = ["Home", "Skills", "Projects", "Contact"];
const TOTAL  = 4;

const App = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [theme,        setTheme]        = useState("dark");
  const [loaded,       setLoaded]       = useState(false);

  const indexRef     = useRef(0);
  const animatingRef = useRef(false);
  const panelRefs    = useRef([]);
  const outerRefs    = useRef([]);
  const innerRefs    = useRef([]);
  const obsRef       = useRef(null);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    if (!loaded) return;

    const panels = panelRefs.current;
    const outers  = outerRefs.current;
    const inners  = innerRefs.current;
    if (!panels.length) return;

    // ── Initial state ──
    gsap.set(panels, { autoAlpha: 0 });
    // FIX: overflow hidden on every outer so inner at yPercent:-100 never peeks
    gsap.set(outers, { overflow: "hidden" });
    gsap.set(outers.slice(1), { yPercent: 100 });
    gsap.set(inners.slice(1), { yPercent: -100 });
    gsap.set(panels[0], { autoAlpha: 1 });

    const gotoSection = (newIndex, direction) => {
      if (animatingRef.current) return;
      if (newIndex < 0 || newIndex >= TOTAL) return;

      animatingRef.current = true;
      const dFactor = direction === -1 ? -1 : 1;
      const currIdx = indexRef.current;

      gsap.set(outers[newIndex], { yPercent: 100 * dFactor });
      gsap.set(inners[newIndex], { yPercent: -100 * dFactor });
      gsap.set(panels[newIndex], { autoAlpha: 1, zIndex: 1 });

      const tl = gsap.timeline({
        defaults: { duration: 1.15, ease: "power1.inOut" },
        onComplete: () => {
          gsap.set(panels[currIdx], { autoAlpha: 0, zIndex: 0 });
          gsap.set(outers[currIdx], { yPercent: -100 * dFactor });
          gsap.set(inners[currIdx], { yPercent:  100 * dFactor });
          indexRef.current     = newIndex;
          animatingRef.current = false;
          setCurrentIndex(newIndex);
        },
      });

      gsap.set(panels[currIdx], { zIndex: 0 });
      tl.to(outers[currIdx], { yPercent: -100 * dFactor }, 0);
      tl.to(inners[currIdx], { yPercent:  100 * dFactor }, 0);
      tl.to(outers[newIndex], { yPercent: 0 }, 0);
      tl.to(inners[newIndex], { yPercent: 0 }, 0);

      tl.call(() => {
        window.dispatchEvent(new CustomEvent("section-enter", {
          detail: { index: newIndex, direction },
        }));
      }, [], 0.25);
    };

    window.__gotoSection = (i) => {
      const dir = i > indexRef.current ? 1 : -1;
      gotoSection(i, dir);
    };

    obsRef.current = Observer.create({
      type: "wheel,touch,pointer",
      wheelSpeed: -1,
      tolerance: 10,
      preventDefault: true,
      onDown: () => !animatingRef.current && gotoSection(indexRef.current - 1, -1),
      onUp:   () => !animatingRef.current && gotoSection(indexRef.current + 1,  1),
    });

    window.__observerDisable = () => obsRef.current?.disable();
    window.__observerEnable  = () => obsRef.current?.enable();

    const onKey = (e) => {
      if (["ArrowDown", "PageDown", " "].includes(e.key)) {
        e.preventDefault();
        !animatingRef.current && gotoSection(indexRef.current + 1, 1);
      }
      if (["ArrowUp", "PageUp"].includes(e.key)) {
        e.preventDefault();
        !animatingRef.current && gotoSection(indexRef.current - 1, -1);
      }
    };
    window.addEventListener("keydown", onKey);

    setTimeout(() => {
      window.dispatchEvent(new CustomEvent("section-enter", {
        detail: { index: 0, direction: 1 },
      }));
    }, 80);

    return () => {
      obsRef.current?.kill();
      window.removeEventListener("keydown", onKey);
      delete window.__gotoSection;
      delete window.__observerDisable;
      delete window.__observerEnable;
    };
  }, [loaded]);

  const navigate    = (i) => window.__gotoSection?.(i);
  const toggleTheme = ()  => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <>
      {!loaded && <Loader onComplete={() => setLoaded(true)} />}

      <Cursor />

      <Navbar
        currentIndex={currentIndex}
        onNavigate={navigate}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      <div className="section-progress">
        {LABELS.map((label, i) => (
          <div
            key={i}
            className={`progress-dot ${i === currentIndex ? "active" : ""}`}
            onClick={() => navigate(i)}
            title={label}
          />
        ))}
      </div>

      {/* Panel 0 — Hero */}
      <div ref={(el) => (panelRefs.current[0] = el)} className="panel">
        <div ref={(el) => (outerRefs.current[0] = el)} className="panel-outer">
          <div ref={(el) => (innerRefs.current[0] = el)} className="panel-inner">
            <Hero onNavigateProjects={() => navigate(2)} />
          </div>
        </div>
      </div>

      {/* Panel 1 — Skills */}
      <div ref={(el) => (panelRefs.current[1] = el)} className="panel">
        <div ref={(el) => (outerRefs.current[1] = el)} className="panel-outer">
          <div ref={(el) => (innerRefs.current[1] = el)} className="panel-inner">
            <Skills />
          </div>
        </div>
      </div>

      {/* Panel 2 — Projects */}
      <div ref={(el) => (panelRefs.current[2] = el)} className="panel">
        <div ref={(el) => (outerRefs.current[2] = el)} className="panel-outer">
          <div ref={(el) => (innerRefs.current[2] = el)} className="panel-inner">
            <Projects />
          </div>
        </div>
      </div>

      {/* Panel 3 — Contact */}
      <div ref={(el) => (panelRefs.current[3] = el)} className="panel">
        <div ref={(el) => (outerRefs.current[3] = el)} className="panel-outer">
          <div ref={(el) => (innerRefs.current[3] = el)} className="panel-inner">
            <ContactUs />
          </div>
        </div>
      </div>
    </>
  );
};

export default App;