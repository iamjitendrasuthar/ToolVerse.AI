import Provider from "@/components/Provider";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";
import { Toaster } from "sonner";

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
        <Provider>
          <LayoutWrapper>
            {children}
            <Toaster
              position="top-center"
              richColors
              toastOptions={{
                style: {
                  borderRadius: "1rem",
                  border: "1px solid #e2e8f0",
                },
                // Customizing success/error to ensure dark text
                success: {
                  style: {
                    background: "#ecfdf5", // Light emerald bg
                    color: "#064e3b", // Dark emerald text
                    borderColor: "#10b981",
                  },
                },
                error: {
                  style: {
                    background: "#fef2f2", // Light red bg
                    color: "#7f1d1d", // Dark red text
                    borderColor: "#ef4444",
                  },
                },
              }}
            />{" "}
          </LayoutWrapper>
        </Provider>
      </body>
    </html>
  );
}
