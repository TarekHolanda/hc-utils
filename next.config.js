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
        SUPER_ADMIN_EMAILS: process.env.SUPER_ADMIN_EMAILS,
        DEV_EMAILS: process.env.DEV_EMAILS,
        GITHUB_TOKEN: process.env.GITHUB_TOKEN,
    },
    async redirects() {
        return [
            {
                source: "/sprint",
                destination: "/sprints",
                permanent: true,
            },
            {
                source: "/customer-xray",
                destination: "/customers",
                permanent: true,
            },
        ];
    },
};

module.exports = nextConfig;
