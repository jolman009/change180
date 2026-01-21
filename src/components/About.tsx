import { motion } from "framer-motion";
import { GraduationCap, Award, Heart, Globe } from "lucide-react";

const credentials = [
  {
    icon: GraduationCap,
    title: "Master of Education (M.Ed.)",
    subtitle: "Curriculum & Instruction",
  },
  {
    icon: Award,
    title: "Master's in Counseling",
    subtitle: "Licensed Professional Counselor – Intern",
  },
  {
    icon: Heart,
    title: "17+ Years Experience",
    subtitle: "Supporting families & communities",
  },
  {
    icon: Globe,
    title: "Bilingual Services",
    subtitle: "English & Spanish",
  },
];

const About = () => {
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
              About Me
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-6">
              Hi, I'm Myra Z. Guzman, M.Ed.
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                I am a bilingual certified life coach and educator with a deep passion 
                for helping others live fulfilling and faith-centered lives.
              </p>
              <p>
                With over 17 years of experience supporting children, families, and adults 
                through education, emotional development, and community-based services, 
                I bring a unique blend of knowledge, empathy, and spiritual guidance to 
                my coaching practice.
              </p>
              <p>
                I created Change 180 to serve those who want real change without judgment, 
                faith without shame, and growth that feels both grounded and hopeful.
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
                alt="Myra Z. Guzman, M.Ed. - Life Coach"
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
          Coaching services are non-clinical and educational in nature and do not replace therapy.
        </motion.p>
      </div>
    </section>
  );
};

export default About;
