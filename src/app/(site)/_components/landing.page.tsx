'use client';
import Footer from '@/features/landing/footer';
import Hero from '@/features/landing/section/hero';
import ProblemSection from '@/features/landing/section/problems.it.solves';

export default function LandingPageUI() {
  return (
    <div className="min-h-screen">
      <main className="container flex flex-col gap-24 py-24">
        <section title="hero">
          <Hero />
        </section>
        <section title="problems it solves">
          <ProblemSection />
        </section>
      </main>
      <Footer />
    </div>
  );
}
