import "./globals.css";
import { Inter, Exo_2 } from "next/font/google";

import Provider from "./components/Provider";
import Header from "./components/Header";

const inter = Inter({ subsets: ["latin"] });

export const exo = Exo_2({
    weight: ["500", "600", "700"],
    subsets: ["latin"],
});

export const metadata = {
    title: "HC Utils",
    description: "Created by HC Employees for HC Employees.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Provider>
                    <Header />
                    <main className="grow">{children}</main>
                </Provider>
            </body>
        </html>
    );
}
