import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { safeDbQuery } from '@/lib/db-utils';

export const dynamic = 'force-dynamic';

// GET: Fetch paginated voices
// NEVER returns 500 - always returns 200 with degraded flag if DB fails
export async function GET(request: NextRequest) {
  try {
    // Parse query params safely with defaults and validation
    const pageParam = request.nextUrl.searchParams.get('page') || '1';
    const sizeParam = request.nextUrl.searchParams.get('size') || '12';
    const sortParam = request.nextUrl.searchParams.get('sort') || 'newest';

    const page = Math.max(1, parseInt(pageParam) || 1);
    const size = Math.min(50, Math.max(1, parseInt(sizeParam) || 12)); // Cap at 50
    const sort = sortParam === 'oldest' ? 'oldest' : 'newest';

    const skip = (page - 1) * size;

    // Build orderBy
    const orderBy = sort === 'newest' 
      ? { createdAt: 'desc' as const }
      : { createdAt: 'asc' as const };

    // Fetch voices with safe error handling
    const [voicesResult, totalResult] = await Promise.all([
      safeDbQuery(
        () => prisma.anonymousVoice.findMany({
          where: {
            status: 'APPROVED',
          },
          orderBy,
          skip,
          take: size,
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

    // Always return 200, even if degraded
    return NextResponse.json({
      ok: voicesResult.ok && totalResult.ok,
      degraded: voicesResult.degraded || totalResult.degraded,
      items: voices.map((v) => ({
        id: v.id,
        message: v.message,
        topicTags: v.topicTags,
        createdAt: v.createdAt.toISOString(),
      })),
      page,
      size,
      total,
      totalPages: Math.ceil(total / size),
      hasMore: skip + size < total,
      // Include error info in dev mode only
      ...(process.env.NODE_ENV === 'development' && (voicesResult.degraded || totalResult.degraded) ? {
        _debug: {
          voicesError: voicesResult.errorCode,
          totalError: totalResult.errorCode,
        },
      } : {}),
    }, { status: 200 });
  } catch (error: any) {
    // This catch should rarely trigger, but if it does, return 200 with degraded
    console.error('[GET /api/voices] Unexpected error:', error);
    
    const pageParam = request.nextUrl.searchParams.get('page') || '1';
    const sizeParam = request.nextUrl.searchParams.get('size') || '12';
    const page = Math.max(1, parseInt(pageParam) || 1);
    const size = Math.min(50, Math.max(1, parseInt(sizeParam) || 12));

    return NextResponse.json({
      ok: false,
      degraded: true,
      items: [],
      page,
      size,
      total: 0,
      totalPages: 0,
      hasMore: false,
      ...(process.env.NODE_ENV === 'development' ? {
        _debug: {
          error: error?.message || 'Unknown error',
        },
      } : {}),
    }, { status: 200 });
  }
}

// POST: Create a new voice submission
// Returns 200 with degraded flag if DB fails, never 500
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, topicTags } = body;

    // Validation
    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { 
          ok: false,
          error: 'Message is required',
          message: 'Message is required',
        },
        { status: 400 }
      );
    }

    const trimmedMessage = message.trim();

    if (trimmedMessage.length < 20) {
      return NextResponse.json(
        { 
          ok: false,
          error: 'Message must be at least 20 characters',
          message: 'Message must be at least 20 characters',
        },
        { status: 400 }
      );
    }

    if (trimmedMessage.length > 2000) {
      return NextResponse.json(
        { 
          ok: false,
          error: 'Message must be less than 2000 characters',
          message: 'Message must be less than 2000 characters',
        },
        { status: 400 }
      );
    }

    // Enhanced sanitization: remove potential HTML/script tags and dangerous patterns
    const sanitizedMessage = trimmedMessage
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .replace(/javascript:/gi, '') // Remove javascript: protocol
      .replace(/on\w+=/gi, '') // Remove event handlers
      .replace(/data:/gi, '') // Remove data: protocol
      .replace(/vbscript:/gi, '') // Remove vbscript: protocol
      .trim();

    // Sanitize topicTags if provided
    const sanitizedTags = topicTags
      ? topicTags
          .split(',')
          .map((tag: string) => tag.trim().replace(/[<>]/g, ''))
          .filter((tag: string) => tag.length > 0)
          .slice(0, 5) // Limit to 5 tags
          .join(',')
      : null;

    // Create voice with PENDING status using safeDbQuery
    const createResult = await safeDbQuery(
      () => prisma.anonymousVoice.create({
        data: {
          message: sanitizedMessage,
          topicTags: sanitizedTags,
          status: 'PENDING',
        },
      }),
      null as any
    );

    if (createResult.ok) {
      return NextResponse.json(
        { 
          ok: true,
          pending: true,
          message: 'Thanks. Your message was received and will appear after review.',
        },
        { status: 200 }
      );
    } else {
      // DB failed but return 200 with degraded status
      return NextResponse.json(
        {
          ok: false,
          degraded: true,
          message: 'Temporary unavailable. Please try again later.',
          error: createResult.errorMessage || 'Database unavailable',
        },
        { status: 200 }
      );
    }
  } catch (error: any) {
    // This catch should rarely trigger, but if it does, return 200 with degraded
    console.error('[POST /api/voices] Unexpected error:', error);
    
    // Handle JSON parse errors
    if (error instanceof SyntaxError || error?.message?.includes('JSON')) {
      return NextResponse.json(
        {
          ok: false,
          error: 'Invalid request body',
          message: 'Invalid request format',
        },
        { status: 400 }
      );
    }

    // For any other unexpected error, return 200 with degraded
    return NextResponse.json(
      {
        ok: false,
        degraded: true,
        message: 'Temporary unavailable. Please try again later.',
        error: 'Internal error',
        ...(process.env.NODE_ENV === 'development' ? {
          _debug: {
            error: error?.message || 'Unknown error',
          },
        } : {}),
      },
      { status: 200 }
    );
  }
}

