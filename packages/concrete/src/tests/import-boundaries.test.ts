import { describe, expect, test } from 'bun:test'
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const repoRoot = fileURLToPath(new URL('../../../../', import.meta.url))
const sourceRoots = ['packages/concrete/src', 'apps/docs/app', 'apps/docs/src']
const sourceExtensions = new Set(['.css', '.ts', '.tsx'])
const ignoredFiles = new Set(['packages/concrete/src/tests/import-boundaries.test.ts'])
const forbiddenSourcePatterns = [/concepts[\\/]/u, /concepts-assets/u]
const forbiddenDocsImportPatterns = [
	/@rubriclab\/concrete\/src/u,
	/packages\/concrete\/src/u,
	/packages\\concrete\\src/u
]

describe('Import boundaries', () => {
	test('source does not depend on archived concept material', () => {
		const violations = scanSourceFiles(sourceRoots, forbiddenSourcePatterns)

		expect(violations).toEqual([])
	})

	test('docs import the public package surface only', () => {
		const violations = scanSourceFiles(
			['apps/docs/app', 'apps/docs/src'],
			forbiddenDocsImportPatterns
		)

		expect(violations).toEqual([])
	})
})

function scanSourceFiles(roots: readonly string[], patterns: readonly RegExp[]): readonly string[] {
	const violations: string[] = []

	for (const root of roots) {
		const absoluteRoot = join(repoRoot, root)

		if (!existsSync(absoluteRoot)) {
			continue
		}

		for (const filePath of listSourceFiles(absoluteRoot)) {
			const relativePath = relative(repoRoot, filePath)

			if (ignoredFiles.has(relativePath)) {
				continue
			}

			const contents = readFileSync(filePath, 'utf8')

			for (const pattern of patterns) {
				if (pattern.test(contents)) {
					violations.push(`${relativePath} matches ${pattern.source}`)
				}
			}
		}
	}

	return violations
}

function listSourceFiles(directory: string): readonly string[] {
	const files: string[] = []

	for (const entry of readdirSync(directory)) {
		if (entry === '.next' || entry === 'node_modules') {
			continue
		}

		const entryPath = join(directory, entry)
		const stats = statSync(entryPath)

		if (stats.isDirectory()) {
			files.push(...listSourceFiles(entryPath))
			continue
		}

		if (sourceExtensions.has(getExtension(entry))) {
			files.push(entryPath)
		}
	}

	return files
}

function getExtension(fileName: string): string {
	const extensionIndex = fileName.lastIndexOf('.')

	if (extensionIndex === -1) {
		return ''
	}

	return fileName.slice(extensionIndex)
}
