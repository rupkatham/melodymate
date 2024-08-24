/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'tcmnvlalvyjelwsbggvw.supabase.co',
                port: '',           
                pathname: '/**',    
            },
        ],
    },
    async rewrites() {
        return [
          {
            source: '/api/:path*',
            destination: 'http://localhost:5000/api/:path*', // Adjust the port if necessary
          },
        ];
      },
};

export default nextConfig;
