import type { HTMLAttributes, ReactNode } from 'react'
import { concreteClassNames } from '../../styles/class-names'
import { cn } from '../utils'
import type { HeadingLevel, HeadingSize, HeadingTone } from './schema'

type HeadingElementProps = Omit<HTMLAttributes<HTMLHeadingElement>, 'style'>

export type HeadingProps = HeadingElementProps & {
	children?: ReactNode
	level?: HeadingLevel
	size?: HeadingSize
	tone?: HeadingTone
}

const headingTagNames = {
	'1': 'h1',
	'2': 'h2',
	'3': 'h3',
	'4': 'h4',
	'5': 'h5',
	'6': 'h6'
} as const satisfies Record<HeadingLevel, 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'>

export function Heading({
	children,
	className,
	level = '2',
	size = 'section',
	tone = 'default',
	...props
}: HeadingProps) {
	const HeadingTag = headingTagNames[level]

	return (
		<HeadingTag
			className={cn(concreteClassNames.heading, className)}
			data-size={size}
			data-tone={tone}
			{...props}
		>
			{children}
		</HeadingTag>
	)
}
