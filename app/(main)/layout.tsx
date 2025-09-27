import Header from "@/components/Header";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <div>
        <Header />
        <div className="px-20 py-4">{children}</div>
      </div>
    </main>
  );
}
