import { motion } from "framer-motion";
import { GraduationCap, Award, Heart, Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const About = () => {
  const { t } = useLanguage();

  const credentials = [
    {
      icon: GraduationCap,
      title: t("about.credentials.education.title"),
      subtitle: t("about.credentials.education.subtitle"),
    },
    {
      icon: Award,
      title: t("about.credentials.counseling.title"),
      subtitle: t("about.credentials.counseling.subtitle"),
    },
    {
      icon: Heart,
      title: t("about.credentials.experience.title"),
      subtitle: t("about.credentials.experience.subtitle"),
    },
    {
      icon: Globe,
      title: t("about.credentials.bilingual.title"),
      subtitle: t("about.credentials.bilingual.subtitle"),
    },
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
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary font-medium text-sm tracking-widest uppercase mb-4 block">
              {t("about.sectionLabel")}
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-6">
              {t("about.headline")}
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                {t("about.paragraph1")}
              </p>
              <p>
                {t("about.paragraph2")}
              </p>
              <p>
                {renderTextWithBrand(t("about.paragraph3"))}
              </p>
            </div>

            {/* Credentials Grid */}
            <div className="grid sm:grid-cols-2 gap-4 mt-8">
              {credentials.map((cred, index) => (
                <motion.div
                  key={cred.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-start gap-4 p-4 bg-card rounded-xl border border-border"
                >
                  <div className="w-10 h-10 bg-peach-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <cred.icon size={20} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground text-sm">{cred.title}</h4>
                    <p className="text-muted-foreground text-xs">{cred.subtitle}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Image/Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-peach-100">
              <img
                src="/images/portrait-headshot.jpeg"
                alt={t("about.imageAlt")}
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Decorative elements */}
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-gold-muted rounded-2xl -z-10" />
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-peach-100 rounded-full -z-10" />
          </motion.div>
        </div>

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center text-sm text-muted-foreground mt-16 max-w-2xl mx-auto"
        >
          {t("about.disclaimer")}
        </motion.p>
      </div>
    </section>
  );
};

export default About;
