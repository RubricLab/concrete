import type { DetailsHTMLAttributes, ReactNode } from 'react'
import { ConcreteIcon } from '../../icons'
import { concreteClassNames } from '../../styles/class-names'
import { cn } from '../utils'
import type { DisclosurePanelIntent } from './schema'

export type DisclosurePanelProps = Omit<
	DetailsHTMLAttributes<HTMLDetailsElement>,
	'style' | 'title'
> & {
	children: ReactNode
	summary: ReactNode
	intent?: DisclosurePanelIntent
}

export function DisclosurePanel({
	children,
	className,
	open = false,
	summary,
	intent = 'default',
	...props
}: DisclosurePanelProps) {
	return (
		<details
			className={cn(concreteClassNames.disclosurePanel, className)}
			data-intent={intent}
			open={open}
			{...props}
		>
			<summary className={concreteClassNames.disclosurePanelSummary}>
				<span>{summary}</span>
				<ConcreteIcon name="chevron-down" />
			</summary>
			<div className={concreteClassNames.disclosurePanelBody}>{children}</div>
		</details>
	)
}
