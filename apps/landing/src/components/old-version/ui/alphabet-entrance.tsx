import { useEffect, useState } from "react";

type AlphabetEntranceProps = {
  text: string;
  onComplete?: () => void;
};

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ+";
const stepMs = 9;

export function AlphabetEntrance({ text, onComplete }: AlphabetEntranceProps) {
  const [display, setDisplay] = useState("");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onComplete?.();
      return;
    }

    const letters = text.toUpperCase();
    let frame = 0;
    let startedAt = 0;

    const tick = (now: number) => {
      if (!startedAt) startedAt = now;
      let steps = Math.floor((now - startedAt) / stepMs);
      let result = "";

      for (const letter of letters) {
        const target = alphabet.indexOf(letter);
        if (target < 0) {
          result += letter;
          continue;
        }
        if (steps > target) {
          result += letter;
          steps -= target + 1;
        } else {
          result += alphabet[steps];
          steps = -1;
          break;
        }
      }

      setDisplay(result);
      if (result !== letters) frame = window.requestAnimationFrame(tick);
      else onComplete?.();
    };

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [text, onComplete]);

  return (
    <span className="relative inline-block whitespace-nowrap" aria-hidden="true">
      <span className="invisible">{text}</span>
      <span className="absolute inset-0">{display || text}</span>
    </span>
  );
}
