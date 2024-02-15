import { Database } from "@/lib/types/database.types";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";


export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * Feel free to modify this pattern to include more paths.
         */
        // "/((?!_next/static|_next/image|favicon.ico).*)",
        '/((?!_next|.*\\..*).*)'
    ],
};


export default async function middleware(req: NextRequest) {
    const url = req.nextUrl;

    const res = NextResponse.next();
    const supabase = createMiddlewareClient<Database>({ req, res });
    const { data: activeSession } = await supabase.auth.getSession();

    const path = url.pathname;

    if (!activeSession.session && path !== "/") {
        if (path.startsWith("/api")) {
            return NextResponse.json({
                status: 401,
                message: {
                    code: "Not authorized",
                    message: "You are not authorized to perform this action",
                },
            })
        }

        return NextResponse.redirect(new URL("/", req.url));
    } else if (activeSession.session) {
        const { data: user } = await supabase.from("user").select("*").single();

        if (path === "/" && user?.role == "admin") {
            return NextResponse.redirect(new URL("/admin/dashboard", req.url));
        } else if (path.startsWith("/api") && user?.role !== "admin") {
            return NextResponse.json({
                status: 401,
                message: {
                    code: "Not authorized",
                    message: "You are not authorized to perform this actions",
                },
            })
        }
        if (path !== "/" && user?.role !== "admin") {
            return NextResponse.redirect(new URL("/", req.url));
        }

    }
}