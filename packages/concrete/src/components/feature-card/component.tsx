'use client'

import type { HTMLAttributes, ReactNode } from 'react'
import { ConcreteIcon, type IconName } from '../../icons'
import { TiltFrame } from '../../primitives'
import { cn } from '../../primitives/utils'
import { featureCardSchema } from './schema'

export type FeatureCardAccent = 'ink' | 'sky' | 'terminal' | 'ultra'

export type FeatureCardProps = Omit<HTMLAttributes<HTMLDivElement>, 'title'> & {
	accent?: FeatureCardAccent
	description?: ReactNode
	icon?: IconName
	interactive?: boolean
	title: ReactNode
}

export function FeatureCard({
	accent = 'ink',
	className,
	description,
	icon = 'sparkles',
	interactive = true,
	title,
	...props
}: FeatureCardProps) {
	featureCardSchema.pick({ accent: true, interactive: true }).parse({ accent, interactive })

	return (
		<TiltFrame
			className={cn(className)}
			data-accent={accent}
			interactive={interactive}
			intensity="subtle"
			surface="transparent"
			{...props}
		>
			<span data-slot="feature-card-icon">
				<ConcreteIcon name={icon} />
			</span>
			<span data-slot="feature-card-body">
				<strong>{title}</strong>
				{description ? <span>{description}</span> : null}
			</span>
		</TiltFrame>
	)
}
