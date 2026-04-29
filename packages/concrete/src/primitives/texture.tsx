import type { HTMLAttributes } from 'react'
import { z } from 'zod/v4'
import { selectControl } from '../registry/controls'
import { defineConcretePrimitive } from '../registry/definition'
import { prop, states } from '../registry/props'
import { concreteClassNames } from '../styles/class-names'
import { Frame } from './frame'
import { cn } from './utils'

const textureValues = ['lattice', 'dots', 'lines'] as const

export type TextureVariant = (typeof textureValues)[number]

export type TextureProps = HTMLAttributes<HTMLDivElement> & {
	variant?: TextureVariant
}

export function Texture({ className, variant = 'lattice', ...props }: TextureProps) {
	return <div className={cn(getTextureClass(variant), className)} {...props} />
}

export const texturePropsSchema = z
	.object({
		texture: z.enum(textureValues).default('lattice')
	})
	.strict()

export const texturePrimitiveDefinition = defineConcretePrimitive({
	category: 'foundation',
	component: Texture,
	controls: [selectControl('texture', 'Texture', 'lattice', textureValues)],
	description: 'Lattice, dot, and line grounds from the foundation tokens.',
	guidance:
		'Textures are subtle instructional grounds. Keep them inside frames or small surfaces and avoid full-page decorative use.',
	kind: 'primitive',
	name: 'Texture',
	pressure: ['editorial', 'educational'],
	props: [
		prop('texture', "'lattice' | 'dots' | 'lines'", 'Optional tokenized ground pattern.'),
		prop('children', 'never', 'Texture renders only its background treatment.')
	],
	renderExample: renderTextureExample,
	schema: texturePropsSchema,
	slug: 'texture',
	states: states([
		['default', 'Dot and line texture grounds.'],
		['lattice', 'Lattice texture ground.']
	])
})

function renderTextureExample(state = 'default') {
	return (
		<Frame>
			<Texture style={{ height: 96 }} variant={state === 'lattice' ? 'lattice' : 'dots'} />
			<Texture style={{ height: 96 }} variant="lines" />
		</Frame>
	)
}

export function getTextureClass(texture: TextureVariant): string | undefined {
	switch (texture) {
		case 'dots':
			return concreteClassNames.dots
		case 'lattice':
			return concreteClassNames.lattice
		case 'lines':
			return concreteClassNames.lines
	}
}
