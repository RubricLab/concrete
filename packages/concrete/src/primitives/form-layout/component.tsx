import type { FormHTMLAttributes, HTMLAttributes, ReactNode } from 'react'
import type { FieldStatus } from '../../schemas'
import { concreteClassNames } from '../../styles/class-names'
import { cn } from '../utils'

export type FormLayoutShellVariant = 'drawer' | 'modal' | 'panel'
export type FormLayoutGridColumns = 1 | 2 | 3
export type FormLayoutRowAlign = 'center' | 'start'

export type FormLayoutShellProps = Omit<FormHTMLAttributes<HTMLFormElement>, 'title'> & {
	actions?: ReactNode | undefined
	children: ReactNode
	compact?: boolean | undefined
	description?: ReactNode | undefined
	eyebrow?: ReactNode | undefined
	footer?: ReactNode | undefined
	meta?: ReactNode | undefined
	status?: FieldStatus | undefined
	title: ReactNode
	variant?: FormLayoutShellVariant | undefined
}

export function FormLayoutShell({
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
	variant = 'panel',
	...props
}: FormLayoutShellProps) {
	return (
		<form
			className={cn(concreteClassNames.formShell, className)}
			data-compact={compact ? true : undefined}
			data-status={status}
			data-variant={variant}
			{...props}
		>
			<header className={concreteClassNames.formShellHeader}>
				<div className={concreteClassNames.formShellIntro}>
					{eyebrow ? <span className={concreteClassNames.formEyebrow}>{eyebrow}</span> : null}
					<div className={concreteClassNames.formShellTitleRow}>
						<h2>{title}</h2>
						{meta ? <span className={concreteClassNames.formShellMeta}>{meta}</span> : null}
					</div>
					{description ? <p>{description}</p> : null}
				</div>
				{actions ? <div className={concreteClassNames.formShellActions}>{actions}</div> : null}
			</header>
			<div className={concreteClassNames.formShellBody}>{children}</div>
			{footer ? <footer className={concreteClassNames.formShellFooter}>{footer}</footer> : null}
		</form>
	)
}

export type FormLayoutSectionProps = Omit<HTMLAttributes<HTMLElement>, 'title'> & {
	action?: ReactNode | undefined
	children: ReactNode
	description?: ReactNode | undefined
	divided?: boolean | undefined
	eyebrow?: ReactNode | undefined
	title?: ReactNode | undefined
}

export function FormLayoutSection({
	action,
	children,
	className,
	description,
	divided = true,
	eyebrow,
	title,
	...props
}: FormLayoutSectionProps) {
	return (
		<section
			className={cn(concreteClassNames.formSection, className)}
			data-divided={divided ? true : undefined}
			{...props}
		>
			{title || description || eyebrow || action ? (
				<header className={concreteClassNames.formSectionHeader}>
					<div>
						{eyebrow ? <span className={concreteClassNames.formEyebrow}>{eyebrow}</span> : null}
						{title ? <h3>{title}</h3> : null}
						{description ? <p>{description}</p> : null}
					</div>
					{action ? <div className={concreteClassNames.formSectionAction}>{action}</div> : null}
				</header>
			) : null}
			<div className={concreteClassNames.formSectionBody}>{children}</div>
		</section>
	)
}

export type FormLayoutGridProps = HTMLAttributes<HTMLDivElement> & {
	columns?: FormLayoutGridColumns | undefined
	compact?: boolean | undefined
}

export function FormLayoutGrid({
	children,
	className,
	columns = 2,
	compact = false,
	...props
}: FormLayoutGridProps) {
	return (
		<div
			className={cn(concreteClassNames.formGrid, className)}
			data-columns={columns}
			data-compact={compact ? true : undefined}
			{...props}
		>
			{children}
		</div>
	)
}

export type FormLayoutRowProps = Omit<HTMLAttributes<HTMLDivElement>, 'title'> & {
	align?: FormLayoutRowAlign | undefined
	children?: ReactNode | undefined
	control?: ReactNode | undefined
	description?: ReactNode | undefined
	interactive?: boolean | undefined
	label: ReactNode
	meta?: ReactNode | undefined
	status?: FieldStatus | undefined
}

export function FormLayoutRow({
	align = 'center',
	children,
	className,
	control,
	description,
	interactive = false,
	label,
	meta,
	status = 'default',
	...props
}: FormLayoutRowProps) {
	return (
		<div
			className={cn(concreteClassNames.formRow, className)}
			data-align={align}
			data-interactive={interactive ? true : undefined}
			data-status={status}
			{...props}
		>
			<div className={concreteClassNames.formRowCopy}>
				<span className={concreteClassNames.formRowLabel}>{label}</span>
				{description ? (
					<span className={concreteClassNames.formRowDescription}>{description}</span>
				) : null}
			</div>
			{meta ? <span className={concreteClassNames.formRowMeta}>{meta}</span> : null}
			<div className={concreteClassNames.formRowControl}>{control ?? children}</div>
		</div>
	)
}
