export default function HireTalentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="max-w-[2400px] mx-auto bg-[#eaeefe] pb-28">
      {children}
    </main>
  );
}
