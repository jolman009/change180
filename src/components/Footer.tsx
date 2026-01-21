import { Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-2xl mb-4">Change 180</h3>
            <p className="text-background/70 text-sm leading-relaxed mb-6">
              Guiding faith, family, and personal growth. 
              Transform your life with faith-centered coaching.
            </p>
            <p className="text-background/50 text-xs">
              Myra Z. Guzman, M.Ed.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-background/80">
              Quick Links
            </h4>
            <nav className="space-y-3">
              {[
                { label: "About", href: "#about" },
                { label: "Services", href: "#services" },
                { label: "Packages", href: "#packages" },
                { label: "Testimonials", href: "#testimonials" },
                { label: "Contact", href: "#contact" },
              ].map((link) => (
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
              Services
            </h4>
            <nav className="space-y-3">
              <span className="block text-background/70 text-sm">Individual Life Coaching</span>
              <span className="block text-background/70 text-sm">Parent & Family Coaching</span>
              <span className="block text-background/70 text-sm">Group Programs</span>
              <span className="block text-background/70 text-sm">Workshops</span>
            </nav>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-background/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-background/50 text-sm">
              © {currentYear} Change 180. All rights reserved.
            </p>
            
            <p className="text-background/50 text-xs flex items-center gap-1">
              Made with <Heart size={12} className="text-primary" fill="currentColor" /> for transformation
            </p>
          </div>

          {/* Disclaimer */}
          <p className="text-background/40 text-xs mt-6 text-center max-w-2xl mx-auto">
            Change 180 provides coaching, education, and consulting services. 
            Coaching is not therapy and does not replace mental health treatment. 
            No diagnosis or clinical services are provided through coaching.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
