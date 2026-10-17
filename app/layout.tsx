import type { Metadata } from "next";
import LoadingScreen from "@/components/LoadingScreen";
import "../styles/fonts.css";
import "../styles/theme.css";
import "../styles/site-layout.css";
import "../styles/loading.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Vision Frog Productions",
  description: "Portfolio and production website for Oliver Stemmler — The Vision Frog",
  icons: {
    icon: "/assets/images/logos/web/VF_Icon_3.png",
    apple: "/assets/images/logos/web/VF_Icon_3.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <LoadingScreen />
        {children}
      </body>
    </html>
  );
}
