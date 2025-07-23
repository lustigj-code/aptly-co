import "./globals.css";
import { DM_Sans } from "next/font/google";
import Navbar from "@/components/Navbar";

const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "600"] });

export const metadata = {
  title: "Aptly | Learning That Sticks",
  description: "Digital learning solutions that engage and deliver results.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${dmSans.className} bg-[#0A0C2A] text-gray-100`}>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
