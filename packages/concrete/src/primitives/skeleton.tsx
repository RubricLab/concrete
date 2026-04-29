import type { HTMLAttributes } from 'react'
import { z } from 'zod/v4'
import { textControl } from '../registry/controls'
import { defineConcretePrimitive } from '../registry/definition'
import { prop, states } from '../registry/props'
import { concreteClassNames } from '../styles/class-names'
import { Frame } from './frame'
import { cn } from './utils'

export type SkeletonProps = HTMLAttributes<HTMLSpanElement> & {
	height?: number | string
	width?: number | string
}

export function Skeleton({
	className,
	height = 12,
	style,
	width = '100%',
	...props
}: SkeletonProps) {
	return (
		<span
			className={cn(concreteClassNames.skeleton, className)}
			style={{ height, width, ...style }}
			{...props}
		/>
	)
}

export const skeletonPropsSchema = z
	.object({
		height: z.string().default('14'),
		width: z.string().default('70%')
	})
	.strict()

export const skeletonPrimitiveDefinition = defineConcretePrimitive({
	category: 'feedback',
	component: Skeleton,
	controls: [textControl('width', 'Width', '70%'), textControl('height', 'Height', '14')],
	description: 'Structural loading atom for educational and product placeholders.',
	guidance:
		'Skeletons should preserve the shape of pending content. Avoid using them as decorative shimmer blocks.',
	kind: 'primitive',
	name: 'Skeleton',
	pressure: ['product', 'educational'],
	props: [
		prop('width', 'number | string', 'Rendered skeleton width.', '100%'),
		prop('height', 'number | string', 'Rendered skeleton height.', '12')
	],
	renderExample: renderSkeletonExample,
	schema: skeletonPropsSchema,
	slug: 'skeleton',
	states: states([
		['default', 'Text and block skeletons.'],
		['avatar', 'Compact identity placeholder.']
	])
})

function renderSkeletonExample(state = 'default') {
	return (
		<Frame>
			<Skeleton width="70%" />
			<Skeleton height={28} width="100%" />
			<Skeleton height={state === 'avatar' ? 36 : 14} width={state === 'avatar' ? 36 : '54%'} />
		</Frame>
	)
}
