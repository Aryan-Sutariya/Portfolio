import React from "react";
import { RiGithubFill, RiLinkedinFill, RiTwitterXFill, RiHeartFill } from "@remixicon/react";

const SOCIALS = [
  { name: "GitHub",   Icon: RiGithubFill,   href: "https://github.com/Aryan-Sutariya" },
  { name: "LinkedIn", Icon: RiLinkedinFill, href: "https://linkedin.com/in/aryan-sutariya" },
  { name: "Twitter",  Icon: RiTwitterXFill, href: "https://twitter.com" },
];

const Footer = () => (
  <footer
    style={{
      width: "100%",
      borderTop: "1px solid var(--border)",
      background: "var(--bg)",
    }}
  >
    <div style={{
      maxWidth: 960, margin: "0 auto",
      padding: "20px 24px",
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 16,
    }}>
      {/* Branding */}
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <span style={{
          fontFamily: "'Tourney',sans-serif",
          fontSize: "1.1rem", letterSpacing: "0.3em",
          color: "var(--accent)", textTransform: "uppercase",
        }}>ARYAN</span>
        <p style={{
          fontFamily: "'Handlee',cursive", fontSize: 11,
          color: "var(--text-muted)",
          display: "flex", alignItems: "center", gap: 5,
        }}>
          Designed &amp; Built with
          <RiHeartFill style={{ width: 11, height: 11, color: "var(--accent)" }} />
          by Aryan Sutariya
        </p>
      </div>

      {/* Socials */}
      <div style={{ display: "flex", gap: 10 }}>
        {SOCIALS.map(({ name, Icon, href }) => (
          <a
            key={name} href={href} target="_blank" rel="noopener noreferrer"
            aria-label={name}
            style={{
              width: 34, height: 34, borderRadius: 8,
              display: "flex", alignItems: "center", justifyContent: "center",
              background: "var(--accent-glow)", border: "1px solid var(--accent-dim)",
              color: "var(--text-muted)", textDecoration: "none",
              transition: "color 0.2s, transform 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "var(--accent)"; e.currentTarget.style.transform = "translateY(-2px) scale(1.1)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-muted)"; e.currentTarget.style.transform = "none"; }}
          >
            <Icon style={{ width: 15, height: 15 }} />
          </a>
        ))}
      </div>

      {/* Copyright */}
      <p style={{
        fontFamily: "'Handlee',cursive", fontSize: 11,
        letterSpacing: "0.2em", color: "var(--text-muted)",
      }}>
        © {new Date().getFullYear()} All Rights Reserved
      </p>
    </div>
  </footer>
);

export default Footer;
