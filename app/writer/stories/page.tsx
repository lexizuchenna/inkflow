import Aside from "@/components/writer/aside";
import MainStories from "@/components/writer/stories";

export default function Stories() {
  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      <Aside />
      <main className="flex-1 p-6 md:p-12 max-w-6xl mx-auto w-full space-y-12">
        <MainStories />
      </main>
    </div>
  );
}
