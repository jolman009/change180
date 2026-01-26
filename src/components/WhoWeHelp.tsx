import { motion } from "framer-motion";
import { Users, Heart, Home, Sparkles, BookOpen } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const WhoWeHelp = () => {
  const { t, tArray } = useLanguage();

  const audiences = [
    {
      icon: Users,
      title: t("whoWeHelp.audiences.individuals.title"),
      description: t("whoWeHelp.audiences.individuals.description"),
    },
    {
      icon: Heart,
      title: t("whoWeHelp.audiences.parents.title"),
      description: t("whoWeHelp.audiences.parents.description"),
    },
    {
      icon: Home,
      title: t("whoWeHelp.audiences.families.title"),
      description: t("whoWeHelp.audiences.families.description"),
    },
    {
      icon: Sparkles,
      title: t("whoWeHelp.audiences.women.title"),
      description: t("whoWeHelp.audiences.women.description"),
    },
    {
      icon: BookOpen,
      title: t("whoWeHelp.audiences.faithCentered.title"),
      description: t("whoWeHelp.audiences.faithCentered.description"),
    },
  ];

  const beliefs = tArray("whoWeHelp.beliefs");

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
    <section className="py-24 bg-background">
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
            {t("whoWeHelp.sectionLabel")}
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-6">
            {renderTextWithBrand(t("whoWeHelp.headline"))}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {renderTextWithBrand(t("whoWeHelp.description"))}
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {audiences.map((audience, index) => (
            <motion.div
              key={audience.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-card p-8 rounded-2xl shadow-soft hover:shadow-card transition-all duration-300 border border-border hover:border-primary/20"
            >
              <div className="w-14 h-14 bg-peach-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <audience.icon size={28} className="text-primary group-hover:text-primary-foreground" />
              </div>
              <h3 className="font-serif text-2xl text-foreground mb-3">
                {audience.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {audience.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Why Change 180 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20 bg-peach-100 rounded-3xl overflow-hidden max-w-5xl mx-auto"
        >
          <div className="grid md:grid-cols-2">
            {/* Image */}
            <div className="aspect-square md:aspect-auto">
              <img
                src="/images/coaching-session-1.jpeg"
                alt={t("whoWeHelp.imageAlt")}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-10 md:p-12 lg:p-16 flex flex-col justify-center">
              <h3 className="font-serif text-3xl md:text-4xl text-foreground mb-6">
                {renderTextWithBrand(t("whoWeHelp.whyTitle"))}
              </h3>
              <p className="text-muted-foreground text-lg mb-8">
                {t("whoWeHelp.whyDescription")}
              </p>
              <div className="grid gap-4 text-left">
                {beliefs.map((belief, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span className="text-foreground">{belief}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhoWeHelp;
