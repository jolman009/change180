import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import BookingCTA from "./BookingCTA";
import type { BillingPackageId } from "@/lib/billing";

const Packages = () => {
  const { t, tArray } = useLanguage();

  const packages = [
    {
      id: "discovery" as BillingPackageId,
      name: t("packages.discovery.name"),
      tagline: t("packages.discovery.tagline"),
      price: t("packages.discovery.price"),
      priceSuffix: t("packages.perSession"),
      duration: t("packages.discovery.duration"),
      description: t("packages.discovery.description"),
      features: tArray("packages.discovery.features"),
      highlight: t("packages.discovery.highlight"),
    },
    {
      id: "clarity" as BillingPackageId,
      name: t("packages.clarity.name"),
      tagline: t("packages.clarity.tagline"),
      price: t("packages.clarity.price"),
      priceSuffix: t("packages.perProgram"),
      duration: t("packages.clarity.duration"),
      description: t("packages.clarity.description"),
      features: tArray("packages.clarity.features"),
      highlight: t("packages.clarity.highlight"),
    },
    {
      id: "rooted" as BillingPackageId,
      name: t("packages.rooted.name"),
      tagline: t("packages.rooted.tagline"),
      price: t("packages.rooted.price"),
      priceSuffix: t("packages.perProgram"),
      duration: t("packages.rooted.duration"),
      description: t("packages.rooted.description"),
      features: tArray("packages.rooted.features"),
      highlight: t("packages.rooted.highlight"),
      popular: true,
    },
    {
      id: "flourish" as BillingPackageId,
      name: t("packages.flourish.name"),
      tagline: t("packages.flourish.tagline"),
      price: t("packages.flourish.price"),
      priceSuffix: t("packages.perProgram"),
      duration: t("packages.flourish.duration"),
      description: t("packages.flourish.description"),
      features: tArray("packages.flourish.features"),
      highlight: t("packages.flourish.highlight"),
    },
  ];

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
            {t("packages.sectionLabel")}
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-6">
            {t("packages.headline")}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t("packages.description")}
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
                    {t("packages.mostPopular")}
                  </span>
                </div>
              )}

              <div className="mb-6">
                <p className="text-sm text-primary font-medium mb-1">{pkg.tagline}</p>
                <h3 className="font-serif text-2xl text-foreground mb-2">{pkg.name}</h3>
                <p className="text-xs text-muted-foreground mb-3">{pkg.duration}</p>
                <div className="flex items-baseline gap-1">
                  <span className="font-serif text-3xl font-bold text-foreground">{pkg.price}</span>
                  <span className="text-sm text-muted-foreground">{pkg.priceSuffix}</span>
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

              <BookingCTA
                packageId={pkg.id}
                text={t("packages.getStarted")}
                className={`w-full rounded-full py-2 font-medium text-sm ${pkg.popular
                  ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                  : "bg-secondary hover:bg-secondary/80 text-secondary-foreground"
                  }`}
              />

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
              {t("packages.familyCoaching.title")}
            </h3>
            <p className="text-muted-foreground mb-3">
              {t("packages.familyCoaching.description")}
            </p>
            <div className="flex items-baseline justify-center gap-1 mb-4">
              <span className="font-serif text-3xl font-bold text-foreground">{t("packages.familyCoaching.price")}</span>
              <span className="text-sm text-muted-foreground">{t("packages.perSession")}</span>
            </div>
            <BookingCTA
              packageId="family"
              text={t("packages.learnMore")}
              className="rounded-full border border-input bg-background hover:bg-accent hover:text-accent-foreground px-4 py-2 text-sm font-medium"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Packages;
