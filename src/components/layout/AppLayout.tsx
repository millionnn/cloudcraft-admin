
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { FadeIn } from "../animations/FadeIn";
import { Outlet } from "react-router-dom";

export function AppLayout() {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-x-hidden">
        <Navbar />
        <main className="flex-1 p-6">
          <FadeIn>
            <Outlet />
          </FadeIn>
        </main>
      </div>
    </div>
  );
}
