import SideBar from "@/components/SideBar";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen   flex-col md:flex-row">
      <SideBar />
      <div className="flex-1 p-10 h-full bg-black">{children}</div>
    </div>
  );
}
