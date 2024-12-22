/** @type {import('next').NextConfig} */
import path from 'path';

const nextConfig = {
    images: {
        domains: ['postimg.cc'],
    },
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve.alias['yjs'] = path.resolve(process.cwd(), 'node_modules/yjs')
        }
        return config
    }
};

export default nextConfig;
