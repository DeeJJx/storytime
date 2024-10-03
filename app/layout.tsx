import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { Provider } from "./provider";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Generated Story Based on Your Keywords | Story Generator",
  description: "Read a custom-generated story based on the keywords you provided. Immerse yourself in a unique story where your imagination takes the lead.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
          <head>
          <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7774265661621647"
          crossOrigin="anonymous"></Script>
          </head>
          <body className={inter.className}>
            <Provider>
              <Header />
              {children}
              <Footer />
            </Provider>
          </body>
    </html>
  );
}
