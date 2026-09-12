import MobileBottomNav from "./MobileBottomNav";
import Sidebar from "./Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <main className="flex-1 w-full px-4 py-5 pb-24 md:p-8 md:pb-8">
        {children}
      </main>

      <MobileBottomNav />
    </div>
  );
}
