'use client'

import type { IconName } from '@rubriclab/concrete/icons'
import { iconNames } from '@rubriclab/concrete/icons'

export type ControlOption = {
	label: string
	value: string
}

export type ControlDefinition = {
	defaultValue: string
	label: string
	name: string
	options?: readonly ControlOption[]
	type: 'boolean' | 'number' | 'select' | 'text'
}

export const iconOptions = [
	{ label: 'None', value: '' },
	{ label: 'Search', value: 'search' },
	{ label: 'Plus', value: 'plus' },
	{ label: 'Message', value: 'message-square' },
	{ label: 'User', value: 'user' },
	{ label: 'File', value: 'file-text' },
	{ label: 'Folder', value: 'folder' },
	{ label: 'Activity', value: 'activity' },
	{ label: 'Filter', value: 'filter' },
	{ label: 'Paperclip', value: 'paperclip' },
	{ label: 'Settings', value: 'settings' },
	{ label: 'Sparkles', value: 'sparkles' },
	{ label: 'Trash', value: 'trash-2' }
] as const satisfies readonly ControlOption[]

const iconNameSet: ReadonlySet<string> = new Set<string>(iconNames)

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

export function booleanControl(
	name: string,
	label: string,
	defaultValue: string
): ControlDefinition {
	return { defaultValue, label, name, type: 'boolean' }
}

export function numberControl(
	name: string,
	label: string,
	defaultValue: string
): ControlDefinition {
	return { defaultValue, label, name, type: 'number' }
}

export function selectControl(
	name: string,
	label: string,
	defaultValue: string,
	values: readonly string[]
): ControlDefinition {
	return {
		defaultValue,
		label,
		name,
		options: values.map(value => ({
			label: value || 'None',
			value
		})),
		type: 'select'
	}
}

export function selectOptionsControl(
	name: string,
	label: string,
	defaultValue: string,
	options: readonly ControlOption[]
): ControlDefinition {
	return { defaultValue, label, name, options, type: 'select' }
}

export function textControl(name: string, label: string, defaultValue: string): ControlDefinition {
	return { defaultValue, label, name, type: 'text' }
}

function isIconName(value: string | null): value is IconName {
	return Boolean(value && iconNameSet.has(value))
}
