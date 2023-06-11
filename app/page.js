import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";

import { authOptions } from "./api/auth/[...nextauth]/route";
import { MyHomeLinks } from "./home/MyHomeLinks";

// Redirect if not authenticated
// https://stackoverflow.com/questions/68527682/how-to-redirect-in-nextjs-if-not-logged-using-nextauth

export default async function Home() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/signin");
    }

    return (
        <>
            <MyHomeLinks />
        </>
    );
}
