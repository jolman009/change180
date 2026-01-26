import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

const Contact = () => {
  const { t, tArray } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const orgTypes = tArray("contact.organizations.types");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const SERVICE_ID = "service_0tpvb0o";
    const TEMPLATE_ID = "template_k38tzrg";
    const PUBLIC_KEY = "cqTme7k19QuojL7eU";

    try {
      const emailjs = (await import("@emailjs/browser")).default;

      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          name: formData.name,
          title: formData.message,
          email: formData.email,
          phone: formData.phone,
          reply_to: formData.email,
        },
        PUBLIC_KEY
      );

      toast.success(t("contact.toast.success"));
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      console.error("EmailJS Error:", error);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((error as any)?.text?.includes("The user_id param is required")) {
        toast.success(t("contact.toast.demoSuccess"));
      } else {
        toast.error(t("contact.toast.error"));
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
                alt={t("contact.imageAlt")}
                className="w-full h-full object-cover"
              />
            </div>

            <span className="text-primary font-medium text-sm tracking-widest uppercase mb-4 block">
              {t("contact.sectionLabel")}
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-6">
              {t("contact.headline")}
            </h2>
            <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
              {t("contact.description")}
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-background rounded-xl flex items-center justify-center shadow-soft">
                  <Mail size={20} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t("contact.email")}</p>
                  <p className="text-foreground font-medium">contact@change180.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-background rounded-xl flex items-center justify-center shadow-soft">
                  <Phone size={20} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t("contact.phone")}</p>
                  <p className="text-foreground font-medium">(555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-background rounded-xl flex items-center justify-center shadow-soft">
                  <MapPin size={20} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t("contact.sessions")}</p>
                  <p className="text-foreground font-medium">{t("contact.sessionsValue")}</p>
                </div>
              </div>
            </div>

            {/* Availability for organizations */}
            <div className="mt-10 p-6 bg-background rounded-2xl border border-border">
              <h4 className="font-serif text-xl text-foreground mb-3">
                {t("contact.organizations.title")}
              </h4>
              <p className="text-muted-foreground text-sm mb-4">
                {t("contact.organizations.description")}
              </p>
              <div className="flex flex-wrap gap-2">
                {orgTypes.map((org) => (
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
                {t("contact.form.title")}
              </h3>

              <div className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    {t("contact.form.name")}
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t("contact.form.namePlaceholder")}
                    required
                    className="rounded-xl border-border focus:border-primary"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    {t("contact.form.emailLabel")}
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t("contact.form.emailPlaceholder")}
                    required
                    className="rounded-xl border-border focus:border-primary"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                    {t("contact.form.phoneLabel")}
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder={t("contact.form.phonePlaceholder")}
                    className="rounded-xl border-border focus:border-primary"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    {t("contact.form.messageLabel")}
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t("contact.form.messagePlaceholder")}
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
                  {isSubmitting ? t("contact.form.sending") : t("contact.form.submit")}
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
