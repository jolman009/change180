import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";

const Newsletter = () => {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      toast.error(t("newsletter.invalidEmail"));
      return;
    }

    setIsLoading(true);

    // Simulate API call - replace with actual newsletter service integration
    // (Mailchimp, ConvertKit, Resend, etc.)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // For now, just show success - integrate with actual service later
      setIsSubscribed(true);
      toast.success(t("newsletter.success"));
      setEmail("");
    } catch (error) {
      toast.error(t("newsletter.error"));
    } finally {
      setIsLoading(false);
    }
  };

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

  if (isSubscribed) {
    return (
      <section className="py-16 bg-peach-100">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-serif text-2xl md:text-3xl text-foreground mb-4">
              {t("newsletter.thankYou")}
            </h3>
            <p className="text-muted-foreground">
              {t("newsletter.confirmationMessage")}
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-peach-100">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8 text-primary" />
          </div>

          <h3 className="font-serif text-2xl md:text-3xl text-foreground mb-4">
            {t("newsletter.headline")}
          </h3>

          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            {renderTextWithBrand(t("newsletter.description"))}
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder={t("newsletter.placeholder")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 h-12 px-4 rounded-full border-border bg-background"
              disabled={isLoading}
            />
            <Button
              type="submit"
              disabled={isLoading}
              className="h-12 px-8 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {t("newsletter.subscribing")}
                </>
              ) : (
                t("newsletter.subscribe")
              )}
            </Button>
          </form>

          <p className="text-xs text-muted-foreground mt-4">
            {t("newsletter.privacy")}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;
