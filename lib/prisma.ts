import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Validate DATABASE_URL format
function validateDatabaseUrl(): void {
  const dbUrl = process.env.DATABASE_URL;
  
  if (!dbUrl) {
    throw new Error(
      '❌ DATABASE_URL is not set!\n' +
      'Please set DATABASE_URL in your environment variables.\n' +
      'For Vercel: Go to Settings → Environment Variables → Add DATABASE_URL\n' +
      'Format: postgresql://user:password@host:5432/database?sslmode=require'
    );
  }

  const trimmedUrl = dbUrl.trim();
  
  // Remove quotes if present
  const cleanUrl = trimmedUrl.replace(/^["']|["']$/g, '');
  
  if (!cleanUrl.startsWith('postgresql://') && !cleanUrl.startsWith('postgres://')) {
    throw new Error(
      '❌ Invalid DATABASE_URL format!\n' +
      `Current value: ${cleanUrl.substring(0, 50)}...\n` +
      'DATABASE_URL must start with "postgresql://" or "postgres://"\n' +
      'Example: postgresql://user:password@host:5432/database?sslmode=require\n' +
      'See VERCEL_DATABASE_URL_FIX.md for help'
    );
  }
}

// Validate on import (only in production/server environments)
if (typeof window === 'undefined') {
  try {
    validateDatabaseUrl();
  } catch (error) {
    // Log error but don't throw during module load (allows graceful error handling)
    console.error('[Prisma] Database URL validation failed:', error instanceof Error ? error.message : error);
  }
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
