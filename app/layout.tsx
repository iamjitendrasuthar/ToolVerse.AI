import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";

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
    <html lang="en">
      <body className="min-h-full flex flex-col bg-[#fafcff]">
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
