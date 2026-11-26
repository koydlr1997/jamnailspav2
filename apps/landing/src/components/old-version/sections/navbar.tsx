import { useCallback, useEffect, useState } from "react";
import { Services } from "./services";
import { landingContent } from "../../../data/landing";
import { StrikeLink, StrikeText } from "../ui/strike-link";
import { AlphabetEntrance } from "../ui/alphabet-entrance";

export function Navbar({
  servicesActive,
  onServicesChange,
  selectedCategory,
  onCategoryChange,
  onHome,
  selectedNail,
  onNailChange,
}: {
  servicesActive: boolean;
  onServicesChange: (active: boolean) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  onHome: () => void;
  selectedNail: string;
  onNailChange: (nail: string) => void;
}) {
  const [servicesReady, setServicesReady] = useState(false);
  useEffect(() => {
    if (!servicesActive) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onServicesChange(false);
    };
    window.addEventListener("keydown", escape);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", escape);
    };
  }, [servicesActive, onServicesChange]);
  const showServicesPlus = useCallback(() => setServicesReady(true), []);

  return (
    <header className="absolute inset-x-0 top-navbar-mobile z-10 bg-transparent text-ink md:top-7">
      <nav
        aria-label="Main navigation"
        className="relative flex min-h-navbar-height items-center justify-end px-navbar md:justify-center md:px-navbar-tablet xl:px-navbar-desktop"
      >
        <Services active={servicesActive} selectedCategory={selectedCategory} onCategoryChange={onCategoryChange} selectedNail={selectedNail} onNailChange={onNailChange} />
        <div
          className="absolute left-navbar z-20 flex flex-col items-start font-oswald text-xl font-medium leading-tight md:left-navbar-tablet xl:left-navbar-desktop xl:text-2xl"
          aria-label="Page sections"
        >
          {landingContent.navigationItems.map((label) =>
            label === "SERVICES" ? (
              <button
                key={label}
                type="button"
                className="group inline-flex cursor-pointer items-center gap-2 text-left"
                aria-label={label}
                aria-expanded={servicesActive}
                aria-controls="services-panel"
                onClick={() => onServicesChange(!servicesActive)}
              >
                <StrikeText><AlphabetEntrance text={label} onComplete={showServicesPlus} /></StrikeText>
                <span
                  aria-hidden="true"
                  className={`text-services-plus leading-none xl:text-4xl ${servicesReady ? "opacity-100" : "opacity-0"}`}
                >
                  {servicesActive ? "−" : "+"}
                </span>
              </button>
            ) : (
              <StrikeLink
                key={label}
                href={label === "OUR DESIGN" ? "#designs" : "#find-us"}
                aria-label={label}
              >
                <AlphabetEntrance text={label} />
              </StrikeLink>
            ),
          )}
        </div>
        <a
          href={import.meta.env.BASE_URL}
          onClick={(event) => {
            if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
            event.preventDefault();
            onHome();
          }}
          aria-label={landingContent.businessName}
          className="relative z-20 font-oswald text-brand-mobile font-medium leading-none md:text-brand"
        >
          {landingContent.logoText}
        </a>
        <div
          className="absolute right-navbar z-20 hidden flex-col items-end font-oswald text-xl font-medium leading-tight md:right-navbar-tablet md:flex xl:right-navbar-desktop xl:text-2xl"
          aria-label="Social platforms"
        >
          {landingContent.socialLinks.map(({ label, href }) => (
            <StrikeLink
              key={label}
              href={href}
              aria-label={label}
              target="_blank"
              rel="noopener noreferrer"
            >
              <AlphabetEntrance text={label} />
            </StrikeLink>
          ))}
        </div>
      </nav>
    </header>
  );
}
