import { cookies } from 'next/headers';
import { prisma } from './prisma';
import bcrypt from 'bcryptjs';

const ADMIN_SECRET = process.env.ADMIN_SECRET || 'default-secret-change-in-production';
const COOKIE_NAME = 'admin_session';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

// Initialize admin config on import (runs once per server instance)
let initPromise: Promise<void> | null = null;

// Initialize admin config if it doesn't exist
export async function initializeAdminConfig() {
  try {
    const existing = await prisma.adminConfig.findUnique({
      where: { id: 'singleton' },
    });

    if (!existing) {
      const defaultPassword = process.env.ADMIN_PASSWORD || '13121312';
      const passwordHash = await bcrypt.hash(defaultPassword, 10);

      await prisma.adminConfig.create({
        data: {
          id: 'singleton',
          passwordHash,
        },
      });
    }
  } catch (error) {
    console.error('Error initializing admin config:', error);
  }
}

// Verify password
export async function verifyPassword(password: string): Promise<boolean> {
  if (!initPromise) {
    initPromise = initializeAdminConfig();
  }
  await initPromise;
  
  const config = await prisma.adminConfig.findUnique({
    where: { id: 'singleton' },
  });

  if (!config) {
    return false;
  }

  return bcrypt.compare(password, config.passwordHash);
}

// Create signed token (simple but effective)
function createToken(): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2);
  return Buffer.from(`${timestamp}-${random}`).toString('base64');
}

// Verify token (check if it's valid format)
function verifyToken(token: string): boolean {
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf-8');
    return decoded.includes('-');
  } catch {
    return false;
  }
}

// Set admin session cookie
export async function setAdminSession() {
  const cookieStore = await cookies();
  const token = createToken();
  
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: COOKIE_MAX_AGE,
    path: '/',
  });
}

// Clear admin session
export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

// Check if user is authenticated
export async function isAdminAuthenticated(): Promise<boolean> {
  try {
    if (!initPromise) {
      initPromise = initializeAdminConfig();
    }
    await initPromise;

    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;

    if (!token) {
      return false;
    }

    return verifyToken(token);
  } catch (error) {
    console.error('Auth check error:', error);
    return false;
  }
}

// Update admin password
export async function updateAdminPassword(oldPassword: string, newPassword: string): Promise<{ success: boolean; error?: string }> {
  const isValid = await verifyPassword(oldPassword);
  
  if (!isValid) {
    return { success: false, error: 'Old password is incorrect' };
  }

  if (newPassword.length < 8) {
    return { success: false, error: 'New password must be at least 8 characters' };
  }

  const passwordHash = await bcrypt.hash(newPassword, 10);

  await prisma.adminConfig.update({
    where: { id: 'singleton' },
    data: { passwordHash },
  });

  return { success: true };
}

