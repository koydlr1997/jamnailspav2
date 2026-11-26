import { useEffect, useRef } from "react";
import frame1 from "../../assets/hero-movement-01/frame_01.png";
import frame2 from "../../assets/hero-movement-01/frame_02.png";
import frame3 from "../../assets/hero-movement-01/frame_03.png";
import frame4 from "../../assets/hero-movement-01/frame_04.png";
import frame5 from "../../assets/hero-movement-01/frame_05.png";
import frame6 from "../../assets/hero-movement-01/frame_06.png";
import frame7 from "../../assets/hero-movement-01/frame_07.png";

const frames = [frame1, frame2, frame3, frame4, frame5, frame6, frame7];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const imagesRef = useRef<(HTMLDivElement | null)[]>([]);
  const eyeButtonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    let current = 0;
    let touchY = 0;
    let preparing = false;
    let disposed = false;
    let autoplay = false;
    let autoplayTimer = 0;
    const decoded = imagesRef.current.map((layer) => {
      const image = layer?.querySelector("img");
      return image ? image.decode().then(() => true, () => false) : Promise.resolve(false);
    });
    const update = () => {
      if (eyeButtonRef.current) eyeButtonRef.current.hidden = current !== 0;
      imagesRef.current.forEach((image, index) => {
        if (!image) return;
        image.style.visibility = "visible";
        image.style.opacity = String(index <= current ? 1 : 0);
      });
    };
    const playToEnd = () => {
      if (autoplay || current !== 0) return;
      autoplay = true;
      const step = () => {
        if (disposed || current === frames.length - 1) { autoplay = false; return; }
        advance(1, () => {
          autoplayTimer = window.setTimeout(step, 200);
        });
      };
      step();
    };
    const advance = (direction: number, onAdvanced?: () => void) => {
      const next = Math.max(0, Math.min(frames.length - 1, current + direction));
      if (next === current) return false;
      if (preparing) return true;
      preparing = true;
      void decoded[next].then((ready) => {
        preparing = false;
        if (disposed || !ready) { autoplay = false; return; }
        current = next;
        update();
        onAdvanced?.();
      });
      return true;
    };
    const wheel = (event: WheelEvent) => {
      if (autoplay) { event.preventDefault(); return; }
      if (event.ctrlKey || Math.abs(event.deltaY) < 2 || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
      if (advance(Math.sign(event.deltaY))) event.preventDefault();
    };
    const touchStart = (event: TouchEvent) => { touchY = event.touches[0].clientY; };
    const touchMove = (event: TouchEvent) => {
      if (autoplay) { event.preventDefault(); return; }
      const delta = touchY - event.touches[0].clientY;
      if (Math.abs(delta) < 30) return;
      if (advance(Math.sign(delta))) event.preventDefault();
      touchY = event.touches[0].clientY;
    };
    const section = sectionRef.current;
    const eyeButton = eyeButtonRef.current;
    eyeButton?.addEventListener("click", playToEnd);
    update();
    section?.addEventListener("wheel", wheel, { passive: false });
    section?.addEventListener("touchstart", touchStart, { passive: true });
    section?.addEventListener("touchmove", touchMove, { passive: false });
    return () => {
      disposed = true;
      window.clearTimeout(autoplayTimer);
      eyeButton?.removeEventListener("click", playToEnd);
      section?.removeEventListener("wheel", wheel);
      section?.removeEventListener("touchstart", touchStart);
      section?.removeEventListener("touchmove", touchMove);
    };
  }, []);
  return (
    <section
      aria-label="Jàm Nail Spa"
      ref={sectionRef}
      data-lenis-prevent
      className="relative h-screen w-full"
    >
      <div className="hero-frame-background sticky top-0 h-screen w-full overflow-hidden">
        {frames.map((src, index) => (
          <div
            key={src}
            ref={(element) => {
              imagesRef.current[index] = element;
            }}
            style={{ opacity: index === 0 ? 1 : 0 }}
            className="hero-frame-background absolute inset-0 transition-opacity duration-200 ease-in-out motion-reduce:transition-none"
          >
            <img
              src={src}
              alt=""
              fetchPriority={index === 0 ? "high" : "auto"}
              decoding="async"
              className="hero-frame-image absolute left-1/2 top-1/2 h-auto max-h-full -translate-x-1/2 -translate-y-1/2 object-contain"
              style={{ width: "min(100%, calc(100vh * 3344 / 1882))", aspectRatio: "3344 / 1882" }}
            />
          </div>
        ))}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
          style={{ width: "min(100%, calc(100vh * 3344 / 1882))", aspectRatio: "3344 / 1882" }}
        >
          <button
            ref={eyeButtonRef}
            type="button"
            aria-label="Play the hero frame sequence"
            className="pointer-events-auto absolute cursor-pointer bg-transparent focus-visible:outline-2 focus-visible:outline-ink"
            style={{ left: "55.8%", top: "12.8%", width: "7%", height: "5.5%" }}
          />
        </div>
      </div>
    </section>
  );
}
