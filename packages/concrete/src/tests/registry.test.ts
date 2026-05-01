import { describe, expect, test } from 'bun:test'
import { createElement, Fragment } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { z } from 'zod/v4'
import {
	ConcreteIcon,
	commandItemSchema,
	componentDefinitions,
	componentRegistry,
	composerConfigSchema,
	composerSuggestionSchema,
	composerValueSchema,
	concreteNodeSchema,
	concreteNodeTreeSchema,
	concreteSignalSchema,
	dateRangeValueSchema,
	dateValueSchema,
	fieldStatusSchema,
	formValidationItemSchema,
	foundationDefinitions,
	foundationRegistry,
	foundationTokenSchema,
	getFoundationEntry,
	iconNames,
	messageSchema,
	multiSelectOptionSchema,
	primitiveDefinitions,
	primitiveRegistry,
	reasoningStepSchema,
	registryEntrySchema,
	renderComponentExample,
	renderDefinitionInput,
	renderFoundationExample,
	renderPrimitiveExample,
	renderQuerySchema,
	searchBarTokenSchema,
	settingsPanelSectionSchema,
	timeValueSchema,
	toolCallSchema,
	uploadItemSchema,
	validateConcreteNode,
	validateConcreteNodeTree
} from '..'

describe('Concrete registry', () => {
	test('contains unique primitive slugs', () => {
		const slugs = primitiveRegistry.map(entry => entry.slug)
		const uniqueSlugs = new Set(slugs)

		expect(uniqueSlugs.size).toBe(slugs.length)
	})

	test('derives public registries from item definitions in order', () => {
		expect(foundationRegistry.map(entry => entry.slug)).toEqual(
			foundationDefinitions.map(definition => definition.slug)
		)
		expect(primitiveRegistry.map(entry => entry.slug)).toEqual(
			primitiveDefinitions.map(definition => definition.slug)
		)
		expect(componentRegistry.map(entry => entry.slug)).toEqual(
			componentDefinitions.map(definition => definition.slug)
		)
	})

	test('validates foundation metadata with the public schema', () => {
		for (const entry of foundationRegistry) {
			expect(registryEntrySchema.safeParse(entry).success).toBe(true)
			expect(entry.tokens.length).toBeGreaterThan(0)
			expect(getFoundationEntry(entry.slug)?.name).toBe(entry.name)

			for (const token of entry.tokens) {
				expect(foundationTokenSchema.safeParse(token).success).toBe(true)
			}
		}
	})

	test('validates primitive metadata with the public schema', () => {
		for (const entry of primitiveRegistry) {
			expect(registryEntrySchema.safeParse(entry).success).toBe(true)
		}
	})

	test('validates component metadata with the public schema', () => {
		for (const entry of componentRegistry) {
			expect(registryEntrySchema.safeParse(entry).success).toBe(true)
		}
	})

	test('parses composer runtime boundaries', () => {
		expect(composerValueSchema.parse({}).text).toBe('')
		expect(composerConfigSchema.parse({}).submitLabel).toBe('Send')
		expect(
			composerSuggestionSchema.parse({
				id: 'arihan',
				insertLabel: 'arihan',
				kind: 'mention',
				label: 'Arihan V.'
			})
		).toEqual({
			disabled: false,
			id: 'arihan',
			insertLabel: 'arihan',
			kind: 'mention',
			label: 'Arihan V.'
		})
	})

	test('parses interaction and message runtime boundaries', () => {
		expect(
			commandItemSchema.parse({
				id: 'ask',
				label: 'Ask Rubric'
			})
		).toMatchObject({
			disabled: false,
			group: 'Actions',
			id: 'ask',
			intent: 'default',
			shortcut: []
		})
		expect(searchBarTokenSchema.parse({ id: 'workspace', label: 'Rubric' }).intent).toBe('default')
		expect(messageSchema.parse({ id: 'message-1' })).toMatchObject({
			role: 'assistant',
			surface: 'bubble'
		})
		expect(
			reasoningStepSchema.parse({
				detail: 'Loaded files and registry metadata.',
				id: 'context',
				label: 'Context loaded'
			})
		).toMatchObject({
			detail: 'Loaded files and registry metadata.',
			status: 'complete'
		})
		expect(toolCallSchema.parse({ id: 'run', name: 'bun test' }).status).toBe('queued')
	})

	test('parses form runtime boundaries', () => {
		expect(fieldStatusSchema.parse('success')).toBe('success')
		expect(dateValueSchema.parse('2026-04-28')).toBe('2026-04-28')
		expect(timeValueSchema.parse('14:30')).toBe('14:30')
		expect(dateRangeValueSchema.parse({ end: '2026-05-07', start: '2026-04-28' })).toEqual({
			end: '2026-05-07',
			start: '2026-04-28'
		})
		expect(multiSelectOptionSchema.parse({ label: 'AI native', value: 'ai' })).toMatchObject({
			disabled: false,
			label: 'AI native',
			value: 'ai'
		})
		expect(
			uploadItemSchema.parse({
				id: 'report',
				name: 'Q2_report.pdf',
				size: 2400000
			})
		).toMatchObject({
			status: 'idle',
			type: 'application/octet-stream'
		})
		expect(
			formValidationItemSchema.parse({
				id: 'email',
				label: 'Email',
				message: 'Enter a work email.'
			})
		).toMatchObject({
			id: 'email',
			status: 'error'
		})
		expect(
			settingsPanelSectionSchema.parse({
				id: 'runtime',
				rows: [{ id: 'tools', label: 'Tools' }],
				title: 'Runtime'
			})
		).toMatchObject({
			rows: [{ id: 'tools', label: 'Tools', status: 'default' }]
		})
	})

	test('keeps warning out of the signal model', () => {
		expect(renderQuerySchema.parse({}).pressure).toBe('product')
		expect(concreteSignalSchema.safeParse('warning').success).toBe(false)
		expect(iconNames.includes('send-horizontal')).toBe(true)
		expect(iconNames.includes('triangle-alert')).toBe(true)
	})

	test('parses render query defaults and overrides', () => {
		expect(renderQuerySchema.parse({}).viewport).toBe('desktop')
		expect(
			renderQuerySchema.parse({
				pressure: 'editorial',
				quality: '80',
				state: 'error',
				viewport: 'mobile'
			})
		).toEqual({
			pressure: 'editorial',
			quality: 80,
			state: 'error',
			viewport: 'mobile'
		})
	})

	test('renders every icon with real geometry', () => {
		for (const name of iconNames) {
			const markup = renderToStaticMarkup(createElement(ConcreteIcon, { name }))

			expect(markup.includes('<line></line>')).toBe(false)
			expect(markup.includes('<path></path>')).toBe(false)
		}
	})

	test('renders every registered primitive and component state', () => {
		for (const entry of foundationRegistry) {
			const states = entry.states.length > 0 ? entry.states : [{ query: 'default' }]

			for (const state of states) {
				const markup = renderToStaticMarkup(
					createElement(Fragment, null, renderFoundationExample(entry.slug, state.query))
				)

				expect(markup.length).toBeGreaterThan(0)
			}
		}

		for (const entry of primitiveRegistry) {
			const states = entry.states.length > 0 ? entry.states : [{ query: 'default' }]

			for (const state of states) {
				const markup = renderToStaticMarkup(
					createElement(Fragment, null, renderPrimitiveExample(entry.slug, state.query))
				)

				expect(markup.length).toBeGreaterThan(0)
			}
		}

		for (const entry of componentRegistry) {
			const states = entry.states.length > 0 ? entry.states : [{ query: 'default' }]

			for (const state of states) {
				const markup = renderToStaticMarkup(
					createElement(Fragment, null, renderComponentExample(entry.slug, state.query))
				)

				expect(markup.length).toBeGreaterThan(0)
			}
		}
	})

	test('keeps polished primitive examples state-rich and registered', () => {
		const requiredPrimitiveStates = {
			alert: ['default', 'error', 'success'],
			card: ['default', 'interactive', 'raised', 'sunken'],
			checkbox: ['default', 'disabled'],
			'control-group': ['default', 'attached', 'vertical'],
			'data-surface': ['default', 'compact', 'media', 'toolbar'],
			delta: ['default', 'basis', 'density', 'wash'],
			'empty-state': ['default', 'compact', 'sky', 'editorial'],
			field: ['default', 'requirements', 'error', 'success', 'count'],
			'field-row': ['default', 'meta', 'success', 'error'],
			frame: ['default', 'compact', 'texture', 'showcase'],
			input: ['default', 'filled', 'error', 'disabled', 'inlineControl'],
			listbox: ['default', 'compact', 'empty'],
			'menu-group': ['default', 'selection', 'status'],
			'menu-surface': ['default', 'search', 'compact'],
			'option-row': ['default', 'command', 'select', 'danger'],
			panel: ['default', 'compact', 'footer', 'raised'],
			'picker-button': ['default', 'open', 'time', 'disabled'],
			progress: ['default', 'signals', 'indeterminate'],
			'progress-ring': ['default', 'density', 'signals'],
			radio: ['default', 'disabled'],
			range: ['default', 'disabled', 'narrow'],
			'search-input': ['default', 'tokens', 'value'],
			'segmented-progress': ['default', 'empty', 'complete'],
			select: ['default', 'filled', 'error', 'disabled'],
			slider: ['default', 'sky', 'disabled'],
			stat: ['default', 'numeric', 'display', 'intents'],
			stepper: ['default', 'error', 'disabled'],
			surface: ['default', 'raised', 'selected', 'inverse', 'sticky'],
			switch: ['default', 'disabled'],
			textarea: ['default', 'filled', 'error', 'disabled'],
			'time-list': ['default', 'formatted', 'later'],
			'toolbar-control': ['default', 'selected', 'compact', 'disabled'],
			'validation-list': ['default', 'linked', 'success']
		} satisfies Record<string, readonly string[]>

		for (const [slug, requiredStates] of Object.entries(requiredPrimitiveStates)) {
			const definition = primitiveDefinitions.find(definition => definition.slug === slug)

			expect(definition?.states.map(state => state.query)).toEqual(requiredStates)
		}
	})

	test('renders every playground definition input from its schema seed', () => {
		const searchParams = new URLSearchParams()

		for (const definition of primitiveDefinitions) {
			const markup = renderToStaticMarkup(
				createElement(Fragment, null, renderDefinitionInput(definition, searchParams))
			)

			expect(markup).not.toBe('')
		}

		for (const definition of componentDefinitions) {
			const markup = renderToStaticMarkup(
				createElement(Fragment, null, renderDefinitionInput(definition, searchParams))
			)

			expect(markup).not.toBe('')
		}
	})

	test('validates item definition metadata and examples', () => {
		expect(foundationDefinitions.map(definition => definition.slug)).toEqual([
			'colors',
			'typography',
			'spacing',
			'sizing',
			'layout',
			'radii',
			'elevation',
			'motion',
			'textures',
			'iconography',
			'state',
			'accessibility'
		])

		for (const definition of foundationDefinitions) {
			expect(definition.kind).toBe('foundation')
			expect(foundationRegistry.some(entry => entry.slug === definition.slug)).toBe(true)
			expect(definition.tokens.length).toBeGreaterThan(0)
			expect(getFoundationEntry(definition.slug)?.tokens).toEqual(definition.tokens)
			expect(hasUniqueNames(definition.controls)).toBe(true)
			expect(hasUniqueQueries(definition.states)).toBe(true)
			expect(definition.schema.safeParse({}).success).toBe(true)
			expect(!('seed' in definition) || definition.schema.safeParse(definition.seed).success).toBe(
				true
			)
			expect(renderToStaticMarkup(createElement(Fragment, null, definition.renderExample()))).not.toBe(
				''
			)
		}

		for (const definition of primitiveDefinitions) {
			expect(registryEntrySchema.safeParse(toRegistryShape(definition)).success).toBe(true)
			expect(primitiveRegistry.some(entry => entry.slug === definition.slug)).toBe(true)
			expect(hasUniqueNames(definition.controls)).toBe(true)
			expect(hasUniqueQueries(definition.states)).toBe(true)
			expect(!('seed' in definition) || definition.schema.safeParse(definition.seed).success).toBe(
				true
			)

			for (const state of definition.states) {
				expect(
					renderToStaticMarkup(createElement(Fragment, null, definition.renderExample(state.query)))
				).not.toBe('')
			}
		}

		for (const definition of componentDefinitions) {
			expect(registryEntrySchema.safeParse(toRegistryShape(definition)).success).toBe(true)
			expect(componentRegistry.some(entry => entry.slug === definition.slug)).toBe(true)
			expect(hasUniqueNames(definition.controls)).toBe(true)
			expect(hasUniqueQueries(definition.states)).toBe(true)
			expect(!('seed' in definition) || definition.schema.safeParse(definition.seed).success).toBe(
				true
			)

			for (const state of definition.states) {
				expect(
					renderToStaticMarkup(createElement(Fragment, null, definition.renderExample(state.query)))
				).not.toBe('')
			}
		}
	})

	test('generates seed and controls for migrated folder-owned items', () => {
		const buttonDefinition = primitiveDefinitions.find(definition => definition.slug === 'button')
		const metricCardDefinition = componentDefinitions.find(
			definition => definition.slug === 'metric-card'
		)
		const colorsDefinition = foundationDefinitions.find(definition => definition.slug === 'colors')
		const buttonSeed =
			buttonDefinition && 'seed' in buttonDefinition ? buttonDefinition.seed : undefined
		const metricCardSeed =
			metricCardDefinition && 'seed' in metricCardDefinition ? metricCardDefinition.seed : undefined
		const colorsSeed =
			colorsDefinition && 'seed' in colorsDefinition ? colorsDefinition.seed : undefined

		expect(buttonSeed).toMatchObject({
			density: 'medium',
			disabled: false,
			hierarchy: 'secondary',
			iconOnly: false,
			intent: 'neutral',
			label: 'Continue',
			loading: false,
			pressed: false
		})
		expect(buttonDefinition?.controls.map(control => control.name)).toEqual([
			'density',
			'disabled',
			'hierarchy',
			'iconOnly',
			'intent',
			'label',
			'leadingIcon',
			'loading',
			'pressed',
			'trailingIcon',
			'props'
		])
		expect(metricCardDefinition?.controls.some(control => control.type === 'json')).toBe(true)
		expect(metricCardDefinition?.schema.safeParse(metricCardSeed).success).toBe(true)
		expect(colorsSeed).toEqual({ tokens: [] })
	})

	test('renders playground input from exhaustive props JSON', () => {
		const buttonDefinition = primitiveDefinitions.find(definition => definition.slug === 'button')
		const searchParams = new URLSearchParams({
			props: JSON.stringify({
				hierarchy: 'primary',
				intent: 'neutral',
				label: 'JSON action'
			})
		})

		if (!buttonDefinition) {
			throw new Error('Missing button definition')
		}

		expect(
			renderToStaticMarkup(
				createElement(Fragment, null, renderDefinitionInput(buttonDefinition, searchParams))
			)
		).toContain('JSON action')
	})

	test('generates nested and discriminated playground controls', () => {
		const chartDefinition = componentDefinitions.find(definition => definition.slug === 'chart')
		const dataTableDefinition = componentDefinitions.find(
			definition => definition.slug === 'data-table'
		)
		const metricCardDefinition = componentDefinitions.find(
			definition => definition.slug === 'metric-card'
		)
		const chartKindControl = chartDefinition?.controls.find(control => control.name === 'kind')

		expect(metricCardDefinition?.controls.map(control => control.name)).toContain('delta.value')
		expect(metricCardDefinition?.controls.map(control => control.name)).toContain('delta.intent')
		expect(dataTableDefinition?.controls.map(control => control.name)).toContain('pagination.page')
		expect(dataTableDefinition?.controls.map(control => control.name)).toContain('sort.direction')
		expect(chartKindControl?.type).toBe('select')
		expect(chartKindControl?.options?.map(option => option.value)).toEqual([
			'line',
			'area',
			'bar',
			'stacked-bar',
			'donut',
			'heatmap'
		])
	})

	test('renders playground input from nested and discriminated controls', () => {
		const chartDefinition = componentDefinitions.find(definition => definition.slug === 'chart')
		const metricCardDefinition = componentDefinitions.find(
			definition => definition.slug === 'metric-card'
		)
		const chartSearchParams = new URLSearchParams({
			kind: 'bar',
			points: JSON.stringify([{ intent: 'sky', label: 'Proof', value: 12 }]),
			title: 'Bar proof'
		})
		const metricSearchParams = new URLSearchParams({
			'delta.value': '+99.9%',
			value: '9000'
		})

		if (!chartDefinition || !metricCardDefinition) {
			throw new Error('Missing chart or metric-card definition')
		}

		const chartMarkup = renderToStaticMarkup(
			createElement(Fragment, null, renderDefinitionInput(chartDefinition, chartSearchParams))
		)
		const metricMarkup = renderToStaticMarkup(
			createElement(Fragment, null, renderDefinitionInput(metricCardDefinition, metricSearchParams))
		)

		expect(chartMarkup).toContain('Bar proof')
		expect(chartMarkup).toContain('concrete-chart-bar')
		expect(metricMarkup).toContain('+99.9%')
		expect(metricMarkup).toContain('9000')
	})

	test('parses recursive Concrete node defaults', () => {
		const parsedNode = concreteNodeSchema.parse({
			item: { kind: 'primitive', slug: 'button' },
			type: 'item'
		})

		expect(concreteNodeTreeSchema.parse({})).toEqual({ nodes: [] })
		expect(parsedNode).toEqual({
			children: [],
			item: { kind: 'primitive', slug: 'button' },
			props: {},
			slots: {},
			type: 'item'
		})
	})

	test('validates recursive nodes against registry item schemas', () => {
		const result = validateConcreteNodeTree({
			nodes: [
				{
					children: [{ type: 'text', value: 'Run protocol' }],
					item: { kind: 'primitive', slug: 'button' },
					props: { hierarchy: 'primary', label: 'Run protocol' },
					slots: {
						leading: [
							{
								item: { kind: 'primitive', slug: 'icon' },
								props: { name: 'sparkles' },
								type: 'item'
							}
						]
					},
					type: 'item'
				}
			]
		})

		expect(result.success).toBe(true)

		if (!result.success) {
			throw new Error(result.issues.map(issue => issue.message).join(', '))
		}

		expect(result.data.nodes[0]).toMatchObject({
			item: { kind: 'primitive', slug: 'button' },
			props: { hierarchy: 'primary', label: 'Run protocol' }
		})
	})

	test('rejects unknown registry references and invalid item props in nodes', () => {
		const unknownReference = validateConcreteNode({
			item: { kind: 'primitive', slug: 'not-real' },
			props: {},
			type: 'item'
		})
		const invalidProps = validateConcreteNode({
			item: { kind: 'primitive', slug: 'button' },
			props: { label: 7 },
			type: 'item'
		})

		expect(unknownReference.success).toBe(false)
		expect(invalidProps.success).toBe(false)

		if (unknownReference.success || invalidProps.success) {
			throw new Error('Expected invalid node validation results.')
		}

		expect(unknownReference.issues[0]?.path).toEqual(['item', 'slug'])
		expect(unknownReference.issues[0]?.message).toContain('Unknown primitive reference')
		expect(invalidProps.issues.some(issue => issue.path.join('.') === 'props.label')).toBe(true)
	})

	test('keeps Concrete node props serializable and validation-only', () => {
		const nonSerializableProps = concreteNodeSchema.safeParse({
			item: { kind: 'primitive', slug: 'button' },
			props: { onClick: () => undefined },
			type: 'item'
		})
		const validationOnlyDefinitions = [
			{
				kind: 'primitive' as const,
				schema: z.object({ label: z.string().min(1) }).strict(),
				slug: 'custom-button'
			}
		]
		const result = validateConcreteNode(
			{
				item: { kind: 'primitive', slug: 'custom-button' },
				props: { label: 'Schema only' },
				type: 'item'
			},
			validationOnlyDefinitions
		)

		expect(nonSerializableProps.success).toBe(false)
		expect(result.success).toBe(true)
	})

	test('preserves public export compatibility', () => {
		expect(typeof renderPrimitiveExample).toBe('function')
		expect(typeof renderComponentExample).toBe('function')
		expect(typeof validateConcreteNode).toBe('function')
		expect(typeof validateConcreteNodeTree).toBe('function')
		expect(primitiveDefinitions.map(definition => definition.slug)).toEqual([
			'button',
			'toolbar-control',
			'input',
			'field',
			'stack',
			'inline',
			'cluster',
			'container',
			'grid',
			'split',
			'scroll-area',
			'dock',
			'rail',
			'page-section',
			'surface',
			'panel',
			'section',
			'header',
			'text',
			'heading',
			'label',
			'icon-button',
			'control-group',
			'field-row',
			'token',
			'search-input',
			'picker-button',
			'picker-surface',
			'menu-surface',
			'menu-group',
			'listbox',
			'overlay',
			'dialog-surface',
			'drawer-surface',
			'alert',
			'validation-list',
			'disclosure-panel',
			'data-surface',
			'transcript-item',
			'message-bubble',
			'option-row',
			'calendar-grid',
			'dropzone',
			'upload-field',
			'upload-item',
			'caret',
			'textarea',
			'select',
			'checkbox',
			'radio',
			'stepper',
			'range',
			'trace-panel',
			'switch',
			'slider',
			'card',
			'chart-frame',
			'plot',
			'chart-grid',
			'axis',
			'target-line',
			'series-line',
			'series-point',
			'series-bar',
			'donut-ring',
			'heatmap-grid',
			'legend',
			'table',
			'pagination',
			'pill',
			'chip',
			'badge',
			'tag',
			'avatar',
			'code',
			'composer-surface',
			'token-rail',
			'concept-frame',
			'concept-connector',
			'diagram-viewport',
			'diagram-controls',
			'diagram-rail',
			'diagram-edge',
			'diagram-minimap',
			'diagram-legend',
			'diagram-node',
			'diagram-item',
			'flow-node',
			'kbd',
			'spinner',
			'link',
			'divider',
			'empty-state',
			'tooltip',
			'progress',
			'progress-ring',
			'segmented-progress',
			'stat',
			'delta',
			'sparkline',
			'distribution',
			'indicator',
			'skeleton',
			'frame',
			'time-list',
			'tool-call-panel',
			'tilt-frame',
			'scale-frame',
			'brand-mark',
			'wordmark',
			'icon'
		])
		expect(componentDefinitions.map(definition => definition.slug)).toEqual([
			'nav',
			'footer',
			'command-menu',
			'search-bar',
			'validation-summary',
			'settings-panel',
			'form-dialog',
			'form-drawer',
			'password-input',
			'multi-select',
			'date-picker',
			'date-range-picker',
			'time-picker',
			'number-stepper',
			'range-slider',
			'file-upload',
			'image-upload',
			'metric-card',
			'meter',
			'line-chart',
			'area-chart',
			'bar-chart',
			'stacked-bar-chart',
			'donut-chart',
			'heatmap',
			'chart',
			'data-table',
			'flow-diagram',
			'diagram-canvas',
			'message',
			'reasoning-message',
			'tool-call-message',
			'composer'
		])
	})
})

function toRegistryShape(definition: {
	category: string
	description: string
	guidance: string
	name: string
	pressure: readonly string[]
	props: readonly unknown[]
	slug: string
	states: readonly unknown[]
}) {
	return {
		category: definition.category,
		description: definition.description,
		guidance: definition.guidance,
		name: definition.name,
		pressure: definition.pressure,
		props: definition.props,
		slug: definition.slug,
		states: definition.states
	}
}

function hasUniqueNames(items: readonly { name: string }[]): boolean {
	const names = items.map(item => item.name)
	return new Set(names).size === names.length
}

function hasUniqueQueries(items: readonly { query: string }[]): boolean {
	const queries = items.map(item => item.query)
	return new Set(queries).size === queries.length
}
