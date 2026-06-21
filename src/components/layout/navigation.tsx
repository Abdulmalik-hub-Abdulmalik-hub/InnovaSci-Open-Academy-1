"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  BookOpen,
  GraduationCap,
  Info,
  Mail,
  HelpCircle,
  DollarSign,
  ChevronDown,
  User,
  LogOut,
  Settings,
  LayoutDashboard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/components/providers/auth-provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

const navigationItems = [
  { name: "Home", href: "/", icon: BookOpen },
  { name: "Courses", href: "/courses", icon: GraduationCap },
  { name: "Learning Paths", href: "/learning-paths", icon: BookOpen },
  { name: "About", href: "/about", icon: Info },
  { name: "Contact", href: "/contact", icon: Mail },
  { name: "Blog", href: "/blog", icon: BookOpen },
  { name: "Help Center", href: "/help-center", icon: HelpCircle },
  { name: "Pricing", href: "/pricing", icon: DollarSign },
];

export function Navigation() {
  const pathname = usePathname();
  const { user, signOut, isLoading } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
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

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="relative h-10 w-10">
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-brand-purple-600 to-brand-blue-600" />
              <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  className="h-6 w-6 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
            </div>
            <div className="hidden sm:block">
              <span className="text-lg font-bold gradient-text">
                InnovaSci
              </span>
              <span className="text-lg font-medium text-muted-foreground">
                {" "}
                Open Academy
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  isActive(item.href)
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-2">
            {isLoading ? (
              <div className="h-10 w-20 animate-pulse bg-muted rounded-md" />
            ) : user ? (
              <DropdownMenu open={isUserMenuOpen} onOpenChange={setIsUserMenuOpen}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2 px-2"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.user_metadata?.avatar_url} />
                      <AvatarFallback className="bg-gradient-to-br from-brand-purple-500 to-brand-blue-500 text-white text-sm">
                        {getUserInitials()}
                      </AvatarFallback>
                    </Avatar>
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium">
                      {user.user_metadata?.full_name || user.email}
                    </p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="flex items-center">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/profile" className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/settings" className="flex items-center">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => signOut()}
                    className="text-destructive focus:text-destructive"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="ghost" asChild className="hidden sm:flex">
                  <Link href="/auth/login">Login</Link>
                </Button>
                <Button asChild className="hidden sm:flex">
                  <Link href="/auth/register">Sign Up</Link>
                </Button>
              </>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t py-4"
            >
              <div className="flex flex-col gap-2">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                        isActive(item.href)
                          ? "text-primary bg-primary/10"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      {item.name}
                    </Link>
                  );
                })}
                {!user && (
                  <div className="flex flex-col gap-2 pt-4 border-t mt-4">
                    <Button variant="outline" asChild>
                      <Link href="/auth/login">Login</Link>
                    </Button>
                    <Button asChild>
                      <Link href="/auth/register">Sign Up</Link>
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}