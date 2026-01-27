import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PopupButton } from "react-calendly";
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

  const calendlyUrl = "https://calendly.com/change180lifecoach";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20 sm:h-24 md:h-28">
          {/* Logo - always visible */}
          <a
            href="#"
            title="Go to home"
            className="flex-shrink-0 hover:opacity-80 transition-opacity"
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
            <Link
              to="/blog"
              className="text-muted-foreground hover:text-foreground transition-colors font-medium text-sm tracking-wide"
            >
              {t("nav.blog")}
            </Link>
            <Link
              to="/resources"
              className="text-muted-foreground hover:text-foreground transition-colors font-medium text-sm tracking-wide"
            >
              {t("nav.resources")}
            </Link>

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

            <PopupButton
              url={calendlyUrl}
              rootElement={document.getElementById("root")!}
              text={t("nav.bookSession")}
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6 py-2 font-medium text-sm"
            />
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
              <Link
                to="/blog"
                onClick={() => setIsOpen(false)}
                className="text-left text-muted-foreground hover:text-foreground transition-colors font-medium py-2"
              >
                {t("nav.blog")}
              </Link>
              <Link
                to="/resources"
                onClick={() => setIsOpen(false)}
                className="text-left text-muted-foreground hover:text-foreground transition-colors font-medium py-2"
              >
                {t("nav.resources")}
              </Link>

              {/* Mobile Language Toggle */}
              <div className="flex items-center gap-2 py-2">
                <button
                  type="button"
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
                  type="button"
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

              <PopupButton
                url={calendlyUrl}
                rootElement={document.getElementById("root")!}
                text={t("nav.bookSession")}
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full mt-2 py-2 font-medium text-sm text-center"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation;
