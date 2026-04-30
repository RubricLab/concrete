'use client'

import type { HTMLAttributes } from 'react'
import { useState } from 'react'
import { Field, OptionRow, PickerShell, SelectControl, SelectMenu, Tag } from '../../primitives'
import type { MultiSelectOption } from '../../schemas'
import type { FieldChromeProps } from '../../utilities/form-field-helpers'

export type MultiSelectProps = Omit<HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'> &
	FieldChromeProps & {
		defaultValue?: readonly string[] | undefined
		defaultOpen?: boolean | undefined
		maxSelected?: number | undefined
		onValueChange?: ((value: readonly string[]) => void) | undefined
		options: readonly MultiSelectOption[]
		placeholder?: string | undefined
		value?: readonly string[] | undefined
	}

export function MultiSelect({
	className,
	defaultOpen = false,
	defaultValue = [],
	description,
	error,
	help,
	label,
	maxSelected,
	onValueChange,
	optional,
	options,
	placeholder = 'Select options...',
	required,
	success,
	value,
	...props
}: MultiSelectProps) {
	const [internalValue, setInternalValue] = useState<readonly string[]>(defaultValue)
	const [open, setOpen] = useState(defaultOpen)
	const [query, setQuery] = useState('')
	const currentValue = value ?? internalValue
	const selectedOptions = options.filter(option => currentValue.includes(option.value))
	const filteredOptions = options.filter(option =>
		option.label.toLowerCase().includes(query.trim().toLowerCase())
	)

	function commitValue(nextValue: readonly string[]) {
		if (value === undefined) {
			setInternalValue(nextValue)
		}

		onValueChange?.(nextValue)
	}

	function toggleOption(option: MultiSelectOption) {
		if (option.disabled) {
			return
		}

		if (currentValue.includes(option.value)) {
			commitValue(currentValue.filter(valueItem => valueItem !== option.value))
			return
		}

		if (maxSelected !== undefined && currentValue.length >= maxSelected) {
			return
		}

		commitValue([...currentValue, option.value])
	}

	return (
		<Field
			className={className}
			description={description}
			error={error}
			help={help}
			label={label}
			optional={optional}
			required={required}
			success={success}
		>
			<PickerShell kind="multi-select" open={open} {...props}>
				<SelectControl
					empty={selectedOptions.length === 0}
					onToggle={event => {
						event.stopPropagation()
						setOpen(current => !current)
					}}
					open={open}
				>
					{selectedOptions.length > 0
						? selectedOptions.map(option => (
								<Tag
									dismissible
									key={option.value}
									onDismiss={() => commitValue(currentValue.filter(valueItem => valueItem !== option.value))}
									size="small"
									tone="sunken"
								>
									{option.label}
								</Tag>
							))
						: placeholder}
				</SelectControl>
				{open ? (
					<SelectMenu
						filterInputProps={{
							'aria-label': 'Filter options',
							onChange: event => setQuery(event.currentTarget.value),
							placeholder: 'Filter...',
							value: query
						}}
						placement="floating"
					>
						{filteredOptions.map(option => (
							<OptionRow
								aria-selected={currentValue.includes(option.value)}
								description={option.description}
								disabled={option.disabled}
								key={option.value}
								kind="select"
								meta={option.meta}
								onClick={() => toggleOption(option)}
								role="option"
								selected={currentValue.includes(option.value)}
							>
								{option.label}
							</OptionRow>
						))}
					</SelectMenu>
				) : null}
			</PickerShell>
		</Field>
	)
}
