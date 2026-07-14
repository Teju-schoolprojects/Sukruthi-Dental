import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SmoothScroll } from "./components/site/SmoothScroll";
import { FilmVideo } from "./components/site/FilmVideo";
import { Nav } from "./components/site/Nav";

// Inline SVG Icon Components
function IconRct() {
  return (
    <svg className="w-8 h-8 stroke-siteaccent fill-none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 3c1.5 0 2.5 1.5 2.5 4.5v1.5c0 3-3.5 5.5-3.5 8.5C5 20.5 6 21 6.5 21" />
      <path d="M18 3c-1.5 0-2.5 1.5-2.5 4.5v1.5c0 3 3.5 5.5 3.5 8.5c0 3-1 3.5-1.5 3.5" />
      <path d="M8.5 7.5c2 1 5 1 7 0" />
      <path d="M12 9v6c0 1.5-.5 3-1.5 4" strokeDasharray="1.5 1.5" />
      <path d="M12 11c0 1.5.5 3 1.5 4" strokeDasharray="1.5 1.5" />
    </svg>
  );
}

function IconWhitening() {
  return (
    <svg className="w-8 h-8 stroke-siteaccent fill-none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 8.5c.5-.8 1.5-1.5 3-1.5s2.5.7 3 1.5c1 1.5.5 5.5-1.5 7s-1.5 2.5-1.5 2.5h-2s0-1-1.5-2.5S5.5 10 6.5 8.5z" />
      <path d="M18 4l0.5 1 1 0.5-1 0.5-0.5 1-0.5-1-1-0.5 1-0.5z" fill="currentColor" stroke="none" />
      <path d="M4 14l0.4 0.8 0.8 0.4-0.8 0.4-0.4 0.8-0.4-0.8-0.8-0.4 0.8-0.4z" fill="currentColor" stroke="none" />
      <path d="M16 16l0.3 0.6 0.6 0.3-0.6 0.3-0.3 0.6-0.3-0.6-0.6-0.3 0.6-0.3z" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconBraces() {
  return (
    <svg className="w-8 h-8 stroke-siteaccent fill-none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12c4-3 14-3 18 0" />
      <rect x="5" y="9.5" width="3" height="5" rx="1" />
      <rect x="10.5" y="8.5" width="3" height="5" rx="1" />
      <rect x="16" y="9.5" width="3" height="5" rx="1" />
      <path d="M6.5 12h11" />
    </svg>
  );
}

function IconLaser() {
  return (
    <svg className="w-8 h-8 stroke-siteaccent fill-none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 5l-6 6" />
      <path d="M14.5 5.5l4 4" />
      <path d="M10 12c-2.5-1-5.5-1-8 0" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
      <path d="M12 12m-5 0a5 5 0 1 0 10 0a5 5 0 1 0 -10 0" strokeDasharray="2 2" />
      <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" strokeDasharray="3 3" />
    </svg>
  );
}

function IconSealants() {
  return (
    <svg className="w-8 h-8 stroke-siteaccent fill-none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 10c1-2 2-3 4-3h4c2 0 3 1 4 3 1 2 0 6-2 8s-2 2.5-2 2.5h-4s0-1.5-2-2.5S5 12 6 10z" />
      <path d="M12 4c2.5 0 4.5.5 4.5.5v3c0 2.5-2 4-4.5 5S7.5 10 7.5 7.5v-3S9.5 4 12 4z" />
    </svg>
  );
}

function IconImplants() {
  return (
    <svg className="w-8 h-8 stroke-siteaccent fill-none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 5c1-1.5 2-2 4-2s3 .5 4 2c1 1.5.5 3.5-1 4.5S12 11 12 11h-0.5s-2.5-1-1.5-2.5S7 6.5 8 5z" />
      <path d="M12 11v8" />
      <path d="M10 13h4M9.5 15.5h5M10.5 17.5h3" />
    </svg>
  );
}

function IconExtraction() {
  return (
    <svg className="w-8 h-8 stroke-siteaccent fill-none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 10c0-3 2-4 6-4s6 1 6 4c0 2.5-1.5 4.5-1.5 4.5S15 16 15 18H9s0-2-1.5-3.5S6 12.5 6 10z" />
      <path d="M12 12V3" />
      <path d="M9 6l3-3 3 3" />
    </svg>
  );
}

export default function App() {
  // States
  const [reduced, setReduced] = useState(false);
  const [openOffering, setOpenOffering] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [bookingModal, setBookingModal] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<any>(null);

  // Refs
  const heroWrapRef = useRef<HTMLDivElement | null>(null);
  const heroMaskRef = useRef<HTMLDivElement | null>(null);
  const heroScrimRef = useRef<HTMLDivElement | null>(null);
  const spaceWrapRef = useRef<HTMLDivElement | null>(null);
  const spaceFilmRef = useRef<HTMLDivElement | null>(null);
  const careImgRef = useRef<HTMLDivElement | null>(null);

  // Detect reduced motion preference
  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // GSAP animations for Hero & sticky sections
  useEffect(() => {
    if (reduced) return;
    gsap.registerPlugin(ScrollTrigger);

    // Hero clip-path aperture reveal
    const heroWrap = heroWrapRef.current;
    const heroMask = heroMaskRef.current;
    const heroScrim = heroScrimRef.current;

    if (heroWrap && heroMask && heroScrim) {
      const mm = gsap.matchMedia();
      mm.add(
        { desktop: "(min-width: 768px)", mobile: "(max-width: 767px)" },
        (ctx) => {
          const c = ctx.conditions as { desktop: boolean };
          const startClip = c.desktop
            ? "inset(16% 7% 12% 46% round 999px 999px 0px 0px)"
            : "inset(8% 6% 52% 6% round 999px 999px 0px 0px)";

          const clip = gsap.fromTo(
            heroMask,
            { clipPath: startClip },
            {
              clipPath: "inset(0% 0% 0% 0% round 0px 0px 0px 0px)",
              ease: "none",
              scrollTrigger: {
                trigger: heroWrap,
                start: "top top",
                end: "bottom bottom",
                scrub: 0.5,
              },
            }
          );

          const veil = gsap.fromTo(
            heroScrim,
            { opacity: 0 },
            {
              opacity: 1,
              ease: "none",
              scrollTrigger: {
                trigger: heroWrap,
                start: "20% top",
                end: "bottom bottom",
                scrub: 0.5,
              },
            }
          );

          return () => {
            clip.scrollTrigger?.kill();
            clip.kill();
            veil.scrollTrigger?.kill();
            veil.kill();
          };
        }
      );
    }

    // Space Chapter sticky zoom scrub
    const spaceWrap = spaceWrapRef.current;
    const spaceFilm = spaceFilmRef.current;
    if (spaceWrap && spaceFilm) {
      const spaceScrub = gsap.fromTo(
        spaceFilm,
        { scale: 1.12 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: spaceWrap,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.5,
          },
        }
      );
      return () => {
        spaceScrub.scrollTrigger?.kill();
        spaceScrub.kill();
      };
    }
  }, [reduced]);

  // Appointment Submission
  const handleBookingSubmit = (e: any) => {
    e.preventDefault();
    const name = e.target.name.value;
    const phone = e.target.phone.value;
    const service = e.target.service.value;
    const regId = "SKD-" + Math.floor(10000000 + Math.random() * 90000000);

    setBookingDetails({
      name,
      phone,
      service,
      regId,
      date: e.target.date.value,
      time: e.target.time.value,
    });
  };

  const downloadReceipt = () => {
    if (!bookingDetails) return;
    const text = `================================================
SUKRUTHI DENTAL AND ORAL CARE
Mysore, Siddarthanagar | Tel: +91 98441 70621
================================================
APPOINTMENT RECEIPT
ID: ${bookingDetails.regId}
Patient: ${bookingDetails.name}
Phone: +91 ${bookingDetails.phone}
Service: ${bookingDetails.service}
Date: ${bookingDetails.date}
Time: ${bookingDetails.time}
================================================`;
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Sukruthi_Receipt_${bookingDetails.regId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <SmoothScroll>
      <div className="bg-siteground font-body text-siteink antialiased">
        <Nav />

        <main className="relative z-10">
          {/* SECTION 1: HERO */}
          {reduced ? (
            <section className="relative h-dvh flex items-center justify-start px-6 md:px-24">
              <img
                src="/assets/hero-final.jpg"
                alt="Clean modern clinic environment at Sukruthi Dental"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-siteground via-siteground/70 to-transparent" />
              <div className="relative z-10 max-w-2xl">
                <h1 className="font-display text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-none">
                  Your Smile,
                  <br />
                  Our Masterpiece.
                </h1>
                <p className="text-lg md:text-xl text-sitemuted mb-8 max-w-lg">
                  Welcome to Sukruthi Dental and Oral Care in Mysore. Precision treatments meet gentle clinical elegance.
                </p>
                <button
                  onClick={() => setBookingModal(true)}
                  className="px-8 py-4 font-display text-[15px] font-bold text-white bg-siteaccent rounded-full transition-transform hover:scale-105 shadow-lg"
                >
                  Secure Your Slot
                </button>
              </div>
            </section>
          ) : (
            <section ref={heroWrapRef} className="relative h-[210vh] md:h-[240vh]">
              <div className="sticky top-0 h-dvh overflow-hidden bg-siteground">
                <div ref={heroMaskRef} className="absolute inset-0 will-change-[clip-path]">
                  <FilmVideo
                    src="/assets/film-hero.mp4"
                    poster="/assets/hero-poster.jpg"
                    className="h-full w-full object-cover"
                    label="Pristine dental examination room details"
                  />
                </div>
                <div
                  ref={heroScrimRef}
                  style={{ opacity: 0 }}
                  className="pointer-events-none absolute inset-0 bg-gradient-to-r from-siteground/95 via-siteground/60 to-transparent"
                  aria-hidden="true"
                />

                <div className="absolute inset-0 z-10 flex items-end pb-16 px-6 md:items-center md:pb-0 md:px-24">
                  <div className="max-w-2xl text-left">
                    <h1 className="font-display text-4xl md:text-7xl font-extrabold tracking-tight leading-none mb-6">
                      {"Your Smile, ".split(" ").map((w, i) => (
                        <span key={i} className="inline-block whitespace-nowrap">
                          {w.split("").map((c, j) => (
                            <span
                              key={j}
                              className="inline-block sx-rise"
                              style={{ animationDelay: `${(i * 5 + j) * 40}ms` }}
                            >
                              {c}
                            </span>
                          ))}
                          {" "}
                        </span>
                      ))}
                      <br />
                      {"Our Masterpiece.".split(" ").map((w, i) => (
                        <span key={i} className="inline-block whitespace-nowrap">
                          {w.split("").map((c, j) => (
                            <span
                              key={j}
                              className="inline-block sx-rise"
                              style={{ animationDelay: `${(20 + i * 5 + j) * 40}ms` }}
                            >
                              {c}
                            </span>
                          ))}
                          {" "}
                        </span>
                      ))}
                    </h1>
                    <p className="text-base md:text-xl text-sitemuted mb-8 max-w-md sx-rise" style={{ animationDelay: "1.2s" }}>
                      Experience clinical perfection led by Dr. Mahesh M. S. and specialized surgeons in Siddarthanagar, Mysore.
                    </p>
                    <button
                      onClick={() => setBookingModal(true)}
                      className="px-8 py-4 font-display text-[15px] font-bold text-white bg-siteaccent rounded-full shadow-lg transition-transform hover:scale-105 sx-rise"
                      style={{ animationDelay: "1.4s" }}
                    >
                      Secure Your Slot
                    </button>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* SECTION 2: PROOF STRIP */}
          <section className="relative z-20 border-y sx-hairline bg-sitesurface py-10">
            <div className="mx-auto max-w-[1360px] px-6 md:px-10 flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="text-center md:text-left">
                <span className="font-display text-3xl font-extrabold tracking-tight text-siteaccent">2018</span>
                <p className="text-xs uppercase tracking-widest text-sitemuted mt-1">Established in Mysore</p>
              </div>
              <div className="hidden md:block w-px h-12 sx-wash" />
              <div className="text-center">
                <span className="font-display text-3xl font-extrabold tracking-tight text-siteaccent">4.9 / 5</span>
                <p className="text-xs uppercase tracking-widest text-sitemuted mt-1">Verified on Justdial</p>
              </div>
              <div className="hidden md:block w-px h-12 sx-wash" />
              <div className="text-center">
                <span className="font-display text-3xl font-extrabold tracking-tight text-siteaccent">209+</span>
                <p className="text-xs uppercase tracking-widest text-sitemuted mt-1">Happy Patient Reviews</p>
              </div>
              <div className="hidden md:block w-px h-12 sx-wash" />
              <div className="text-center md:text-right">
                <span className="font-display text-lg font-bold tracking-tight text-siteink">Lalitha Arcade</span>
                <p className="text-xs uppercase tracking-widest text-sitemuted mt-1">Siddarthanagar Landmark</p>
              </div>
            </div>
          </section>

          {/* SECTION 3: SPACE CHAPTER */}
          <section ref={spaceWrapRef} className="relative h-[160vh]">
            <div className="sticky top-0 h-dvh overflow-hidden">
              <div ref={spaceFilmRef} className="absolute inset-0 w-full h-full">
                <FilmVideo
                  src="/assets/film-space.mp4"
                  poster="/assets/hero-clinic.jpg"
                  className="h-full w-full object-cover"
                  label="Calming layout of reception and clinical zone"
                />
              </div>
              <div className="absolute inset-0 bg-siteground/20" />
              <div className="absolute inset-0 flex items-center justify-end px-6 md:px-24">
                <div className="w-full max-w-md p-8 bg-sitesurface border sx-hairline rounded-3xl shadow-xl">
                  <span className="text-xs font-bold tracking-widest uppercase text-siteaccent block mb-2">The Sanctuary</span>
                  <h2 className="font-display text-3xl font-bold tracking-tight mb-4">A calming medical environment</h2>
                  <p className="text-sm text-sitemuted leading-relaxed">
                    Designed to heal. Our physical spaces use daylight, soft sound dampening, and advanced ergonomic support to make your visits peaceful.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 4: JOURNEY */}
          <section className="py-24 bg-sitesurface">
            <div className="mx-auto max-w-[1360px] px-6 md:px-10">
              <div className="mb-16">
                <span className="text-xs font-bold tracking-widest uppercase text-siteaccent">The Process</span>
                <h2 className="font-display text-4xl font-extrabold tracking-tight mt-2">Your Care Journey</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {[
                  { step: "01", title: "Diagnostic Mapping", desc: "Detailed examination and imaging to locate precise structural issues.", img: "/assets/journey-diagnostic.jpg" },
                  { step: "02", title: "Personalized Strategy", desc: "Drafting a timeline that aligns with your timeline, budget and comfort.", img: "/assets/journey-strategy.jpg" },
                  { step: "03", title: "Advanced Treatment", desc: "Pain-free clinical execution under standard sterilization guidelines.", img: "/assets/journey-treatment.jpg" },
                  { step: "04", title: "Lifetime Support", desc: "Coaching and custom prevention schedules to retain your smile.", img: "/assets/journey-support.jpg" },
                ].map((item, idx) => (
                  <div key={idx} className="border-t-4 border-siteaccent pt-6 flex flex-col justify-between">
                    <div>
                      <div className="w-full h-[140px] rounded-xl overflow-hidden mb-4 border sx-hairline">
                        <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
                      </div>
                      <span className="font-display text-4xl font-extrabold text-siteaccent/20 block">{item.step}</span>
                      <h3 className="font-display text-lg font-bold mt-2">{item.title}</h3>
                    </div>
                    <p className="text-xs text-sitemuted leading-relaxed mt-4">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 5: OFFERINGS */}
          <section className="py-24 border-y sx-hairline bg-siteground">
            <div className="mx-auto max-w-[900px] px-6">
              <div className="text-center mb-16">
                <span className="text-xs font-bold tracking-widest uppercase text-siteaccent">Specializations</span>
                <h2 className="font-display text-4xl font-extrabold tracking-tight mt-2">Specialist Offerings</h2>
              </div>
              <div className="space-y-4">
                {[
                  {
                    title: "Root Canal Treatment (RCT)",
                    duration: "45 mins",
                    desc: "Precision pulp clearing and bio-compatible sealing using computerized systems.",
                    details: "At Sukruthi Dental and Oral Care, Dr. Mahesh M. S. performs precision root canals using advanced computerized endodontic equipment. The procedure is painless and preserves the structural integrity of your natural tooth.",
                    icon: <IconRct />,
                  },
                  {
                    title: "Tooth Whitening",
                    duration: "60 mins",
                    desc: "Medical-grade bleaching activating enamel protection and instant stain removal.",
                    details: "Dissolve stains caused by caffeine, tea, foods, tobacco, or aging. In-clinic light whitening targets 6-8 shades lighter safely inside one hour.",
                    icon: <IconWhitening />,
                  },
                  {
                    title: "Dental Braces Fixing",
                    duration: "Varies",
                    desc: "Skeletal orthodontics with traditional, ceramic, or invisible aligners.",
                    details: "Correct teeth alignment, crowding, spacing, and bite issues. We offer personalized brace options and periodic tracking.",
                    icon: <IconBraces />,
                  },
                  {
                    title: "Laser Gum Surgery",
                    duration: "30 mins",
                    desc: "Surgical soft-tissue laser restoration eliminating bleeding and suturing.",
                    details: "Advanced lasers sterilize soft tissues, eliminating scalpels, needles, and stitches. The healing curve is drastically shorter.",
                    icon: <IconLaser />,
                  },
                  {
                    title: "Pits & Fissures Sealants",
                    duration: "15 mins",
                    desc: "Thin resin coatings on back molars to safeguard against decay.",
                    details: "Ideal preventive dental protection for school-going children. Keeps Molars shielded from bacteria and plaque build-up.",
                    icon: <IconSealants />,
                  },
                  {
                    title: "Impacted Tooth Extraction",
                    duration: "40 mins",
                    desc: "Removal of wisdom teeth trapped under gums, relieving alignment stress.",
                    details: "Safe surgical tooth extraction mapping root nerves via low-radiation X-rays. Minimizes bone damage and speeds post-op recovery.",
                    icon: <IconExtraction />,
                  },
                ].map((item, idx) => {
                  const isOpen = openOffering === idx;
                  const panelId = `offering-panel-${idx}`;
                  return (
                    <div key={idx} className="border sx-hairline rounded-2xl bg-sitesurface overflow-hidden transition-all duration-300">
                      <button
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() => setOpenOffering(isOpen ? null : idx)}
                        className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-siteground flex items-center justify-center">
                            {item.icon}
                          </div>
                          <div>
                            <h3 className="font-display text-lg font-bold">{item.title}</h3>
                            <span className="text-xs text-sitemuted">{item.duration} Duration</span>
                          </div>
                        </div>
                        <span className={`w-8 h-8 rounded-full border sx-hairline flex items-center justify-center font-bold text-siteaccent transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}>
                          +
                        </span>
                      </button>

                      <div
                        id={panelId}
                        className="grid transition-[grid-template-rows] duration-500 ease-out"
                        style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                      >
                        <div className="overflow-hidden">
                          <div className="px-6 pb-6 pt-2 border-t sx-hairline text-sm text-sitemuted leading-relaxed space-y-4">
                            <p>{item.desc}</p>
                            <p>{item.details}</p>
                            <div className="flex gap-4 pt-2">
                              <a
                                href={`https://wa.me/919844170621?text=${encodeURIComponent("I want to ask about: " + item.title)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-xs font-bold text-siteaccent hover:underline"
                              >
                                Ask via WhatsApp <span aria-hidden="true">→</span>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* SECTION 6: TECHNOLOGY */}
          <section className="py-24 bg-sitesurface">
            <div className="mx-auto max-w-[1360px] px-6 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-xs font-bold tracking-widest uppercase text-siteaccent">Diagnostics</span>
                <h2 className="font-display text-4xl font-extrabold tracking-tight mt-2 mb-6">
                  State-of-the-Art <span className="text-siteaccent">Digital Dentistry</span>
                </h2>
                <p className="text-sm text-sitemuted leading-relaxed mb-6">
                  Our clinic is equipped with computerized diagnostics, intraoral digital scanners, low-radiation dental X-rays, and specialized endodontic motors to ensure that diagnostic mapping and surgery details are accurate, predictable, and clean.
                </p>
                <ul className="space-y-3 text-xs font-bold text-siteink">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-siteaccent" /> Low Radiation Imaging
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-siteaccent" /> Advanced Diode Laser Pen
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-siteaccent" /> Specialized Sterilization Protocols
                  </li>
                </ul>
              </div>
              <div className="h-[300px] md:h-[450px] rounded-3xl overflow-hidden shadow-xl border sx-hairline">
                <FilmVideo
                  src="/assets/film-tech.mp4"
                  poster="/assets/doctor-treatment.jpg"
                  className="w-full h-full object-cover"
                  label="Close up of advanced digital diagnostic tools"
                />
              </div>
            </div>
          </section>

          {/* SECTION 7: PROTOCOL BAND */}
          <section className="py-12 sx-wash border-y sx-hairline text-center">
            <div className="mx-auto max-w-2xl px-6">
              <span className="text-xs font-bold tracking-widest uppercase text-siteaccent">Safety & Cleanliness</span>
              <h3 className="font-display text-xl font-bold mt-2 mb-4">Class-B Autoclave Sterilization Protocols</h3>
              <div className="flex flex-wrap justify-center gap-6 text-xs text-sitemuted">
                <span>Disposable Equipment</span>
                <span>•</span>
                <span>Chemical Disinfection</span>
                <span>•</span>
                <span>Air Purifiers in Operation</span>
                <span>•</span>
                <span>Touch-free Sanitation</span>
              </div>
            </div>
          </section>

          {/* SECTION 8: TEAM */}
          <section className="py-24 bg-sitesurface border-b sx-hairline">
            <div className="mx-auto max-w-[1360px] px-6 md:px-10">
              <div className="mb-16">
                <span className="text-xs font-bold tracking-widest uppercase text-siteaccent">The Specialists</span>
                <h2 className="font-display text-4xl font-extrabold tracking-tight mt-2">Clinic Leadership</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="w-32 h-32 rounded-2xl overflow-hidden bg-siteground shrink-0 border sx-hairline">
                    <img src="/assets/doctor-treatment.jpg" alt="Clinical Specialist Profile" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-bold">Dr. Mahesh M. S.</h3>
                    <p className="text-xs text-siteaccent font-bold uppercase tracking-widest mt-1">Lead Dental Surgeon & Proprietor</p>
                    <p className="text-xs text-sitemuted leading-relaxed mt-4">
                      Directing clinic operations since 2018 with absolute focus on patient comfort, dental safety, and precision.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="w-32 h-32 rounded-2xl overflow-hidden bg-siteground shrink-0 border sx-hairline">
                    <img src="/assets/doctor-treatment.jpg" alt="Specialist Orthodontic Lead Profile" className="w-full h-full object-cover object-[center_65%]" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-bold">Dr. Divya Mahesh</h3>
                    <p className="text-xs text-siteaccent font-bold uppercase tracking-widest mt-1">Senior Orthodontist Specialist</p>
                    <p className="text-xs text-sitemuted leading-relaxed mt-4">
                      Specialized dental alignment, braces, and pediatric comfort care, creating personalized cosmetic restoration plans.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 9: NICHE BAND */}
          <section className="py-16 bg-siteground text-center">
            <div className="mx-auto max-w-xl px-6 flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-sitesurface border sx-hairline flex items-center justify-center mb-6">
                <IconImplants />
              </div>
              <h3 className="font-display text-2xl font-bold tracking-tight mb-4">Signature Implants</h3>
              <p className="text-xs text-sitemuted leading-relaxed max-w-md">
                We design dental anchors using bio-compatible titanium posts, rebuilding missing teeth structures to provide 100% natural bite strength.
              </p>
            </div>
          </section>

          {/* SECTION 10: CARE (Asymmetric Offset) */}
          <section className="py-24 bg-sitesurface">
            <div className="mx-auto max-w-[1360px] px-6 md:px-10 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
              <div className="md:col-span-5 md:order-2">
                <span className="text-xs font-bold tracking-widest uppercase text-siteaccent">Quiet Dental Comfort</span>
                <h2 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight leading-none mt-2 mb-6">
                  Family and Child Comfort
                </h2>
                <p className="text-sm text-sitemuted leading-relaxed mb-6">
                  Visiting the dentist should not be scary. We offer dedicated pediatric checkups and sealants using positive dental reinforcement, explaining every tool to make kids comfortable.
                </p>
                <button onClick={() => setBookingModal(true)} className="text-xs font-bold text-siteaccent hover:underline">
                  Consult Pediatric Options →
                </button>
              </div>

              <div ref={careImgRef} className="md:col-span-7 md:order-1 relative">
                <div className="w-[85%] h-[350px] md:h-[480px] rounded-3xl overflow-hidden shadow-xl border sx-hairline">
                  <FilmVideo
                    src="/assets/film-care.mp4"
                    poster="/assets/doctor-treatment.jpg"
                    className="w-full h-full object-cover"
                    label="Smiling child holding model teeth setup"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 11: QUOTE */}
          <section className="py-24 border-y sx-hairline bg-sitesurface text-center">
            <div className="mx-auto max-w-3xl px-6">
              <span className="text-5xl text-siteaccent/20 block font-serif mb-4">“</span>
              <p className="font-display text-xl md:text-2xl italic font-bold tracking-tight text-siteink mb-6">
                Thorough professional and cordial approach were observed during the diagnosis, evaluation, advice listing options and treatment. The ambience in the clinic was good. Cashless Scan-Pay facility was available.
              </p>
              <cite className="not-italic text-xs font-bold uppercase tracking-widest text-sitemuted">
                — B Janardhanan, Verified Patient
              </cite>
            </div>
          </section>

          {/* SECTION 12: PROMISES */}
          <section className="py-24 bg-siteground">
            <div className="mx-auto max-w-[1360px] px-6 md:px-10">
              <div className="mb-16">
                <span className="text-xs font-bold tracking-widest uppercase text-siteaccent">Commitment</span>
                <h2 className="font-display text-4xl font-extrabold tracking-tight mt-2">Our Three Promises</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { num: "I", label: "Pure Hygiene Guarantee", text: "Every dental explorer tool is subjected to thorough Class-B sterilization cycles before clinical touch." },
                  { num: "II", label: "Pain Management", text: "We utilize advanced localized anesthetics and slow laser treatments to avoid discomfort." },
                  { num: "III", label: "Pre-Budget Disclosure", text: "Complete treatment layout details, timelines, and costs are shared before work begins." },
                ].map((item, idx) => (
                  <div key={idx} className="p-8 bg-sitesurface border sx-hairline rounded-2xl shadow-sm">
                    <span className="font-display text-3xl font-extrabold text-siteaccent/30 block mb-4">{item.num}</span>
                    <h3 className="font-display text-lg font-bold mb-2">{item.label}</h3>
                    <p className="text-xs text-sitemuted leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 13: FEATURE PORTRAIT */}
          <section className="py-24 bg-sitesurface">
            <div className="mx-auto max-w-[1360px] px-6 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="h-[400px] md:h-[550px] rounded-3xl overflow-hidden shadow-xl border sx-hairline">
                <FilmVideo
                  src="/assets/film-whitening.mp4"
                  poster="/assets/service-whitening.jpg"
                  className="w-full h-full object-cover object-[center_65%]"
                  label="Indian patient displaying perfectly aligned white teeth"
                />
              </div>
              <div>
                <span className="text-xs font-bold tracking-widest uppercase text-siteaccent">Esthetics</span>
                <h2 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight leading-none mt-2 mb-6">
                  Smile Transformation
                </h2>
                <p className="text-sm text-sitemuted leading-relaxed mb-6">
                  Cosmetic restorative dentistry corrects structural tooth gaps, shape deformities, and color stains. We combine modern ceramic crowns and bridge fixing to recreate a balanced face line.
                </p>
                <div className="flex gap-4">
                  <button
                    onClick={() => setBookingModal(true)}
                    className="px-6 py-3 bg-siteaccent text-white font-display text-xs font-bold rounded-full"
                  >
                    Discuss Cosmetic Options
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 14: URGENCY BAND */}
          <section className="py-16 bg-siteaccent text-white text-center">
            <div className="mx-auto max-w-xl px-6">
              <h3 className="font-display text-2xl md:text-4xl font-extrabold mb-4">Experiencing Dental Pain?</h3>
              <p className="text-xs text-white/80 leading-relaxed mb-8">
                Do not neglect teeth throbbing or molar swelling. Contact our duty desk for immediate emergency directions.
              </p>
              <a
                href="tel:+919844170621"
                className="inline-flex items-center gap-3 px-8 py-4 bg-sitesurface text-siteaccent rounded-full font-display text-sm font-bold transition-transform hover:scale-105 shadow-md"
              >
                Call Clinic Helpdesk
              </a>
            </div>
          </section>

          {/* SECTION 15: FAQ Accordion */}
          <section className="py-24 bg-sitesurface border-b sx-hairline">
            <div className="mx-auto max-w-[800px] px-6">
              <div className="text-center mb-16">
                <span className="text-xs font-bold tracking-widest uppercase text-siteaccent">FAQ</span>
                <h2 className="font-display text-4xl font-extrabold tracking-tight mt-2">Questions & Answers</h2>
              </div>
              <div className="space-y-4">
                {[
                  { q: "How can I contact Sukruthi Dental for appointments?", a: "You can call our clinic desk directly at +91 98441 70621 or alternate number +91 85115 23134. Online slot registration is also available through this page." },
                  { q: "What are the clinic timings?", a: "We are open Monday to Saturday from 10:00 AM to 9:00 PM. The clinic is closed on Sundays." },
                  { q: "Is cashless payment accepted?", a: "Yes, we support card payments, net banking, and UPI payments (Google Pay, PhonePe, Paytm, etc.)." },
                  { q: "What is a Post & Core Crown procedure?", a: "A post & core crown rebuilds severely damaged or root-canal treated teeth. A thin post anchors inside the canal, securing a durable ceramic crown that restores bite force." },
                  { q: "Where is the clinic located?", a: "We are on the 1st Floor, Lalitha Arcade, Siddarthanagar, Mysore (Near Above Axis Bank)." },
                ].map((item, idx) => {
                  const isOpen = openFaq === idx;
                  const panelId = `faq-panel-${idx}`;
                  return (
                    <div key={idx} className="border sx-hairline rounded-xl bg-siteground overflow-hidden">
                      <button
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                        className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                      >
                        <h3 className="font-display text-base font-bold text-siteink">{item.q}</h3>
                        <span className={`text-siteaccent font-bold transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
                          ▼
                        </span>
                      </button>
                      <div
                        id={panelId}
                        className="grid transition-[grid-template-rows] duration-300 ease-out"
                        style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                      >
                        <div className="overflow-hidden">
                          <p className="px-6 pb-6 pt-2 text-xs text-sitemuted leading-relaxed border-t sx-hairline">
                            {item.a}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* SECTION 16: LEGACY STATEMENT */}
          <section className="py-24 bg-sitesurface text-center">
            <div className="mx-auto max-w-2xl px-6">
              <h3 className="font-display text-lg tracking-wide uppercase text-sitemuted">Empowering Smiles</h3>
              <p className="font-display text-2xl md:text-4xl font-extrabold text-siteink mt-4 leading-snug">
                Restoring bite health, building confidence, and delivering <span className="text-siteaccent">precision care</span> for Mysore.
              </p>
            </div>
          </section>

          {/* SECTION 17: CHECKLIST */}
          <section className="py-16 sx-wash border-y sx-hairline">
            <div className="mx-auto max-w-xl px-6">
              <h3 className="font-display text-lg font-bold text-center mb-8">First Visit Checklist</h3>
              <ul className="space-y-4 text-xs font-bold text-siteink">
                <li className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded bg-siteaccent text-white flex items-center justify-center font-mono">✓</span>
                  Bring medical reports or past dental history prints if available.
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded bg-siteaccent text-white flex items-center justify-center font-mono">✓</span>
                  Arrive 10 minutes prior to complete initial paperwork.
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded bg-siteaccent text-white flex items-center justify-center font-mono">✓</span>
                  Details of current medications or systemic health issues.
                </li>
              </ul>
            </div>
          </section>

          {/* SECTION 18: VISIT FINALE */}
          <section id="visit" className="relative overflow-hidden min-h-dvh flex items-center">
            <div className="absolute inset-0 w-full h-full">
              <FilmVideo
                src="/assets/film-finale.mp4"
                poster="/assets/happy-smile.jpg"
                className="w-full h-full object-cover"
                label="Clinic exterior environment and medical specialist crew"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-siteground/70 via-transparent to-transparent" />

            <div className="relative z-10 w-full max-w-[1360px] mx-auto px-6 md:px-10 py-32 flex flex-col md:flex-row justify-between items-start md:items-stretch gap-12">
              {/* Info Card */}
              <div className="w-full max-w-md bg-sitesurface border sx-hairline p-8 rounded-3xl shadow-xl">
                <span className="text-xs font-bold tracking-widest uppercase text-siteaccent block mb-2">Visit Clinic</span>
                <h2 className="font-display text-3xl font-extrabold mb-6">Sukruthi Dental</h2>
                <div className="space-y-6 text-xs leading-relaxed text-sitemuted">
                  <div>
                    <h4 className="font-bold text-siteink mb-1">Clinic Address</h4>
                    <p>Lalitha Arcade, 1st Floor, Siddarthanagar,</p>
                    <p>Near Above Axis Bank, Mysore, Karnataka 570011</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-siteink mb-1">Timings</h4>
                    <p>Monday – Saturday: 10:00 AM – 9:00 PM</p>
                    <p className="font-bold text-siteaccent mt-1">Sunday: Closed</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-siteink mb-1">Direct Helplines</h4>
                    <p>Primary: <a href="tel:+919844170621" className="font-bold text-siteaccent underline">+91 98441 70621</a></p>
                    <p>Secondary: +91 85115 23134</p>
                  </div>
                </div>
                <div className="mt-8 pt-6 border-t sx-hairline">
                  <button
                    onClick={() => setBookingModal(true)}
                    className="w-full py-4 text-center font-display text-[15px] font-bold text-white bg-siteaccent rounded-full"
                  >
                    Secure Your Slot
                  </button>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Footer info row */}
        <footer className="border-t sx-hairline bg-sitesurface py-8">
          <div className="mx-auto max-w-[1360px] px-6 md:px-10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-sitemuted">
            <p>&copy; 2026 Sukruthi Dental and Oral Care. All rights reserved.</p>
            <p>Lalitha Arcade, Mysore, Karnataka 570011</p>
          </div>
        </footer>

        {/* BOOKING MODAL */}
        {bookingModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-siteink/40 backdrop-blur-md">
            <div className="relative w-full max-w-lg bg-sitesurface border sx-hairline rounded-3xl p-8 shadow-2xl">
              <button
                onClick={() => {
                  setBookingModal(false);
                  setBookingDetails(null);
                }}
                className="absolute top-4 right-4 text-xl font-bold text-sitemuted hover:text-siteink"
              >
                &times;
              </button>

              {!bookingDetails ? (
                <form onSubmit={handleBookingSubmit} className="space-y-6">
                  <div>
                    <h3 className="font-display text-2xl font-bold tracking-tight">Book Appointment</h3>
                    <p className="text-xs text-sitemuted mt-1">Provide your details to register a slot.</p>
                  </div>
                  <div className="space-y-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-siteink">Full Name</label>
                      <input name="name" type="text" required placeholder="John Doe" className="px-4 py-3 bg-siteground border sx-hairline rounded-xl outline-none focus:border-siteaccent text-sm" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-siteink">Contact Phone</label>
                      <input name="phone" type="tel" required pattern="[0-9]{10}" placeholder="9844170621" className="px-4 py-3 bg-siteground border sx-hairline rounded-xl outline-none focus:border-siteaccent text-sm" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-siteink">Treatment</label>
                      <select name="service" className="px-4 py-3 bg-siteground border sx-hairline rounded-xl outline-none focus:border-siteaccent text-sm">
                        <option value="Consultation">General Consultation</option>
                        <option value="RCT">Root Canal Treatment (RCT)</option>
                        <option value="Whitening">Tooth Whitening</option>
                        <option value="Braces">Dental Braces Fixing</option>
                        <option value="Laser">Laser Gum Surgery</option>
                        <option value="Sealants">Pits & Fissures Sealants</option>
                        <option value="Extraction">Impacted Tooth Extraction</option>
                      </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-bold text-siteink">Date</label>
                        <input name="date" type="date" required className="px-4 py-3 bg-siteground border sx-hairline rounded-xl outline-none focus:border-siteaccent text-sm" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-bold text-siteink">Preferred Time</label>
                        <input name="time" type="time" required className="px-4 py-3 bg-siteground border sx-hairline rounded-xl outline-none focus:border-siteaccent text-sm" />
                      </div>
                    </div>
                  </div>
                  <button type="submit" className="w-full py-4 text-center font-display text-[15px] font-bold text-white bg-siteaccent rounded-full">
                    Register Slot
                  </button>
                </form>
              ) : (
                <div className="space-y-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-siteaccent/10 text-siteaccent flex items-center justify-center text-3xl mx-auto">
                    ✓
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-bold tracking-tight">Slot Pre-Registered!</h3>
                    <p className="text-xs text-sitemuted mt-1">Receipt details generated successfully.</p>
                  </div>
                  <div className="p-6 bg-siteground border sx-hairline rounded-2xl text-left text-xs space-y-2">
                    <p><strong>Registration ID:</strong> {bookingDetails.regId}</p>
                    <p><strong>Patient Name:</strong> {bookingDetails.name}</p>
                    <p><strong>Phone:</strong> +91 {bookingDetails.phone}</p>
                    <p><strong>Service:</strong> {bookingDetails.service}</p>
                    <p><strong>Time:</strong> {bookingDetails.date} at {bookingDetails.time}</p>
                  </div>
                  <div className="flex gap-4">
                    <button onClick={downloadReceipt} className="flex-1 py-3 border border-siteaccent text-siteaccent font-display text-xs font-bold rounded-full">
                      Save Receipt
                    </button>
                    <button
                      onClick={() => {
                        setBookingModal(false);
                        setBookingDetails(null);
                      }}
                      className="flex-1 py-3 bg-siteaccent text-white font-display text-xs font-bold rounded-full"
                    >
                      Done
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </SmoothScroll>
  );
}
