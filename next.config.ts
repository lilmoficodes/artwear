import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";
const nextConfig: NextConfig = {
    allowedDevOrigins : ["192.168.224.38"]
};

export default withPayload(nextConfig);
