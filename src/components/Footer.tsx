import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { label: t("nav.about"), to: "/about" },
    { label: t("nav.services"), to: "/services" },
    { label: t("nav.packages"), to: "/packages" },
    { label: t("nav.testimonials"), to: "/testimonials" },
    { label: t("nav.contact"), to: "/contact" },
  ];

  const serviceLinks = [
    t("footer.services.individual"),
    t("footer.services.family"),
    t("footer.services.tsia2"),
    t("footer.services.languageAcquisition"),
    t("footer.services.group"),
  ];

  const renderTextWithBrand = (text: string) => {
    return text.split("<brand>").map((part, index) => {
      if (part.includes("</brand>")) {
        const [, rest] = part.split("</brand>");
        return (
          <span key={index}>
            <span className="font-semibold">Change<span className="text-primary">180</span></span>
            {rest}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand — text wordmark lockup (logo art is opaque, so not inverted on dark) */}
          <div>
            <div className="mb-4">
              <span className="block font-serif text-3xl font-semibold tracking-tight text-background">
                Change<span className="text-brand-300">180</span>
              </span>
              <span className="block font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-teal-200 mt-1.5">
                Life Coaching · Learning Lab · Consulting
              </span>
            </div>
            <p className="text-background/70 text-sm leading-relaxed mb-4">
              {t("footer.tagline")}
            </p>
            <p className="text-background/50 text-xs">
              Myra Z. Guzman, M.Ed.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-background/80">
              {t("footer.quickLinks")}
            </h4>
            <nav className="space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="block text-background/70 hover:text-background transition-colors text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-background/80">
              {t("footer.servicesTitle")}
            </h4>
            <nav className="space-y-3">
              {serviceLinks.map((service) => (
                <span key={service} className="block text-background/70 text-sm">
                  {service}
                </span>
              ))}
            </nav>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-background/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-background/50 text-sm">
              © {currentYear} <span className="font-semibold">Change<span className="text-primary">180</span></span>. {t("footer.copyright")}
            </p>

            <p className="text-background/50 text-xs flex items-center gap-1">
              {t("footer.madeWith")} <Heart size={12} className="text-primary" fill="currentColor" /> {t("footer.forTransformation")}
            </p>
          </div>

          {/* Disclaimer */}
          <p className="text-background/40 text-xs mt-6 text-center max-w-2xl mx-auto">
            {renderTextWithBrand(t("footer.disclaimer"))}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
