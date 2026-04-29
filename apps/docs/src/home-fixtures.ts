import type { PrimitiveSlug } from '@rubriclab/concrete'
import type { IconName } from '@rubriclab/concrete/icons'

export const pressureRows = [
	['Editorial', 'Open measure, display type, and chapter rhythm for research writing.'],
	['Product', 'Dense rows, controls, tables, and nested agent state for daily tools.'],
	['Generative', 'Focused output: one answer, one table, one chart, one decision.'],
	['Educational', 'Reduced fidelity product language for explainers and OG assets.']
] as const

export const inkStops = [
	['ink-9', 'var(--concrete-ink-9)', 'text / fills'],
	['ink-8', 'var(--concrete-ink-8)', 'hover fill'],
	['ink-7', 'var(--concrete-ink-7)', 'body'],
	['ink-6', 'var(--concrete-ink-6)', 'secondary'],
	['ink-5', 'var(--concrete-ink-5)', 'muted'],
	['ink-4', 'var(--concrete-ink-4)', 'soft'],
	['ink-3', 'var(--concrete-ink-3)', 'strong line'],
	['ink-2', 'var(--concrete-ink-2)', 'hairline'],
	['ink-1', 'var(--concrete-ink-1)', 'faint line']
] as const

export const skyStops = [
	['sky-1', 'var(--concrete-sky-1)', 'selection bg'],
	['sky-2', 'var(--concrete-sky-2)', 'soft pill'],
	['sky-3', 'var(--concrete-sky-3)', 'data tint'],
	['sky-4', 'var(--concrete-sky-4)', 'data active'],
	['sky', 'var(--concrete-sky)', 'focus / link'],
	['sky-strong', 'var(--concrete-sky-strong)', 'pressed']
] as const

export const signalStops = [
	['terminal', 'var(--concrete-terminal)', 'running'],
	['ultra', 'var(--concrete-ultra)', 'featured'],
	['error', 'var(--concrete-error)', 'critical']
] as const

export const spaceRows = [
	['xs', 4, 'icon gaps'],
	['sm', 8, 'control gaps'],
	['md', 12, 'row padding'],
	['lg', 16, 'card padding'],
	['xl', 24, 'groups'],
	['2xl', 32, 'figures'],
	['3xl', 48, 'sections'],
	['4xl', 64, 'chapters']
] as const

export const radiusRows = [
	['0', '0', 'charts'],
	['2', '2px', 'hairlines'],
	['4', '4px', 'atoms'],
	['6', '6px', 'controls'],
	['10', '10px', 'cards'],
	['14', '14px', 'panels'],
	['20', '20px', 'overlays'],
	['pill', '999px', 'chips']
] as const

export const iconNames = [
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

export const primitiveRoleLabels: Partial<Record<PrimitiveSlug, string>> = {
	badge: 'status',
	'brand-mark': 'brand',
	bubble: 'chat',
	button: 'command',
	card: 'surface',
	caret: 'disclose',
	checkbox: 'boolean',
	chip: 'toggle',
	code: 'literal',
	'concept-connector': 'relation',
	'concept-frame': 'symbol',
	delta: 'change',
	'diagram-item': 'evidence',
	'diagram-node': 'entity',
	distribution: 'shape',
	divider: 'separate',
	dropzone: 'target',
	'empty-state': 'none',
	field: 'chrome',
	'focus-ring': 'access',
	frame: 'canvas',
	icon: 'symbol',
	indicator: 'state dot',
	input: 'value',
	kbd: 'shortcut',
	link: 'navigate',
	pill: 'soft label',
	progress: 'known',
	radio: 'exclusive',
	row: 'record',
	select: 'option',
	skeleton: 'pending',
	slider: 'range',
	sparkline: 'trend',
	spinner: 'unknown',
	stat: 'number',
	switch: 'instant',
	tag: 'metadata',
	textarea: 'long value',
	texture: 'ground',
	tooltip: 'clarify',
	'upload-item': 'upload',
	wordmark: 'brand'
}
