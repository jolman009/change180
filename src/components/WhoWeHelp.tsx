import { motion } from "framer-motion";
import { Users, Heart, Home, Sparkles, BookOpen } from "lucide-react";

const audiences = [
  {
    icon: Users,
    title: "Individuals",
    description: "Seeking clarity, direction, and personal growth in life's journey.",
  },
  {
    icon: Heart,
    title: "Parents",
    description: "Supporting and understanding their children's emotional and mental wellness.",
  },
  {
    icon: Home,
    title: "Families",
    description: "Navigating stress, transitions, or conflict with grace and unity.",
  },
  {
    icon: Sparkles,
    title: "Women",
    description: "Feeling overwhelmed, burned out, or disconnected from purpose.",
  },
  {
    icon: BookOpen,
    title: "Faith-Centered Clients",
    description: "Wanting emotional growth aligned with their values and beliefs.",
  },
];

const WhoWeHelp = () => {
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
            Who We Help
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-6">
            Change 180 Is For You
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            If you're ready to stop surviving and start moving forward — Change 180 was created for you.
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
                alt="Myra in a coaching session"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-10 md:p-12 lg:p-16 flex flex-col justify-center">
              <h3 className="font-serif text-3xl md:text-4xl text-foreground mb-6">
                Why "Change 180"?
              </h3>
              <p className="text-muted-foreground text-lg mb-8">
                A 180-degree change means turning completely around — choosing a new direction.
                We help you pause, reflect, and intentionally move toward the life God is calling you to live.
              </p>
              <div className="grid gap-4 text-left">
                {[
                  "Growth is possible at any stage of life",
                  "Healing and faith can walk together",
                  "Small steps lead to lasting transformation",
                  "You are not broken — you are becoming",
                ].map((belief, i) => (
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
