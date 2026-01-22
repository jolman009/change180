interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "light" | "dark";
  layout?: "horizontal" | "stacked";
}

const Logo = ({
  className = "",
  size = "md",
  variant = "default",
  layout = "horizontal"
}: LogoProps) => {
  const sizes = {
    sm: { height: 32, iconSize: 28, textSize: "text-lg", gap: "gap-2" },
    md: { height: 40, iconSize: 36, textSize: "text-xl", gap: "gap-2" },
    lg: { height: 56, iconSize: 48, textSize: "text-2xl", gap: "gap-3" },
  };

  const colors = {
    default: {
      gradientStart: "hsl(20 38% 58%)",   // peach primary
      gradientEnd: "hsl(155 20% 48%)",     // sage accent
      change: "hsl(215 15% 22%)",          // warm charcoal
      number: "hsl(20 38% 58%)",           // peach primary
    },
    light: {
      gradientStart: "hsl(20 40% 70%)",
      gradientEnd: "hsl(155 25% 60%)",
      change: "hsl(35 18% 95%)",
      number: "hsl(20 40% 70%)",
    },
    dark: {
      gradientStart: "hsl(20 38% 58%)",
      gradientEnd: "hsl(155 20% 48%)",
      change: "hsl(215 15% 22%)",
      number: "hsl(20 38% 58%)",
    },
  };

  const { height, iconSize, textSize, gap } = sizes[size];
  const { gradientStart, gradientEnd, change, number } = colors[variant];
  const gradientId = `logo-gradient-${variant}-${size}-${Math.random().toString(36).substr(2, 9)}`;

  const BridgeIcon = ({ width, height: h }: { width: number; height: number }) => (
    <svg
      width={width}
      height={h}
      viewBox="0 0 100 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={gradientStart} />
          <stop offset="100%" stopColor={gradientEnd} />
        </linearGradient>
      </defs>
      {/* Outer arch - the top curved line */}
      <path
        d="M15 55 Q15 10, 50 5 Q85 10, 85 55"
        stroke={`url(#${gradientId})`}
        strokeWidth="8"
        strokeLinecap="round"
        fill="none"
      />
      {/* Inner arch - the bottom dome with flared ends */}
      <path
        d="M8 65 L20 55 Q50 25, 80 55 L92 65"
        stroke={`url(#${gradientId})`}
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Center vertical pole - from top through inner arch */}
      <line
        x1="50"
        y1="5"
        x2="50"
        y2="55"
        stroke={`url(#${gradientId})`}
        strokeWidth="7"
        strokeLinecap="round"
      />
    </svg>
  );

  if (layout === "stacked") {
    return (
      <div className={`flex flex-col items-center ${className}`}>
        <BridgeIcon width={iconSize * 1.4} height={iconSize} />
        <div className={`flex items-baseline ${textSize} mt-1`}>
          <span style={{ color: change }} className="font-serif font-semibold tracking-tight">
            change
          </span>
          <span style={{ color: number }} className="font-serif font-semibold">
            180
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center ${gap} ${className}`} style={{ height }}>
      <BridgeIcon width={iconSize * 1.4} height={iconSize} />
      <div className={`flex items-baseline ${textSize}`}>
        <span style={{ color: change }} className="font-serif font-semibold tracking-tight">
          change
        </span>
        <span style={{ color: number }} className="font-serif font-semibold">
          180
        </span>
      </div>
    </div>
  );
};

export default Logo;
