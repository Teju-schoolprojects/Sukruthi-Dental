import { useEffect, useState } from "react";
import { scrollToId } from "./SmoothScroll";

export function Nav() {
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 32);
    onScroll(); // run once so a mid-page reload renders the correct state
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-500 ${
      solid ? "sx-hairline bg-sitesurface/85 backdrop-blur-md" : "border-transparent bg-transparent"}`}>
      <div className="mx-auto flex h-16 w-full max-w-[1360px] items-center justify-between px-5 md:px-10">
        <a href="#" className="flex items-center gap-3 group" aria-label="Sukruthi Dental, home">
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-siteaccent to-cyan-500 flex items-center justify-center shadow-lg shadow-siteaccent/10 shrink-0 text-white transition-transform duration-300 group-hover:scale-105">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 drop-shadow-sm">
              <path d="M12 2C9.5 2 7 3.5 7 7c0 3 1.5 4.5 2.5 6 1 1.5 1.5 2.5 1.5 4 0 2.5-1.5 3-1.5 4s1 2 2.5 2c1 0 1.5-1.5 2-3 .5 1.5 1 3 2 3 1.5 0 2.5-1 2.5-2s-1.5-1.5-1.5-4c0-1.5.5-2.5 1.5-4 1-1.5 2.5-3 2.5-6 0-3.5-2.5-5-5-5a4 4 0 0 0-3 1.5A4 4 0 0 0 12 2z" />
            </svg>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full border border-white flex items-center justify-center shadow-sm">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-2.5 h-2.5 text-white">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
          </div>
          <span className="font-display text-[16px] font-bold tracking-tight text-siteink group-hover:text-siteaccent transition-colors duration-300">Sukruthi Dental</span>
        </a>
        <button type="button" onClick={() => scrollToId("visit")}
          className="font-display text-[15px] font-bold tracking-tight text-siteink transition-colors hover:text-siteaccent">
          Book Appointment <span aria-hidden="true">→</span>
        </button>
      </div>
    </header>
  );
}
