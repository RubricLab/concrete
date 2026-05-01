'use client'

import { type ControlDefinition, FieldRow, Input, Select, Textarea } from '@rubriclab/concrete'

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
	return (
		<FieldRow
			align={control.type === 'json' ? 'start' : 'center'}
			control={renderControlInput(control, value, onChange)}
			description={control.name}
			label={control.label}
		/>
	)
}

function renderControlInput(
	control: ControlDefinition,
	value: string,
	onChange: (name: string, value: string, defaultValue: string) => void
) {
	switch (control.type) {
		case 'boolean':
			return (
				<Select
					onChange={event => onChange(control.name, event.currentTarget.value, control.defaultValue)}
					options={[
						{ label: 'False', value: 'false' },
						{ label: 'True', value: 'true' }
					]}
					value={value}
				/>
			)
		case 'json':
			return (
				<Textarea
					onChange={event => onChange(control.name, event.currentTarget.value, control.defaultValue)}
					rows={5}
					value={value}
				/>
			)
		case 'number':
			return (
				<Input
					onChange={event => onChange(control.name, event.currentTarget.value, control.defaultValue)}
					type="number"
					value={value}
				/>
			)
		case 'select':
			return (
				<Select
					onChange={event => onChange(control.name, event.currentTarget.value, control.defaultValue)}
					options={control.options ?? []}
					value={value}
				/>
			)
		case 'text':
			return (
				<Input
					onChange={event => onChange(control.name, event.currentTarget.value, control.defaultValue)}
					type="text"
					value={value}
				/>
			)
	}
}
