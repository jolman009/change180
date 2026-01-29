interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

const Logo = ({ className = "", size = "md" }: LogoProps) => {
  // Responsive height classes for each size
  const sizeClasses = {
    sm: "h-10 sm:h-12",
    md: "h-12 sm:h-14 md:h-16",
    lg: "h-14 sm:h-16 md:h-20",
    xl: "h-20 sm:h-24 md:h-28",
  };

  return (
    <img
      src="/images/change180_logo_v7.png"
      alt="Change180 - Inspiring growth, resilience, and purpose renewed"
      className={`w-auto object-contain ${sizeClasses[size]} ${className}`}
    />
  );
};

export default Logo;
