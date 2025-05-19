/** @type {import('next').NextConfig} */
const nextConfig = {
    images : {
        remotePatterns: [
            {
                hostname: 'placehold.co'
            }
        ]
    },
    experimental: {
        serverComponentsExternalPackages: ['jsonwebtoken'],
    },
};

export default nextConfig;
