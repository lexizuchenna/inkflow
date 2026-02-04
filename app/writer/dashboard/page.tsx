import Analytics from "@/components/writer/analytics";
import Aside from "@/components/writer/aside";
import Header from "@/components/writer/header";
import RecentStories from "@/components/writer/recent-stories";

export default function WriterDashboard() {
  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      <Aside />
      <main className="flex-1 p-6 md:p-12 max-w-6xl mx-auto w-full space-y-12">
        <Header />

        <Analytics />

        <RecentStories />
      </main>
    </div>
  );
}
