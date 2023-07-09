import NextAuth from "next-auth";
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
            "https://oauth2.googleapis.com/token?" +
            new URLSearchParams({
                client_id: process.env.GOOGLE_CLIENT_ID,
                client_secret: process.env.GOOGLE_CLIENT_SECRET,
                grant_type: "refresh_token",
                refresh_token: token.refreshToken,
            });

        const response = await fetch(url, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            method: "POST",
        });

        const refreshedTokens = await response.json();

        if (!response.ok) {
            throw refreshedTokens;
        }

        return {
            ...token,
            accessToken: refreshedTokens.access_token,
            accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
            refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
        };
    } catch (error) {
        console.log(error);

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
    },
    pages: {
        signIn: "/login",
    },
    callbacks: {
        async signIn({ profile }) {
            return profile.email.endsWith("@heavyconnect.com");
        },
        async jwt({ token, user, account }) {
            if (account && user) {
                token = Object.assign({}, token, {
                    token: account.id_token,
                    accessToken: account.accessToken,
                    accessTokenExpires: Date.now() + account.expires_in * 1000,
                    refreshToken: account.refresh_token,
                    user,
                });
            }
            // Return previous token if the access token has not expired yet
            if (Date.now() < token.accessTokenExpires) {
                return token;
            }

            // Access token has expired, try to update it
            return refreshAccessToken(token);
        },
        async session({ session, token }) {
            if (session) {
                session = Object.assign({}, session, {
                    token: token.token,
                    accessToken: token.accessToken,
                    user: token.user,
                    error: token.error,
                });
            }
            return session;
        },
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
