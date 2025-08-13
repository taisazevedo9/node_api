import { type MiddlewareConfig, NextRequest, NextResponse } from "next/server";

const publicRoutes = [
  {
    path: "/sign-in",
    whenAuthenticated: "redirect",
  },
  {
    path: "/register",
    whenAuthenticated: "redirect",
  },
  {
    path: "/pricing",
    whenAuthenticated: "next",
  },
] as const;

const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = "/sign-in";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const publicRoute = publicRoutes.find((route) => route.path === path);
  const authToken = request.cookies.get("token");
  let redirectUrl;

  if (!authToken && publicRoute) {
    return NextResponse.next();
  }
  if (!authToken && !publicRoute) {
    redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE;
    return NextResponse.redirect(redirectUrl!);
  }

  if (
    authToken &&
    publicRoute &&
    publicRoute.whenAuthenticated === "redirect"
  ) {
    redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/produtos";
    return NextResponse.redirect(redirectUrl!);
  }
  if (authToken && !publicRoute) {
    //ver se o jwt é válido
    return NextResponse.next();
  }
  return NextResponse.next();
}

export const config: MiddlewareConfig = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sign-in).*)",
    // Add more routes to match as needed
    // For example, you can add publicRoutes here if needed
    // ...publicRoutes,
  ],
};
