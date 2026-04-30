import type { HTMLAttributes, ReactNode } from 'react'
import { concreteClassNames } from '../../styles/class-names'
import { cn } from '../utils'

export type PickerShellKind = 'date' | 'multi-select' | 'time'

export type PickerShellProps = HTMLAttributes<HTMLDivElement> & {
	children: ReactNode
	kind?: PickerShellKind | undefined
	open?: boolean | undefined
}

export function PickerShell({
	children,
	className,
	kind = 'date',
	open = false,
	...props
}: PickerShellProps) {
	return (
		<div
			className={cn(getPickerShellClassName(kind), className)}
			data-open={open ? true : undefined}
			{...props}
		>
			{children}
		</div>
	)
}

function getPickerShellClassName(kind: PickerShellKind): string {
	switch (kind) {
		case 'date':
			return concreteClassNames.datePicker ?? 'concrete-date-picker'
		case 'multi-select':
			return concreteClassNames.multiSelect ?? 'concrete-multi-select'
		case 'time':
			return concreteClassNames.timePicker ?? 'concrete-time-picker'
	}
}
