import { useState } from "react";
import { Download, FileText, BookOpen, Heart, FileSpreadsheet, Sparkles, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import Layout from "@/components/Layout";
import BookingCTA from "@/components/BookingCTA";

interface Resource {
  id: string;
  title: string;
  titleEs: string;
  description: string;
  descriptionEs: string;
  type: "worksheet" | "guide" | "ebook" | "flyer";
  downloadUrl: string;
  downloadUrlEs?: string;
  previewImage?: string;
}

const resources: Resource[] = [
  {
    id: "faith-reflection-journal",
    title: "5-Day Faith & Reflection Journal",
    titleEs: "Diario de Fe y Reflexión de 5 Días",
    description:
      "A guided daily journal to help you pause, reflect, and connect with your faith. Includes prompts for gratitude, self-reflection, and intentional goal-setting.",
    descriptionEs:
      "Un diario guiado para ayudarte a pausar, reflexionar y conectar con tu fe. Incluye indicaciones para gratitud, autorreflexión y establecimiento de metas intencionales.",
    type: "worksheet",
    downloadUrl: "/downloads/5-day-faith-reflection-journal.html",
  },
  {
    id: "life-balance-assessment",
    title: "Life Balance & Wellness Assessment",
    titleEs: "Evaluación de Equilibrio de Vida y Bienestar",
    description:
      "A 5-7 minute self-assessment to discover which areas of your life are thriving and which need attention. Covers emotional wellness, faith, relationships, purpose, self-care, and confidence.",
    descriptionEs:
      "Una autoevaluación de 5-7 minutos para descubrir qué áreas de tu vida están prosperando y cuáles necesitan atención. Cubre bienestar emocional, fe, relaciones, propósito, autocuidado y confianza.",
    type: "worksheet",
    downloadUrl: "/downloads/life-balance-wellness-assessment.html",
  },
  {
    id: "coaching-packages-flyer",
    title: "Coaching Packages Flyer",
    titleEs: "Folleto de Paquetes de Coaching",
    description:
      "A printable one-page flyer with all coaching packages, pricing, and contact information. Perfect for sharing with friends, family, or posting at community boards.",
    descriptionEs:
      "Un folleto imprimible de una página con todos los paquetes de coaching, precios e información de contacto. Perfecto para compartir con amigos, familia o publicar en tableros comunitarios.",
    type: "flyer",
    downloadUrl: "/downloads/coaching-packages-flyer.html",
    downloadUrlEs: "/downloads/coaching-packages-flyer-es.html",
  },
];

interface PaidResource {
  fileId: string;
  title: string;
  titleEs: string;
  description: string;
  descriptionEs: string;
  priceLabel: string;
  type: "worksheet" | "guide" | "ebook" | "flyer";
}

const paidResources: PaidResource[] = [
  {
    fileId: "daily-growth-journal",
    title: "Change180 Daily Growth Journal",
    titleEs: "Diario de Crecimiento Diario Change180",
    description:
      "A printable daily journal to build reflection, gratitude, and intentional growth into your routine. Structured prompts guide you through each day of your transformation journey.",
    descriptionEs:
      "Un diario diario imprimible para incorporar reflexión, gratitud y crecimiento intencional en tu rutina. Indicaciones estructuradas te guían en cada día de tu viaje de transformación.",
    priceLabel: "$9",
    type: "ebook",
  },
  {
    fileId: "bloom-journal",
    title: "Change180 Bloom Journal",
    titleEs: "Diario Florece Change180",
    description:
      "A printable journal to help you grow into your fullest self. Guided prompts nurture self-awareness, gratitude, and the small daily steps that help you bloom.",
    descriptionEs:
      "Un diario imprimible para ayudarte a florecer en tu versión más plena. Indicaciones guiadas cultivan el autoconocimiento, la gratitud y los pequeños pasos diarios que te ayudan a florecer.",
    priceLabel: "$9",
    type: "ebook",
  },
  {
    fileId: "business-growth-planner",
    title: "Change180 Business Growth Planner",
    titleEs: "Planificador de Crecimiento Empresarial Change180",
    description:
      "A printable planner to set goals, map your strategy, and track progress as you grow your business. Structured worksheets turn big ambitions into clear, actionable steps.",
    descriptionEs:
      "Un planificador imprimible para fijar metas, trazar tu estrategia y seguir tu progreso mientras haces crecer tu negocio. Hojas de trabajo estructuradas convierten grandes ambiciones en pasos claros y accionables.",
    priceLabel: "$19",
    type: "worksheet",
  },
  {
    fileId: "leadership-journal",
    title: "Change180 Leadership Journal",
    titleEs: "Diario de Liderazgo Change180",
    description:
      "A printable journal to develop the mindset and habits of a confident leader. Reflective prompts help you lead with clarity, purpose, and intention every day.",
    descriptionEs:
      "Un diario imprimible para desarrollar la mentalidad y los hábitos de un líder seguro. Indicaciones reflexivas te ayudan a liderar con claridad, propósito e intención cada día.",
    priceLabel: "$12",
    type: "ebook",
  },
];

const typeIcons = {
  worksheet: FileText,
  guide: BookOpen,
  ebook: BookOpen,
  flyer: FileSpreadsheet,
};

const typeLabels = {
  worksheet: { en: "Worksheet", es: "Hoja de Trabajo" },
  guide: { en: "Guide", es: "Guía" },
  ebook: { en: "E-Book", es: "Libro Digital" },
  flyer: { en: "Flyer", es: "Folleto" },
};

const Resources = () => {
  const { language } = useLanguage();
  const [loadingFileId, setLoadingFileId] = useState<string | null>(null);

  const content = {
    en: {
      title: "Free Resources",
      subtitle: "Tools for Your Transformation Journey",
      description:
        "Download these free resources to support your personal growth, faith journey, and emotional wellness. Each resource is designed to help you take meaningful steps toward the life you're called to live.",
      downloadButton: "Download Free",
      premiumTitle: "Premium Downloads",
      premiumDescription:
        "Go deeper with these paid guides and journals. After a secure checkout, your download link is emailed to you instantly.",
      buyButton: "Buy",
      buyLoading: "Redirecting…",
      buyError: "Something went wrong starting checkout. Please try again.",
      ctaTitle: "Ready for Deeper Transformation?",
      ctaDescription:
        "These resources are just the beginning. Book a discovery session to explore how personalized coaching can help you achieve lasting change.",
      ctaButton: "Book a Free Discovery Call",
      backToHome: "Back to Home",
    },
    es: {
      title: "Recursos Gratuitos",
      subtitle: "Herramientas para Tu Viaje de Transformación",
      description:
        "Descarga estos recursos gratuitos para apoyar tu crecimiento personal, tu camino de fe y tu bienestar emocional. Cada recurso está diseñado para ayudarte a dar pasos significativos hacia la vida que estás llamado a vivir.",
      downloadButton: "Descargar Gratis",
      premiumTitle: "Descargas Premium",
      premiumDescription:
        "Profundiza con estas guías y diarios de pago. Tras un pago seguro, tu enlace de descarga se envía a tu correo al instante.",
      buyButton: "Comprar",
      buyLoading: "Redirigiendo…",
      buyError: "Algo salió mal al iniciar el pago. Inténtalo de nuevo.",
      ctaTitle: "¿Listo para una Transformación Más Profunda?",
      ctaDescription:
        "Estos recursos son solo el comienzo. Reserva una sesión de descubrimiento para explorar cómo el coaching personalizado puede ayudarte a lograr un cambio duradero.",
      ctaButton: "Reservar Llamada de Descubrimiento",
      backToHome: "Volver al Inicio",
    },
  };

  const t = content[language];

  const handleBuy = async (fileId: string) => {
    setLoadingFileId(fileId);
    try {
      const res = await fetch("/api/checkout/create-download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileId }),
      });
      const data = await res.json();
      if (res.ok && data?.url) {
        window.location.href = data.url;
        return;
      }
      toast.error(t.buyError);
    } catch {
      toast.error(t.buyError);
    } finally {
      setLoadingFileId(null);
    }
  };

  return (
    <Layout>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
            <Heart className="w-4 h-4" />
            {t.title}
          </span>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-foreground mb-6">
            {t.subtitle}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.description}
          </p>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-12 px-4 sm:px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
            {resources.map((resource) => {
              const Icon = typeIcons[resource.type];
              const typeLabel = typeLabels[resource.type][language];

              return (
                <div
                  key={resource.id}
                  className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* Type Badge */}
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-accent/20 text-accent-foreground rounded-full text-xs font-medium mb-4">
                    <Icon className="w-3.5 h-3.5" />
                    {typeLabel}
                  </span>

                  {/* Title & Description */}
                  <h2 className="font-display text-xl sm:text-2xl text-foreground mb-3">
                    {language === "es" ? resource.titleEs : resource.title}
                  </h2>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {language === "es"
                      ? resource.descriptionEs
                      : resource.description}
                  </p>

                  {/* Download Button */}
                  <a
                    href={language === "es" && resource.downloadUrlEs ? resource.downloadUrlEs : resource.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6 py-3 font-medium text-sm transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    {t.downloadButton}
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Premium (Paid) Downloads */}
      <section className="py-12 px-4 sm:px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-accent/20 text-accent-foreground rounded-full text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              {t.premiumTitle}
            </span>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t.premiumDescription}
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {paidResources.map((resource) => {
              const Icon = typeIcons[resource.type];
              const typeLabel = typeLabels[resource.type][language];
              const isLoading = loadingFileId === resource.fileId;

              return (
                <div
                  key={resource.fileId}
                  className="bg-card border border-primary/20 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col"
                >
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-accent/20 text-accent-foreground rounded-full text-xs font-medium mb-4 self-start">
                    <Icon className="w-3.5 h-3.5" />
                    {typeLabel}
                  </span>

                  <h2 className="font-display text-xl sm:text-2xl text-foreground mb-3">
                    {language === "es" ? resource.titleEs : resource.title}
                  </h2>
                  <p className="text-muted-foreground mb-6 leading-relaxed flex-1">
                    {language === "es" ? resource.descriptionEs : resource.description}
                  </p>

                  <div className="flex items-center justify-between gap-4 mt-auto">
                    <span className="font-display text-2xl text-primary">
                      {resource.priceLabel}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleBuy(resource.fileId)}
                      disabled={isLoading}
                      className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 disabled:opacity-70 text-primary-foreground rounded-full px-6 py-3 font-medium text-sm transition-colors"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          {t.buyLoading}
                        </>
                      ) : (
                        <>
                          <Download className="w-4 h-4" />
                          {t.buyButton} {resource.priceLabel}
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-3xl">
          <div className="bg-primary/5 border border-primary/20 rounded-3xl p-8 sm:p-12 text-center">
            <h3 className="font-display text-2xl sm:text-3xl text-foreground mb-4">
              {t.ctaTitle}
            </h3>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              {t.ctaDescription}
            </p>
            <BookingCTA
              packageId="discovery"
              text={t.ctaButton}
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 py-3 font-medium transition-colors"
            />
          </div>
        </div>
      </section>

      {/* Back to Home Link */}
      <section className="pb-16 px-4 sm:px-6 text-center">
        <a
          href="/"
          className="text-primary hover:text-primary/80 font-medium transition-colors"
        >
          &larr; {t.backToHome}
        </a>
      </section>
    </Layout>
  );
};

export default Resources;
