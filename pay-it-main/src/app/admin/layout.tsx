import { AdminNavigation } from "./components/navbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-row h-screen bg-zinc-950">
      <AdminNavigation />
      <section className="w-full overflow-auto">{children}</section>
    </main>
  );
}
