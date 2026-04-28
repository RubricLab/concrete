import type { ComponentRegistryEntry, ComponentSlug } from '@rubriclab/concrete'

export type ComponentCategory = ComponentRegistryEntry['category']

export const componentCategoryOrder = [
	'control',
	'navigation',
	'surface',
	'data',
	'feedback',
	'layout',
	'form',
	'media'
] as const satisfies readonly ComponentCategory[]

const componentPreviewStates = {
	'area-chart': 'quiet',
	'bar-chart': 'comparison',
	chart: 'area',
	'command-menu': 'default',
	composer: 'default',
	'data-table': 'selected',
	'date-picker': 'open',
	'date-range-picker': 'open',
	'donut-chart': 'thin',
	'file-upload': 'default',
	'flow-diagram': 'interactive',
	'form-dialog': 'default',
	'form-drawer': 'review',
	'form-shell': 'default',
	heatmap: 'quiet',
	'image-upload': 'grid',
	'line-chart': 'target',
	message: 'assistant',
	meter: 'ring',
	'metric-card': 'status',
	'multi-select': 'open',
	'number-stepper': 'default',
	'password-input': 'visible',
	'range-slider': 'narrow',
	'reasoning-message': 'streaming',
	'search-bar': 'menu',
	'settings-panel': 'compact',
	'stacked-bar-chart': 'horizontal',
	'time-picker': 'open',
	'tool-call-message': 'success',
	toolbar: 'selected',
	'validation-summary': 'mixed'
} as const satisfies Partial<Record<ComponentSlug, string>>

export function getComponentCategories(
	registry: readonly ComponentRegistryEntry[]
): readonly ComponentCategory[] {
	const knownCategories = new Set<ComponentCategory>(componentCategoryOrder)
	const unlistedCategories = registry
		.map(component => component.category)
		.filter(category => !knownCategories.has(category))

	return [...componentCategoryOrder, ...new Set(unlistedCategories)]
}

export function getComponentPreviewState(slug: ComponentSlug): string {
	return componentPreviewStates[slug] ?? 'default'
}

export function getCategoryTitle(category: ComponentCategory): string {
	switch (category) {
		case 'control':
			return 'Interaction controls.'
		case 'data':
			return 'Data surfaces.'
		case 'feedback':
			return 'Agent process artifacts.'
		case 'form':
			return 'Input systems.'
		case 'layout':
			return 'Form and editor shells.'
		case 'media':
			return 'Upload compositions.'
		case 'navigation':
			return 'Command surfaces.'
		case 'surface':
			return 'Transcript surfaces.'
		default:
			return 'Component group.'
	}
}

export function getCategoryDescription(category: ComponentCategory): string {
	switch (category) {
		case 'control':
			return 'Small but stateful control clusters that coordinate keyboard, focus, and selected state.'
		case 'data':
			return 'Typed KPI, chart, table, meter, and diagram components for dense product data and generated UI.'
		case 'feedback':
			return 'Subdued, expandable artifacts for visible reasoning, validation, and tool execution.'
		case 'form':
			return 'Field-level compositions for typed values, choices, dates, times, numbers, ranges, and uploads.'
		case 'layout':
			return 'Larger component shells that standardize dense product form rhythm without owning product policy.'
		case 'media':
			return 'Upload surfaces specialized around local previews and queue state.'
		case 'navigation':
			return 'Search and command entry points for agentic interfaces.'
		case 'surface':
			return 'Role-aware message surfaces for multiplayer and multi-agent transcripts.'
		default:
			return 'Registry-backed components ready for render routes and screenshots.'
	}
}
