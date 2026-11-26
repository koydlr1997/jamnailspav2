import { useEffect } from "react";
import heroImage from "../../../assets/images/heroimage1.png";

export function PageIntro({ onComplete, onReveal }: { onComplete: () => void; onReveal: () => void }) {

  useEffect(() => {
    const duration = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? 0
      : 1500;
    const timeout = window.setTimeout(onComplete, duration);
    const reveal = window.setTimeout(onReveal, duration ? 1000 : 0);
    return () => {
      window.clearTimeout(timeout);
      window.clearTimeout(reveal);
    };
  }, [onComplete, onReveal]);

  return (
    <div
      aria-hidden="true"
      className="page-intro fixed inset-0 z-50 overflow-hidden bg-intro"
    >
      <div className="page-intro-circle absolute left-1/2 top-1/2 size-[160vmax] -translate-x-1/2 -translate-y-1/2 bg-surface" />
      <div
        className="absolute inset-0 bg-size-[auto_85%] bg-bottom bg-no-repeat md:bg-cover md:bg-center xl:bg-contain"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
    </div>
  );
}
