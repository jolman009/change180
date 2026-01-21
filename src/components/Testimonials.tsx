import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Working with Myra has been transformative. I've gained clarity, confidence, and a stronger connection to my faith.",
    author: "Jane",
    role: "Individual Coaching Client",
  },
  {
    quote: "Myra's guidance has helped our family communicate better and overcome challenging situations with grace.",
    author: "Maria",
    role: "Family Coaching Client",
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 bg-background">
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
            Testimonials
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-6">
            Stories of Transformation
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Hear from those who have experienced the power of faith-centered coaching.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative bg-peach-100 p-8 md:p-10 rounded-3xl"
            >
              <Quote 
                size={48} 
                className="text-peach-200 absolute top-6 left-6" 
                strokeWidth={1}
              />
              
              <blockquote className="relative z-10">
                <p className="font-serif text-xl md:text-2xl text-foreground leading-relaxed mb-6 italic">
                  "{testimonial.quote}"
                </p>
                <footer className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-peach-200 rounded-full flex items-center justify-center">
                    <span className="font-serif text-lg text-primary">
                      {testimonial.author.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </footer>
              </blockquote>
            </motion.div>
          ))}
        </div>

        {/* What to Expect */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20 text-center"
        >
          <h3 className="font-serif text-2xl md:text-3xl text-foreground mb-8">
            What Clients Can Expect
          </h3>
          <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
            {[
              "A safe, supportive environment",
              "Clear goals and action steps",
              "Faith-aligned guidance",
              "Practical tools and reflection",
              "Encouragement and growth",
            ].map((expectation, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.4 + i * 0.05 }}
                className="bg-card px-5 py-3 rounded-full text-sm text-foreground border border-border"
              >
                {expectation}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
