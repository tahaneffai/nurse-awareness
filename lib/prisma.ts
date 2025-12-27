import { PrismaClient } from '@prisma/client';

// Prevent multiple PrismaClient instances in development (Fast Refresh)
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Ensure PrismaClient is a singleton
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

