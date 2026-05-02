import type { HTMLAttributes, ReactNode } from 'react'
import { concreteClassNames } from '../../styles/class-names'
import { cn } from '../utils'
import type { TextElement, TextIntent, TextPurpose } from './schema'

type TextElementProps = Omit<HTMLAttributes<HTMLElement>, 'style'>

export type TextProps = TextElementProps & {
	as?: TextElement
	children?: ReactNode
	purpose?: TextPurpose
	intent?: TextIntent
}

export function Text({
	as = 'span',
	children,
	className,
	purpose = 'body',
	intent = 'default',
	...props
}: TextProps) {
	const TextTag = as

	return (
		<TextTag
			className={cn(concreteClassNames.text, className)}
			data-purpose={purpose}
			data-intent={intent}
			{...props}
		>
			{children}
		</TextTag>
	)
}
