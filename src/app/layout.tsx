import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { AuthProvider } from "@/components/providers/auth-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://innovasci.com"),
  title: {
    default: "InnovaSci Open Academy | Learn Science, Technology & AI",
    template: "%s | InnovaSci Open Academy",
  },
  description:
    "Democratizing high-quality scientific and technological education through open-access learning. Empowering innovators, researchers, and learners worldwide.",
  keywords: [
    "online learning",
    "science education",
    "computational chemistry",
    "bioinformatics",
    "drug discovery",
    "artificial intelligence",
    "data science",
    "scientific programming",
    "LMS",
    "e-learning",
  ],
  authors: [{ name: "InnovaSci AI Labs" }],
  creator: "InnovaSci AI Labs",
  publisher: "InnovaSci Open Academy",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "InnovaSci Open Academy",
    title: "InnovaSci Open Academy | Learn Science, Technology & AI",
    description:
      "Democratizing high-quality scientific and technological education through open-access learning.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "InnovaSci Open Academy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "InnovaSci Open Academy",
    description:
      "Democratizing high-quality scientific and technological education through open-access learning.",
    images: ["/og-image.png"],
    creator: "@innovasci",
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <TooltipProvider delayDuration={0}>
              {children}
              <Toaster
                position="bottom-right"
                toastOptions={{
                  style: {
                    background: "hsl(var(--background))",
                    color: "hsl(var(--foreground))",
                    border: "1px solid hsl(var(--border))",
                  },
                }}
              />
            </TooltipProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}