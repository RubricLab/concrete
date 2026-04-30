import type { AnchorHTMLAttributes } from 'react'
import { ConcreteIcon } from '../../icons'
import { concreteClassNames } from '../../styles/class-names'
import { cn } from '../utils'

const linkToneValues = ['default', 'sky', 'muted'] as const
const linkVariantValues = ['inline', 'nav'] as const

export type TextLinkTone = (typeof linkToneValues)[number]
export type TextLinkVariant = (typeof linkVariantValues)[number]

export type TextLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
	current?: boolean
	external?: boolean
	tone?: TextLinkTone
	variant?: TextLinkVariant
}

export function TextLink({
	'aria-current': ariaCurrent,
	children,
	className,
	current = false,
	external = false,
	tone = 'default',
	variant = 'inline',
	...props
}: TextLinkProps) {
	return (
		<a
			aria-current={current ? 'page' : ariaCurrent}
			className={cn(
				concreteClassNames.link,
				tone === 'sky' && concreteClassNames.linkSky,
				tone === 'muted' && concreteClassNames.linkMuted,
				external && concreteClassNames.linkExternal,
				variant === 'nav' && concreteClassNames.linkNav,
				className
			)}
			{...props}
		>
			{children}
			{external ? <ConcreteIcon aria-hidden name="external-link" /> : null}
		</a>
	)
}
