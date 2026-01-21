interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "light" | "dark";
}

const Logo = ({
  className = "",
  size = "md",
  variant = "default"
}: LogoProps) => {
  const sizes = {
    sm: "h-8",
    md: "h-10",
    lg: "h-14",
  };

  // For light variant (dark backgrounds), we may need to invert or use a different version
  // For now, we'll apply a filter for the light variant
  const filters = {
    default: "",
    light: "brightness-0 invert",
    dark: "",
  };

  return (
    <img
      src="/images/logo.png"
      alt="Change 180 - Life Coaching"
      className={`${sizes[size]} w-auto object-contain ${filters[variant]} ${className}`}
    />
  );
};

export default Logo;
