import { CheckCircle2, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import Layout from "@/components/Layout";

const DownloadThankYou = () => {
  const { language } = useLanguage();

  const content = {
    en: {
      badge: "Payment Successful",
      title: "Thank You for Your Purchase!",
      body: "Your download link is on its way. Check your email inbox for a secure link to your file. If it doesn't arrive within a few minutes, please check your spam folder.",
      note: "The link is tied to your purchase, so please keep it private.",
      backToResources: "Back to Resources",
      backToHome: "Back to Home",
    },
    es: {
      badge: "Pago Exitoso",
      title: "¡Gracias por Tu Compra!",
      body: "Tu enlace de descarga está en camino. Revisa tu bandeja de entrada para encontrar un enlace seguro a tu archivo. Si no llega en unos minutos, revisa tu carpeta de spam.",
      note: "El enlace está vinculado a tu compra, así que manténlo privado.",
      backToResources: "Volver a Recursos",
      backToHome: "Volver al Inicio",
    },
  };

  const t = content[language];

  return (
    <Layout>
      <section className="pt-32 pb-24 px-4 sm:px-6">
        <div className="container mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
            <CheckCircle2 className="w-4 h-4" />
            {t.badge}
          </span>
          <h1 className="font-display text-4xl sm:text-5xl text-foreground mb-6">
            {t.title}
          </h1>
          <div className="bg-card border border-border rounded-2xl p-8 shadow-sm mb-8">
            <Mail className="w-10 h-10 text-primary mx-auto mb-4" />
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              {t.body}
            </p>
            <p className="text-sm text-muted-foreground">{t.note}</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/resources"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6 py-3 font-medium text-sm transition-colors"
            >
              {t.backToResources}
            </Link>
            <Link
              to="/"
              className="text-primary hover:text-primary/80 font-medium transition-colors"
            >
              {t.backToHome}
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default DownloadThankYou;
