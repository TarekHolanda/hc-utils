import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";

import { authOptions } from "./api/auth/[...nextauth]/route";
import { MyHomeLinks } from "./home/MyHomeLinks";

const ADMIN_EMAILS = process.env.ADMIN_EMAILS.split(",");

// Redirect if not authenticated
// https://stackoverflow.com/questions/68527682/how-to-redirect-in-nextjs-if-not-logged-using-nextauth

export default async function Home() {
    const session = await getServerSession(authOptions);
    const userEmail = session?.user.email;
    const isAdmin = ADMIN_EMAILS.includes(userEmail);

    if (!session) {
        redirect("/signin");
    }

    return (
        <>
            <MyHomeLinks isAdmin={isAdmin} />
        </>
    );
}
