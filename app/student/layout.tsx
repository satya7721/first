// app/student/layout.tsx
import DashboardLayout from '@/components/ui/dashboard';

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout role="student">{children}</DashboardLayout>;
}
