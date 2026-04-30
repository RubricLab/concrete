'use client'

import type { ControlDefinition } from '@rubriclab/concrete'

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
		case 'json':
			return (
				<label className="propControl propControlJson">
					<span>{control.label}</span>
					<textarea
						onChange={event => onChange(control.name, event.currentTarget.value, control.defaultValue)}
						rows={5}
						value={value}
					/>
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
