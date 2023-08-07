import { helvetica } from "@/styles/fonts";
import "./globals.css";
import { AuthProvider } from "@/hooks/useAuth";
import { getMe } from "@/api/auth";
import { cookies } from "next/headers";
import { WebSocketProvider } from "@/providers/WebSocketProvider";

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
  let user = null;

  if (cookie) {
    accessToken = cookie.value;
    try {
      const { data } = await getMe(accessToken);
      user = data.data;
    } catch (e) {
      // console.log(e);
    }
  }

  return (
    <html lang="en">
      <body className={`${helvetica.variable} font-sans antialiased bg-black`}>
        <AuthProvider value={user}>
          <WebSocketProvider>{children}</WebSocketProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
