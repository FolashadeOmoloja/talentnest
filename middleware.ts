import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import CryptoJS from "crypto-js";

export async function middleware(req: NextRequest) {
  const hashedRoleFromCookie = req.cookies.get("accessToken")?.value;
  const url = req.nextUrl.pathname;

  // Check if the request is for a protected route (company, talent)
  const isCompanyRoute = url.startsWith("/hire-talent/dashboard");
  const isTalentRoute = url.startsWith("/dashboard");

  // If the route is not protected, let the request proceed
  if (!isCompanyRoute && !isTalentRoute) {
    return NextResponse.next();
  }

  if (!hashedRoleFromCookie) {
    const response = NextResponse.redirect(
      new URL(isCompanyRoute ? "/hire-talent" : "/sign-in", req.url)
    );

    // Set the 'loggedOut' cookie for identifying logged out users
    response.cookies.set("loggedOut", "true", { path: "/", httpOnly: false });

    return response;
  }

  // Define expected role based on the route
  let expectedRole;
  if (isCompanyRoute) {
    expectedRole = "company";
  } else if (isTalentRoute) {
    expectedRole = "talent";
  }

  // If no expected role, proceed to the next response
  if (!expectedRole) {
    return NextResponse.next();
  }

  // Hash the expected role using CryptoJS
  const hashedExpectedRole = CryptoJS.SHA256(expectedRole).toString();

  // Verify the hashed role
  if (hashedRoleFromCookie === hashedExpectedRole) {
    return NextResponse.next(); // Allow access based on hashed role
  } else {
    return NextResponse.redirect(new URL("/auth/unauthorized", req.url));
  }
}

export const config = {
  matcher: [
    "/hire-talent/dashboard/:path*", // Company routes
    "/dashboard/:path*", // Talent routes
    "/admin/dashboard/:path*", // Admin routes
  ],
};
