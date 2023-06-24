import { helvetica } from "@/styles/fonts";
import "./globals.css";
import { AuthProvider } from "@/hooks/useAuth";
import { getMe } from "@/api/auth/auth";
import { cookies } from "next/headers";

export const metadata = {
  title: "Streamwise",
  description: "Watch your favorite movies together with friends.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const cookie = cookieStore.get("accessToken");

  let accessToken = "";

  if (cookie) {
    accessToken = cookie.value;
  }

  const { res } = await getMe(accessToken);

  return (
    <html lang="en">
      <body className={`${helvetica.variable} font-sans antialiased bg-black`}>
        <AuthProvider value={res?.data ?? null}>{children}</AuthProvider>
      </body>
    </html>
  );
}
