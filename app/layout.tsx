import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PlaySync - Coming Soon",
  description:
    "A new way to connect with sports. Coming soon.",
  keywords: [
    "PlaySync",
    "coming soon",
    "PlaySync launch",
    "PlaySync Nepal",
  ],
  metadataBase: new URL("https://playsync.co"),
  openGraph: {
    title: "PlaySync - Coming Soon",
    description:
      "Something exciting is coming your way. Stay tuned.",
    url: "https://playsync.co",
    siteName: "PlaySync",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://playsync.co/playsync-logo.jpg", // replace with an abstract or teaser image
        width: 1200,
        height: 630,
        alt: "PlaySync - Something's Coming",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PlaySync - Coming Soon",
    description:
      "Something exciting is coming your way. Stay tuned.",
    site: "@PlaySyncApp",
    images: ["https://playsync.co/playsync-logo.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
  themeColor: "#00cc66",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
