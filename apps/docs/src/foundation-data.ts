import {
	colorTokens,
	iconNames as concreteIconNames,
	elevationTokens,
	radiusTokens,
	spacingTokens,
	typographyTokens
} from '@rubriclab/concrete'
import type { IconName } from '@rubriclab/concrete/icons'

type ColorRow = readonly [string, string, string]
type PairRow = readonly [string, string]
type SpaceRow = readonly [string, number]
type TypeRow = readonly [string, string, string, string]

const inkNames = [
	'ink-9',
	'ink-8',
	'ink-7',
	'ink-6',
	'ink-5',
	'ink-4',
	'ink-3',
	'ink-2',
	'ink-1'
] as const
const skyNames = ['sky-1', 'sky-2', 'sky-3', 'sky-4', 'sky', 'sky-strong'] as const
const signalNames = ['terminal', 'ultra', 'error'] as const
const surfaceNames = ['canvas', 'surface', 'raised', 'sunken', 'mist'] as const
const homeSpacingNames = [
	'space-1',
	'space-2',
	'space-3',
	'space-4',
	'space-6',
	'space-8',
	'space-12',
	'space-16'
] as const
const foundationSpacingNames = [
	'space-1',
	'space-2',
	'space-3',
	'space-4',
	'space-6',
	'space-8',
	'space-12',
	'space-16',
	'space-24',
	'space-32'
] as const
const typographyNames = [
	'display',
	'hero',
	'h1',
	'h2',
	'h3',
	'article',
	'body',
	'label',
	'caps'
] as const
const homeTypographyNames = ['display', 'hero', 'h1', 'body'] as const

const colorRoles = {
	error: 'critical',
	'ink-1': 'faint line',
	'ink-2': 'hairline',
	'ink-3': 'strong line',
	'ink-4': 'soft',
	'ink-5': 'muted',
	'ink-6': 'secondary',
	'ink-7': 'body',
	'ink-8': 'hover fill',
	'ink-9': 'text / fills',
	sky: 'focus / link',
	'sky-1': 'selection bg',
	'sky-2': 'soft pill',
	'sky-3': 'data tint',
	'sky-4': 'data active',
	'sky-strong': 'pressed',
	terminal: 'running',
	ultra: 'featured'
} as const

const spacingRoles = {
	'space-1': ['xs', 'icon gaps'],
	'space-2': ['sm', 'control gaps'],
	'space-3': ['md', 'row padding'],
	'space-4': ['lg', 'card padding'],
	'space-6': ['xl', 'groups'],
	'space-8': ['2xl', 'figures'],
	'space-12': ['3xl', 'sections'],
	'space-16': ['4xl', 'chapters']
} as const

const typographyRows = {
	article: [
		'1.55',
		'Long-form body. Sentence case. Measure 68ch.',
		'Article - Jakarta 400',
		'scaleArticle'
	],
	body: ['1.45', 'UI body. The default for most running copy.', 'Body - Jakarta 400', 'scaleBody'],
	caps: ['1.5', 'Eyebrow - tags - annotations', 'Caps - Jakarta 700', 'scaleCaps'],
	display: ['0.92', 'Concrete', 'Display - Fraunces 300', 'scaleDisplay'],
	h1: ['1.05', 'Section title', 'H1 - Jakarta 800', 'scaleH1'],
	h2: ['1.18', 'Chapter heading', 'H2 - Jakarta 700', 'scaleH2'],
	h3: ['1.25', 'Subsection heading', 'H3 - Jakarta 700', 'scaleH3'],
	hero: ['0.95', 'Hero headline', 'Display - Fraunces 400', 'scaleHero'],
	label: ['1.45', 'UI labels, buttons, table rows.', 'Label - Jakarta 500', 'scaleLabel']
} as const

export const pressureRows = [
	['Editorial', 'Open measure, display type, and chapter rhythm for research writing.'],
	['Product', 'Dense rows, controls, tables, and nested agent state for daily tools.'],
	['Generative', 'Focused output: one answer, one table, one chart, one decision.'],
	['Educational', 'Reduced fidelity product language for explainers and OG assets.']
] as const

export const homeInkStops = colorRows(inkNames, name => name)
export const homeSkyStops = colorRows(skyNames, name => name)
export const homeSignalStops = colorRows(signalNames, name => name)
export const foundationInkStops = colorPairs(inkNames, name => name.replace('ink-', ''))
export const foundationSkyStops = colorPairs(skyNames, name => name.replace('sky-', ''))
export const foundationSignalStops = colorPairs(signalNames, name => name)
export const foundationSurfaceStops = colorPairs(surfaceNames, name => name)

