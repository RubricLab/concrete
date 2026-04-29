const outputPath = 'dist/styles.css'
const typeDeclarationPath = 'dist/styles.css.d.ts'
const inputPaths = [
	'dist/styles.css',
	'dist/primitives/primitives.css',
	'dist/components/components.css'
] as const

const styles = await Promise.all(inputPaths.map(readRequiredTextFile))

await Bun.write(outputPath, styles.map(formatStyleBlock).join('\n\n').concat('\n'))

await Bun.write(
	typeDeclarationPath,
	'declare const stylesheet: string\nexport default stylesheet\n'
)

async function readRequiredTextFile(path: string): Promise<string> {
	const file = Bun.file(path)

	if (!(await file.exists())) {
		throw new Error(`Missing built stylesheet: ${path}`)
	}

	return file.text()
}

function formatStyleBlock(style: string, index: number): string {
	return `/* ${inputPaths[index]} */\n${style.trim()}`
}
