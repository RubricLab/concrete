import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import type { NextConfig } from 'next'

const workspaceRoot = join(dirname(fileURLToPath(import.meta.url)), '../..')

const nextConfig: NextConfig = {
	transpilePackages: ['@rubriclab/concrete'],
	turbopack: {
		root: workspaceRoot
	}
}

export default nextConfig
