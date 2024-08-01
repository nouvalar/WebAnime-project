import { Gabarito } from "next/font/google";
import "./globals.css";
import NavigationBar from "../components/NavigationBar";

const gabarito = Gabarito({ subsets: ["latin"] });

export const metadata = {
  title: "AnimeList By Nouval :)",
  description: "Website Anime Indonesia",
};  

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={'${gabarito.className} bg-color-dark'} suppressHydrationWarning={true}>
        <NavigationBar/>
        {children}
      </body>
    </html>
  );
}