import { motion } from "framer-motion";
import { Leaf, Users2, UsersRound, BookOpen } from "lucide-react";

const services = [
  {
    icon: Leaf,
    title: "Individual Life Coaching",
    description: "Personalized 1:1 sessions focused on life transitions, purpose, emotional wellness, and faith-centered decision-making.",
    features: [
      "Stress, depression, and anxiety management",
      "Personal goals, growth and accountability",
      "Building self-confidence and resilience",
      "Discovering your strengths and passions",
    ],
  },
  {
    icon: Users2,
    title: "Parent & Family Coaching",
    description: "Support for parents and families seeking tools, communication strategies, and faith-based guidance.",
    features: [
      "Tools to support children's emotional health",
      "Better communication and boundaries",
      "Understanding behavior and stress",
      "Navigating family challenges with grace",
    ],
  },
  {
    icon: UsersRound,
    title: "Group Programs & Workshops",
    description: "Community-based learning for churches, schools, nonprofits, and organizations.",
    features: [
      "Parenting workshops",
      "Faith-based emotional wellness groups",
      "Women's support groups",
      "Psychoeducational classes",
    ],
  },
  {
    icon: BookOpen,
    title: "Digital Resources",
    description: "Coming soon — tools and resources to support your growth journey at your own pace.",
    features: [
      "Workbooks and guides",
      "Parenting tools",
      "Faith-based wellness resources",
      "Bilingual materials",
    ],
    comingSoon: true,
  },
];

const Services = () => {
  return (
    <section id="services" className="py-24 bg-cream-100">
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
            Our Services
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-6">
            Coaching Services Offered
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Faith-centered, culturally responsive, and trauma-informed support designed for real life — not perfection.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative bg-background p-8 rounded-2xl shadow-soft border border-border hover:shadow-card transition-all duration-300 ${
                service.comingSoon ? "opacity-90" : ""
              }`}
            >
              {service.comingSoon && (
                <span className="absolute top-4 right-4 bg-gold-muted text-foreground text-xs font-medium px-3 py-1 rounded-full">
                  Coming Soon
                </span>
              )}
              
              <div className="w-16 h-16 bg-peach-100 rounded-2xl flex items-center justify-center mb-6">
                <service.icon size={32} className="text-primary" />
              </div>
              
              <h3 className="font-serif text-2xl text-foreground mb-3">
                {service.title}
              </h3>
              
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {service.description}
              </p>
              
              <ul className="space-y-3">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Why Work With Us */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            {/* Image */}
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] order-2 lg:order-1">
              <img
                src="/images/coaching-session-2.png"
                alt="Myra coaching a client in her office"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="order-1 lg:order-2">
              <h3 className="font-serif text-2xl md:text-3xl text-foreground mb-8">
                Why Work With Change 180?
              </h3>
              <div className="flex flex-wrap gap-3">
                {[
                  "Faith-centered, not faith-pressured",
                  "Culturally responsive & bilingual",
                  "Education-based & trauma-informed",
                  "Practical tools you can use",
                  "Compassionate, non-judgmental",
                ].map((reason, i) => (
                  <span
                    key={i}
                    className="bg-background px-5 py-3 rounded-full text-sm text-foreground border border-border shadow-soft"
                  >
                    {reason}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
