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
    sm: { height: 40 },
    md: { height: 56 },
    lg: { height: 72 },
    xl: { height: 100 },
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
