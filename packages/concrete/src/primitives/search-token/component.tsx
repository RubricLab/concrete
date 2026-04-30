import type { HTMLAttributes, ReactNode } from 'react'
import { ConcreteIcon, type IconName } from '../../icons'
import type { CommandItemTone } from '../../schemas'
import { concreteClassNames } from '../../styles/class-names'
import { cn } from '../utils'

export type SearchTokenPrimitiveProps = HTMLAttributes<HTMLSpanElement> & {
	children: ReactNode
	leadingIcon?: IconName | undefined
	onRemove?: (() => void) | undefined
	removable?: boolean | undefined
	removeLabel?: string | undefined
	tone?: CommandItemTone | undefined
}

export function SearchTokenPrimitive({
	children,
	className,
	leadingIcon,
	onRemove,
	removable = false,
	removeLabel = 'Remove token',
	tone = 'default',
	...props
}: SearchTokenPrimitiveProps) {
	const shouldRenderRemoveControl = removable || Boolean(onRemove)

	return (
		<span className={cn(concreteClassNames.searchToken, className)} data-tone={tone} {...props}>
			{leadingIcon ? <ConcreteIcon name={leadingIcon} /> : null}
			<span>{children}</span>
			{shouldRenderRemoveControl ? (
				<button aria-label={removeLabel} {...(onRemove ? { onClick: onRemove } : {})} type="button">
					<ConcreteIcon name="x" />
				</button>
			) : null}
		</span>
	)
}
