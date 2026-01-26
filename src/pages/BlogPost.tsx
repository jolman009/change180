import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft, Clock, Calendar, User } from "lucide-react";
import { getPostBySlug, getAllPosts } from "@/lib/blog";
import { useLanguage } from "@/contexts/LanguageContext";
import { PopupButton } from "react-calendly";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { language } = useLanguage();
  const post = slug ? getPostBySlug(slug) : undefined;
  const allPosts = getAllPosts();

  const isSpanish = language === "es";
  const calendlyUrl = "https://calendly.com/change180lifecoach";

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  // Get related posts (same category, excluding current)
  const relatedPosts = allPosts
    .filter(p => p.category === post.category && p.slug !== post.slug)
    .slice(0, 2);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(isSpanish ? "es-ES" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-8 bg-cream-100">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            {/* Back Link */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
              >
                <ArrowLeft size={16} />
                {isSpanish ? "Volver al Blog" : "Back to Blog"}
              </Link>
            </motion.div>

            {/* Category */}
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-primary font-medium text-sm tracking-widest uppercase mb-4 block"
            >
              {isSpanish ? post.categoryEs : post.category}
            </motion.span>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-6 leading-tight"
            >
              {isSpanish ? post.titleEs : post.title}
            </motion.h1>

            {/* Meta */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground"
            >
              <span className="flex items-center gap-2">
                <User size={14} />
                {post.author}
              </span>
              <span className="flex items-center gap-2">
                <Calendar size={14} />
                {formatDate(post.date)}
              </span>
              <span className="flex items-center gap-2">
                <Clock size={14} />
                {post.readingTime} {isSpanish ? "min de lectura" : "min read"}
              </span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="py-8">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-4xl mx-auto"
          >
            <div className="aspect-[16/9] rounded-2xl overflow-hidden shadow-card">
              <img
                src={post.image}
                alt={isSpanish ? post.titleEs : post.title}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-8 pb-16">
        <div className="container mx-auto px-6">
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-3xl mx-auto"
          >
            <div className="prose prose-lg prose-slate max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h2: ({ children }) => (
                    <h2 className="font-serif text-2xl md:text-3xl text-foreground mt-10 mb-4">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="font-serif text-xl md:text-2xl text-foreground mt-8 mb-3">
                      {children}
                    </h3>
                  ),
                  p: ({ children }) => (
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {children}
                    </p>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4 ml-4">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal list-inside space-y-2 text-muted-foreground mb-4 ml-4">
                      {children}
                    </ol>
                  ),
                  li: ({ children }) => (
                    <li className="text-muted-foreground">{children}</li>
                  ),
                  strong: ({ children }) => (
                    <strong className="text-foreground font-semibold">{children}</strong>
                  ),
                  em: ({ children }) => (
                    <em className="italic text-foreground">{children}</em>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-primary pl-4 my-6 italic text-foreground">
                      {children}
                    </blockquote>
                  ),
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>

            {/* CTA Section */}
            <div className="mt-12 p-8 bg-peach-100 rounded-2xl text-center">
              <h3 className="font-serif text-2xl text-foreground mb-3">
                {isSpanish ? "¿Listo para dar el siguiente paso?" : "Ready to Take the Next Step?"}
              </h3>
              <p className="text-muted-foreground mb-6">
                {isSpanish
                  ? "Agenda una sesión de descubrimiento gratuita y comencemos tu camino hacia la transformación."
                  : "Schedule a discovery session and let's begin your journey toward transformation."}
              </p>
              <PopupButton
                url={calendlyUrl}
                rootElement={document.getElementById("root")!}
                text={isSpanish ? "Reservar una Sesión" : "Book a Session"}
                className="inline-flex items-center justify-center bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 py-3 font-medium transition-all"
              />
            </div>
          </motion.article>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-cream-100">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-8 text-center">
                {isSpanish ? "Artículos Relacionados" : "Related Articles"}
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.slug}
                    to={`/blog/${relatedPost.slug}`}
                    className="group"
                  >
                    <div className="bg-background rounded-xl overflow-hidden shadow-soft border border-border hover:shadow-card transition-all">
                      <div className="aspect-[16/10] overflow-hidden">
                        <img
                          src={relatedPost.image}
                          alt={isSpanish ? relatedPost.titleEs : relatedPost.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-5">
                        <h3 className="font-serif text-lg text-foreground group-hover:text-primary transition-colors">
                          {isSpanish ? relatedPost.titleEs : relatedPost.title}
                        </h3>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default BlogPost;
