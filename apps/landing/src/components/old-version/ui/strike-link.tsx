import type { ComponentPropsWithoutRef, ReactNode } from "react";

type StrikeLinkProps = ComponentPropsWithoutRef<"a">;

export function StrikeLink({ children, className = "", ...props }: StrikeLinkProps) {
  return (
    <a
      {...props}
      className={`group inline-block no-underline ${className}`}
    >
      <StrikeText>{children}</StrikeText>
    </a>
  );
}

export function StrikeText({ children }: { children: ReactNode }) {
  return (
      <span className="relative inline-block">
        {children}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -inset-x-strike-overhang top-1/2 h-strike -translate-y-1/2 origin-left scale-x-0 bg-strike transition-transform duration-300 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100 motion-reduce:transition-none"
        />
      </span>
  );
}
