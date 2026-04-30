import type { HTMLAttributes, ReactNode } from 'react'
import { concreteClassNames } from '../../styles/class-names'
import { cn } from '../utils'
import type { TextElement, TextPurpose, TextTone } from './schema'

type TextElementProps = Omit<HTMLAttributes<HTMLElement>, 'style'>

export type TextProps = TextElementProps & {
	as?: TextElement
	children?: ReactNode
	purpose?: TextPurpose
	tone?: TextTone
}

export function Text({
	as = 'span',
	children,
	className,
	purpose = 'body',
	tone = 'default',
	...props
}: TextProps) {
	const TextTag = as

	return (
		<TextTag
			className={cn(concreteClassNames.text, className)}
			data-purpose={purpose}
			data-tone={tone}
			{...props}
		>
			{children}
		</TextTag>
	)
}
