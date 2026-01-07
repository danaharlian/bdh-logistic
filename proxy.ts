export default function proxy() {}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};

// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { getCurrentUser } from "@/lib/server";
// import { DEFAULT_REDIRECT, isPrivateRoute } from "@/routes";

// // Helper functions
// const redirect = (req: NextRequest, pathname: string) => {
//   const url = req.nextUrl.clone();
//   url.pathname = pathname;

//   return NextResponse.redirect(url);
// };

// export default async function proxy(req: NextRequest) {
//   const { pathname } = req.nextUrl;
//   const currentUser = await getCurrentUser();
//   const isAuthenticated = !!currentUser;

//   // Redirect unauthenticated users from private routes
//   if (!isAuthenticated && isPrivateRoute(pathname)) {
//     return redirect(req, "/login");
//   }

//   // Handle root path
//   if (pathname === "/") {
//     return redirect(req, isAuthenticated ? DEFAULT_REDIRECT : "/login");
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
//     "/(api|trpc)(.*)",
//   ],
// };
