import { motion } from "framer-motion";
import { Check, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const packages = [
  {
    name: "Discovery Session",
    tagline: "Start with clarity",
    price: "$55",
    originalPrice: "$95",
    duration: "60-minute session",
    description: "Explore whether coaching is right for you. Identify challenges and create a faith-aligned plan.",
    features: [
      "Goal clarification",
      "Next-step planning",
      "Faith-centered reflection",
      "Personalized recommendations",
    ],
    highlight: "Perfect for first-time clients",
  },
  {
    name: "Clarity Package",
    tagline: "Turn confusion into direction",
    price: "$360",
    originalPrice: "$380",
    duration: "4-week program",
    description: "Focused support for those feeling stuck, overwhelmed, or uncertain about their path.",
    features: [
      "Four 60-minute sessions",
      "Personalized action plan",
      "Faith-based reflection exercises",
      "Email support between sessions",
    ],
    highlight: "Great for life transitions",
  },
  {
    name: "Rooted & Renewed",
    tagline: "Build strong foundations",
    price: "$720",
    duration: "8-week program",
    description: "Deeper coaching addressing patterns, habits, and mindset through a faith-centered lens.",
    features: [
      "Eight 60-minute sessions",
      "Customized growth plan",
      "Faith-based daily practices",
      "Accountability tracking",
      "Email support between sessions",
    ],
    highlight: "Best for lasting change",
    popular: true,
  },
  {
    name: "Flourish Forward",
    tagline: "Long-term transformation",
    price: "$1,080",
    duration: "12-week program",
    description: "Premium program for individuals and families committed to purposeful, lasting change.",
    features: [
      "Twelve 60-minute sessions",
      "Comprehensive growth plan",
      "Personalized tools & worksheets",
      "Priority scheduling",
      "Unlimited email support",
    ],
    highlight: "Most Popular",
  },
];

const Packages = () => {
  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleBooking = () => {
    // Real Calendly URL provided by user
    window.open("https://calendly.com/change180lifecoach", "_blank");
  };

  return (
    <section id="packages" className="py-24 bg-cream-100">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium text-sm tracking-widest uppercase mb-4 block">
            Coaching Packages
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-6">
            Investment in Your Growth
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Faith-centered guidance for real-life transformation. Choose the package that fits your journey.
          </p>
        </motion.div>

        {/* Packages Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative bg-background rounded-2xl p-6 border transition-all duration-300 hover:shadow-card ${pkg.popular
                ? "border-primary shadow-card"
                : "border-border shadow-soft"
                }`}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
                    <Star size={12} fill="currentColor" />
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <p className="text-sm text-primary font-medium mb-1">{pkg.tagline}</p>
                <h3 className="font-serif text-2xl text-foreground mb-2">{pkg.name}</h3>
                <p className="text-xs text-muted-foreground">{pkg.duration}</p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-4xl text-foreground">{pkg.price}</span>
                  {pkg.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      {pkg.originalPrice}
                    </span>
                  )}
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                {pkg.description}
              </p>

              <ul className="space-y-3 mb-8">
                {pkg.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <Check size={16} className="text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                onClick={handleBooking}
                className={`w-full rounded-full ${pkg.popular
                  ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                  : "bg-secondary hover:bg-secondary/80 text-secondary-foreground"
                  }`}
              >
                Get Started
                <ArrowRight size={16} className="ml-2" />
              </Button>

              <p className="text-xs text-center text-muted-foreground mt-4">
                {pkg.highlight}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Additional Services */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <div className="inline-block bg-background rounded-2xl p-8 border border-border shadow-soft max-w-xl">
            <h3 className="font-serif text-2xl text-foreground mb-3">
              Family & Parent Coaching
            </h3>
            <p className="text-muted-foreground mb-4">
              60-minute focused session for parents seeking guidance, tools, and support.
            </p>
            <p className="font-serif text-3xl text-foreground mb-4">$110/session</p>
            <Button onClick={scrollToContact} variant="outline" className="rounded-full">
              Learn More
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Packages;
