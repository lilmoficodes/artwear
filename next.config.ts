import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";
const nextConfig: NextConfig = {
    allowedDevOrigins: ["192.168.224.38", "192.168.200.1"],
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "artwear-lime.vercel.app",
                pathname: "/api/media/file/**"
            },
            {
                protocol: "http",
                port: "3000",
                hostname: "localhost",
                pathname: '/api/media/file/**'
            }]
    }
};

export default withPayload(nextConfig);
