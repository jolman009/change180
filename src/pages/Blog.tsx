import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Clock, ArrowRight } from "lucide-react";
import { getAllPosts } from "@/lib/blog";
import { useLanguage } from "@/contexts/LanguageContext";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Blog = () => {
  const { language } = useLanguage();
  const posts = getAllPosts();

  const isSpanish = language === "es";

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-cream-100">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="text-primary font-medium text-sm tracking-widest uppercase mb-4 block">
              {isSpanish ? "Blog y Recursos" : "Blog & Resources"}
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
              {isSpanish ? "Perspectivas para Tu Camino" : "Insights for Your Journey"}
            </h1>
            <p className="text-muted-foreground text-lg">
              {isSpanish
                ? "Artículos, consejos y recursos centrados en la fe para apoyar tu crecimiento personal y familiar."
                : "Faith-centered articles, tips, and resources to support your personal and family growth."}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {posts.map((post, index) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <Link to={`/blog/${post.slug}`}>
                  <div className="bg-background rounded-2xl overflow-hidden shadow-soft border border-border hover:shadow-card transition-all duration-300">
                    {/* Image */}
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={post.image}
                        alt={isSpanish ? post.titleEs : post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      {/* Category & Reading Time */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-medium text-primary uppercase tracking-wide">
                          {isSpanish ? post.categoryEs : post.category}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock size={12} />
                          {post.readingTime} {isSpanish ? "min" : "min read"}
                        </span>
                      </div>

                      {/* Title */}
                      <h2 className="font-serif text-xl text-foreground mb-3 group-hover:text-primary transition-colors">
                        {isSpanish ? post.titleEs : post.title}
                      </h2>

                      {/* Excerpt */}
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
                        {isSpanish ? post.excerptEs : post.excerpt}
                      </p>

                      {/* Read More */}
                      <div className="flex items-center gap-2 text-primary text-sm font-medium">
                        {isSpanish ? "Leer más" : "Read more"}
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>

          {/* No Posts Message */}
          {posts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground">
                {isSpanish ? "No hay artículos disponibles aún." : "No articles available yet."}
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
