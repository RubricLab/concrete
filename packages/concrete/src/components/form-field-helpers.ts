import type { FieldProps } from '../primitives'

export type FieldChromeProps = Pick<
	FieldProps,
	'description' | 'error' | 'help' | 'label' | 'limit' | 'optional' | 'required' | 'success'
>

export function getNumber(
	value: number | readonly string[] | string | undefined,
	fallback: number
): number {
	const parsed = Number(value)
	return Number.isFinite(parsed) ? parsed : fallback
}

export function getOptionalNumber(
	value: number | readonly string[] | string | undefined
): number | undefined {
	if (value === undefined) {
		return undefined
	}

	const parsed = Number(value)
	return Number.isFinite(parsed) ? parsed : undefined
}

export function clampOptionalNumber(
	value: number,
	minimum: number | undefined,
	maximum: number | undefined
): number {
	return Math.min(maximum ?? value, Math.max(minimum ?? value, value))
}

export function getPercent(value: number, minimum: number, maximum: number): number {
	const range = maximum - minimum
	return range === 0 ? 0 : Math.min(100, Math.max(0, ((value - minimum) / range) * 100))
}
