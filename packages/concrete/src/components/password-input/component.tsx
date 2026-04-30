'use client'

import type { InputHTMLAttributes } from 'react'
import { useState } from 'react'
import { ConcreteIcon } from '../../icons'
import { Field, InputControl } from '../../primitives'
import type { FieldChromeProps } from '../../utilities/form-field-helpers'

export type PasswordInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> &
	FieldChromeProps & {
		hiddenLabel?: string | undefined
		visibleLabel?: string | undefined
	}

export function PasswordInput({
	className,
	description,
	error,
	help,
	hiddenLabel = 'Hide password',
	id,
	label,
	optional,
	required,
	success,
	visibleLabel = 'Show password',
	...props
}: PasswordInputProps) {
	const [visible, setVisible] = useState(false)

	return (
		<Field
			className={className}
			description={description}
			error={error}
			help={help}
			htmlFor={id}
			label={label}
			optional={optional}
			required={required}
			success={success}
		>
			<InputControl
				action={<ConcreteIcon name={visible ? 'eye-off' : 'eye'} />}
				actionLabel={visible ? hiddenLabel : visibleLabel}
				actionPressed={visible}
				id={id}
				invalid={Boolean(error)}
				onActionClick={() => setVisible(current => !current)}
				type={visible ? 'text' : 'password'}
				{...props}
			/>
		</Field>
	)
}
