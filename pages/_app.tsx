import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";

// Load the Inter font with Next.js built-in font optimization
const inter = Inter({ subsets: ["latin"] });

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <div className={inter.className}> {/* Apply the Inter font globally */}
        <Component {...pageProps} />
      </div>
    </ThemeProvider>
  );
}
