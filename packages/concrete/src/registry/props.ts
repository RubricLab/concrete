import type { PrimitiveProp, PrimitiveState } from './types'

export function prop(
	name: string,
	type: string,
	description: string,
	defaultValue?: string,
	required = false
): PrimitiveProp {
	return {
		description,
		name,
		...(defaultValue === undefined ? {} : { defaultValue }),
		...(required ? { required } : {}),
		type
	}
}

export function states(values: readonly (readonly [string, string])[]): readonly PrimitiveState[] {
	return values.map(([query, description]) => ({
		description,
		name: titleCase(query),
		query
	}))
}

function titleCase(value: string): string {
	return value
		.split('-')
		.map(part => `${part.slice(0, 1).toUpperCase()}${part.slice(1)}`)
		.join(' ')
}
