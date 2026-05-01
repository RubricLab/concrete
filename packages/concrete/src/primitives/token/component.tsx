import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react'
import { ConcreteIcon, type IconName } from '../../icons'
import type { CommandItemIntent } from '../../schemas'
import { concreteClassNames } from '../../styles/class-names'
import { cn } from '../utils'
import type { TokenKind } from './schema'

export type ConcreteTokenProps = Omit<HTMLAttributes<HTMLSpanElement>, 'style'> & {
	children: ReactNode
	kind?: TokenKind | undefined
	leadingIcon?: IconName | undefined
	onRemove?: ButtonHTMLAttributes<HTMLButtonElement>['onClick'] | undefined
	removable?: boolean | undefined
	removeLabel?: string | undefined
	intent?: CommandItemIntent | undefined
}

export function Token({
	children,
	className,
	kind = 'entity',
	leadingIcon,
	onRemove,
	removable = false,
	removeLabel = 'Remove token',
	intent = 'default',
	...props
}: ConcreteTokenProps) {
	const shouldRenderRemoveControl = removable || Boolean(onRemove)

	return (
		<span
			className={cn(concreteClassNames.token, className)}
			data-kind={kind}
			data-intent={intent}
			{...props}
		>
			{leadingIcon ? <ConcreteIcon name={leadingIcon} /> : null}
			<span className={concreteClassNames.tokenLabel}>{children}</span>
			{shouldRenderRemoveControl ? (
				<button
					aria-label={removeLabel}
					className={concreteClassNames.tokenRemove}
					onClick={onRemove}
					type="button"
				>
					<ConcreteIcon name="x" />
				</button>
			) : null}
		</span>
	)
}
