import { helvetica } from "@/styles/fonts";
import "./globals.css";
import Header from "@/components/Header";

export const metadata = {
  title: "Streamwise",
  description: "Watch your favorite movies together with friends.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${helvetica.variable} font-sans antialiased bg-black-500`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
