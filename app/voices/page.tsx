import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import NursingHero from '@/components/NursingHero';
import AnonymousVoiceForm from '@/components/AnonymousVoiceForm';

export const dynamic = 'force-dynamic';

export default async function SharePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <NursingHero />

      <section className="py-12 sm:py-16 md:py-20 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <AnonymousVoiceForm />
        </div>
      </section>

      <Footer />
    </main>
  );
}
