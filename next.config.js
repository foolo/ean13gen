const withPWA = require("@ducanh2912/next-pwa").default({
	dest: "public",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
	// https://nextjs.org/docs/pages/building-your-application/deploying/static-exports
	output: 'export'
}

module.exports = withPWA({
	nextConfig
});
