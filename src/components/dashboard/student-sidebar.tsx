"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  BookOpen,
  Award,
  User,
  Settings,
  Bell,
  Heart,
  CreditCard,
  Clock,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/components/providers/auth-provider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "My Courses", href: "/dashboard/courses", icon: BookOpen },
  { name: "Certificates", href: "/dashboard/certificates", icon: Award },
  { name: "Wishlist", href: "/dashboard/wishlist", icon: Heart },
  { name: "Notifications", href: "/dashboard/notifications", icon: Bell },
  { name: "Profile", href: "/dashboard/profile", icon: User },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function StudentSidebar() {
  const pathname = usePathname();
  const { user, signOut } = useAuth();

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  };

  const getUserInitials = () => {
    if (!user?.email) return "U";
    const name = user.user_metadata?.full_name || user.email;
    return name
      .split(" ")
      .map((n: string) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

    <aside className="sticky top-0 h-screen w-64 bg-card border-r flex flex-col">
      {/* Logo */}
      <div className="p-4 border-b">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/assets/images/academy-icon.svg"
            alt="InnovaSci Open Academy"
            width={40}
            height={40}
            className="h-10 w-10"
          />
          <div>
            <span className="font-bold gradient-text">InnovaSci</span>
            <span className="text-xs text-muted-foreground block">Student Portal</span>
          </div>
        </Link>
      </div>
        </Link>
      </div>

      {/* User Profile */}
      <div className="p-4 border-b">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={user?.user_metadata?.avatar_url} />
            <AvatarFallback className="bg-gradient-to-br from-brand-purple-500 to-brand-blue-500 text-white">
              {getUserInitials()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="font-medium truncate">
              {user?.user_metadata?.full_name || "Student"}
            </p>
            <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2 overflow-y-auto scrollbar-thin">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors",
                    isActive(item.href)
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  <span className="text-sm">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom Actions */}
      <div className="p-2 border-t">
        <button
          onClick={() => signOut()}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          <LogOut className="h-5 w-5 flex-shrink-0" />
          <span className="text-sm">Sign Out</span>
        </button>
      </div>
    </aside>
  );
}