import Sidebar from "./sidebar";
import TopNavBar from "./top-navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <TopNavBar />
        <main className="bg-[#f8f8f8] p-5 xl:px-14 xl:py-8">{children}</main>
      </div>
    </div>
  );
}
