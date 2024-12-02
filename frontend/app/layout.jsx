import "./globals.css";

import { Poppins } from "next/font/google";

export const metadata = {
  title: "Data Park",
  description: "CSC 4402 Group Project",
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-poppins",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`flex flex-col flex-grow ${poppins.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
