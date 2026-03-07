import { useState } from "react";
import { Loader2, Wallet } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { trackEvent } from "@/lib/analytics";
import { toast } from "sonner";

const BillingPortalAccess = () => {
  const { t, language } = useLanguage();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRequestPortalLink = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error(t("billingPortal.invalidEmail"));
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/billing/portal-link", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          language,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to request portal link");
      }

      toast.success(t("billingPortal.success"));
      trackEvent("billing_portal_link_requested", { language });
      setEmail("");
    } catch {
      toast.error(t("billingPortal.error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-8 p-6 bg-background rounded-2xl border border-border">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <Wallet className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h4 className="font-serif text-xl text-foreground">{t("billingPortal.title")}</h4>
          <p className="text-sm text-muted-foreground">{t("billingPortal.description")}</p>
        </div>
      </div>

      <form onSubmit={handleRequestPortalLink} className="flex flex-col sm:flex-row gap-3">
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t("billingPortal.emailPlaceholder")}
          className="rounded-xl"
          disabled={isSubmitting}
        />
        <Button
          type="submit"
          disabled={isSubmitting}
          className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              {t("billingPortal.sending")}
            </>
          ) : (
            t("billingPortal.cta")
          )}
        </Button>
      </form>

      <p className="text-xs text-muted-foreground mt-3">{t("billingPortal.helpText")}</p>
    </div>
  );
};

export default BillingPortalAccess;
