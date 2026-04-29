'use client'

import { type ControlDefinition, isIconName } from '@rubriclab/concrete'
import type { IconName } from '@rubriclab/concrete/icons'

export type { ControlDefinition }

export function PropControl({
	control,
	onChange,
	value
}: {
	control: ControlDefinition
	onChange: (name: string, value: string, defaultValue: string) => void
	value: string
}) {
	switch (control.type) {
		case 'boolean':
			return (
				<label className="propControl">
					<span>{control.label}</span>
					<select
						onChange={event => onChange(control.name, event.currentTarget.value, control.defaultValue)}
						value={value}
					>
						<option value="false">False</option>
						<option value="true">True</option>
					</select>
				</label>
			)
		case 'number':
			return (
				<label className="propControl">
					<span>{control.label}</span>
					<input
						onChange={event => onChange(control.name, event.currentTarget.value, control.defaultValue)}
						type="number"
						value={value}
					/>
				</label>
			)
		case 'select':
			return (
				<label className="propControl">
					<span>{control.label}</span>
					<select
						onChange={event => onChange(control.name, event.currentTarget.value, control.defaultValue)}
						value={value}
					>
						{control.options?.map(option => (
							<option key={option.value} value={option.value}>
								{option.label}
							</option>
						))}
					</select>
				</label>
			)
		case 'text':
			return (
				<label className="propControl">
					<span>{control.label}</span>
					<input
						onChange={event => onChange(control.name, event.currentTarget.value, control.defaultValue)}
						type="text"
						value={value}
					/>
				</label>
			)
	}
}

export function getQueryValue(
	searchParams: URLSearchParams,
	name: string,
	fallback: string
): string {
	return searchParams.get(name) ?? fallback
}

export function getQueryBoolean(
	searchParams: URLSearchParams,
	name: string,
	fallback: boolean
): boolean {
	const value = searchParams.get(name)

	switch (value) {
		case 'false':
			return false
		case 'true':
			return true
		case null:
			return fallback
		default:
			return fallback
	}
}

export function getQueryNumber(
	searchParams: URLSearchParams,
	name: string,
	fallback: number
): number {
	const value = searchParams.get(name)

	if (value === null) {
		return fallback
	}

	const parsedValue = Number(value)
	return Number.isFinite(parsedValue) ? parsedValue : fallback
}

export function getQueryValues(
	searchParams: URLSearchParams,
	name: string,
	fallback: readonly number[]
): readonly number[] {
	const value = searchParams.get(name)

	if (!value) {
		return fallback
	}

	const parsedValues = value
		.split(',')
		.map(part => Number(part.trim()))
		.filter(Number.isFinite)

	return parsedValues.length > 0 ? parsedValues : fallback
}

export function getIconName(searchParams: URLSearchParams, name: string): IconName | undefined {
	const value = searchParams.get(name)
	return isIconName(value) ? value : undefined
}
