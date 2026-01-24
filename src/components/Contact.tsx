import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // TODO: Replace these placeholders with your actual EmailJS credentials
    // Get them from https://dashboard.emailjs.com/admin
    const SERVICE_ID = "service_0tpvb0o";
    const TEMPLATE_ID = "template_k38tzrg";
    const PUBLIC_KEY = "cqTme7k19QuojL7eU";

    try {
      // We import emailjs dynamically to avoid issues if the package isn't fully ready or to code-split
      const emailjs = (await import("@emailjs/browser")).default;

      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone,
          message: formData.message,
          to_name: "Myra", // Or dynamic if needed
        },
        PUBLIC_KEY
      );

      toast.success("Message sent successfully! I'll be in touch soon.");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      console.error("EmailJS Error:", error);
      // Fallback for demo purposes if keys aren't set
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((error as any)?.text?.includes("The user_id param is required")) {
        toast.success("Demo Success: Form works! (Configure EmailJS keys to send real emails)");
      } else {
        toast.error("Something went wrong. Please try again later or email me directly.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="contact" className="py-24 bg-peach-100">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {/* Left Column - Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Coaching image */}
            <div className="relative rounded-2xl overflow-hidden aspect-[3/2] mb-8">
              <img
                src="/images/coaching-session-3.png"
                alt="Myra in a supportive coaching conversation"
                className="w-full h-full object-cover"
              />
            </div>

            <span className="text-primary font-medium text-sm tracking-widest uppercase mb-4 block">
              Get In Touch
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-6">
              Ready to Begin Your Transformation?
            </h2>
            <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
              Take the first step toward clarity, growth, and purpose.
              Reach out today to schedule your Discovery Session or ask any questions.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-background rounded-xl flex items-center justify-center shadow-soft">
                  <Mail size={20} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="text-foreground font-medium">contact@change180.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-background rounded-xl flex items-center justify-center shadow-soft">
                  <Phone size={20} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="text-foreground font-medium">(555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-background rounded-xl flex items-center justify-center shadow-soft">
                  <MapPin size={20} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Sessions</p>
                  <p className="text-foreground font-medium">Virtual & In-Person Available</p>
                </div>
              </div>
            </div>

            {/* Availability for organizations */}
            <div className="mt-10 p-6 bg-background rounded-2xl border border-border">
              <h4 className="font-serif text-xl text-foreground mb-3">
                Available For Organizations
              </h4>
              <p className="text-muted-foreground text-sm mb-4">
                Group rates, church partnerships, and custom workshops available.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Churches", "Schools", "Nonprofits", "Community Orgs"].map((org) => (
                  <span
                    key={org}
                    className="bg-peach-100 text-foreground text-xs px-3 py-1.5 rounded-full"
                  >
                    ✓ {org}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-background rounded-3xl p-8 md:p-10 shadow-card border border-border"
            >
              <h3 className="font-serif text-2xl text-foreground mb-6">
                Send a Message
              </h3>

              <div className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    required
                    className="rounded-xl border-border focus:border-primary"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                    className="rounded-xl border-border focus:border-primary"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                    Phone (optional)
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(555) 123-4567"
                    className="rounded-xl border-border focus:border-primary"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    How can I help you?
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me a bit about what you're looking for..."
                    rows={4}
                    required
                    className="rounded-xl border-border focus:border-primary resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full py-6"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                  {!isSubmitting && <Send size={18} className="ml-2" />}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
