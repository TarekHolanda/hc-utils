import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Link from "next/link";

import { MyLink } from "./home/MyLink";

// Redirect if not authenticated
// https://stackoverflow.com/questions/68527682/how-to-redirect-in-nextjs-if-not-logged-using-nextauth

export default async function Home() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/signin");
    }

    return (
        <>
            <main className="display-flex justify-around align-center padding-2rem">
                <Link href={"/employee-generator"}>
                    <MyLink path={"employee-generator"} />
                </Link>

                <Link href={"/scan-and-go"}>
                    <MyLink path={"scan-and-go"} />
                </Link>

                <Link href={"/email-signature"}>
                    <MyLink path={"email-signature"} />
                </Link>

                <Link href={"/"}>
                    <MyLink path={"sprint-viewer"} />
                </Link>
            </main>
        </>
    );
}
