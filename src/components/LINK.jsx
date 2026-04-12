import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// Link.jsx
const Link = ({ data, className, href, onClick }) => {
  // 1. Catch the href prop
  const container = useRef();
  const tl = useRef();

  const { contextSafe } = useGSAP(
    () => {
      tl.current = gsap.timeline({ paused: true });
      tl.current.to(".letter-wrapper span", {
        y: "-100%",
        duration: 0.3,
        ease: "power2.out",
        stagger: 0.025,
      });
    },
    { scope: container }
  );

  const onMouseEnter = contextSafe(() => tl.current.play());
  const onMouseLeave = contextSafe(() => tl.current.reverse());

  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <div
      ref={container}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      // onClick={handleClick}
      data-href={href} // 2. Attach it as a data attribute or href
      className={`nav-link cursor-pointer font-semibold text-white text-lg uppercase overflow-hidden ${
        className || ""
      }`}
    >
      <div className="flex opacity-70 hover:opacity-100">
        {data.split("").map((char, index) => (
          <div
            key={index}
            className="letter-wrapper  relative inline-flex flex-col overflow-hidden h-6 leading-6"
          >
            <span className="font-[Kaushan Script]">
              {char === " " ? "\u00A0" : char}
            </span>
            <span className="absolute top-full left-0 font-[Kaushan Script]">
              {char === " " ? "\u00A0" : char}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Link;
