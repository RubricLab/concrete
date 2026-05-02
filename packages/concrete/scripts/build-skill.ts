import { mkdir } from 'node:fs/promises'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import {
	type ComponentRegistryEntry,
	componentRegistry,
	type FoundationRegistryEntry,
	type FoundationToken,
	foundationRegistry,
	type PrimitiveRegistryEntry,
	primitiveRegistry
} from '../src/registry'

const generatedStartMarker = '<!-- concrete-skill:generated:start -->'
const generatedEndMarker = '<!-- concrete-skill:generated:end -->'
const skillPath = fileURLToPath(new URL('../../../SKILL.md', import.meta.url))
const checkMode = process.argv.includes('--check')

const currentSkill = await readRequiredTextFile(skillPath)
const nextSkill = replaceGeneratedSection(currentSkill, buildGeneratedSkillSection())

if (checkMode) {
	if (currentSkill === nextSkill) {
		process.exit(0)
	}

	throw new Error('SKILL.md is stale. Run `bun run build:skill`.')
}

await writeTextFile(skillPath, nextSkill)

function buildGeneratedSkillSection(): string {
	return [
		'## Registry Map',
		'',
		'This section is generated from `foundationRegistry`, `primitiveRegistry`, and `componentRegistry`. Run `bun run build:skill` after registry changes.',
		'',
		`Concrete currently exposes ${foundationRegistry.length} foundations, ${primitiveRegistry.length} primitives, and ${componentRegistry.length} components.`,
		'',
		...buildFoundationLines(foundationRegistry),
		'',
		...buildRegistryRollupLines({
			description:
				'Primitives are the Concrete HTML vocabulary. They own DOM, scoped classes, schemas, examples, states, and the smallest meaningful styling surface.',
			entries: primitiveRegistry,
			title: 'Primitives'
		}),
		'',
		...buildRegistryRollupLines({
			description:
				'Components assemble primitives into reusable product behavior. They should not introduce bespoke styling when a primitive or foundation can own the concept.',
			entries: componentRegistry,
			title: 'Components'
		})
	].join('\n')
}

function buildFoundationLines(entries: readonly FoundationRegistryEntry[]): string[] {
	const lines = ['### Foundations', '']

	for (const entry of entries) {
		lines.push(
			`#### ${entry.name}`,
			'',
			entry.description,
			'',
			`- Slug: \`${entry.slug}\``,
			`- Category: \`${entry.category}\``,
			`- Pressure: ${formatCodeList(entry.pressure)}`,
			`- Guidance: ${entry.guidance}`,
			`- Tokens: ${formatTokenSummary(entry.tokens)}`,
			''
		)
	}

	lines.pop()

	return lines
}

function buildRegistryRollupLines({
	description,
	entries,
	title
}: {
	description: string
	entries: readonly ComponentRegistryEntry[] | readonly PrimitiveRegistryEntry[]
	title: string
}): string[] {
	const lines = [`### ${title}`, '', description, '']

	for (const [category, categoryEntries] of groupEntriesByCategory(entries)) {
		lines.push(
			`- **${formatTitleCase(category)}** (${categoryEntries.length}): ${formatEntrySummary(categoryEntries)}`
		)
	}

	return lines
}

function groupEntriesByCategory(
	entries: readonly ComponentRegistryEntry[] | readonly PrimitiveRegistryEntry[]
): Map<string, Array<ComponentRegistryEntry | PrimitiveRegistryEntry>> {
	const groups = new Map<string, Array<ComponentRegistryEntry | PrimitiveRegistryEntry>>()

	for (const entry of entries) {
		const group = groups.get(entry.category) ?? []

		group.push(entry)
		groups.set(entry.category, group)
	}

	return groups
}

function formatEntrySummary(
	entries: readonly (ComponentRegistryEntry | PrimitiveRegistryEntry)[]
): string {
	const labels = entries.map(formatRegistryEntryLabel)

	return labels.join(', ')
}

function formatRegistryEntryLabel(entry: ComponentRegistryEntry | PrimitiveRegistryEntry): string {
	return `${entry.name} (\`${entry.slug}\`)`
}

function formatTokenSummary(tokens: readonly FoundationToken[]): string {
	const summaries: string[] = []

	for (const [groupName, groupTokens] of groupFoundationTokens(tokens)) {
		summaries.push(
			`${formatTitleCase(groupName)} (${groupTokens.length}: ${formatTokenNameList(groupTokens)})`
		)
	}

	return summaries.join('; ')
}

function groupFoundationTokens(tokens: readonly FoundationToken[]): Map<string, FoundationToken[]> {
	const groups = new Map<string, FoundationToken[]>()

	for (const token of tokens) {
		const groupName = getTokenGroupName(token)
		const group = groups.get(groupName) ?? []

		group.push(token)
		groups.set(groupName, group)
	}

	return groups
}

function getTokenGroupName(token: FoundationToken): string {
	if (token.kind) {
		return token.kind
	}

	if (token.family) {
		return token.family
	}

	if (token.role) {
		return token.role
	}

	if (token.hex) {
		return 'palette'
	}

	if (token.values) {
		return 'values'
	}

	if (token.size) {
		return 'scale'
	}

	return 'tokens'
}

function formatTokenNameList(tokens: readonly FoundationToken[]): string {
	const tokenNames = tokens.map(formatTokenName)

	return formatLimitedList(tokenNames, 8)
}

function formatTokenName(token: FoundationToken): string {
	return `\`${token.name}\``
}

function formatCodeList(values: readonly string[]): string {
	return values.map(formatCodeValue).join(', ')
}

function formatCodeValue(value: string): string {
	return `\`${value}\``
}

function formatLimitedList(values: readonly string[], limit: number): string {
	if (values.length <= limit) {
		return values.join(', ')
	}

	const visibleValues = values.slice(0, limit)
	const hiddenCount = values.length - visibleValues.length

	return `${visibleValues.join(', ')}, plus ${hiddenCount} more`
}

function formatTitleCase(value: string): string {
	return value.split('-').map(formatTitleCaseSegment).join(' ')
}

function formatTitleCaseSegment(value: string): string {
	return `${value.charAt(0).toUpperCase()}${value.slice(1)}`
}

function replaceGeneratedSection(currentSkill: string, generatedSection: string): string {
	const startIndex = currentSkill.indexOf(generatedStartMarker)
	const endIndex = currentSkill.indexOf(generatedEndMarker)

	if (startIndex === -1 || endIndex === -1 || endIndex < startIndex) {
		throw new Error('SKILL.md must contain concrete-skill generated section markers.')
	}

	const beforeSection = currentSkill.slice(0, startIndex + generatedStartMarker.length)
	const afterSection = currentSkill.slice(endIndex)

	return `${beforeSection}\n${generatedSection.trim()}\n${afterSection}`.trimEnd().concat('\n')
}

async function readRequiredTextFile(path: string): Promise<string> {
	const file = Bun.file(path)

	if (!(await file.exists())) {
		throw new Error(`Missing file: ${path}`)
	}

	return file.text()
}

async function writeTextFile(path: string, contents: string) {
	await mkdir(dirname(path), { recursive: true })
	await Bun.write(path, contents)
}
