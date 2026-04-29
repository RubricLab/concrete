import { mkdir } from 'node:fs/promises'
import { dirname } from 'node:path'

const rootInputPath = 'src/styles.css'
const primitiveInputPath = 'src/styles/primitives.css'
const componentInputPath = 'src/styles/components.css'
const rootOutputPath = 'dist/styles.css'
const primitiveOutputPath = 'dist/styles/primitives.css'
const componentOutputPath = 'dist/styles/components.css'
const typeDeclaration = 'declare const stylesheet: string\nexport default stylesheet\n'

const rootStyles = removeLayerImports(await readRequiredTextFile(rootInputPath))
const primitiveStyles = await readRequiredTextFile(primitiveInputPath)
const componentStyles = await readRequiredTextFile(componentInputPath)

await writeTextFile(
	rootOutputPath,
	[rootStyles, primitiveStyles, componentStyles].map(trim).join('\n\n')
)
await writeTextFile(primitiveOutputPath, trim(primitiveStyles))
await writeTextFile(componentOutputPath, trim(componentStyles))
await writeTextFile(`${rootOutputPath}.d.ts`, typeDeclaration)
await writeTextFile(`${primitiveOutputPath}.d.ts`, typeDeclaration)
await writeTextFile(`${componentOutputPath}.d.ts`, typeDeclaration)

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
