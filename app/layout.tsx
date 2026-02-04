import { ClerkProvider } from "@clerk/nextjs";
import { Inter, Playfair_Display } from "next/font/google";
import { ThemeProvider } from "next-themes";

import Header from "@/components/layout/header";
import "./globals.css";
import Footer from "@/components/layout/footer";
import QueryProvider from "@/providers/query-provider";
import AlertProvider from "@/providers/alert";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata = {
  title: "InkFlow | Where Stories Breathe",
  description:
    "A professional platform for readers and writers to share deep insights and stories.",
};

// src/app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "#D97706",
        },
        theme: "clerk",
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${inter.variable} ${playfair.variable} font-sans antialiased`}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <AlertProvider>
              <QueryProvider>
                <div className="relative min-h-screen bg-background text-foreground transition-colors duration-300">
                  <Header />
                  <main className="max-w-7xl mx-auto px-6 pb-20">
                    {children}
                  </main>
                  <Footer />
                </div>
              </QueryProvider>
            </AlertProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
