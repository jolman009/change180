import Navigation from "./Navigation";
import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => (
  <div className="min-h-screen bg-background">
    <Navigation />
    <main className="pt-24">{children}</main>
    <Footer />
  </div>
);

export default Layout;
