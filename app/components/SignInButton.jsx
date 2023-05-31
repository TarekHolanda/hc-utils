"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import Button from "@mui/material/Button";
// import { Menu, Transition } from "@headlessui/react";
// import clsx from "clsx";

// import { ArrowRightOnRectangleIcon, Cog8ToothIcon } from "@heroicons/react/24/solid";

const SignInButton = () => {
    const { data: session } = useSession();

    return (
        <>
            {session ? (
                <div as="div" className="relative">
                    <div>Welcome to HC Utils</div>
                    <div>
                        <button
                            className={
                                "inline-flex items-center gap-6 px-[34px] py-2 text-sm text-stone-400 dark:text-stone-500"
                            }
                            onClick={() => signOut()}
                        >
                            <span>Sign Out</span>
                        </button>
                    </div>
                </div>
            ) : (
                <Button variant="contained" onClick={() => signIn()}>
                    Sign In
                </Button>
            )}
        </>
    );
};

export default SignInButton;
