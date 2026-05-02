import type { AnchorHTMLAttributes } from 'react'
import { ConcreteIcon } from '../../icons'
import { concreteClassNames } from '../../styles/class-names'
import { cn } from '../utils'

const linkIntentValues = ['default', 'sky', 'muted'] as const
const linkPurposeValues = ['inline', 'nav'] as const

export type TextLinkIntent = (typeof linkIntentValues)[number]
export type TextLinkPurpose = (typeof linkPurposeValues)[number]

export type TextLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
	current?: boolean
	external?: boolean
	intent?: TextLinkIntent
	purpose?: TextLinkPurpose
}

export function TextLink({
	'aria-current': ariaCurrent,
	children,
	className,
	current = false,
	external = false,
	intent = 'default',
	purpose = 'inline',
	...props
}: TextLinkProps) {
	return (
		<a
			aria-current={current ? 'page' : ariaCurrent}
			className={cn(
				concreteClassNames.link,
				intent === 'sky' && concreteClassNames.linkSky,
				intent === 'muted' && concreteClassNames.linkMuted,
				external && concreteClassNames.linkExternal,
				purpose === 'nav' && concreteClassNames.linkNav,
				className
			)}
			{...props}
		>
			{children}
			{external ? <ConcreteIcon aria-hidden name="external-link" /> : null}
		</a>
	)
}
