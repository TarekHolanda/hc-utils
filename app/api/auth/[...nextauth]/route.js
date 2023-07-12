import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            domain: process.env.GOOGLE_DOMAIN,
        }),
    ],
    secret: process.env.JWT_SECRET,
    session: {
        strategy: "jwt",
        jwt: true,
    },
    jwt: {
        secret: process.env.JWT_SECRET,
    },
    pages: {
        signIn: "/login",
    },
    callbacks: {
        async signIn({ profile }) {
            return profile.email.endsWith("@heavyconnect.com");
        },
        async redirect({ url, baseUrl }) {
            return baseUrl;
        },
        async jwt({ token, user, account }) {
            return token;
        },
        async session({ session, token }) {
            if (session && token) {
                session = Object.assign({}, session, {
                    token: token,
                });
            }
            return session;
        },
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
