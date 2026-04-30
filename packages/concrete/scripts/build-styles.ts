import { mkdir } from 'node:fs/promises'
import { dirname } from 'node:path'
import { type PublicStyleSource, publicStyleBundles } from '../src/styles/manifest'

const typeDeclaration = 'declare const stylesheet: string\nexport default stylesheet\n'

for (const bundle of publicStyleBundles) {
	const styles = await Promise.all(bundle.sources.map(readStyleSource))

	await writeTextFile(bundle.outputPath, styles.map(trim).join('\n\n'))
	await writeTextFile(`${bundle.outputPath}.d.ts`, typeDeclaration)
}

async function readStyleSource(source: PublicStyleSource): Promise<string> {
	const styles = await readRequiredTextFile(source.path)

	switch (source.transform ?? 'none') {
		case 'none':
			return styles
		case 'without-layer-imports':
			return removeLayerImports(styles)
	}
}

async function readRequiredTextFile(path: string): Promise<string> {
	const file = Bun.file(path)

	if (!(await file.exists())) {
		throw new Error(`Missing stylesheet: ${path}`)
	}

	return file.text()
}

async function writeTextFile(path: string, contents: string) {
	await mkdir(dirname(path), { recursive: true })
	await Bun.write(path, `${contents}\n`)
}

function removeLayerImports(styles: string): string {
	return styles
		.replace('@import "@rubriclab/concrete/styles/primitives.css";\n', '')
		.replace('@import "@rubriclab/concrete/styles/components.css";\n', '')
}

function trim(styles: string): string {
	return styles.trim()
}
