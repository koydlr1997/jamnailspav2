import { useState } from "react";

export function MenuToggle() {
  const [active, setActive] = useState(false);

  return (
    <button
      type="button"
      aria-label="Toggle menu icon"
      aria-pressed={active}
      onClick={() => setActive((value) => !value)}
      className="relative flex size-menu-touch cursor-pointer items-center justify-center md:hidden"
    >
      <span
        aria-hidden="true"
        className={`absolute h-menu-line w-menu-icon rounded-full bg-ink transition-transform duration-300 ease-in-out motion-reduce:transition-none ${active ? "rotate-45" : "-translate-y-menu-gap"}`}
      />
      <span
        aria-hidden="true"
        className={`absolute h-menu-line w-menu-icon rounded-full bg-ink transition-transform duration-300 ease-in-out motion-reduce:transition-none ${active ? "-rotate-45" : "translate-y-menu-gap"}`}
      />
    </button>
  );
}
