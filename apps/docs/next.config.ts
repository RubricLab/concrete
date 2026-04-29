import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import type { NextConfig } from 'next'

const docsDirectory = dirname(fileURLToPath(import.meta.url))
const workspaceRoot = resolve(docsDirectory, '../..')

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
		root: workspaceRoot
	}
}

export default nextConfig
