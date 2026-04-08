import type { Metadata } from "next";
import { Geist, Geist_Mono, DM_Sans, Lora } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/providers/ThemeProvider";

const loraHeading = Lora({ subsets: ["latin"], variable: "--font-heading" });

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SplitEase",
  description:
    "SplitEase is a bill-splitting app that simplifies the process of dividing expenses among friends and family. With an intuitive interface and powerful features, SplitEase makes it easy to manage shared expenses, track payments, and ensure everyone pays their fair share. Whether you're planning a trip, sharing household bills, or splitting a restaurant check, SplitEase has you covered.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        dmSans.variable,
        loraHeading.variable,
      )}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
        {children}
        </ThemeProvider>
        <Toaster richColors position="top-right" />
      </body>

    </html>
  );
}
