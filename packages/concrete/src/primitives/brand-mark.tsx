import type { HTMLAttributes } from 'react'
import { z } from 'zod/v4'
import { booleanControl } from '../registry/controls'
import { defineConcretePrimitive } from '../registry/definition'
import { prop, states } from '../registry/props'
import { concreteClassNames } from '../styles/class-names'
import { Frame } from './frame'
import { cn } from './utils'

export type BrandMarkProps = HTMLAttributes<HTMLSpanElement> & {
	inverse?: boolean
}

export function BrandMark({ className, inverse = false, ...props }: BrandMarkProps) {
	return (
		<span
			className={cn(concreteClassNames.brandMark, className)}
			style={inverse ? { background: 'transparent', color: '#fff' } : undefined}
			{...props}
		>
			<svg aria-hidden viewBox="0 0 900 900">
				<title>Concrete mark</title>
				<path d="M300 600V300H400V400H500V300H600V400H500V500H400V600H300Z" />
			</svg>
		</span>
	)
}

export const brandMarkPropsSchema = z
	.object({
		inverse: z.boolean().default(false)
	})
	.strict()

export const brandMarkPrimitiveDefinition = defineConcretePrimitive({
	category: 'brand',
	component: BrandMark,
	controls: [booleanControl('inverse', 'Inverse', 'false')],
	description: 'Concrete C-glyph in a compact mark tile.',
	guidance:
		'Use the mark sparingly in navigation, docs chrome, and branded empty surfaces. Do not recolor or decorate it locally.',
	kind: 'primitive',
	name: 'Brand mark',
	pressure: ['editorial', 'product'],
	props: [prop('inverse', 'boolean', 'Flips the mark tile for dark or inverse contexts.', 'false')],
	renderExample: renderBrandMarkExample,
	schema: brandMarkPropsSchema,
	slug: 'brand-mark',
	states: states([
		['default', 'Default mark tile.'],
		['inverse', 'Inverse mark treatment.']
	])
})

function renderBrandMarkExample(state = 'default') {
	return (
		<Frame>
			<BrandMark />
			<BrandMark inverse={state === 'inverse'} />
		</Frame>
	)
}
