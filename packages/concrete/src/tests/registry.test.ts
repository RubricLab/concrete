import { describe, expect, test } from 'bun:test'
import { createElement, Fragment } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import {
	ConcreteIcon,
	commandItemSchema,
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
	iconNames,
	messageSchema,
	multiSelectOptionSchema,
	primitiveRegistry,
	reasoningStepSchema,
	registryEntrySchema,
	renderComponentExample,
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
})
