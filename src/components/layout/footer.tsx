import Link from "next/link";
import { BookOpen, Github, Twitter, Linkedin, Youtube, Mail } from "lucide-react";

const footerLinks = {
  platform: [
    { name: "About", href: "/about" },
    { name: "Courses", href: "/courses" },
    { name: "Learning Paths", href: "/learning-paths" },
    { name: "Pricing", href: "/pricing" },
    { name: "Blog", href: "/blog" },
  ],
  resources: [
    { name: "Help Center", href: "/help-center" },
    { name: "Documentation", href: "/docs" },
    { name: "Community", href: "/community" },
    { name: "Partners", href: "/partners" },
    { name: "Careers", href: "/careers" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" },
    { name: "Accessibility", href: "/accessibility" },
  ],
};

const socialLinks = [
  { name: "Twitter", href: "https://twitter.com/innovasci", icon: Twitter },
  { name: "LinkedIn", href: "https://linkedin.com/company/innovasci", icon: Linkedin },
  { name: "GitHub", href: "https://github.com/innovasci", icon: Github },
  { name: "YouTube", href: "https://youtube.com/@innovasci", icon: Youtube },
  { name: "Email", href: "mailto:contact@innovasci.com", icon: Mail },
];

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
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
              <div>
                <span className="text-lg font-bold">InnovaSci</span>
                <span className="text-lg font-medium text-muted-foreground">
                  {" "}
                  Open Academy
                </span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground mb-4 max-w-sm">
              Empowering a global community of innovators, researchers, and learners 
              with the skills and knowledge needed to solve complex real-world challenges.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <Link
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Icon className="h-5 w-5" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="font-semibold mb-4">Platform</h3>
            <ul className="space-y-2">
              {footerLinks.platform.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} InnovaSci Open Academy. Powered by InnovaSci AI Labs.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Built with</span>
              <svg
                className="h-4 w-4 text-red-500 fill-current"
                viewBox="0 0 24 24"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <span>for the scientific community</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}