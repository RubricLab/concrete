import type { InputHTMLAttributes, ReactNode } from 'react'
import { concreteClassNames } from '../../styles/class-names'
import { ChoiceRow } from '../checkbox'
import { cn } from '../utils'

export type RadioProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
	label?: ReactNode
}

export function Radio({ checked, className, label, ...props }: RadioProps) {
	return (
		<ChoiceRow className={className}>
			<input checked={checked} className={concreteClassNames.visuallyHidden} type="radio" {...props} />
			<span
				aria-hidden
				className={cn(concreteClassNames.radio, checked && concreteClassNames.radioChecked)}
			>
				{checked ? <span className={concreteClassNames.radioDot} /> : null}
			</span>
			{label}
		</ChoiceRow>
	)
}
