import Provider from "@/components/Provider";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";
import { Toaster } from "sonner";
import Providers from "@/Store/providers";

export const metadata = {
  title: "ToolsVerse AI",
  description:
    "The definitive directory for next-generation artificial intelligence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-[#fafcff]">
        <Provider>
          <Providers>
            <LayoutWrapper>
              {children}
              <Toaster position="top-center" richColors />
            </LayoutWrapper>
          </Providers>
        </Provider>
      </body>
    </html>
  );
}
