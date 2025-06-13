import "./styles/globals.css";
import { Inter, Exo_2 } from "next/font/google";

import Provider from "./core/Provider";
import MyHeader from "./core/MyHeader";
import { AuthRedirect } from "./components/AuthRedirect";

const inter = Inter({ subsets: ["latin"] });

export const exo = Exo_2({
    weight: ["500", "600", "700"],
    subsets: ["latin"],
});

export const metadata = {
    title: "HC Utils - Discontinued",
    description: "Created by HC Employees for HC Employees.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={inter.className}>
                <Provider>
                    <AuthRedirect>
                        <MyHeader />
                        <main>{children}</main>
                    </AuthRedirect>
                </Provider>
            </body>
        </html>
    );
}
