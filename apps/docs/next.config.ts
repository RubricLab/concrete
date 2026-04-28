import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	devIndicators: false,
	async rewrites() {
		return [
			{
				destination: '/render/:kind/:slug/screenshot',
				source: '/render/:kind/:slug.jpg'
			}
		]
	},
	transpilePackages: ['@rubriclab/concrete'],
	turbopack: {
		root: new URL('../..', import.meta.url).pathname
	}
}

export default nextConfig
