/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'http',
          hostname: 'localhost',
          port: '8000', // Include the port if necessary
          pathname: '/api/images/**', // Adjust this to match the URL path of your images
        },
      ],
    },
  };
export default nextConfig;
