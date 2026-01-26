import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./Logo";
import { useLanguage } from "@/contexts/LanguageContext";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const navLinks = [
    { href: "#about", label: t("nav.about") },
    { href: "#services", label: t("nav.services") },
    { href: "#packages", label: t("nav.packages") },
    { href: "#testimonials", label: t("nav.testimonials") },
    { href: "#contact", label: t("nav.contact") },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  const handleBooking = () => {
    window.open("https://calendly.com/change180lifecoach", "_blank");
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center hover:opacity-80 transition-opacity"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <Logo size="lg" />
          </a>

          {/* Mobile Language Toggle + Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <div className="flex items-center text-xs">
              <button
                onClick={() => setLanguage("en")}
                className={`px-1.5 py-1 rounded transition-colors ${
                  language === "en"
                    ? "text-primary font-semibold"
                    : "text-muted-foreground"
                }`}
              >
                EN
              </button>
              <span className="text-muted-foreground">|</span>
              <button
                onClick={() => setLanguage("es")}
                className={`px-1.5 py-1 rounded transition-colors ${
                  language === "es"
                    ? "text-primary font-semibold"
                    : "text-muted-foreground"
                }`}
              >
                ES
              </button>
            </div>
            <button
              className="p-2 text-foreground"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="text-muted-foreground hover:text-foreground transition-colors font-medium text-sm tracking-wide"
              >
                {link.label}
              </button>
            ))}

            {/* Language Toggle */}
            <div className="flex items-center gap-1 text-sm">
              <button
                onClick={() => setLanguage("en")}
                className={`px-2 py-1 rounded transition-colors ${
                  language === "en"
                    ? "text-primary font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                EN
              </button>
              <span className="text-muted-foreground">|</span>
              <button
                onClick={() => setLanguage("es")}
                className={`px-2 py-1 rounded transition-colors ${
                  language === "es"
                    ? "text-primary font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                ES
              </button>
            </div>

            <Button
              onClick={handleBooking}
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6"
            >
              {t("nav.bookSession")}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b border-border"
          >
            <div className="container mx-auto px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="text-left text-muted-foreground hover:text-foreground transition-colors font-medium py-2"
                >
                  {link.label}
                </button>
              ))}

              {/* Mobile Language Toggle */}
              <div className="flex items-center gap-2 py-2">
                <button
                  onClick={() => setLanguage("en")}
                  className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                    language === "en"
                      ? "bg-primary text-primary-foreground font-semibold"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => setLanguage("es")}
                  className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                    language === "es"
                      ? "bg-primary text-primary-foreground font-semibold"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  Español
                </button>
              </div>

              <Button
                onClick={handleBooking}
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full mt-2"
              >
                {t("nav.bookSession")}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation;
