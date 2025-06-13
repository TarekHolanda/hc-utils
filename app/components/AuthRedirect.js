"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

export const AuthRedirect = ({ children }) => {
    const { data: session, status } = useSession();
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        // If user is authenticated and not on the home page, redirect to home
        if (status === "authenticated" && session && pathname !== "/") {
            router.replace("/");
        }
    }, [status, session, pathname, router]);

    // Show loading state while checking authentication
    if (status === "loading") {
        return null;
    }

    // If not authenticated and not on signin page, let the signin page handle the redirect
    if (status === "unauthenticated" && pathname !== "/signin") {
        return null;
    }

    return children;
}; 