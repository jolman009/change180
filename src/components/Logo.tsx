interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  showTagline?: boolean;
}

const Logo = ({
  className = "",
  size = "md",
  showTagline = false,
}: LogoProps) => {
  const sizes = {
    sm: { height: 48 },
    md: { height: 64 },
    lg: { height: 80 },
    xl: { height: 120 },
  };

  const { height } = sizes[size];

  return (
    <img
      src="/images/change180-logo.png"
      alt="Change180 - Inspiring growth, resilience, and purpose renewed"
      className={`object-contain ${showTagline ? '' : 'object-top'} ${className}`}
      style={{
        height: showTagline ? height * 1.5 : height,
        width: 'auto',
        objectPosition: showTagline ? 'center' : 'top',
      }}
    />
  );
};

export default Logo;
