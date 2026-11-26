import { useEffect, useRef, useState } from "react";
import heroImage1 from "../../../assets/images/heroimage1.png";
import heroImage2 from "../../../assets/images/heroimage2.png";
import heroImage3 from "../../../assets/images/heroimage3.png";
import heroImage4 from "../../../assets/images/heroimage4.png";
import { landingContent } from "../../../data/landing";

const imageClasses =
  "bg-hero bg-size-[auto_85%] bg-bottom bg-no-repeat md:bg-cover md:bg-center xl:bg-contain";
const heroImages = [heroImage1, heroImage2, heroImage3, heroImage4];

// Deterministic, layered irregularity keeps the tear stable between renders.
const tornEdge = Array.from({ length: 801 }, (_, i) => {
  const y = i / 8;
  // Broad asymmetric bends, with smaller folds along the torn edge.
  const drift =
    Math.sin(y * 0.105 - 0.5) * 1.3 +
    Math.sin(y * 0.31 + 0.8) * 0.6 +
    Math.sin(y * 0.83) * 0.25;
  const grain = Math.sin(i * 12.9898 + 78.233) * 43758.5453;
  const roughness = (grain - Math.floor(grain) - 0.5) * 0.22;
  return [49.5 + drift + roughness, y];
});
// Uneven paper thickness creates broad exposed patches and narrow pinches.
const createPaperOutline = (thickness: number) =>
  [
    ...tornEdge.map(([x, y]) => {
      const width = 0.12 + Math.pow((Math.sin(y * 0.58) + 1) / 2, 2) * 0.65;
      return `${x - width * thickness},${y}`;
    }),
    ...[...tornEdge].reverse().map(([x, y]) => `${x + 0.13 * thickness},${y}`),
  ].join(" ");
const paperOutline = createPaperOutline(0.7);
const mobileTabletPaperOutline = createPaperOutline(0.7 * 1.4 * 1.6);

const grayscaleClip = `polygon(${tornEdge.map(([x, y]) => `${x}% ${y}%`).join(", ")}, 100% 100%, 100% 0%)`;

export function Hero({ paused = false, onCategorySelect }: { paused?: boolean; onCategorySelect: (category: string) => void }) {
  const heroRef = useRef<HTMLElement>(null);
  const [prominent, setProminent] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setProminent(entry.isIntersecting && entry.intersectionRatio >= 0.5);
    }, { threshold: [0, 0.5] });
    if (heroRef.current) observer.observe(heroRef.current);
    const updateVisibility = () => setTabVisible(!document.hidden);
    updateVisibility();
    document.addEventListener("visibilitychange", updateVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, []);
  const [entering, setEntering] = useState(true);
  useEffect(() => {
    const timer = window.setTimeout(() => setEntering(false), 2800);
    return () => window.clearTimeout(timer);
  }, []);
  const [imageIndex, setImageIndex] = useState(0);
  const previousIndex =
    (imageIndex - 1 + heroImages.length) % heroImages.length;

  useEffect(() => {
    heroImages.slice(1).forEach((src) => {
      const nextImage = new Image();
      nextImage.src = src;
    });

    if (paused || !prominent || !tabVisible) return;
    const interval = window.setInterval(() => {
      setImageIndex((current) => (current + 1) % heroImages.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, [paused, prominent, tabVisible]);

  return (
    <section
      ref={heroRef}
      aria-label={landingContent.businessName}
      className={`relative isolate h-screen overflow-hidden bg-hero ${entering ? "hero-entering" : ""}`}
    >
      {heroImages.map((src, index) => (
        <div
          key={src}
          aria-hidden={index !== imageIndex}
          inert={index !== imageIndex || paused}
          className={`hero-slide absolute inset-0 ${imageClasses}`}
          style={{
            backgroundImage: `url(${src})`,
            zIndex:
              index === imageIndex
                ? 2
                : index ===
                    (imageIndex - 1 + heroImages.length) % heroImages.length
                  ? 1
                  : 0,
            transform: `scaleY(${index === imageIndex ? 1 : 0})`,
            transformOrigin: index === imageIndex ? "50% 100%" : "50% 0%",
          }}
        >
          <div className="hero-right-entrance absolute inset-0">
            <div
              className={`absolute inset-0 grayscale brightness-85 ${imageClasses}`}
              style={{
                backgroundImage: `url(${src})`,
                clipPath: grayscaleClip,
              }}
            />
            <div
              className="absolute inset-0 bg-hero-tint/25 mix-blend-multiply"
              style={{ clipPath: grayscaleClip }}
            />
          </div>
          <div className="absolute inset-x-0 bottom-hero-title z-10 origin-bottom scale-y-[1.35] px-navbar text-center font-passion text-hero-title leading-[0.75] tracking-hero-title text-hero-title-left md:scale-y-[1.265] md:text-hero-title-tablet md:leading-none xl:text-hero-title-desktop">
            <button
              type="button"
              onClick={() => onCategorySelect(landingContent.heroServiceCategories[index])}
              className={`inline-block cursor-pointer ${index === imageIndex ? "hero-title-reveal origin-bottom" : index === previousIndex ? "hero-title-exit origin-top" : "opacity-0"}`}
            >
              {landingContent.heroTitles[index]}
            </button>
          </div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-10"
            style={{ clipPath: grayscaleClip }}
          >
            <div className="hero-title-white absolute inset-x-0 bottom-hero-title origin-bottom scale-y-[1.35] px-navbar text-center font-passion text-hero-title leading-[0.75] tracking-hero-title text-surface md:scale-y-[1.265] md:text-hero-title-tablet md:leading-none xl:text-hero-title-desktop">
              <span
                className={`inline-block ${index === imageIndex ? "hero-title-reveal origin-bottom" : index === previousIndex ? "hero-title-exit origin-top" : "opacity-0"}`}
              >
                {landingContent.heroTitles[index]}
              </span>
            </div>
          </div>
          <svg
            aria-hidden="true"
            className="hero-paper-entrance pointer-events-none absolute inset-0 z-20 h-full w-full text-surface"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <filter
                id={`paper-tear-texture-${index}`}
                x="-100%"
                y="-10%"
                width="300%"
                height="120%"
                colorInterpolationFilters="sRGB"
              >
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="8 3"
                  numOctaves="3"
                  seed="12"
                  result="grain"
                />
                <feDisplacementMap
                  in="SourceGraphic"
                  in2="grain"
                  scale="0.32"
                  xChannelSelector="R"
                  yChannelSelector="G"
                  result="frayed"
                />
                <feComposite
                  in="grain"
                  in2="frayed"
                  operator="in"
                  result="paperGrain"
                />
                <feBlend in="frayed" in2="paperGrain" mode="soft-light" />
                <feDropShadow
                  dx="0.12"
                  dy="0.02"
                  stdDeviation="0.08"
                  floodOpacity="0.2"
                />
              </filter>
            </defs>
            <polygon
              className="hidden xl:block"
              points={paperOutline}
              fill="currentColor"
              filter={`url(#paper-tear-texture-${index})`}
            />
            <polygon
              className="xl:hidden"
              points={mobileTabletPaperOutline}
              fill="currentColor"
              filter={`url(#paper-tear-texture-${index})`}
            />
          </svg>
        </div>
      ))}
      <h1 className="sr-only">{landingContent.heroTitles[imageIndex]}</h1>
    </section>
  );
}
