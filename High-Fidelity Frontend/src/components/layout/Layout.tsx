import { Outlet } from "react-router";
import { AnnouncementBar } from "./AnnouncementBar";
import { Navigation } from "./Navigation";
import { MobileNav } from "./MobileNav";
import { Footer } from "./Footer";

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <Navigation />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <MobileNav />
    </div>
  );
}
