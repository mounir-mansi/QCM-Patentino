/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "res.cloudinary.com",
      "www.audit-conseil-formation.com",
      "kinsta.com",
      "www.sportbuzzbusiness.fr",
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:5500/:path*",
      },
    ];
  },
};
module.exports = nextConfig;
