
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FadeIn } from "../animations/FadeIn";
import {
  BarChart3Icon,
  BoxIcon,
  CreditCardIcon,
  LayoutDashboardIcon,
  MenuIcon,
  PackageIcon,
  ShoppingCartIcon,
  UsersIcon,
  XIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

interface SidebarProps {
  className?: string;
}

const MENU_ITEMS = [
  {
    title: "Dashboard",
    icon: LayoutDashboardIcon,
    path: "/",
  },
  {
    title: "Products",
    icon: PackageIcon,
    path: "/products",
  },
  {
    title: "Orders",
    icon: ShoppingCartIcon,
    path: "/orders",
  },
  {
    title: "Users",
    icon: UsersIcon,
    path: "/users",
  },
  {
    title: "Statistics",
    icon: BarChart3Icon,
    path: "/statistics",
  },
];

export function Sidebar({ className }: SidebarProps) {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(!isMobile);

  useEffect(() => {
    if (isMobile) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) {
      setIsOpen(false);
    }
  }, [location.pathname, isMobile]);

  return (
    <>
      {/* Mobile backdrop */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile toggle button */}
      {isMobile && (
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-4 left-4 z-50"
          onClick={() => setIsOpen(!isOpen)}
        >
          <MenuIcon className="h-6 w-6" />
        </Button>
      )}
      
      <aside
        className={cn(
          "bg-sidebar fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 ease-in-out",
          isMobile && !isOpen && "-translate-x-full",
          isMobile && isOpen && "translate-x-0",
          !isMobile && "relative w-64 shrink-0",
          className
        )}
      >
        <div className="flex h-full flex-col overflow-y-auto border-r">
          <div className="flex h-16 items-center justify-between px-6">
            <h1 className="text-2xl font-semibold text-sidebar-foreground">
              AdminPro
            </h1>
            {isMobile && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="text-sidebar-foreground"
              >
                <XIcon className="h-5 w-5" />
              </Button>
            )}
          </div>
          <nav className="flex-1 space-y-2 px-3 py-6">
            {MENU_ITEMS.map((item, index) => (
              <FadeIn key={item.path} delay={100 + index * 50}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    cn(
                      "group flex items-center gap-3 rounded-md px-3 py-2 text-sidebar-foreground hover:bg-sidebar-accent transition-all",
                      isActive && "bg-sidebar-accent font-medium"
                    )
                  }
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.title}</span>
                </NavLink>
              </FadeIn>
            ))}
          </nav>
          <div className="p-4">
            <div className="rounded-lg bg-sidebar-accent p-3 text-sidebar-foreground text-sm">
              <p className="font-medium mb-1">Need help?</p>
              <p className="text-xs opacity-80">Check our documentation or contact support</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
