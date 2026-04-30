'use client'

import type { HTMLAttributes } from 'react'
import { useState } from 'react'
import { ConcreteIcon } from '../../icons'
import { Field, Tag } from '../../primitives'
import type { MultiSelectOption } from '../../schemas'
import { concreteClassNames } from '../../styles/class-names'
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
			<div className={concreteClassNames.multiSelect} data-open={open ? true : undefined} {...props}>
				<div className={concreteClassNames.multiSelectControl}>
					<span
						className={concreteClassNames.multiSelectValues}
						data-empty={selectedOptions.length === 0 ? true : undefined}
					>
						{selectedOptions.length > 0
							? selectedOptions.map(option => (
									<Tag
										dismissible
										key={option.value}
										onDismiss={() =>
											commitValue(currentValue.filter(valueItem => valueItem !== option.value))
										}
										size="small"
										tone="sunken"
									>
										{option.label}
									</Tag>
								))
							: placeholder}
					</span>
					<button
						aria-expanded={open}
						aria-label="Toggle options"
						className={concreteClassNames.multiSelectToggle}
						onClick={event => {
							event.stopPropagation()
							setOpen(current => !current)
						}}
						type="button"
					>
						<ConcreteIcon name="chevron-down" />
					</button>
				</div>
				{open ? (
					<div className={concreteClassNames.multiSelectMenu}>
						<input
							aria-label="Filter options"
							onChange={event => setQuery(event.currentTarget.value)}
							placeholder="Filter..."
							value={query}
						/>
						<div role="listbox">
							{filteredOptions.map(option => (
								<button
									aria-selected={currentValue.includes(option.value)}
									data-selected={currentValue.includes(option.value) ? true : undefined}
									disabled={option.disabled}
									key={option.value}
									onClick={() => toggleOption(option)}
									role="option"
									type="button"
								>
									<span>
										<b>{option.label}</b>
										{option.description ? <small>{option.description}</small> : null}
									</span>
									{option.meta ? <small>{option.meta}</small> : null}
									{currentValue.includes(option.value) ? <ConcreteIcon name="check" /> : null}
								</button>
							))}
						</div>
					</div>
				) : null}
			</div>
		</Field>
	)
}
