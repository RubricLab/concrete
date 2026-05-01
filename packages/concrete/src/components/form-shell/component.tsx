import type { FormHTMLAttributes, HTMLAttributes, ReactNode } from 'react'
import type { Density } from '../../foundations/state'
import { Dock, FieldRow, Grid, Panel, Section } from '../../primitives'
import type { GridColumns } from '../../primitives/grid'
import type { FieldStatus } from '../../schemas'

export type FormGridColumns = 1 | 2 | 3
export type FormRowAlign = 'center' | 'start'

export type FormShellProps = Omit<FormHTMLAttributes<HTMLFormElement>, 'title'> & {
	actions?: ReactNode | undefined
	children: ReactNode
	compact?: boolean | undefined
	description?: ReactNode | undefined
	eyebrow?: ReactNode | undefined
	footer?: ReactNode | undefined
	meta?: ReactNode | undefined
	status?: FieldStatus | undefined
	title: ReactNode
}

export function FormShell({
	actions,
	children,
	className,
	compact = false,
	description,
	eyebrow,
	footer,
	meta,
	status = 'default',
	title,
	...props
}: FormShellProps) {
	const density = getFormDensity(compact)

	return (
		<form className={className} {...props}>
			<Panel
				actions={actions}
				density={density}
				description={description}
				meta={meta}
				title={title}
				intent={status === 'error' ? 'error' : 'default'}
			>
				{eyebrow ? <Section density="compact" title={eyebrow} /> : null}
				{children}
			</Panel>
			{footer ? (
				<Dock density={density} placement="bottom">
					{footer}
				</Dock>
			) : null}
		</form>
	)
}

export type FormSectionProps = Omit<HTMLAttributes<HTMLElement>, 'title'> & {
	action?: ReactNode | undefined
	children: ReactNode
	description?: ReactNode | undefined
	divided?: boolean | undefined
	eyebrow?: ReactNode | undefined
	title?: ReactNode | undefined
}

export function FormSection({
	action,
	children,
	description,
	divided = true,
	eyebrow,
	title,
	...props
}: FormSectionProps) {
	return (
		<Section description={description} separated={divided} title={title ?? eyebrow} {...props}>
			{children}
			{action ? (
				<Dock align="end" density="compact">
					{action}
				</Dock>
			) : null}
		</Section>
	)
}

export type FormGridProps = HTMLAttributes<HTMLDivElement> & {
	columns?: FormGridColumns | undefined
	compact?: boolean | undefined
}

export function FormGrid({ columns = 2, compact = false, ...props }: FormGridProps) {
	return <Grid columns={toGridColumns(columns)} density={getFormDensity(compact)} {...props} />
}

export type FormRowProps = Omit<HTMLAttributes<HTMLDivElement>, 'title'> & {
	align?: FormRowAlign | undefined
	children?: ReactNode | undefined
	control?: ReactNode | undefined
	description?: ReactNode | undefined
	interactive?: boolean | undefined
	label: ReactNode
	meta?: ReactNode | undefined
	status?: FieldStatus | undefined
}

export function FormRow({ ...props }: FormRowProps) {
	return <FieldRow {...props} />
}

function getFormDensity(compact: boolean): Density {
	return compact ? 'compact' : 'comfortable'
}

function toGridColumns(columns: FormGridColumns): GridColumns {
	switch (columns) {
		case 1:
			return 'one'
		case 2:
			return 'two'
		case 3:
			return 'three'
	}
}
