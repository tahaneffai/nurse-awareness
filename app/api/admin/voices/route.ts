import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAdminAuthenticated } from '@/lib/admin-auth';

export async function GET(request: NextRequest) {
  try {
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const size = parseInt(searchParams.get('size') || '20');
    const search = searchParams.get('search') || '';
    const sort = searchParams.get('sort') || 'newest';
    const status = searchParams.get('status') || 'all';

    const skip = (page - 1) * size;

    // Build where clause
    const where: any = {};
    if (status !== 'all') {
      where.status = status;
    }
    if (search) {
      // SQLite doesn't support case-insensitive search directly, so we use contains
      where.message = {
        contains: search,
      };
    }

    // Build orderBy
    const orderBy = sort === 'newest'
      ? { createdAt: 'desc' as const }
      : { createdAt: 'asc' as const };

    // Fetch voices
    const [voices, total] = await Promise.all([
      prisma.anonymousVoice.findMany({
        where,
        orderBy,
        skip,
        take: size,
      }),
      prisma.anonymousVoice.count({ where }),
    ]);

    return NextResponse.json({
      voices: voices.map((v) => ({
        id: v.id,
        message: v.message,
        topicTags: v.topicTags,
        createdAt: v.createdAt.toISOString(),
        status: v.status,
      })),
      pagination: {
        page,
        size,
        total,
        totalPages: Math.ceil(total / size),
        hasMore: skip + size < total,
      },
    });
  } catch (error) {
    console.error('Error fetching admin voices:', error);
    return NextResponse.json(
      { error: 'Failed to fetch voices' },
      { status: 500 }
    );
  }
}