export const homeSpaceRows = homeSpacingNames.map(name => {
	const [label, role] = spacingRoles[name]

	return [label, findSpacingToken(name).value, role] as const
})

export const foundationSpaceRows = foundationSpacingNames.map(
	name => [`s-${name.replace('space-', '')}`, findSpacingToken(name).value] as const
) satisfies readonly SpaceRow[]

export const homeRadiusRows = radiusTokens.map(
	token => [token.name.replace('radius-', ''), token.value, radiusUsage(token.name)] as const
)

export const foundationRadiusRows = radiusTokens
	.filter(token => token.name !== 'radius-0')
	.map(token => [token.name.replace('radius-', 'r-'), token.value] as const)

export const elevationRows = elevationTokens.map(
	token => [token.name, elevationUsage(token.name), token.value] as const
)

export const typeRows = typographyNames.map(name => {
	const [lineHeight, sample, role, className] = typographyRows[name]

	return [
		`${findTypographyToken(name).size.replace('px', '')} / ${lineHeight}`,
		sample,
		role,
		className
	] as const
})

export const homeTypeRows = homeTypographyNames.map(name => typeRow(name))

export const typographySummary = `${countUnique(
	typographyTokens.map(token => token.family)
)} families / ${typographyTokens.length} roles / ${countUnique(
	typographyTokens.map(token => token.size)
)} sizes`

export const iconRuleRows = [
	['Stroke', '1.75 token'],
	['ViewBox', '24 x 24'],
	['Default size', '13px'],
	['Color', 'currentColor']
] as const

export const scrollItems = [
	'Environment variables',
	'Build and deploy',
	'Domains',
	'SSL certificates',
	'Edge functions',
	'Redirects',
	'Headers',
	'Analytics',
	'Logs',
	'Integrations',
	'Team members',
	'Billing',
	'Audit log',
	'Danger zone'
] as const

export const homeIconNames = [
	'search',
	'filter',
	'settings',
	'message-circle',
	'activity',
	'file-text',
	'git-branch',
	'bar-chart-3',
	'check',
	'triangle-alert',
	'code',
	'sparkles'
] as const satisfies readonly IconName[]

export const iconNames = concreteIconNames

function colorRows(
	names: readonly string[],
	labelForName: (name: string) => string
): readonly ColorRow[] {
	return names.map(
		name => [labelForName(name), findColorToken(name).value, colorRole(name)] as const
	)
}

function colorPairs(
	names: readonly string[],
	labelForName: (name: string) => string
): readonly PairRow[] {
	return names.map(name => [labelForName(name), colorPreview(name)] as const)
}

function findColorToken(name: string) {
	return findToken(colorTokens, name)
}

function findSpacingToken(name: string) {
	return findToken(spacingTokens, name)
}

function findTypographyToken(name: string) {
	return findToken(typographyTokens, name)
}

function findToken<const Token extends { readonly name: string }>(
	tokens: readonly Token[],
	name: string
): Token {
	const token = tokens.find(item => item.name === name)

	if (!token) {
		throw new Error(`Missing foundation token: ${name}`)
	}

	return token
}

function colorRole(name: string): string {
	return colorRoles[name as keyof typeof colorRoles] ?? ''
}

function colorPreview(name: string): string {
	const token = findColorToken(name)

	return token.hex
}

function elevationUsage(name: string): string {
	switch (name) {
		case 'hairline':
			return 'border only'
		case 'shadow-1':
			return 'rest'
		case 'shadow-2':
			return 'popover'
		case 'shadow-3':
			return 'modal'
		case 'shadow-4':
			return 'overlay'
		default:
			return name
	}
}

function radiusUsage(name: string): string {
	switch (name) {
		case 'radius-0':
			return 'charts'
		case 'radius-2':
			return 'atoms'
		case 'radius-3':
			return 'controls'
		case 'radius-4':
			return 'cards'
		case 'radius-5':
			return 'panels'
		case 'radius-6':
			return 'overlays'
		case 'radius-pill':
			return 'chips'
		default:
			return name
	}
}

function typeRow(name: (typeof typographyNames)[number]): TypeRow {
	const [lineHeight, sample, role, className] = typographyRows[name]

	return [
		`${findTypographyToken(name).size.replace('px', '')} / ${lineHeight}`,
		sample,
		role,
		className
	] as const
}

function countUnique(values: readonly string[]): number {
	return new Set(values).size
}
