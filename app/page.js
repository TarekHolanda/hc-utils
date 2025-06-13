import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";

import { authOptions } from "./api/auth/[...nextauth]/route";
import { DiscontinuationMessage } from "./components/DiscontinuationMessage";

const ADMIN_EMAILS = process.env.ADMIN_EMAILS.split(",");
const SUPER_ADMIN_EMAILS = process.env.SUPER_ADMIN_EMAILS.split(",");
const DEV_EMAILS = process.env.DEV_EMAILS.split(",");

export default async function Home() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/signin");
    }

    return (
        <>
            <DiscontinuationMessage />
        </>
    );
}
