import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";

import { authOptions } from "./api/auth/[...nextauth]/route";
import { MyHomeLinks } from "./home/MyHomeLinks";

const ADMIN_EMAILS = process.env.ADMIN_EMAILS.split(",");
const SUPER_ADMIN_EMAILS = process.env.SUPER_ADMIN_EMAILS.split(",");
const DEV_EMAILS = process.env.DEV_EMAILS.split(",");

export default async function Home() {
    const session = await getServerSession(authOptions);
    const userEmail = session?.user.email;
    const isAdmin = ADMIN_EMAILS.includes(userEmail);
    const isSuperAdmin = SUPER_ADMIN_EMAILS.includes(userEmail);
    const isDev = DEV_EMAILS.includes(userEmail);

    if (!session) {
        redirect("/signin");
    }

    return (
        <>
            <MyHomeLinks
                isAdmin={isAdmin}
                isSuperAdmin={isSuperAdmin}
                isDev={isDev}
            />
        </>
    );
}
