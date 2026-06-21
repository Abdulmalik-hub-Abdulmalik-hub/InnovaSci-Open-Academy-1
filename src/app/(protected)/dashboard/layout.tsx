import { StudentSidebar } from "@/components/dashboard/student-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <StudentSidebar />
      <main className="ml-64 min-h-screen">
        {children}
      </main>
    </div>
  );
}