import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Lightweight token verification for Edge Runtime
// Does NOT use bcrypt or any Node.js APIs
// Only checks token format, not cryptographic validity
function verifyTokenFormat(token: string): boolean {
  try {
    // Use atob for base64 decoding (available in Edge Runtime)
    const decoded = atob(token);
    // Token format: timestamp-random (contains dash)
    return decoded.includes('-') && decoded.length > 10;
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  // Only check admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Check for admin session cookie (lightweight check only)
    // Full authentication is handled by API routes in Node.js runtime
    const token = request.cookies.get('admin_session')?.value;
    const hasValidToken = token ? verifyTokenFormat(token) : false;

    // Redirect to login if no valid token (except login page)
    if (!hasValidToken && request.nextUrl.pathname !== '/admin/login') {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    // Redirect to dashboard if has token and on login page
    if (hasValidToken && request.nextUrl.pathname === '/admin/login') {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};

