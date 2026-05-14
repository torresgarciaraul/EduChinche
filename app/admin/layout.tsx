import { AdminLayoutWrapper } from "@/components/admin/AdminLayoutWrapper";
import { isAdminAuthenticated } from "@/lib/auth/admin";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // Server-side check for authentication
  const authenticated = await isAdminAuthenticated();
  
  // Note: Middleware also handles this, but this is a secondary safety check
  // and allows us to decide if we want to wrap with AdminLayoutWrapper or not
  
  return <AdminLayoutWrapper>{children}</AdminLayoutWrapper>;
}
