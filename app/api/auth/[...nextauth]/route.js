import NextAuth from "next-auth";
import { signOut } from "next-auth/react";
import GoogleProvider from "next-auth/providers/google";

const GOOGLE_AUTHORIZATION_URL =
    "https://accounts.google.com/o/oauth2/v2/auth?" +
    new URLSearchParams({
        prompt: "consent",
        access_type: "offline",
        response_type: "code",
    });

async function refreshAccessToken(token) {
    try {
        const url =
            "https://oauth2.googleapis.com/tokeninfo?id_token=" +
            token.id_token;

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const currentToken = await response.json();

        console.log("Token...");
        console.log(token);
        console.log("Current Token...");
        console.log(currentToken);

        if (currentToken.error === "invalid_token") {
            const urlRefresh =
                "https://oauth2.googleapis.com/token?" +
                new URLSearchParams({
                    client_id: process.env.GOOGLE_CLIENT_ID,
                    client_secret: process.env.GOOGLE_CLIENT_SECRET,
                    grant_type: "refresh_token",
                    refresh_token: token.access_token,
                });

            const refreshedResponse = await fetch(urlRefresh, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });

            const refreshedToken = await refreshedResponse.json();

            return {
                ...token,
                id_token: refreshedToken.id_token,
                access_token: refreshedToken.access_token,
            };
        }

        // In case the token is valid
        return token;
    } catch (error) {
        console.error(error);

        return {
            ...token,
            error: "RefreshAccessTokenError",
        };
    }
}

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorizationUrl: GOOGLE_AUTHORIZATION_URL,
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
            console.log("JWT Token");
            console.log(token);
            console.log("JWT User");
            console.log(user);
            console.log("JWT Account");
            console.log(account);
            if (account && user) {
                token = Object.assign({}, token, {
                    id_token: account.id_token,
                    access_token: account.access_token,
                    user,
                });
            }

            return refreshAccessToken(token);
        },
        async session({ session, token }) {
            if (session) {
                console.log("Session Session");
                console.log(session);
                console.log("Token Session");
                console.log(token);
                session = Object.assign({}, session, {
                    id_token: token.id_token,
                    access_token: token.access_token,
                    user: token.user,
                    token: token,
                });
            }
            return session;
        },
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
