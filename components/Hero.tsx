import type { ReactNode } from "react";

interface HeroProps {
  eyebrow?: string;
  title: string;
  description: string;
  children?: ReactNode;
}

export function Hero({ eyebrow, title, description, children }: HeroProps) {
  return (
    <section className="border-b border-line">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-16">
        <div className="max-w-3xl">
          {eyebrow ? (
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-clay">{eyebrow}</p>
          ) : null}
          <h1 className="text-4xl font-bold leading-tight text-ink sm:text-5xl lg:text-6xl">{title}</h1>
          <p className="mt-5 text-lg leading-8 text-muted">{description}</p>
        </div>
        {children ? <div className="self-center">{children}</div> : null}
      </div>
    </section>
  );
}
