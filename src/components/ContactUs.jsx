import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import emailjs from "@emailjs/browser";
import {
  RiMapPinLine,
  RiGithubFill, RiLinkedinFill,
  RiSendPlaneFill,
} from "@remixicon/react";

gsap.registerPlugin(SplitText);

const SOCIALS = [
  { name: "GitHub", Icon: RiGithubFill, href: "https://github.com/Aryan-Sutariya" },
  { name: "LinkedIn", Icon: RiLinkedinFill, href: "https://linkedin.com/in/aryan-sutariya" },
];

const ContactUs = () => {
  const containerRef = useRef();
  const formRef = useRef();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [focused, setFocused] = useState(null);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      if (e.detail.index !== 3) return;
      const dir = e.detail.direction;

      const split = new SplitText(".contact-title", { type: "chars" });
      gsap.fromTo(split.chars,
        { autoAlpha: 0, y: dir * 60, rotation: () => gsap.utils.random(-15, 15), scale: 0.5 },
        { autoAlpha: 1, y: 0, rotation: 0, scale: 1, stagger: 0.05, duration: 1, delay: 0.7, ease: "back.out(1.7)" }
      );

      gsap.fromTo(".contact-sub-label", { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, delay: 1.3 });
      gsap.fromTo(".contact-left-block", { autoAlpha: 0, x: -30 }, { autoAlpha: 1, x: 0, delay: 1 });
      gsap.fromTo(".contact-form-card", { autoAlpha: 0, x: 30 }, { autoAlpha: 1, x: 0, delay: 1 });
    };
    window.addEventListener("section-enter", handler);
    return () => window.removeEventListener("section-enter", handler);
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // STRICT GMAIL VALIDATION
  const validateEmail = (email) => {
    const basicRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!basicRegex.test(email)) return false;

    // Check for gmail specific spelling errors
    if (email.toLowerCase().includes("@gmail")) {
      return email.toLowerCase().endsWith("@gmail.com");
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(formData.email)) {
      alert("Please enter a valid email. If using Gmail, ensure it ends with @gmail.com");
      return;
    }

    setIsSending(true);

    const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    emailjs.sendForm(serviceID, templateID, formRef.current, publicKey)
      .then(() => {
        alert("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      })
      .catch((error) => {
        alert(`Error: ${error?.text || "Check console for details"}`);
      })
      .finally(() => {
        setIsSending(false);
      });
  };

  // Only apply accent/white border if CURRENTLY focused
  const getFieldStyle = (field) => ({
    width: "100%",
    padding: "12px",
    borderRadius: 8,
    background: "rgba(255,255,255,0.03)",
    color: "white",
    outline: "none",
    transition: "all 0.3s ease",
    border: focused === field ? "1px solid var(--accent)" : "1px solid var(--border)",
    boxShadow: focused === field ? "0 0 15px var(--accent-glow)" : "none",
    cursor: "text" // Ensures the text cursor appears on laptop/tablet
  });

  return (
    <div ref={containerRef} style={{ width: "100%", height: "100%", background: "var(--bg)", display: "flex", flexDirection: "column", overflow: "hidden", position: "relative" }}>
      <div className="grid-bg" />

      <div style={{ flex: 1, display: "flex", flexDirection: "column ", padding: "calc(var(--nav-h) + 20px) 24px 0", zIndex: 10 }}>

        <div style={{ textAlign: "center", marginBottom: 30 }}>
          <p className="contact-sub-label" style={{ fontFamily: "'Handlee'", color: "var(--accent)", letterSpacing: "0.4em", textTransform: "uppercase", fontSize: 11 }}>— Get in touch —</p>
          <h2 className="contact-title" style={{ fontFamily: "'Monoton'", fontSize: "clamp(2rem, 6vw, 4rem)", color: "var(--text)" }}>CONTACT</h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20, maxWidth: 1100, margin: "0 auto", width: "100%" }}>
          <div className="contact-left-block">
            <h3 style={{ fontFamily: "'Audiowide'", color: "var(--text)", marginBottom: 15 }}>Let's <span style={{ color: "var(--accent)" }}>Connect</span></h3>
            <p className="" style={{ color: "var(--text-muted)", lineHeight: 1.6, marginBottom: 15, fontFamily: "'Playfair Display'" }}>
              Have a project in mind? Fill out the form below and I'll get back to you as soon as possible.
            </p>

            <div className="mobile-hide" style={{ display: "flex", alignItems: "center", gap: 15, padding: 15, background: "var(--bg-card)", borderRadius: 12, border: "1px solid var(--border)", marginBottom: 20 }}>
              <RiMapPinLine color="var(--accent)" />
              <span style={{ color: "var(--text)", fontSize: 14 }}>Gujarat, India</span>
            </div>

            <div className="m-0" style={{ display: "flex", gap: 10, padding: '0px 0px 0px 0px' }} >
              {SOCIALS.map(({ Icon, href, name }) => (
                <a key={name} href={href} target="_blank" rel="noreferrer" style={{ width: 40, height: 40, borderRadius: 10, background: "var(--bg-card)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-muted)" }}>
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div className="contact-form-card pt-0" style={{ position: "relative" }}>
            <div className="form-glow-border" />
            <form ref={formRef} onSubmit={handleSubmit} style={{ position: "relative", zIndex: 5, background: "var(--bg-card)", padding: 25, borderRadius: 15, border: "1px solid var(--border)", display: "flex", flexDirection: "column", gap: 15 }}>
              <div>
                <input
                  type="text" name="name" placeholder="Name" required
                  value={formData.name} onChange={handleChange}
                  onKeyDown={(e) => e.stopPropagation()}
                  onFocus={() => setFocused("name")}
                  onBlur={() => setFocused(null)}
                  style={getFieldStyle("name")}
                />
              </div>
              <div>
                <input
                  type="email" name="email" placeholder="Email" required
                  value={formData.email} onChange={handleChange}
                  onKeyDown={(e) => e.stopPropagation()}
                  onFocus={() => setFocused("email")}
                  onBlur={() => setFocused(null)}
                  style={getFieldStyle("email")}
                />
              </div>
              <div>
                <textarea
                  name="message" placeholder="Your Message" required rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  onKeyDown={(e) => e.stopPropagation()}
                  onFocus={() => setFocused("message")}
                  onBlur={() => setFocused(null)}
                  style={{
                    ...getFieldStyle("message"),
                    resize: "none",
                    whiteSpace: "pre-wrap"
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={isSending}
                className="submit-btn"
                style={{ background: "var(--accent)", color: "black", padding: "14px", borderRadius: 10, border: "none", fontFamily: "'Audiowide'", fontSize: 12, textTransform: "uppercase", cursor: isSending ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, fontWeight: "bold", opacity: isSending ? 0.7 : 1 }}
              >
                {isSending ? "Sending..." : "Send Message"} <RiSendPlaneFill size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>

      <footer className="contact-footer" style={{ padding: "20px", textAlign: "center", borderTop: "1px solid var(--border)", marginTop: "auto" }}>
        <p style={{ color: "var(--text-muted)", fontSize: 12, fontFamily: "'Handlee'" }}>
          Made by Aryan Sutariya
        </p>
      </footer>

      <style>{`
        /* Force default cursor for form elements and social links on desktop/tablet */
        input, textarea, button, a, .contact-form-card {
          cursor: auto !important;
        }

        /* Specifically target laptop/tablet to disable custom cursor interaction */
        @media (min-width: 769px) {
            input, textarea {
                cursor: text !important;
            }
            button, a {
                cursor: pointer !important;
            }
            /* If your Cursor.jsx uses an element, we hide it when hovering the form */
            .contact-form-card:hover ~ #custom-cursor-id,
            form:hover ~ #custom-cursor-id {
                opacity: 0 !important;
                visibility: hidden !important;
            }
        }

        .form-glow-border {
          position: absolute;
          inset: -2px;
          border-radius: 17px;
          background: var(--accent);
          opacity: 0.15;
          filter: blur(8px);
          z-index: 0;
          pointer-events: none;
          animation: pulseGlow 3s ease-in-out infinite;
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(1.01); }
        }
        @media (max-width: 768px) {
          .mobile-hide { display: none !important; }
        }
      `}</style>
    </div>
  );
};

export default ContactUs;