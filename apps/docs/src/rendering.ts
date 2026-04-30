import {
	type ComponentDefinition,
	type ConcreteViewport,
	type FoundationDefinition,
	type PrimitiveDefinition,
	type RenderQuery,
	renderDefinitionInput,
	renderQuerySchema
} from '@rubriclab/concrete'
import type { ReactNode } from 'react'

export type SearchParamsInput = Record<string, string | string[] | undefined>
export type QueryValueSource = {
	get: (name: string) => string | null
}

export type ViewportSize = {
	height: number
	width: number
}

type RenderableDefinition = ComponentDefinition | FoundationDefinition | PrimitiveDefinition

export function parseRenderQuery(searchParams: SearchParamsInput): RenderQuery {
	const flattened = flattenSearchParams(searchParams)
	return renderQuerySchema.parse(flattened)
}

export function parseUrlRenderQuery(url: URL): RenderQuery {
	const flattened: Record<string, string> = {}

	for (const [key, value] of url.searchParams.entries()) {
		flattened[key] = value
	}

	return renderQuerySchema.parse(flattened)
}

export function getViewportSize(viewport: ConcreteViewport): ViewportSize {
	switch (viewport) {
		case 'desktop':
			return { height: 720, width: 1120 }
		case 'mobile':
			return { height: 812, width: 390 }
		case 'tablet':
			return { height: 900, width: 768 }
	}
}

export function renderDefinitionFromSearchParams(
	definition: RenderableDefinition,
	searchParams: QueryValueSource | SearchParamsInput,
	state: string
): ReactNode {
	if (!hasDefinitionInputQuery(definition, searchParams)) {
		return definition.renderExample(state)
	}

	return (
		renderDefinitionInput(definition, createSearchParamsSource(searchParams)) ??
		definition.renderExample(state)
	)
}

export function hasDefinitionInputQuery(
	definition: RenderableDefinition,
	searchParams: QueryValueSource | SearchParamsInput
): boolean {
	const source = createSearchParamsSource(searchParams)

	return definition.controls.some(control => source.get(control.name) !== null)
}

export function createSearchParamsSource(
	searchParams: QueryValueSource | SearchParamsInput
): QueryValueSource {
	if (isQueryValueSource(searchParams)) {
		return searchParams
	}

	const flattened = flattenSearchParams(searchParams)

	return {
		get: (name: string) => flattened[name] ?? null
	}
}

function flattenSearchParams(searchParams: SearchParamsInput): Record<string, string> {
	const flattened: Record<string, string> = {}

	for (const [key, value] of Object.entries(searchParams)) {
		switch (typeof value) {
			case 'string':
				flattened[key] = value
				break
			case 'undefined':
				break
			default:
				flattened[key] = value[0] ?? ''
				break
		}
	}

	return flattened
}

function isQueryValueSource(
	searchParams: QueryValueSource | SearchParamsInput
): searchParams is QueryValueSource {
	return typeof (searchParams as { get?: unknown }).get === 'function'
}
