import { auth, clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
    "/dashboard(.*)",
    "/account(.*)",
    "/transaction(.*)",
])

export default clerkMiddleware(async (auth, req) => {
    const {userId} = auth();

    if(!userId && isProtectedRoute(req)) {

        const { redirectToSignIn } = await auth();
        return redirectToSignIn();
    }

    return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};

// import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// const isProtectedRoute = createRouteMatcher([
//   "/dashboard(.*)",
//   "/account(.*)",
//   "/transaction(.*)",
// ]);

// export default clerkMiddleware((auth, req) => {
//   const { userId } = auth();

//   if (!userId && isProtectedRoute(req.nextUrl.pathname)) {
//     return auth().redirectToSignIn();
//   }
// });

// export const config = {
//   matcher: [
//     "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
//     "/(api|trpc)(.*)",
//   ],
// };
