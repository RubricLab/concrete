import type { ReactNode } from 'react'
import { getComponentDefinition, getFoundationDefinition, getPrimitiveDefinition } from './items'

export function renderFoundationExample(slug: string, state = 'default'): ReactNode {
	return getFoundationDefinition(slug)?.renderExample(state) ?? null
}

export function renderPrimitiveExample(slug: string, state = 'default'): ReactNode {
	return getPrimitiveDefinition(slug)?.renderExample(state) ?? null
}

export function renderComponentExample(slug: string, state = 'default'): ReactNode {
	return getComponentDefinition(slug)?.renderExample(state) ?? null
}
