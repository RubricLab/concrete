import type {
	ButtonHTMLAttributes,
	HTMLAttributes,
	InputHTMLAttributes,
	LabelHTMLAttributes,
	ReactNode,
	SelectHTMLAttributes
} from 'react'
import { ConcreteIcon } from '../../icons'
import type { DataTone } from '../../schemas'
import { concreteClassNames } from '../../styles/class-names'
import { cn } from '../utils'

export type DataTableActionIconName = 'download' | 'inspect' | 'more'

export type DataTableToolbarProps = HTMLAttributes<HTMLDivElement>

export function DataTableToolbar({ className, ...props }: DataTableToolbarProps) {
	return <div className={cn(concreteClassNames.dataTableToolbar, className)} {...props} />
}

export type DataTableSearchProps = Omit<LabelHTMLAttributes<HTMLLabelElement>, 'children'> & {
	inputProps?: InputHTMLAttributes<HTMLInputElement> | undefined
}

export function DataTableSearch({ className, inputProps, ...props }: DataTableSearchProps) {
	const { className: inputClassName, ...resolvedInputProps } = inputProps ?? {}

	return (
		<label className={cn(concreteClassNames.dataTableSearch, className)} {...props}>
			<ConcreteIcon name="search" />
			<input className={inputClassName} {...resolvedInputProps} />
		</label>
	)
}

export type DataTableFilterControlProps = Omit<
	LabelHTMLAttributes<HTMLLabelElement>,
	'children'
> & {
	children: ReactNode
	label: ReactNode
	selectProps?: SelectHTMLAttributes<HTMLSelectElement> | undefined
}

export function DataTableFilterControl({
	children,
	className,
	label,
	selectProps,
	...props
}: DataTableFilterControlProps) {
	const { className: selectClassName, ...resolvedSelectProps } = selectProps ?? {}

	return (
		<label className={cn(concreteClassNames.dataTableFilter, className)} {...props}>
			<span>{label}</span>
			<select className={selectClassName} {...resolvedSelectProps}>
				{children}
			</select>
		</label>
	)
}

export type DataTableActionProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	icon?: DataTableActionIconName | undefined
	tone?: DataTone | undefined
}

export function DataTableAction({
	children,
	className,
	icon,
	tone,
	type = 'button',
	...props
}: DataTableActionProps) {
	return (
		<button
			className={cn(concreteClassNames.dataTableAction, getDataTableActionToneClass(tone), className)}
			type={type}
			{...props}
		>
			{icon ? <DataTableActionIcon icon={icon} /> : null}
			{children}
		</button>
	)
}

export function DataTableActionIcon({ icon }: { icon: DataTableActionIconName }) {
	switch (icon) {
		case 'download':
			return <ConcreteIcon name="download" />
		case 'inspect':
			return <ConcreteIcon name="search" />
		case 'more':
			return <ConcreteIcon name="more-horizontal" />
	}
}

function getDataTableActionToneClass(tone: DataTone | undefined): string | undefined {
	switch (tone) {
		case 'error':
			return concreteClassNames.dataToneError
		case 'muted':
			return concreteClassNames.dataToneMuted
		case 'sky':
			return concreteClassNames.dataToneSky
		case 'terminal':
			return concreteClassNames.dataToneTerminal
		case 'ultra':
			return concreteClassNames.dataToneUltra
		case 'ink':
		case undefined:
			return undefined
	}
}
