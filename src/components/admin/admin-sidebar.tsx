"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Video,
  Award,
  DollarSign,
  Mail,
  HardDrive,
  BarChart3,
  Database,
  Settings,
  Shield,
  FileText,
  Headphones,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const sidebarItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Courses", href: "/admin/courses", icon: BookOpen },
  { name: "Videos", href: "/admin/videos", icon: Video },
  { name: "Certificates", href: "/admin/certificates", icon: Award },
  { name: "Pricing & Plans", href: "/admin/pricing", icon: DollarSign },
  { name: "Newsletter", href: "/admin/newsletter", icon: Mail },
  { name: "Storage", href: "/admin/storage", icon: HardDrive },
  { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { name: "Database", href: "/admin/database", icon: Database },
  { name: "Roles & Permissions", href: "/admin/roles", icon: Shield },
  { name: "Audit Logs", href: "/admin/audit-logs", icon: FileText },
  { name: "Support Center", href: "/admin/support", icon: Headphones },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  return (
    <aside
      className={cn(
        "sticky top-0 h-screen bg-card border-r flex flex-col transition-all duration-300",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="p-4 border-b">
        <Link href="/admin" className="flex items-center gap-2">
          <Image
            src="/assets/images/brand-logo-vertical.svg"
            alt="InnovaSci Open Academy"
            width={120}
            height={60}
            className="h-14 w-auto"
          />
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2 overflow-y-auto scrollbar-thin">
        <ul className="space-y-1">
          {sidebarItems.map((item) => {
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
                  title={isCollapsed ? item.name : undefined}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  {!isCollapsed && <span className="text-sm">{item.name}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom Actions */}
      <div className="p-2 border-t">
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
          title={isCollapsed ? "Back to Site" : undefined}
        >
          <LogOut className="h-5 w-5 flex-shrink-0" />
          {!isCollapsed && <span className="text-sm">Back to Site</span>}
        </Link>
      </div>

      {/* Collapse Toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-3 top-20 h-6 w-6 rounded-full border bg-background shadow-sm"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? (
          <ChevronRight className="h-3 w-3" />
        ) : (
          <ChevronLeft className="h-3 w-3" />
        )}
      </Button>
    </aside>
  );
}