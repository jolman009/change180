# Component sources — Change180 Learning Lab

Copy each block into your app (e.g. `src/components/Button.tsx`). They're plain
React + Tailwind, dependency-free apart from the brand theme and the `cn` helper
(`lib/cn.ts`). Icons in the examples use `lucide-react`.

> Reference sources. This site already ships shadcn/ui equivalents (`Button`,
> `Badge`, etc.) wired to the brand tokens in `src/index.css` — prefer those.
> These blocks document the intended brand styling for net-new primitives.

---

## `lib/cn.ts`

```ts
/** Tiny class-name joiner. For production-grade conditional merging, swap for
 *  `twMerge(clsx(...))` from `tailwind-merge` + `clsx`. */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
```

---

## `components/Button.tsx`

Variants `primary | secondary | outline | ghost | link`; sizes `sm | md | lg`;
`shape="pill"` (default) or `"rounded"`; `fullWidth`, `leadingIcon`, `trailingIcon`.
Pill-shaped, violet-filled by default; hover deepens and lifts with `shadow-card`.

```tsx
import { type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "../lib/cn";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "link";
type Size = "sm" | "md" | "lg";

const VARIANTS: Record<Variant, string> = {
  primary:   "bg-primary text-primary-fg hover:bg-primary-deep hover:shadow-card",
  secondary: "bg-secondary text-ink hover:bg-brand-200",
  outline:   "bg-transparent text-ink border-[1.5px] border-ink/20 hover:bg-accent hover:text-primary hover:border-primary",
  ghost:     "bg-transparent text-ink hover:bg-accent",
  link:      "bg-transparent text-primary hover:underline !px-0 !h-auto",
};

const SIZES: Record<Size, string> = {
  sm: "text-[13px] px-4 h-9",
  md: "text-sm px-6 h-11",
  lg: "text-[17px] px-8 py-3.5",
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  shape?: "pill" | "rounded";
  fullWidth?: boolean;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  shape = "pill",
  fullWidth = false,
  leadingIcon = null,
  trailingIcon = null,
  className,
  type = "button",
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-2 font-body font-medium leading-tight whitespace-nowrap",
        "transition-[background,color,border-color,box-shadow] duration-200 ease-brand",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        shape === "pill" ? "rounded-full" : "rounded-lg",
        fullWidth && "w-full",
        VARIANTS[variant],
        variant !== "link" && SIZES[size],
        className,
      )}
      {...rest}
    >
      {leadingIcon}
      {children}
      {trailingIcon}
    </button>
  );
}
```

---

## `components/Badge.tsx`

Tones `primary | violet | gold | sage | neutral | soft`. Use `gold` for "Most Popular".

```tsx
import { type ReactNode } from "react";
import { cn } from "../lib/cn";

type Tone = "primary" | "violet" | "gold" | "sage" | "neutral" | "soft";

const TONES: Record<Tone, string> = {
  primary: "bg-primary text-primary-fg",
  violet:  "bg-brand-100 text-primary",
  gold:    "bg-gold-100 text-gold-600",   // the "Most Popular" flag
  sage:    "bg-accent text-teal-600",
  neutral: "bg-secondary text-ink",
  soft:    "bg-brand-100 text-brand-700",
};

export interface BadgeProps {
  children: ReactNode;
  tone?: Tone;
  icon?: ReactNode;
  className?: string;
}

export function Badge({ children, tone = "violet", icon = null, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold font-body whitespace-nowrap",
        TONES[tone],
        className,
      )}
    >
      {icon}
      {children}
    </span>
  );
}
```

---

## `components/IconWell.tsx`

Rounded tile for an icon. `size` `sm|md|lg`; default soft-violet, `tone="sage"`,
or `pillar="learn|grow|thrive|together"` to color by category (well + icon follow).
**Categorical use only — one pillar per context.**

```tsx
import { type ReactNode } from "react";
import { cn } from "../lib/cn";

type Size = "sm" | "md" | "lg";
type Pillar = "learn" | "grow" | "thrive" | "together";

const SIZES: Record<Size, string> = {
  sm: "w-10 h-10 rounded-xl",
  md: "w-14 h-14 rounded-2xl",
  lg: "w-16 h-16 rounded-2xl",
};

const PILLARS: Record<Pillar, string> = {
  learn:    "bg-teal-100 text-teal-500",
  grow:     "bg-coral-soft text-coral-deep",
  thrive:   "bg-gold-100 text-gold-600",
  together: "bg-sky-soft text-sky-deep",
};

export interface IconWellProps {
  children: ReactNode;
  size?: Size;
  tone?: "violet" | "sage";
  pillar?: Pillar | null;
  className?: string;
}

export function IconWell({ children, size = "md", tone = "violet", pillar = null, className }: IconWellProps) {
  const color = pillar
    ? PILLARS[pillar]
    : tone === "sage"
      ? "bg-accent text-teal-600"
      : "bg-brand-100 text-primary";
  return (
    <div className={cn("inline-flex shrink-0 items-center justify-center", SIZES[size], color, className)}>
      {children}
    </div>
  );
}
```
