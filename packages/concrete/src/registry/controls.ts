import type { IconName } from '../icons'
import { iconNames } from '../icons'

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

export function isIconName(value: string | null): value is IconName {
	return Boolean(value && iconNameSet.has(value))
}
