import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';

export default function ProductLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-24 bg-background text-foreground">{children}</main>
      <Footer />
    </>
  );
}
