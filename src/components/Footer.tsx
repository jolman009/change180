import { Heart } from "lucide-react";
import Logo from "./Logo";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { label: t("nav.about"), href: "#about" },
    { label: t("nav.services"), href: "#services" },
    { label: t("nav.packages"), href: "#packages" },
    { label: t("nav.testimonials"), href: "#testimonials" },
    { label: t("nav.contact"), href: "#contact" },
  ];

  const renderTextWithBrand = (text: string) => {
    return text.split("<brand>").map((part, index) => {
      if (part.includes("</brand>")) {
        const [, rest] = part.split("</brand>");
        return (
          <span key={index}>
            <span className="font-semibold">change<span className="text-primary">180</span></span>
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
          {/* Brand */}
          <div>
            <Logo size="md" className="mb-4 brightness-0 invert" />
            <p className="text-background/70 text-sm leading-relaxed mb-6">
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
                <a
                  key={link.href}
                  href={link.href}
                  className="block text-background/70 hover:text-background transition-colors text-sm"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-background/80">
              {t("footer.servicesTitle")}
            </h4>
            <nav className="space-y-3">
              <span className="block text-background/70 text-sm">{t("footer.services.individual")}</span>
              <span className="block text-background/70 text-sm">{t("footer.services.family")}</span>
              <span className="block text-background/70 text-sm">{t("footer.services.group")}</span>
              <span className="block text-background/70 text-sm">{t("footer.services.workshops")}</span>
            </nav>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-background/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-background/50 text-sm">
              © {currentYear} <span className="font-semibold">change<span className="text-primary">180</span></span>. {t("footer.copyright")}
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
