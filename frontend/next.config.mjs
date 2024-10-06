/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'http',
          hostname: '100.97.112.28',
          port: '8000', // Include the port if necessary
          pathname: '/storage/**', // Adjust this to match the URL path of your images
        },
      ],
    },
  };
export default nextConfig;
