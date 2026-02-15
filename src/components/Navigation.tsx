import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PopupButton } from "react-calendly";
import Logo from "./Logo";
import { useLanguage } from "@/contexts/LanguageContext";
import { CALENDLY_URL } from "@/lib/constants";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const scrollTimerRef = useRef<ReturnType<typeof setTimeout>>();

  const navLinks = [
    { href: "#about", label: t("nav.about") },
    { href: "#services", label: t("nav.services") },
    { href: "#packages", label: t("nav.packages") },
    { href: "#testimonials", label: t("nav.testimonials") },
    { href: "#faq", label: t("nav.faq") },
    { href: "#contact", label: t("nav.contact") },
  ];

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    return () => clearTimeout(scrollTimerRef.current);
  }, []);

  const scrollToSection = (href: string) => {
    setIsOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
      clearTimeout(scrollTimerRef.current);
      scrollTimerRef.current = setTimeout(() => {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const calendlyUrl = CALENDLY_URL;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20 sm:h-24 md:h-28">
          {/* Logo - always visible */}
          <a
            href="/"
            title="Go to home"
            className="flex-shrink-0 hover:opacity-80 transition-opacity"
            onClick={(e) => {
              e.preventDefault();
              if (location.pathname === "/") {
                window.scrollTo({ top: 0, behavior: "smooth" });
              } else {
                navigate("/");
              }
            }}
          >
            <Logo size="lg" />
          </a>

          {/* Mobile Language Toggle + Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setLanguage(language === "en" ? "es" : "en")}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-full border border-primary/30 bg-card text-sm font-medium text-foreground hover:bg-muted transition-colors animate-glow-pulse"
              aria-label={language === "en" ? "Switch to Spanish" : "Cambiar a inglés"}
            >
              <Globe size={14} className="text-primary" />
              <span>{language === "en" ? "ES" : "EN"}</span>
            </button>
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
              to="/quiz"
              className="text-primary hover:text-primary/80 transition-colors font-medium text-sm tracking-wide"
            >
              {t("nav.quiz")}
            </Link>
            <Link
              to="/resources"
              className="text-muted-foreground hover:text-foreground transition-colors font-medium text-sm tracking-wide"
            >
              {t("nav.resources")}
            </Link>

            {/* Language Toggle */}
            <button
              onClick={() => setLanguage(language === "en" ? "es" : "en")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-primary/30 bg-card text-sm font-medium text-foreground hover:bg-muted transition-colors animate-glow-pulse"
              aria-label={language === "en" ? "Switch to Spanish" : "Cambiar a inglés"}
            >
              <Globe size={16} className="text-primary" />
              <span>{language === "en" ? "ES" : "EN"}</span>
            </button>

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
                to="/quiz"
                className="block py-3 text-primary font-medium"
                onClick={() => setIsOpen(false)}
              >
                {t("nav.quiz")}
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
                <Globe size={18} className="text-primary" />
                <button
                  type="button"
                  onClick={() => setLanguage("en")}
                  className={`px-4 py-2 rounded-full text-sm transition-colors ${language === "en"
                    ? "bg-primary text-primary-foreground font-semibold"
                    : "bg-muted text-muted-foreground"
                    }`}
                >
                  English
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage("es")}
                  className={`px-4 py-2 rounded-full text-sm transition-colors ${language === "es"
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
