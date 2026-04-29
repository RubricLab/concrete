import { defineConfig } from 'tsdown'

export default defineConfig({
	dts: true,
	entry: [
		'src/index.ts',
		'src/components/index.tsx',
		'src/foundations/index.ts',
		'src/icons/index.tsx',
		'src/primitives/index.tsx',
		'src/registry/index.tsx',
		'src/schemas/index.ts'
	],
	format: 'esm',
	outDir: 'dist',
	root: 'src',
	sourcemap: true,
	target: 'es2022',
	unbundle: true
})
