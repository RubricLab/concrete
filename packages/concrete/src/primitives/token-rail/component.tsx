import type { HTMLAttributes, ReactNode } from 'react'
import { ConcreteIcon, type IconName } from '../../icons'
import { concreteClassNames } from '../../styles/class-names'
import { cn } from '../utils'

export type TokenRailItemKind = 'attachment' | 'command' | 'mention'

export type TokenRailItemData = {
	icon?: IconName | undefined
	id: string
	kind: TokenRailItemKind
	label: ReactNode
	meta?: ReactNode
	onRemove?: (() => void) | undefined
	removeLabel?: string | undefined
}

export type TokenRailProps = HTMLAttributes<HTMLDivElement> & {
	items?: readonly TokenRailItemData[] | undefined
}

export function TokenRail({ className, items = [], ...props }: TokenRailProps) {
	if (items.length === 0) {
		return null
	}

	return (
		<div className={cn(concreteClassNames.tokenRail, className)} {...props}>
			{items.map(({ id, ...item }) => (
				<TokenRailItem key={id} {...item} />
			))}
		</div>
	)
}

export type TokenRailItemProps = HTMLAttributes<HTMLSpanElement> & {
	icon?: IconName | undefined
	kind: TokenRailItemKind
	label: ReactNode
	meta?: ReactNode
	onRemove?: (() => void) | undefined
	removeLabel?: string | undefined
}

export function TokenRailItem({
	children,
	className,
	icon,
	kind,
	label,
	meta,
	onRemove,
	removeLabel,
	...props
}: TokenRailItemProps) {
	return (
		<span className={cn(concreteClassNames.tokenRailItem, className)} data-kind={kind} {...props}>
			{icon ? <ConcreteIcon name={icon} /> : null}
			<span>
				{children ?? label}
				{meta ? ` · ${meta}` : ''}
			</span>
			{onRemove ? (
				<button aria-label={removeLabel ?? 'Remove'} onClick={onRemove} type="button">
					<ConcreteIcon name="x" />
				</button>
			) : null}
		</span>
	)
}
