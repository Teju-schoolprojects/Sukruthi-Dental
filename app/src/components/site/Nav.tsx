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
        <a href="/" className="flex items-center gap-3" aria-label="Sukruthi Dental, home">
          <img src="/assets/logo.png" alt="" width={30} height={30} className="h-[30px] w-[30px]" />
          <span className="font-display text-[16px] font-bold tracking-tight text-siteink">Sukruthi Dental</span>
        </a>
        <button type="button" onClick={() => scrollToId("visit")}
          className="font-display text-[15px] font-bold tracking-tight text-siteink transition-colors hover:text-siteaccent">
          Book Appointment <span aria-hidden="true">→</span>
        </button>
      </div>
    </header>
  );
}
