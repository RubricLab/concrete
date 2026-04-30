import type { FieldsetHTMLAttributes, ReactNode } from 'react'
import type { Density } from '../../foundations/state'
import { concreteClassNames } from '../../styles/class-names'
import { cn } from '../utils'
import type { ControlGroupOrientation } from './schema'

type ControlGroupElementProps = Omit<FieldsetHTMLAttributes<HTMLFieldSetElement>, 'style'>

export type ControlGroupProps = ControlGroupElementProps & {
	attached?: boolean
	children?: ReactNode
	density?: Density
	label?: string
	orientation?: ControlGroupOrientation
}

export function ControlGroup({
	attached = false,
	children,
	className,
	density = 'comfortable',
	label,
	orientation = 'horizontal',
	...props
}: ControlGroupProps) {
	return (
		<fieldset
			aria-label={label}
			className={cn(concreteClassNames.controlGroup, className)}
			data-attached={attached ? 'true' : undefined}
			data-density={density}
			data-orientation={orientation}
			{...props}
		>
			{children}
		</fieldset>
	)
}
