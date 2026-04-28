import { type ConcreteViewport, type RenderQuery, renderQuerySchema } from '@rubriclab/concrete'

export type SearchParamsInput = Record<string, string | string[] | undefined>

export type ViewportSize = {
	height: number
	width: number
}

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
