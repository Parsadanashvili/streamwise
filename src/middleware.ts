import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getMe } from "./api/auth";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  if (
    request.nextUrl.pathname === "/login" ||
    request.nextUrl.pathname === "/signup" ||
    request.nextUrl.pathname === "/forgot-password"
  ) {
    const cookie = request.cookies.get("accessToken")?.value;

    if (cookie) {
      try {
        const { ok } = await getMe(cookie);

        if (ok) {
          throw new Error("Already logged in");
        }
      } catch {
        return NextResponse.redirect(new URL("/", request.url));
      }
    }
  }

  return NextResponse.next();
}
