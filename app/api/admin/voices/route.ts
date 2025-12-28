import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAdminAuthenticated } from '@/lib/admin-auth';
import { safeDbQuery } from '@/lib/db-utils';

export const dynamic = 'force-dynamic';

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
    const pageParam = searchParams.get('page') || '1';
    const sizeParam = searchParams.get('size') || '20';
    const search = searchParams.get('search') || '';
    const sort = searchParams.get('sort') || 'newest';
    const status = searchParams.get('status') || 'all';

    const page = Math.max(1, parseInt(pageParam) || 1);
    const size = Math.min(50, Math.max(1, parseInt(sizeParam) || 20)); // Cap at 50
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

    // Fetch voices with safe error handling
    const [voicesResult, totalResult] = await Promise.all([
      safeDbQuery(
        () => prisma.anonymousVoice.findMany({
          where,
          orderBy,
          skip,
          take: size,
        }),
        []
      ),
      safeDbQuery(
        () => prisma.anonymousVoice.count({ where }),
        0
      ),
    ]);

    const voices = voicesResult.data;
    const total = totalResult.data;

    // Always return 200, even if degraded
    return NextResponse.json({
      ok: voicesResult.ok && totalResult.ok,
      degraded: voicesResult.degraded || totalResult.degraded,
      voices: voices.map((v: any) => ({
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
      ...(process.env.NODE_ENV === 'development' && (voicesResult.degraded || totalResult.degraded) ? {
        _debug: {
          voicesError: voicesResult.errorCode,
          totalError: totalResult.errorCode,
        },
      } : {}),
    }, { status: 200 });
  } catch (error: any) {
    // This catch should rarely trigger, but if it does, return 200 with degraded
    console.error('[GET /api/admin/voices] Unexpected error:', error);
    
    const pageParam = request.nextUrl.searchParams.get('page') || '1';
    const sizeParam = request.nextUrl.searchParams.get('size') || '20';
    const page = Math.max(1, parseInt(pageParam) || 1);
    const size = Math.min(50, Math.max(1, parseInt(sizeParam) || 20));

    return NextResponse.json({
      ok: false,
      degraded: true,
      voices: [],
      pagination: {
        page,
        size,
        total: 0,
        totalPages: 0,
        hasMore: false,
      },
      ...(process.env.NODE_ENV === 'development' ? {
        _debug: {
          error: error?.message || 'Unknown error',
        },
      } : {}),
    }, { status: 200 });
  }
}

