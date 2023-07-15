/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
                port: "",
                pathname: "**",
            },
        ],
    },
    env: {
        BASE_URL_API: process.env.BASE_URL_API,
        ADMIN_EMAILS: process.env.ADMIN_EMAILS,
    },
};

module.exports = nextConfig;
