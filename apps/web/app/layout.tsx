import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "SmashDraw",
    description: "Fantasy tennis made easy",
    keywords: ["fantasy tennis", "smashdraw", "tennis bracket"],
    authors: [{ name: "Alex Cadigan" }],
    icons: { icon: "/favicon.ico" },
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
};

/**
 * RootLayout is the top-level layout component for the Next.js application.
 * It wraps all pages and components, providing global HTML structure, fonts,
 * and default styling such as colors, typography, and text smoothing.
 *
 * @param children The React elements to be rendered inside the layout.
 *
 * @returns The root HTML structure including <html> and <body> tags,
 * with global fonts and Tailwind-based styling applied.
 */
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-black dark:bg-black dark:text-white`}
            >
                {children}
            </body>
        </html>
    );
}
