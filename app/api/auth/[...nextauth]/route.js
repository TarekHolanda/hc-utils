import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    secret: process.env.JWT_SECRET,
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/login",
    },
    callbacks: {
        async signIn({ profile }) {
            return profile.email.endsWith("@heavyconnect.com");
        },
        async redirect({ url, baseUrl }) {
            console.log(url);
            console.log(baseUrl);
            return baseUrl;
        },
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
