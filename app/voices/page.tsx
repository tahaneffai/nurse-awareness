import { prisma } from '@/lib/prisma';
import { safeDbQuery } from '@/lib/db-utils';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import VoicesPageClient from '@/components/VoicesPageClient';
import VoicesPageHero from '@/components/VoicesPageHero';

export const dynamic = 'force-dynamic';

async function getInitialVoices() {
  try {
    const [voicesResult, totalResult] = await Promise.all([
      safeDbQuery(
        () => prisma.anonymousVoice.findMany({
          where: {
            status: 'APPROVED',
          },
          orderBy: {
            createdAt: 'desc',
          },
          take: 12,
        }),
        []
      ),
      safeDbQuery(
        () => prisma.anonymousVoice.count({
          where: {
            status: 'APPROVED',
          },
        }),
        0
      ),
    ]);

    const voices = voicesResult.data;
    const total = totalResult.data;

    return {
      voices: voices.map((v: any) => ({
        id: v.id,
        message: v.message,
        createdAt: v.createdAt.toISOString(),
        topicTags: v.topicTags,
      })),
      pagination: {
        page: 1,
        size: 12,
        total,
        totalPages: Math.ceil(total / 12),
        hasMore: 12 < total,
      },
      degraded: voicesResult.degraded || totalResult.degraded,
    };
  } catch (error) {
    console.error('Error fetching initial voices:', error);
    return {
      voices: [],
      pagination: {
        page: 1,
        size: 12,
        total: 0,
        totalPages: 0,
        hasMore: false,
      },
      degraded: true,
    };
  }
}

export default async function VoicesPage() {
  const initialData = await getInitialVoices();

  return (
    <main className="min-h-screen">
      <Navbar />
      <VoicesPageHero />

      <section className="py-12 sm:py-16 md:py-20 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <VoicesPageClient initialData={initialData} />
        </div>
      </section>

      <Footer />
    </main>
  );
}
