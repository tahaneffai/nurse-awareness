import { redirect } from 'next/navigation';
import { isAdminAuthenticated } from '@/lib/admin-auth';
import AdminDashboardClient from '@/components/admin/AdminDashboardClient';
import AdminShell from '@/components/admin/AdminShell';

// Force Node.js runtime for admin-auth (uses bcryptjs)
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const isAuth = await isAdminAuthenticated();

  if (!isAuth) {
    redirect('/admin/login');
  }

  return (
    <AdminShell title="Admin Dashboard">
      <AdminDashboardClient />
    </AdminShell>
  );
}

