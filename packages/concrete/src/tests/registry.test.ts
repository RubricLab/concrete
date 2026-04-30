import { describe, expect, test } from 'bun:test'
import { createElement, Fragment } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import {
	ConcreteIcon,
	commandItemSchema,
	componentDefinitions,
	componentRegistry,
	composerConfigSchema,
	composerSuggestionSchema,
	composerValueSchema,
	concreteSignalSchema,
	dateRangeValueSchema,
	dateValueSchema,
	fieldStatusSchema,
	formShellConfigSchema,
	formValidationItemSchema,
	foundationDefinitions,
	iconNames,
	messageSchema,
	multiSelectOptionSchema,
	primitiveDefinitions,
	primitiveRegistry,
	reasoningStepSchema,
	registryEntrySchema,
	renderComponentExample,
	renderDefinitionInput,
	renderPrimitiveExample,
	renderQuerySchema,
	searchBarTokenSchema,
	settingsPanelSectionSchema,
	timeValueSchema,
	toolCallSchema,
	uploadItemSchema
} from '..'

describe('Concrete registry', () => {
	test('contains unique primitive slugs', () => {
		const slugs = primitiveRegistry.map(entry => entry.slug)
		const uniqueSlugs = new Set(slugs)

		expect(uniqueSlugs.size).toBe(slugs.length)
	})

	test('derives public registries from item definitions in order', () => {
		expect(primitiveRegistry.map(entry => entry.slug)).toEqual(
			primitiveDefinitions.map(definition => definition.slug)
		)
		expect(componentRegistry.map(entry => entry.slug)).toEqual(
			componentDefinitions.map(definition => definition.slug)
		)
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
			shortcut: [],
			tone: 'default'
		})
		expect(searchBarTokenSchema.parse({ id: 'workspace', label: 'Rubric' }).tone).toBe('default')
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
		expect(formShellConfigSchema.parse({ title: 'Workspace' })).toMatchObject({
			compact: false,
			status: 'default',
			variant: 'panel'
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
			'radii',
			'elevation',
			'motion',
			'textures'
		])

		for (const definition of foundationDefinitions) {
			expect(definition.kind).toBe('foundation')
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
			disabled: false,
			iconOnly: false,
			label: 'Continue',
			loading: false,
			pressed: false,
			size: 'medium',
			variant: 'secondary'
		})
		expect(buttonDefinition?.controls.map(control => control.name)).toEqual([
			'disabled',
			'iconOnly',
			'label',
			'leadingIcon',
			'loading',
			'pressed',
			'size',
			'trailingIcon',
			'variant',
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
				label: 'JSON action',
				variant: 'primary'
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

	test('preserves public export compatibility', () => {
		expect(typeof renderPrimitiveExample).toBe('function')
		expect(typeof renderComponentExample).toBe('function')
		expect(primitiveDefinitions.map(definition => definition.slug)).toEqual([
			'button',
			'input',
			'field',
			'dropzone',
			'upload-item',
			'caret',
			'textarea',
			'select',
			'checkbox',
			'radio',
			'switch',
			'slider',
			'card',
			'pill',
			'chip',
			'badge',
			'tag',
			'avatar',
			'row',
			'bubble',
			'code',
			'concept-frame',
			'concept-connector',
			'diagram-node',
			'diagram-item',
			'kbd',
			'spinner',
			'link',
			'divider',
			'empty-state',
			'tooltip',
			'progress',
			'stat',
			'delta',
			'sparkline',
			'distribution',
			'indicator',
			'skeleton',
			'frame',
			'texture',
			'brand-mark',
			'wordmark',
			'icon',
			'focus-ring'
		])
		expect(componentDefinitions.map(definition => definition.slug)).toEqual([
			'toolbar',
			'command-menu',
			'search-bar',
			'form-shell',
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
