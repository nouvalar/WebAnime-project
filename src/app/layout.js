import { Inter } from "next/font/google";
import "./globals.css";
import NavigationBar from "./components/Utilities/NavigationBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Anime List",
  description: "Website Anime Indonesia",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <NavigationBar/>
        {children}
      </body>
    </html>
  );
}