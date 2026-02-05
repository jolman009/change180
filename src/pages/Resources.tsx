import { Download, FileText, BookOpen, Heart, FileSpreadsheet } from "lucide-react";
import { PopupButton } from "react-calendly";
import { useLanguage } from "@/contexts/LanguageContext";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

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
  const calendlyUrl = "https://calendly.com/change180lifecoach";

  const content = {
    en: {
      title: "Free Resources",
      subtitle: "Tools for Your Transformation Journey",
      description:
        "Download these free resources to support your personal growth, faith journey, and emotional wellness. Each resource is designed to help you take meaningful steps toward the life you're called to live.",
      downloadButton: "Download Free",
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
      ctaTitle: "¿Listo para una Transformación Más Profunda?",
      ctaDescription:
        "Estos recursos son solo el comienzo. Reserva una sesión de descubrimiento para explorar cómo el coaching personalizado puede ayudarte a lograr un cambio duradero.",
      ctaButton: "Reservar Llamada de Descubrimiento",
      backToHome: "Volver al Inicio",
    },
  };

  const t = content[language];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

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
                  <h3 className="font-display text-xl sm:text-2xl text-foreground mb-3">
                    {language === "es" ? resource.titleEs : resource.title}
                  </h3>
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

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-3xl">
          <div className="bg-primary/5 border border-primary/20 rounded-3xl p-8 sm:p-12 text-center">
            <h2 className="font-display text-2xl sm:text-3xl text-foreground mb-4">
              {t.ctaTitle}
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              {t.ctaDescription}
            </p>
            <PopupButton
              url={calendlyUrl}
              rootElement={document.getElementById("root")!}
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

      <Footer />
    </div>
  );
};

export default Resources;
