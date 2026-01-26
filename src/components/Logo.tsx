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
    sm: { height: 32 },
    md: { height: 40 },
    lg: { height: 56 },
    xl: { height: 80 },
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
