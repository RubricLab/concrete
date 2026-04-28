'use client'

import type { InputHTMLAttributes } from 'react'
import { useState } from 'react'
import { ConcreteIcon } from '../../icons'
import { Field } from '../../primitives'
import classes from '../components.module.css'
import type { FieldChromeProps } from './shared'

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
			<span className={classes.formControlWrap}>
				<input
					aria-invalid={Boolean(error)}
					className={classes.formControl}
					id={id}
					type={visible ? 'text' : 'password'}
					{...props}
				/>
				<button
					aria-label={visible ? hiddenLabel : visibleLabel}
					className={classes.formControlIconButton}
					onClick={() => setVisible(current => !current)}
					type="button"
				>
					<ConcreteIcon name={visible ? 'eye-off' : 'eye'} />
				</button>
			</span>
		</Field>
	)
}
