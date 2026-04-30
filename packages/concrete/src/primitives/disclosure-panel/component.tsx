import type { DetailsHTMLAttributes, ReactNode } from 'react'
import { ConcreteIcon } from '../../icons'
import { concreteClassNames } from '../../styles/class-names'
import { cn } from '../utils'
import type { DisclosurePanelTone } from './schema'

export type DisclosurePanelProps = Omit<
	DetailsHTMLAttributes<HTMLDetailsElement>,
	'style' | 'title'
> & {
	children: ReactNode
	summary: ReactNode
	tone?: DisclosurePanelTone
}

export function DisclosurePanel({
	children,
	className,
	open = false,
	summary,
	tone = 'default',
	...props
}: DisclosurePanelProps) {
	return (
		<details
			className={cn(concreteClassNames.disclosurePanel, className)}
			data-tone={tone}
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
