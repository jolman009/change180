import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLanguage } from "@/contexts/LanguageContext";

const FAQ = () => {
  const { t, tArray } = useLanguage();

  const categories = [
    {
      id: "general",
      title: t("faq.categories.general"),
      questions: [
        {
          question: t("faq.questions.whatIsCoaching.question"),
          answer: t("faq.questions.whatIsCoaching.answer"),
        },
        {
          question: t("faq.questions.coachingVsTherapy.question"),
          answer: t("faq.questions.coachingVsTherapy.answer"),
        },
        {
          question: t("faq.questions.faithBased.question"),
          answer: t("faq.questions.faithBased.answer"),
        },
      ],
    },
    {
      id: "sessions",
      title: t("faq.categories.sessions"),
      questions: [
        {
          question: t("faq.questions.sessionLength.question"),
          answer: t("faq.questions.sessionLength.answer"),
        },
        {
          question: t("faq.questions.virtualOrInPerson.question"),
          answer: t("faq.questions.virtualOrInPerson.answer"),
        },
        {
          question: t("faq.questions.howOften.question"),
          answer: t("faq.questions.howOften.answer"),
        },
        {
          question: t("faq.questions.whatToExpect.question"),
          answer: t("faq.questions.whatToExpect.answer"),
        },
      ],
    },
    {
      id: "pricing",
      title: t("faq.categories.pricing"),
      questions: [
        {
          question: t("faq.questions.pricing.question"),
          answer: t("faq.questions.pricing.answer"),
        },
        {
          question: t("faq.questions.insurance.question"),
          answer: t("faq.questions.insurance.answer"),
        },
        {
          question: t("faq.questions.refunds.question"),
          answer: t("faq.questions.refunds.answer"),
        },
      ],
    },
    {
      id: "gettingStarted",
      title: t("faq.categories.gettingStarted"),
      questions: [
        {
          question: t("faq.questions.howToStart.question"),
          answer: t("faq.questions.howToStart.answer"),
        },
        {
          question: t("faq.questions.rightForMe.question"),
          answer: t("faq.questions.rightForMe.answer"),
        },
        {
          question: t("faq.questions.bilingual.question"),
          answer: t("faq.questions.bilingual.answer"),
        },
      ],
    },
  ];

  return (
    <section id="faq" className="py-24 bg-background">
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
            {t("faq.sectionLabel")}
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-6">
            {t("faq.headline")}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t("faq.description")}
          </p>
        </motion.div>

        {/* FAQ Categories */}
        <div className="max-w-3xl mx-auto space-y-12">
          {categories.map((category, categoryIndex) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
            >
              <h3 className="font-serif text-2xl text-foreground mb-6">
                {category.title}
              </h3>
              <Accordion type="single" collapsible className="space-y-4">
                {category.questions.map((item, questionIndex) => (
                  <AccordionItem
                    key={questionIndex}
                    value={`${category.id}-${questionIndex}`}
                    className="bg-card border border-border rounded-xl px-6 data-[state=open]:shadow-soft transition-shadow"
                  >
                    <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline py-5">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          ))}
        </div>

        {/* Still Have Questions CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground mb-4">
            {t("faq.stillHaveQuestions")}
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            {t("faq.contactUs")}
            <span aria-hidden="true">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
